import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function prepareJsxComponent(code: string) {
  let sanitized = code.trim();

  // 1. Alle Exports entfernen
  sanitized = sanitized
    .replace(
      /export\s+default\s+function\s+([A-Za-z0-9_]+)?/,
      (_, name) => `function ${name || "App"}`
    )
    .replace(/export\s+function\s+([A-Za-z0-9_]+)/g, "function $1")
    .replace(/export\s+const\s+([A-Za-z0-9_]+)/g, "const $1");

  // 2. Imports auf globale Variablen umschreiben (nur React aktuell)
  sanitized = sanitized.replace(
    /import\s+React.*from\s+['"]react['"];?/g,
    "const React = window.React;"
  );
  sanitized = sanitized.replace(
    /import\s+{([^}]+)}\s+from\s+['"]react['"];?/g,
    "const { $1 } = React;"
  );

  // 3. Fallback: wenn kein App existiert, umschreiben
  if (!/function\s+App/.test(sanitized) && !/const\s+App\s*=/.test(sanitized)) {
    sanitized = `const App = () => (${sanitized});`;
  }

  return sanitized;
}

export function ComponentRenderer({
  code,
  language,
  css,
}: {
  code: string;
  language: "html" | "jsx" | "vue" | "astro";
  css?: string;
}) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (!iframeRef.current) return;

    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;
    if (!doc) return;

    let htmlContent = "";
    let scripts = "";

    if (language === "html") {
      htmlContent = code;
    } else if (language === "jsx") {
      htmlContent = '<div id="root"></div>';
      const sanitizedCode = prepareJsxComponent(code)
        .replace(/\\/g, "\\\\")
        .replace(/`/g, "\\`")
        .replace(/\${/g, "\\${");

      scripts = `
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script type="text/babel" data-presets="react">
          ${sanitizedCode}
          const mountNode = document.getElementById('root');
          if (ReactDOM.createRoot) {
            const root = ReactDOM.createRoot(mountNode);
            root.render(React.createElement(App));
          } else {
            ReactDOM.render(React.createElement(App), mountNode);
          }
        </script>
      `;
    }

    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
            ${css || ""}
          </style>
        </head>
        <body>
          ${htmlContent}
          ${scripts}
        </body>
      </html>
    `;

    doc.open();
    doc.write(fullHTML);
    doc.close();
  }, [code, language, css]);

  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts allow-same-origin"
      className="w-full border-0 bg-white"
      style={{ minHeight: "80vh", height: "auto" }}
      title="Component Preview"
    />
  );
}

export default function App() {
  const [userId, setUserId] = React.useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userId");
    }
    return null;
  });
  const [isSignup, setIsSignup] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState<
    "components" | "saved" | "published"
  >("components");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedComponent, setSelectedComponent] = React.useState<any>(null);
  const [showCreatePage, setShowCreatePage] = React.useState(false);
  const [newComponent, setNewComponent] = React.useState({
    name: "",
    language: "html",
    css: "",
    code: "<div class='p-6 text-center'>Start building your component...</div>",
  });

  const signupMutation = useMutation(api.auth.signup);
  const loginMutation = useMutation(api.auth.login);
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    userId ? { userId: userId as any } : "skip"
  );
  const createComponent = useMutation(api.components.createComponent);
  const saveComponent = useMutation(api.components.saveComponent);
  const publishComponent = useMutation(api.components.publishComponent);
  const unpublishComponent = useMutation(api.components.unpublishComponent);

  const allComponents = useQuery(
    api.components.getComponents,
    userId ? { userId: userId as any } : "skip"
  );
  const savedComponents = useQuery(
    api.components.getSavedComponents,
    userId ? { userId: userId as any } : "skip"
  );
  const publishedComponents = useQuery(
    api.components.getPublishedComponents,
    userId ? { userId: userId as any } : "skip"
  );

  // Get components based on current page
  const getCurrentComponents = () => {
    if (currentPage === "saved") return savedComponents;
    if (currentPage === "published") return publishedComponents;
    return allComponents;
  };

  const components = getCurrentComponents();

  // Filter components by search query
  const filteredComponents = React.useMemo(() => {
    if (!components || !searchQuery) return components || [];
    return components.filter((comp: any) =>
      comp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [components, searchQuery]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;

    try {
      let result;
      if (isSignup) {
        result = await signupMutation({
          username: usernameInput.value,
          password: passwordInput.value,
        });
      } else {
        result = await loginMutation({
          username: usernameInput.value,
          password: passwordInput.value,
        });
      }

      if (result.userId) {
        localStorage.setItem("userId", result.userId);
        setUserId(result.userId);
        setUsername(result.username);
        setShowAuthModal(false);
        setAuthError(null);
        form.reset();
      }
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    setUsername("");
  };

  const handleCreateSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!userId) return;
    createComponent({
      name: newComponent.name,
      language: newComponent.language as "html" | "jsx" | "vue" | "astro",
      css: newComponent.css || undefined,
      code: newComponent.code,
      userId: userId as any,
    });
    setShowCreatePage(false);
    setNewComponent({
      name: "",
      language: "html",
      css: "",
      code: "<div class='p-6 text-center'>Start building your component...</div>",
    });
  };

  const handleNewComponentChange = (
    field: "name" | "language" | "css" | "code",
    value: string
  ) => {
    setNewComponent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  React.useEffect(() => {
    if (currentUser && currentUser.username) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);
  const getLanguageBadgeColor = (lang: string) => {
    switch (lang) {
      case "html":
        return "bg-orange-100 text-orange-800";
      case "jsx":
        return "bg-blue-100 text-blue-800";
      case "vue":
        return "bg-green-100 text-green-800";
      case "astro":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Show login/signup form if not authenticated
  if (!userId) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="text-2xl font-bold text-gray-900 ">OpenUI</div>
              <nav className="hidden md:flex items-center gap-8">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Products
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Docs
                </a>
              </nav>
              <button
                onClick={() => {
                  setIsSignup(false);
                  setShowAuthModal(true);
                }}
                className="text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                Log in
              </button>
            </div>
          </div>
        </header>

        {/* Landing Page */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32">
          <div className="text-left">
            <h1
              className="text-5xl md:text-6xl max-w-4xl lg:text-6xl font-serif text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-rotate">
                <span className="justify-items-center">
                  <span>Organisierung</span>
                  <span>Inspirationen</span>
                </span>
              </span>{" "}
              Für deine Komponenten mit OpenUI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
              Streamline your component development with seamless automation for
              every custom UI, tailored by OpenUI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <button
                onClick={() => {
                  setIsSignup(true);
                  setShowAuthModal(true);
                }}
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm"
              >
                Start for free
              </button>
            </div>
          </div>
        </main>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {isSignup ? "Sign Up" : "Log in"}
                </h2>
                <button
                  onClick={() => {
                    setShowAuthModal(false);
                    setAuthError(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                    placeholder="Enter your password"
                  />
                </div>
                {authError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {authError}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  {isSignup ? "Sign Up" : "Log in"}
                </button>
                {!isSignup && (
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="w-full text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Don't have an account? Sign up
                  </button>
                )}
                {isSignup && (
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="w-full text-gray-600 hover:text-gray-900 text-sm"
                  >
                    Already have an account? Log in
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-gray-200 bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-900">OpenUI</div>
          <div className="text-xs text-gray-500 mt-1">/{username}</div>
        </div>
        <nav className="p-4 space-y-1">
          <button
            onClick={() => setCurrentPage("components")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
              currentPage === "components"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>💻</span>
            <span>Components</span>
          </button>
          <button
            onClick={() => setCurrentPage("saved")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
              currentPage === "saved"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>⭐</span>
            <span>Saved</span>
          </button>
          <button
            onClick={() => setCurrentPage("published")}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
              currentPage === "published"
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>📦</span>
            <span>Published</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-8 h-16">
            <div></div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                <span className="text-xl">🔔</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{username}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              {currentPage === "components"
                ? "Components"
                : currentPage === "saved"
                  ? "Saved Components"
                  : "Published Components"}
            </h1>
            <p className="text-gray-600">Your component library and previews</p>
          </div>

          {/* Create CTA */}
          {currentPage === "components" && (
            <div className="flex items-center justify-end mb-6">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3">
                Export
              </button>
              <button
                onClick={() => {
                  setShowCreatePage(true);
                  setNewComponent({
                    name: "",
                    language: "html",
                    css: "",
                    code: "<div class='p-6 text-center'>Start building your component...</div>",
                  });
                }}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                Create component
              </button>
            </div>
          )}

          {/* Search and View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                title="Grid View"
              >
                <span className="text-lg">⊞</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                title="List View"
              >
                <span className="text-lg">☰</span>
              </button>
            </div>
          </div>

          {/* Components Display */}
          <div>
            {components === undefined ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
                <p className="text-gray-600 text-sm">Loading components...</p>
              </div>
            ) : filteredComponents.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? "No components found" : "No components yet"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {searchQuery
                    ? "Try a different search term"
                    : currentPage === "components"
                      ? "Create your first component above to get started!"
                      : `No ${currentPage} components yet.`}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredComponents.map((component: any) => (
                  <div
                    key={component._id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="grid grid-cols-2 h-64">
                      {/* Preview Side */}
                      <div className="border-r border-gray-200 overflow-hidden">
                        <ComponentRenderer
                          code={component.code}
                          language={component.language}
                          css={component.css}
                        />
                      </div>
                      {/* Info Side */}
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {component.name}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(component.language)}`}
                          >
                            {component.language.toUpperCase()}
                          </span>
                        </div>
                        <button
                          onClick={() => setSelectedComponent(component)}
                          className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                        >
                          View Code
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredComponents.map((component: any) => (
                  <div
                    key={component._id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-32 h-24 border border-gray-200 rounded overflow-hidden shrink-0">
                          <ComponentRenderer
                            code={component.code}
                            language={component.language}
                            css={component.css}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {component.name}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(component.language)}`}
                            >
                              {component.language.toUpperCase()}
                            </span>
                            {"_creationTime" in component && (
                              <span className="text-xs text-gray-500">
                                {new Date(
                                  (component as any)._creationTime
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedComponent(component)}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 ml-4"
                      >
                        View Code
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Create Component Full Page */}
        {showCreatePage && (
          <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
            <div className="grid grid-cols-3 px-6 lg:px-8 py-10">
              <div className="flex flex-col justify-between mb-8 mr-8">
                <div>
                  <button
                    onClick={() => setShowCreatePage(false)}
                    className="text-sm text-gray-500 hover:text-gray-900"
                  >
                    ← Back to dashboard
                  </button>
                  <h2 className="text-3xl font-semibold text-gray-900 mt-2">
                    Create a Component
                  </h2>
                  <p className="text-gray-600">
                    Build your component while seeing a live preview update as
                    you type.
                  </p>
                </div>
                {/* Form */}
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Component Name
                    </label>
                    <input
                      type="text"
                      value={newComponent.name}
                      onChange={(e) =>
                        handleNewComponentChange("name", e.target.value)
                      }
                      placeholder="e.g., Pricing Hero"
                      required
                      className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={newComponent.language}
                      onChange={(e) =>
                        handleNewComponentChange("language", e.target.value)
                      }
                      className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none bg-white"
                    >
                      <option
                        className="text-orange-800 bg-orange-100"
                        value="html"
                      >
                        HTML
                      </option>
                      <option className="text-blue-800 bg-blue-100" value="jsx">
                        JSX
                      </option>
                      <option
                        className="text-green-800 bg-green-100"
                        value="vue"
                      >
                        Vue
                      </option>
                      <option
                        className="text-purple-800 bg-purple-100"
                        value="astro"
                      >
                        Astro
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CSS (optional)
                    </label>
                    <textarea
                      value={newComponent.css}
                      onChange={(e) =>
                        handleNewComponentChange("css", e.target.value)
                      }
                      placeholder=".card { background: white; }"
                      className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none min-h-28 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Code
                    </label>
                    <textarea
                      value={newComponent.code}
                      onChange={(e) =>
                        handleNewComponentChange("code", e.target.value)
                      }
                      placeholder="<section>...</section>"
                      required
                      className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none min-h-60 font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Tip: the preview on the right updates live as you type.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                    >
                      Save component
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreatePage(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              <div className="col-span-2">
                {/* Live Preview */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Live Preview
                      </p>
                      <p className="text-xs text-gray-500">
                        Rendering {newComponent.language.toUpperCase()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(newComponent.language)}`}
                    >
                      {newComponent.language.toUpperCase()}
                    </span>
                  </div>
                  <div className="border border-gray-200 rounded-lg bg-white overflow-hidden min-h-[400px]">
                    <ComponentRenderer
                      code={newComponent.code}
                      language={
                        newComponent.language as
                          | "html"
                          | "jsx"
                          | "vue"
                          | "astro"
                      }
                      css={newComponent.css}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Component Detail Modal */}
        {selectedComponent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto my-8">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedComponent.name}
                  </h2>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium mt-2 ${getLanguageBadgeColor(selectedComponent.language)}`}
                  >
                    {selectedComponent.language.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {currentPage === "components" && (
                    <>
                      {!selectedComponent.saved && (
                        <button
                          onClick={async () => {
                            await saveComponent({
                              componentId: selectedComponent._id,
                            });
                            setSelectedComponent({
                              ...selectedComponent,
                              saved: true,
                            });
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Save
                        </button>
                      )}
                      {!selectedComponent.published && (
                        <button
                          onClick={async () => {
                            await publishComponent({
                              componentId: selectedComponent._id,
                            });
                            setSelectedComponent({
                              ...selectedComponent,
                              published: true,
                            });
                          }}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                        >
                          Publish
                        </button>
                      )}
                      {selectedComponent.published && (
                        <button
                          onClick={async () => {
                            await unpublishComponent({
                              componentId: selectedComponent._id,
                            });
                            setSelectedComponent({
                              ...selectedComponent,
                              published: false,
                            });
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Unpublish
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => setSelectedComponent(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Preview
                  </h4>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <ComponentRenderer
                      code={selectedComponent.code}
                      language={selectedComponent.language}
                      css={selectedComponent.css}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {selectedComponent.css && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        CSS
                      </h4>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                        <code>{selectedComponent.css}</code>
                      </pre>
                    </div>
                  )}
                  <div className={selectedComponent.css ? "" : "lg:col-span-2"}>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Code
                    </h4>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs max-h-96">
                      <code>{selectedComponent.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

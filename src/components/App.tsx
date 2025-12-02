import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import ComponentRenderer from "./ComponentRender";
import AuthModal from "./AuthModal";
import DashboardLayout from "./DashboardLayout";
import ComponentsView from "./ComponentsView";
import CreateComponentPage from "./CreateComponentPage";
import ComponentDetailModal from "./ComponentDetailModel";
import LandingPage from "./LandingPage";

/**
 * App: root stateful orchestrator
 * - Performs Convex queries/mutations (kept in root)
 * - Passes data + handlers down to presentational components
 */

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

  // mutations & queries
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

  // handlers for modal actions (wrapping mutations)
  const handleSaveComponent = async (componentId: any) => {
    await saveComponent({ componentId });
    // optimistic UI: update selectedComponent if open
    if (selectedComponent && selectedComponent._id === componentId) {
      setSelectedComponent({ ...selectedComponent, saved: true });
    }
  };

  const handlePublishComponent = async (componentId: any) => {
    await publishComponent({ componentId });
    if (selectedComponent && selectedComponent._id === componentId) {
      setSelectedComponent({ ...selectedComponent, published: true });
    }
  };

  const handleUnpublishComponent = async (componentId: any) => {
    await unpublishComponent({ componentId });
    if (selectedComponent && selectedComponent._id === componentId) {
      setSelectedComponent({ ...selectedComponent, published: false });
    }
  };

  // If not authenticated, show landing + auth modal
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

        {/* Landing */}
        <LandingPage
          onOpenSignup={() => {
            setIsSignup(true);
            setShowAuthModal(true);
          }}
        />

        {/* Auth Modal */}
        {showAuthModal && (
          <AuthModal
            isSignup={isSignup}
            onClose={() => {
              setShowAuthModal(false);
              setAuthError(null);
            }}
            onSwitchMode={(next) => setIsSignup(next)}
            onSubmit={handleAuth}
            authError={authError}
          />
        )}
      </div>
    );
  }

  // Authenticated UI
  return (
    <DashboardLayout
      username={username}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onLogout={handleLogout}
      topRightExtra={null}
    >
      <ComponentsView
        components={components}
        filteredComponents={filteredComponents}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateClick={() => {
          setShowCreatePage(true);
          setNewComponent({
            name: "",
            language: "html",
            css: "",
            code: "<div class='p-6 text-center'>Start building your component...</div>",
          });
        }}
        onSelectComponent={(c) => setSelectedComponent(c)}
        getLanguageBadgeColor={getLanguageBadgeColor}
        currentPage={currentPage}
      />

      {showCreatePage && (
        <CreateComponentPage
          newComponent={newComponent}
          onChange={handleNewComponentChange}
          onSubmit={handleCreateSubmit}
          onCancel={() => setShowCreatePage(false)}
          getLanguageBadgeColor={getLanguageBadgeColor}
        />
      )}

      {selectedComponent && (
        <ComponentDetailModal
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
          onSave={async (id) => handleSaveComponent(id)}
          onPublish={async (id) => handlePublishComponent(id)}
          onUnpublish={async (id) => handleUnpublishComponent(id)}
          getLanguageBadgeColor={getLanguageBadgeColor}
          currentPage={currentPage}
        />
      )}
    </DashboardLayout>
  );
}

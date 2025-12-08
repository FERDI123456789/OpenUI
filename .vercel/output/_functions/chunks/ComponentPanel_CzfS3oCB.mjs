import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { Eye, Code, Smartphone, Monitor, Check, Copy, Heart, X } from 'lucide-react';
import { a as api } from './api__xwehwR1.mjs';
import { Prism } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus.js';

function prepareJsxComponent(code) {
  let sanitized = code.trim();
  sanitized = sanitized.replace(
    /export\s+default\s+function\s+([A-Za-z0-9_]+)?/,
    (_, name) => `function ${name || "App"}`
  ).replace(/export\s+function\s+([A-Za-z0-9_]+)/g, "function $1").replace(/export\s+const\s+([A-Za-z0-9_]+)/g, "const $1");
  sanitized = sanitized.replace(
    /import\s+React.*from\s+['"]react['"];?/g,
    "const React = window.React;"
  );
  sanitized = sanitized.replace(
    /import\s+{([^}]+)}\s+from\s+['"]react['"];?/g,
    "const { $1 } = React;"
  );
  if (!/function\s+App/.test(sanitized) && !/const\s+App\s*=/.test(sanitized)) {
    sanitized = `const App = () => (${sanitized});`;
  }
  return sanitized;
}
function ComponentRenderer({
  code,
  language,
  css,
  javascript,
  viewportMode = "desktop"
}) {
  const iframeRef = React.useRef(null);
  React.useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;
    let htmlContent = "";
    let scripts = "";
    let cssContent = css || "";
    if (cssContent.includes("<script>")) {
      const scriptMatch = cssContent.match(/<script>([\s\S]*?)<\/script>/);
      if (scriptMatch) {
        scripts = `<script>${scriptMatch[1]}<\/script>`;
        cssContent = cssContent.replace(/<script>[\s\S]*?<\/script>/, "");
      }
    }
    if (javascript) {
      scripts += `<script>${javascript}<\/script>`;
    }
    if (language === "html" || language === "css" || language === "javascript") {
      htmlContent = code;
    } else if (language === "jsx") {
      htmlContent = '<div id="root"></div>';
      const sanitizedCode = prepareJsxComponent(code).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\${/g, "\\${");
      scripts = `
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
        <script type="text/babel" data-presets="react">
          ${sanitizedCode}
          const mountNode = document.getElementById('root');
          if (ReactDOM.createRoot) {
            const root = ReactDOM.createRoot(mountNode);
            root.render(React.createElement(App));
          } else {
            ReactDOM.render(React.createElement(App), mountNode);
          }
        <\/script>
      `;
    }
    const viewportWidth = viewportMode === "mobile" ? "375" : "device-width";
    const viewportContent = viewportMode === "mobile" ? `width=${viewportWidth}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no` : "width=device-width, initial-scale=1.0";
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="${viewportContent}">
          <script src="https://cdn.tailwindcss.com"><\/script>
          <style>
            body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, sans-serif; }
            ${cssContent}
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
  }, [code, language, css, javascript, viewportMode]);
  return /* @__PURE__ */ jsx(
    "iframe",
    {
      ref: iframeRef,
      sandbox: "allow-scripts allow-same-origin",
      className: "w-full border-0 bg-white",
      style: {
        minHeight: viewportMode === "mobile" ? "667px" : "600px",
        height: viewportMode === "mobile" ? "667px" : "600px",
        maxWidth: viewportMode === "mobile" ? "375px" : "100%",
        margin: viewportMode === "mobile" ? "0 auto" : "0"
      },
      title: "Component Preview"
    }
  );
}

function ComponentDetail({
  component,
  getLanguageBadgeColor,
  onTogglePublish
}) {
  const [viewportMode, setViewportMode] = useState(
    "desktop"
  );
  const [viewMode, setViewMode] = useState("preview");
  const [codeCopyStatus, setCodeCopyStatus] = useState("idle");
  const [cssCopyStatus, setCssCopyStatus] = useState("idle");
  const copyToClipboard = async (text, type) => {
    if (!text) return;
    const setStatus = type === "code" ? setCodeCopyStatus : setCssCopyStatus;
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2e3);
    } catch (err) {
      console.error("Failed to copy:", err);
      setStatus("idle");
    }
  };
  const getLanguageForSyntaxHighlighter = (lang) => {
    return lang.toLowerCase();
  };
  let componentCss = component.css || "";
  const scriptMatch = componentCss.match(/<script>([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    scriptMatch[1].trim();
    componentCss = componentCss.replace(/<script>[\s\S]*?<\/script>/, "").trim();
  }
  let mainCodeLanguage = getLanguageForSyntaxHighlighter(component.language);
  if (mainCodeLanguage === "html" && component.code.startsWith("<")) ;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "p-6 overflow-y-auto h-full bg-transparent component-panel",
      style: {
        // animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1), slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 space-y-2", children: [
          component.description && /* @__PURE__ */ jsxs("div", { className: "mb-4 p-4 bg-gray-800/50 border border-purple-800/30 rounded-xl", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-purple-300 mb-2", children: "Beschreibung" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 leading-relaxed", children: component.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(
                    component.language
                  )}`,
                  children: component.language.toUpperCase()
                }
              ),
              component.user?.username && component.userId && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
                "von",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/u/${component.userId}`,
                    className: "text-purple-400 font-medium hover:text-purple-300 hover:underline transition-colors",
                    onClick: (e) => e.stopPropagation(),
                    children: component.user.username
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setViewMode("preview"),
                    className: `p-2 rounded-lg transition-all duration-200 ${viewMode === "preview" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
                    title: "Vorschau",
                    children: /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setViewMode("code"),
                    className: `p-2 rounded-lg transition-all duration-200 ${viewMode === "code" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
                    title: "Code-Ansicht",
                    children: /* @__PURE__ */ jsx(Code, { className: "w-5 h-5" })
                  }
                )
              ] }),
              viewMode === "preview" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setViewportMode("mobile"),
                    className: `p-2 rounded-lg transition-all duration-200 ${viewportMode === "mobile" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
                    title: "Handy-Ansicht",
                    children: /* @__PURE__ */ jsx(Smartphone, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setViewportMode("desktop"),
                    className: `p-2 rounded-lg transition-all duration-200 ${viewportMode === "desktop" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
                    title: "Desktop-Ansicht",
                    children: /* @__PURE__ */ jsx(Monitor, { className: "w-5 h-5" })
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        viewMode === "preview" ? /* @__PURE__ */ jsxs(
          "div",
          {
            className: `mt-4 border border-purple-800/30 rounded-xl overflow-hidden bg-gray-900/40 shadow-inner transition-all duration-300 flex items-center justify-center ${viewportMode === "mobile" ? "max-w-[600px] mx-auto h-[900px] relative" : "h-[600px] w-full"}`,
            children: [
              viewportMode === "mobile" && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-2.5 bg-gray-700 rounded-b-lg" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gray-700 rounded-t-lg" })
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-full h-full transition-all duration-300 ${viewportMode === "mobile" ? "rounded-[2.5rem] scale-125 origin-top" : ""}`,
                  children: /* @__PURE__ */ jsx(
                    ComponentRenderer,
                    {
                      code: component.code,
                      css: component.css,
                      language: component.language,
                      viewportMode
                    }
                  )
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "mt-4 border border-purple-800/30 rounded-xl overflow-hidden bg-gray-900/40 shadow-inner", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 bg-gray-800/50 border-b border-purple-800/30", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(component.language)}`,
                children: component.language.toUpperCase()
              }
            ),
            component.css && // Prüfe, ob CSS vorhanden ist
            /* @__PURE__ */ jsx("span", { className: "inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border bg-pink-500/20 text-pink-400 border-pink-500/30", children: "CSS/JS" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-4 max-h-[600px] overflow-y-auto", children: [
            component.css && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-purple-300 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Code, { className: "w-4 h-4" }),
                  "CSS/JS"
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => copyToClipboard(component.css || "", "css"),
                    className: "flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-300 hover:text-purple-200 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-800/30 rounded-lg transition-colors",
                    title: "CSS kopieren",
                    children: cssCopyStatus === "copied" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
                      "Kopiert!"
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" }),
                      "Kopieren"
                    ] })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
                Prism,
                {
                  language: "css",
                  style: vscDarkPlus,
                  customStyle: {
                    margin: 0,
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    fontSize: "0.875rem"
                  },
                  children: [
                    component.css,
                    " "
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-purple-300 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Code, { className: "w-4 h-4" }),
                  component.language.toUpperCase(),
                  " Code"
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => copyToClipboard(component.code, "code"),
                    className: "flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-300 hover:text-purple-200 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-800/30 rounded-lg transition-colors",
                    title: "Code kopieren",
                    children: codeCopyStatus === "copied" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
                      "Kopiert!"
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" }),
                      "Kopieren"
                    ] })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                Prism,
                {
                  language: mainCodeLanguage,
                  style: vscDarkPlus,
                  customStyle: {
                    margin: 0,
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    fontSize: "0.875rem"
                  },
                  children: component.code
                }
              ) })
            ] })
          ] })
        ] })
      ]
    }
  );
}

function ComponentPanel({
  selectedComponent,
  setSelectedComponent,
  onClose,
  getLanguageBadgeColor,
  handleTogglePublish,
  onComponentUpdate
}) {
  const [panelVisible, setPanelVisible] = useState(false);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const componentId = selectedComponent?._id;
  const isOwnComponent = selectedComponent?.userId === userId;
  const isSaved = useQuery(
    api.components.isSaved,
    userId && componentId ? { componentId, userId } : "skip"
  );
  const [localIsSaved, setLocalIsSaved] = useState(false);
  useEffect(() => {
    setLocalIsSaved(isSaved ?? false);
  }, [isSaved]);
  const likeComponent = useMutation(api.components.likeComponent);
  const saveComponent = useMutation(api.components.saveComponent);
  const unsaveComponent = useMutation(api.components.unsaveComponent);
  const deleteComponent = useMutation(api.components.deleteComponent);
  const getSessionId = () => {
    if (typeof window === "undefined") return null;
    let sessionId2 = localStorage.getItem("sessionId");
    if (!sessionId2) {
      sessionId2 = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("sessionId", sessionId2);
    }
    return sessionId2;
  };
  const sessionId = !userId ? getSessionId() : void 0;
  const isLiked = useQuery(
    api.components.isLiked,
    componentId ? {
      componentId,
      userId,
      sessionId: sessionId || void 0
    } : "skip"
  );
  const [localLikeCount, setLocalLikeCount] = useState(
    selectedComponent?.likeCount || 0
  );
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    if (selectedComponent) {
      document.body.style.overflow = "hidden";
      const id = requestAnimationFrame(() => {
        setPanelVisible(true);
      });
      return () => {
        cancelAnimationFrame(id);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedComponent]);
  const closePanel = () => {
    setPanelVisible(false);
    document.body.style.overflow = "";
    setTimeout(() => onClose(), 500);
  };
  useEffect(() => {
    if (selectedComponent) {
      setLocalLikeCount(selectedComponent.likeCount || 0);
    }
  }, [selectedComponent]);
  useEffect(() => {
    setHasLiked(isLiked ?? false);
  }, [isLiked]);
  const handleLike = async () => {
    if (!componentId || !setSelectedComponent || hasLiked) return;
    const newLikeCount = localLikeCount + 1;
    setLocalLikeCount(newLikeCount);
    setHasLiked(true);
    const updatedComponent = {
      ...selectedComponent,
      likeCount: newLikeCount
    };
    if (setSelectedComponent) {
      setSelectedComponent(updatedComponent);
    }
    if (onComponentUpdate) {
      onComponentUpdate(updatedComponent);
    }
    try {
      const sessionId2 = !userId ? getSessionId() : void 0;
      await likeComponent({
        componentId,
        userId,
        sessionId: sessionId2 || void 0
      });
    } catch (err) {
      console.error("Like failed", err);
      setLocalLikeCount(localLikeCount);
      setHasLiked(false);
      const revertedComponent = {
        ...selectedComponent,
        likeCount: localLikeCount
      };
      if (setSelectedComponent) {
        setSelectedComponent(revertedComponent);
      }
      if (onComponentUpdate) {
        onComponentUpdate(revertedComponent);
      }
    }
  };
  const handleToggleSave = async () => {
    if (!userId || !componentId || !setSelectedComponent) return;
    const newIsSaved = !localIsSaved;
    setLocalIsSaved(newIsSaved);
    const oldSaveCount = selectedComponent.saveCount || 0;
    const newSaveCount = newIsSaved ? oldSaveCount + 1 : Math.max(0, oldSaveCount - 1);
    const updatedComponent = {
      ...selectedComponent,
      saveCount: newSaveCount
    };
    setSelectedComponent(updatedComponent);
    if (onComponentUpdate) {
      onComponentUpdate(updatedComponent);
    }
    try {
      if (newIsSaved) {
        await saveComponent({ componentId, userId });
      } else {
        await unsaveComponent({ componentId, userId });
      }
    } catch (err) {
      console.error("Save toggle failed", err);
      setLocalIsSaved(!newIsSaved);
      const revertedComponent = {
        ...selectedComponent,
        saveCount: oldSaveCount
      };
      setSelectedComponent(revertedComponent);
      if (onComponentUpdate) {
        onComponentUpdate(revertedComponent);
      }
    }
  };
  if (!selectedComponent) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black/20 w-full backdrop-blur-sm z-40 transition-all duration-500 ease-out ${panelVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`,
        onClick: closePanel,
        style: {
          transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed top-0 right-0 h-full w-[85%] bg-linear-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-md shadow-2xl shadow-purple-900/30 z-50 component-panel rounded-l-3xl ${panelVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
        style: {
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform, opacity",
          borderLeft: "1px solid rgba(147, 51, 234, 0.1)"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 flex justify-between items-center text-white border-b border-purple-800/20 bg-linear-to-r from-gray-900/90 via-gray-900/80 to-gray-900/90", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold bg-linear-to-r from-white to-purple-200 bg-clip-text text-transparent", children: selectedComponent.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleLike,
                  className: `flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg ${hasLiked ? "text-red-400 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30" : "text-gray-400 hover:text-red-400 hover:bg-gray-700/50 border border-transparent"}`,
                  disabled: hasLiked,
                  title: hasLiked ? "Bereits geliked" : "Gefällt mir",
                  children: [
                    /* @__PURE__ */ jsx(
                      Heart,
                      {
                        className: "w-5 h-5",
                        fill: hasLiked ? "currentColor" : "none",
                        strokeWidth: hasLiked ? 0 : 1.5
                      }
                    ),
                    localLikeCount
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleToggleSave,
                  className: `flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg ${!userId || isOwnComponent ? "text-gray-500 bg-gray-800/30 border border-gray-700/30 cursor-not-allowed opacity-50" : localIsSaved ? "text-blue-400 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30" : "text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 border border-transparent"}`,
                  disabled: !userId || isOwnComponent,
                  title: isOwnComponent ? "Eigene Komponenten können nicht gespeichert werden" : !userId ? "Anmelden zum Speichern" : localIsSaved ? "Entfernen" : "Speichern",
                  children: [
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        className: "w-5 h-5",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                          }
                        )
                      }
                    ),
                    selectedComponent.saveCount || 0
                  ]
                }
              ),
              isOwnComponent && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: async (e) => {
                    e.stopPropagation();
                    if (!userId || !componentId || !setSelectedComponent) return;
                    if (!confirm(
                      "Möchtest du diese Komponente wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden."
                    ))
                      return;
                    try {
                      await deleteComponent({
                        componentId,
                        userId
                      });
                      closePanel();
                      window.location.reload();
                    } catch (err) {
                      console.error("Delete failed", err);
                      alert("Fehler beim Löschen der Komponente");
                    }
                  },
                  className: "flex items-center gap-1 text-sm font-bold transition px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50",
                  title: "Komponente löschen",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        }
                      )
                    }
                  )
                }
              ),
              handleTogglePublish && isOwnComponent && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    handleTogglePublish(selectedComponent._id);
                  },
                  className: `px-4 py-2 rounded-lg text-sm font-medium transition ${selectedComponent?.published ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600" : "bg-linear-to-r from-purple-600 to-purple-700 text-white hover:from-purple-500 hover:to-purple-600 border border-purple-500/50"}`,
                  children: selectedComponent?.published ? "Veröffentlichung aufheben" : "Veröffentlichen"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closePanel,
                  className: "text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-lg transition-colors text-xl font-bold",
                  children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            ComponentDetail,
            {
              component: selectedComponent,
              getLanguageBadgeColor,
              showPublishButton: !!handleTogglePublish,
              onTogglePublish: handleTogglePublish
            }
          )
        ]
      }
    )
  ] });
}

export { ComponentRenderer as C, ComponentPanel as a };

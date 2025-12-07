import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { a as api } from './Layout_oN0H7uQz.mjs';
import { HeartCrack, Heart } from 'lucide-react';

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
  viewportMode = "desktop"
}) {
  const iframeRef = React.useRef(null);
  React.useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;
    let htmlContent = "";
    let scripts = "";
    if (language === "html") {
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
  }, [code, language, css, viewportMode]);
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
  onToggleSave,
  isSaved,
  userId,
  onCopyComponent,
  getLanguageBadgeColor
}) {
  const [viewportMode, setViewportMode] = useState(
    "desktop"
  );
  const [viewMode, setViewMode] = useState("preview");
  const [isHoveringSave, setIsHoveringSave] = useState(false);
  if (!component) return null;
  const saveIcon = () => {
    if (isSaved) {
      if (isHoveringSave) {
        return /* @__PURE__ */ jsx(HeartCrack, { className: "w-8 h-8" });
      } else {
        return /* @__PURE__ */ jsx(Heart, { className: "w-8 h-8", fill: "#7f1d1d" });
      }
    } else {
      if (isHoveringSave) {
        return /* @__PURE__ */ jsx(Heart, { className: "w-8 h-8", fill: "#7f1d1d" });
      } else {
        return /* @__PURE__ */ jsx(Heart, { className: "w-8 h-8" });
      }
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "p-6 overflow-y-auto h-full bg-transparent component-panel",
      style: {
        animation: "fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1), slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 space-y-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
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
            component.user?.username && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
              "von",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-400 font-medium", children: component.user.username })
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
                  children: /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      className: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          }
                        )
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setViewMode("code"),
                  className: `p-2 rounded-lg transition-all duration-200 ${viewMode === "code" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
                  title: "Code-Ansicht",
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
                          d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                        }
                      )
                    }
                  )
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
                          d: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setViewportMode("desktop"),
                  className: `p-2 rounded-lg transition-all duration-200 ${viewportMode === "desktop" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
                  title: "Desktop-Ansicht",
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
                          d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            onToggleSave && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onToggleSave,
                disabled: !userId,
                className: "text-red-400 hover:text-red-300 transition-colors",
                title: userId ? isSaved ? "Unsave" : "Save" : "Login to save",
                onMouseEnter: () => setIsHoveringSave(true),
                onMouseLeave: () => setIsHoveringSave(false),
                children: saveIcon()
              }
            )
          ] })
        ] }) }),
        viewMode === "preview" ? /* @__PURE__ */ jsxs(
          "div",
          {
            className: `mt-4 border border-purple-800/30 rounded-xl overflow-hidden bg-gray-900/40 shadow-inner transition-all duration-300 flex items-center justify-center ${viewportMode === "mobile" ? "max-w-[600px] mx-auto h-[900px] relative" : "h-[600px] w-full"}`,
            children: [
              viewportMode === "mobile" && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none z-10", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-6 bg-gray-700 rounded-t-xl" }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-6 bg-gray-700 rounded-b-xl" })
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-full h-full transition-all duration-300 ${viewportMode === "mobile" ? "rounded-[2.5rem] scale-75 origin-top" : ""}`,
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
            component.css && /* @__PURE__ */ jsx("span", { className: "inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold border bg-pink-500/20 text-pink-400 border-pink-500/30", children: "CSS" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-4 max-h-[600px] overflow-y-auto", children: [
            component.css && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      }
                    )
                  }
                ),
                "CSS"
              ] }),
              /* @__PURE__ */ jsx("pre", { className: "bg-gray-950/50 p-4 rounded-lg border border-purple-800/20 overflow-x-auto", children: /* @__PURE__ */ jsx("code", { className: "text-sm text-gray-300 font-mono", children: component.css }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      }
                    )
                  }
                ),
                component.language.toUpperCase(),
                " Code"
              ] }),
              /* @__PURE__ */ jsx("pre", { className: "bg-gray-950/50 p-4 rounded-lg border border-purple-800/20 overflow-x-auto", children: /* @__PURE__ */ jsx("code", { className: "text-sm text-gray-300 font-mono whitespace-pre-wrap", children: component.code }) })
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
  handleTogglePublish
}) {
  const [panelVisible, setPanelVisible] = useState(false);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const componentId = selectedComponent?._id;
  const latestComponent = useQuery(
    api.components.getPublicComponentById,
    componentId ? { id: componentId } : "skip"
  ) || selectedComponent;
  const userProfile = useQuery(
    api.components.getUserProfile,
    latestComponent?.userId ? { userId: latestComponent.userId } : "skip"
  );
  const componentWithUser = {
    ...latestComponent,
    user: userProfile
  };
  const isOwnComponent = latestComponent?.userId === userId;
  const isSaved = useQuery(
    api.components.isSaved,
    userId && componentId ? { componentId, userId } : "skip"
  );
  const [localIsSaved, setLocalIsSaved] = useState(false);
  useEffect(() => {
    setLocalIsSaved(isSaved ?? false);
  }, [isSaved]);
  const isCopied = useQuery(
    api.components.isCopied,
    userId && componentId ? { componentId, userId } : "skip"
  );
  const [localIsCopied, setLocalIsCopied] = useState(false);
  useEffect(() => {
    setLocalIsCopied(isCopied ?? false);
  }, [isCopied]);
  const saveComponent = useMutation(api.components.saveComponent);
  const unsaveComponent = useMutation(api.components.unsaveComponent);
  const copyComponent = useMutation(api.components.copyComponent);
  useMutation(api.components.uncopyComponent);
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
  const handleToggleSave = async () => {
    if (!userId || !componentId) return;
    const newIsSaved = !localIsSaved;
    setLocalIsSaved(newIsSaved);
    try {
      if (newIsSaved) {
        await saveComponent({ componentId, userId });
      } else {
        await unsaveComponent({ componentId, userId });
      }
    } catch (err) {
      console.error("Save toggle failed:", err);
      setLocalIsSaved(!newIsSaved);
      alert(err.message || "Failed to save component");
    }
  };
  const handleCopyComponent = async () => {
    if (!userId || !componentId || localIsCopied) return;
    setLocalIsCopied(true);
    try {
      await copyComponent({ componentId, userId });
    } catch (err) {
      console.error("Copy failed:", err);
      setLocalIsCopied(false);
      alert(err.message || "Failed to copy component");
    }
  };
  if (!selectedComponent) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-500 ease-out ${panelVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`,
        onClick: closePanel,
        style: {
          transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed top-0 right-0 h-full w-[85%] max-w-4xl bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 backdrop-blur-md shadow-2xl shadow-purple-900/30 z-50 component-panel rounded-l-3xl ${panelVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`,
        style: {
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform, opacity",
          borderLeft: "1px solid rgba(147, 51, 234, 0.1)"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-6 flex justify-between items-center text-black border-b border-gray-200", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: latestComponent.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-sm font-bold text-red-900", children: [
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    className: "w-5 h-5",
                    children: [
                      /* @__PURE__ */ jsx("rect", { width: "24", height: "24", fill: "none" }),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M13.5 20c-6.6-6.1-10-9.2-10-12.9C3.5 4 5.9 1.6 9 1.6c1.7 0 3.4.8 4.5 2.1c1.1-1.3 2.8-2.1 4.5-2.1c3.1 0 5.5 2.4 5.5 5.5c0 3.8-3.4 6.9-10 12.9M12 21.1C5.4 15.2 1.5 11.7 1.5 7v-.6c-.6.9-1 2-1 3.2c0 3.8 3.4 6.9 10 12.8z",
                          "stroke-width": "0.5",
                          stroke: "currentColor"
                        }
                      )
                    ]
                  }
                ),
                latestComponent.saveCount || 0
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-1 text-sm font-bold text-blue-900", children: [
                /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    className: "w-5 h-5",
                    children: [
                      /* @__PURE__ */ jsx("rect", { width: "24", height: "24", fill: "none" }),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M4 7H2v14c0 1.1.9 2 2 2h14v-2H4M20 3h-3.2c-.4-1.2-1.5-2-2.8-2s-2.4.8-2.8 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 0c.6 0 1 .5 1 1s-.5 1-1 1s-1-.5-1-1s.4-1 1-1m-1.7 12.1L9 11.8l1.4-1.4l1.9 1.9L17.6 7L19 8.4",
                          "stroke-width": "0.5",
                          stroke: "currentColor"
                        }
                      )
                    ]
                  }
                ),
                latestComponent.copyCount || 0
              ] }),
              handleTogglePublish && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleTogglePublish(selectedComponent._id),
                  className: `px-4 py-2 rounded-lg text-sm font-medium transition ${latestComponent?.published ? "bg-gray-300 text-black hover:bg-gray-400" : "bg-green-600 text-white hover:bg-green-500"}`,
                  children: latestComponent?.published ? "Unpublish" : "Publish"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closePanel,
                  className: "text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-lg transition-colors text-xl font-bold",
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
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            ComponentDetail,
            {
              component: componentWithUser,
              onToggleSave: isOwnComponent ? void 0 : handleToggleSave,
              isSaved: localIsSaved,
              userId,
              onCopyComponent: isOwnComponent ? void 0 : handleCopyComponent,
              getLanguageBadgeColor
            }
          )
        ]
      }
    )
  ] });
}

export { ComponentRenderer as C, ComponentPanel as a };

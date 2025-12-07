import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_LM7goxkt.mjs';
import 'piccolore';
import { a as api, $ as $$Layout } from '../../chunks/Layout_oN0H7uQz.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery, ConvexReactClient, ConvexProvider } from 'convex/react';
import * as jdenticon from 'jdenticon';
import { C as ComponentRenderer, a as ComponentPanel } from '../../chunks/ComponentPanel_DnvNnCRo.mjs';
export { renderers } from '../../renderers.mjs';

function DashboardLayout({
  username,
  profileUsername,
  isOwnProfile,
  currentPage,
  setCurrentPage,
  onLogout,
  topRightExtra,
  children
}) {
  const displayUsername = profileUsername || username;
  const [avatarSvg, setAvatarSvg] = useState(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarSvg(jdenticon.toSvg(displayUsername, 32));
    }, 200);
    return () => clearTimeout(timer);
  }, [displayUsername]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20", children: [
    /* @__PURE__ */ jsxs("aside", { className: "fixed left-0 top-0 h-full w-64 border-r-2 border-purple-900/50 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl shadow-purple-900/30", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 border-b-2 border-purple-800/40 bg-gradient-to-br from-gray-800 via-purple-900/20 to-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-300 font-medium flex items-center", children: [
        avatarSvg ? /* @__PURE__ */ jsx(
          "div",
          {
            className: "inline-block w-7 h-7 rounded-full mr-2 shadow-lg shadow-purple-500/30",
            dangerouslySetInnerHTML: { __html: avatarSvg }
          }
        ) : /* @__PURE__ */ jsx("div", { className: "inline-block w-7 h-7 rounded-full bg-gray-700 animate-pulse mr-2" }),
        avatarSvg ? /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent", children: displayUsername }) : /* @__PURE__ */ jsx("div", { className: "h-3 w-20 bg-gray-700 animate-pulse rounded" })
      ] }) }),
      /* @__PURE__ */ jsxs("nav", { className: "p-4 space-y-2 mt-2", children: [
        isOwnProfile && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setCurrentPage("components"),
            className: `w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${currentPage === "components" ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]" : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"}`,
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
                      d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "Komponenten" })
            ]
          }
        ),
        isOwnProfile && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setCurrentPage("saved"),
            className: `w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${currentPage === "saved" ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]" : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"}`,
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
                      d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "Gespeichert" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setCurrentPage("published"),
            className: `w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${currentPage === "published" ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]" : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"}`,
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
                      d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "Veröffentlicht" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setCurrentPage("discover"),
            className: `w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${currentPage === "discover" ? "bg-gradient-to-r from-purple-600/40 via-purple-600/30 to-purple-700/40 text-white font-semibold border-2 border-purple-500/60 shadow-xl shadow-purple-500/40 transform scale-[1.02]" : "text-gray-400 hover:bg-purple-900/30 hover:text-purple-300 hover:border-purple-700/40 border border-transparent hover:shadow-md hover:shadow-purple-900/20"}`,
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
                      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "Entdecken" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ml-64", children: [
      /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-10 bg-gray-800/80 backdrop-blur-md border-b border-purple-800/30 shadow-lg shadow-black/20", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-8 h-16", children: [
        /* @__PURE__ */ jsx("div", { className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 font-bold text-xl", children: "OpenUI" }),
        isOwnProfile ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onLogout,
              className: "text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all duration-200 cursor-pointer border border-transparent hover:border-purple-800/50",
              children: "Abmelden"
            }
          ) }),
          topRightExtra
        ] }) : /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: topRightExtra })
      ] }) }),
      /* @__PURE__ */ jsx("main", { className: "p-8 min-h-screen", children })
    ] })
  ] });
}

function ComponentsSearchBar({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 max-w-md relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Nach Titel suchen...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "w-full pl-12 pr-4 py-3 bg-gray-800/60 backdrop-blur-sm text-white border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none placeholder-gray-500 transition-all hover:border-purple-700/50"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-xl p-1", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setViewMode("grid"),
          className: `p-2.5 rounded-lg transition-all duration-200 ${viewMode === "grid" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
          title: "Rasteransicht",
          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }) })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setViewMode("list"),
          className: `p-2.5 rounded-lg transition-all duration-200 ${viewMode === "list" ? "bg-purple-600/30 text-purple-300 shadow-lg shadow-purple-500/20" : "text-gray-400 hover:text-white hover:bg-gray-700/50"}`,
          title: "Listenansicht",
          children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] })
  ] });
}

function ComponentsView({
  components,
  filteredComponents,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  onCreateClick,
  onSelectComponent,
  getLanguageBadgeColor,
  currentPage,
  handleTogglePublish,
  selectedComponent,
  setSelectedComponent
}) {
  const [panelVisible, setPanelVisible] = useState(false);
  const handleSelect = (component) => {
    setSelectedComponent(component);
  };
  useEffect(() => {
    if (selectedComponent) {
      const id = setTimeout(() => setPanelVisible(true), 10);
      return () => clearTimeout(id);
    }
  }, [selectedComponent]);
  const closePanel = () => {
    setSelectedComponent(null);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 -z-10 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-8 relative", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4 mb-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "text-3xl md:text-4xl font-serif mb-2 bg-gradient-to-r from-white via-purple-300 to-purple-400 bg-clip-text text-transparent",
            style: { fontFamily: "'Playfair Display', serif" },
            children: currentPage === "components" ? "Komponenten" : currentPage === "saved" ? "Gespeicherte Komponenten" : currentPage === "published" ? "Veröffentlichte Komponenten" : "Alle Komponenten entdecken"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm md:text-base", children: currentPage === "discover" ? "Durchstöbere alle veröffentlichten Komponenten" : "Deine Komponenten-Bibliothek und Vorschauen" })
      ] }),
      currentPage === "components" && onCreateClick && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onCreateClick,
          className: "px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full text-sm font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-105 active:scale-95 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) }),
            "Komponente erstellen"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      ComponentsSearchBar,
      {
        viewMode,
        setViewMode,
        searchQuery,
        setSearchQuery
      }
    ),
    (filteredComponents?.length ?? 0) === 0 ? /* @__PURE__ */ jsx("div", { className: "text-gray-400 text-center mt-10 py-12", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 max-w-md mx-auto", children: /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Keine Komponenten gefunden." }) }) }) : viewMode === "grid" ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 pb-8", children: filteredComponents.map((component) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => handleSelect(component),
        className: "group bg-gray-800/90 backdrop-blur-sm border border-purple-800/40 rounded-xl overflow-hidden hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 ease-out cursor-pointer transform hover:-translate-y-1 active:scale-[0.98]",
        style: {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-5 bg-gradient-to-b from-gray-800/80 to-transparent", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white group-hover:text-purple-300 transition-colors", children: component.name }),
              /* @__PURE__ */ jsx("button", { className: "opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white p-1", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" }) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
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
                "von ",
                /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: component.user.username })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-purple-800/20 bg-gray-900/40 h-64 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full scale-95 group-hover:scale-100 transition-transform duration-300", children: /* @__PURE__ */ jsx(
            ComponentRenderer,
            {
              code: component.code,
              css: component.css,
              language: component.language
            }
          ) }) })
        ]
      },
      component._id
    )) }) : /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-3 pb-8", children: filteredComponents.map((component) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => handleSelect(component),
        className: "group p-5 bg-gray-800/90 backdrop-blur-sm border border-purple-800/40 rounded-xl hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ease-out cursor-pointer flex items-center justify-between active:scale-[0.98]",
        style: {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2", children: component.name }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
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
                "von ",
                /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: component.user.username })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-48 h-24 border border-purple-800/30 rounded-lg overflow-hidden bg-gray-900/40 ml-4 group-hover:border-purple-500/50 transition-colors", children: /* @__PURE__ */ jsx(
            ComponentRenderer,
            {
              code: component.code,
              css: component.css,
              language: component.language
            }
          ) })
        ]
      },
      component._id
    )) }),
    /* @__PURE__ */ jsx(
      ComponentPanel,
      {
        selectedComponent,
        onClose: closePanel,
        getLanguageBadgeColor,
        handleTogglePublish
      }
    )
  ] });
}

function CreateComponentPage({
  newComponent,
  onChange,
  onSubmit,
  onCancel,
  getLanguageBadgeColor
}) {
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 bg-gray-900 z-40 overflow-y-auto text-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-1 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onCancel,
              className: "text-sm text-gray-300 hover:text-purple-400 transition-colors mb-4 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx("span", { children: "←" }),
                /* @__PURE__ */ jsx("span", { children: "Zurück zum Dashboard" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "h2",
            {
              className: "text-4xl font-semibold text-white mb-3",
              style: { fontFamily: "'Playfair Display', serif" },
              children: [
                "Erstelle eine ",
                /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "Komponente" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-lg leading-relaxed", children: "Baue deine Komponente und sieh eine Live-Vorschau, während du tippst." })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Komponentenname" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: newComponent.name,
                onChange: (e) => onChange("name", e.target.value),
                placeholder: "e.g., Pricing Hero",
                required: true,
                className: "w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all hover:border-purple-700/50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Sprache" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: newComponent.language,
                onChange: (e) => onChange("language", e.target.value),
                className: "w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all hover:border-purple-700/50",
                children: [
                  /* @__PURE__ */ jsx("option", { className: "text-orange-100 bg-orange-800", value: "html", children: "HTML" }),
                  /* @__PURE__ */ jsx("option", { className: "text-blue-100 bg-blue-800", value: "jsx", children: "JSX" }),
                  /* @__PURE__ */ jsx("option", { className: "text-green-100 bg-green-800", value: "vue", children: "Vue" }),
                  /* @__PURE__ */ jsx("option", { className: "text-purple-100 bg-purple-800", value: "astro", children: "Astro" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "CSS (optional)" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: newComponent.css,
                onChange: (e) => onChange("css", e.target.value),
                placeholder: ".card { background: white; }",
                className: "w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-28 font-mono text-sm transition-all hover:border-purple-700/50 resize-y"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Code" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: newComponent.code,
                onChange: (e) => onChange("code", e.target.value),
                placeholder: "<section>...</section>",
                required: true,
                className: "w-full px-4 py-3 text-white bg-gray-800/60 backdrop-blur-sm border border-purple-800/30 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none min-h-60 font-mono text-sm transition-all hover:border-purple-700/50 resize-y"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400 mt-2 flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { children: "💡" }),
              /* @__PURE__ */ jsx("span", { children: "Tipp: Die Vorschau rechts aktualisiert sich live während du tippst." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                className: "flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105",
                children: "Komponente speichern"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onCancel,
                className: "px-6 py-3 border border-purple-800/30 rounded-xl text-sm font-medium text-gray-300 hover:bg-purple-900/20 hover:text-purple-400 hover:border-purple-700/50 transition-all",
                children: "Abbrechen"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6 shadow-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-white mb-1", children: "Live-Vorschau" }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
              "Rendert ",
              newComponent.language.toUpperCase()
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${getLanguageBadgeColor(newComponent.language)}`,
              children: newComponent.language.toUpperCase()
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border border-purple-800/20 rounded-xl bg-gray-900/50 backdrop-blur-sm overflow-hidden min-h-[500px] shadow-inner", children: /* @__PURE__ */ jsx(
          ComponentRenderer,
          {
            code: newComponent.code,
            language: newComponent.language,
            css: newComponent.css
          }
        ) })
      ] }) })
    ] }) })
  ] });
}

function App({ profileId }) {
  const [userId, setUserId] = React.useState(
    () => typeof window !== "undefined" ? localStorage.getItem("userId") : null
  );
  const isOwnProfile = profileId === userId || !profileId;
  const queryUserId = profileId || userId;
  const [username, setUsername] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState("components");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState("grid");
  const [selectedComponent, setSelectedComponent] = React.useState(null);
  const [showCreatePage, setShowCreatePage] = React.useState(false);
  const [newComponent, setNewComponent] = React.useState({
    name: "",
    language: "html",
    css: "",
    code: "<div class='p-6 text-center'>Start building your component...</div>"
  });
  const createComponent = useMutation(api.components.createComponent);
  useMutation(api.components.saveComponent);
  const publishComponent = useMutation(api.components.publishComponent);
  const unpublishComponent = useMutation(api.components.unpublishComponent);
  const allComponents = useQuery(
    api.components.getComponents,
    queryUserId ? { userId: queryUserId } : "skip"
  );
  const savedComponents = useQuery(
    api.components.getSavedComponents,
    queryUserId ? { userId: queryUserId } : "skip"
  );
  const publishedComponents = useQuery(
    api.components.getPublishedComponents,
    queryUserId ? { userId: queryUserId } : "skip"
  );
  const allPublicComponents = useQuery(api.components.getPublicComponents);
  const profileUser = useQuery(
    api.components.getUserById,
    profileId ? { id: profileId } : "skip"
  );
  const getCurrentComponents = () => {
    if (!isOwnProfile) return publishedComponents;
    if (currentPage === "saved") return savedComponents;
    if (currentPage === "published") return publishedComponents;
    if (currentPage === "discover") return allPublicComponents;
    return allComponents;
  };
  const components = getCurrentComponents();
  const filteredComponents = React.useMemo(() => {
    if (!components || !searchQuery) return components || [];
    return components.filter(
      (comp) => comp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [components, searchQuery]);
  const getLanguageBadgeColor = (lang) => {
    switch (lang) {
      case "html":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "jsx":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "vue":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "astro":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };
  const handleTogglePublish = async (componentId) => {
    if (!selectedComponent || selectedComponent._id !== componentId) return;
    const newPublished = !selectedComponent.published;
    setSelectedComponent({ ...selectedComponent, published: newPublished });
    try {
      if (newPublished) {
        await publishComponent({ componentId });
      } else {
        await unpublishComponent({ componentId });
      }
    } catch (err) {
      console.error("Toggle failed, reverting...", err);
      setSelectedComponent(
        (prev) => prev?._id === componentId ? { ...prev, published: !prev.published } : prev
      );
    }
  };
  const handleCreateSubmit = (e) => {
    if (e) e.preventDefault();
    if (!userId) return;
    createComponent({
      name: newComponent.name,
      language: newComponent.language,
      css: newComponent.css || void 0,
      code: newComponent.code,
      userId
    });
    setShowCreatePage(false);
    setNewComponent({
      name: "",
      language: "html",
      css: "",
      code: "<div class='p-6 text-center'>Start building your component...</div>"
    });
  };
  const handleNewComponentChange = (field, value) => setNewComponent((prev) => ({ ...prev, [field]: value }));
  const canTogglePublish = isOwnProfile && currentPage !== "saved";
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    DashboardLayout,
    {
      username,
      profileUsername: profileUser?.username,
      isOwnProfile,
      currentPage,
      setCurrentPage,
      onLogout: () => {
        if (typeof window !== "undefined") {
          localStorage.clear();
          setUserId(null);
          setUsername("");
          requestAnimationFrame(() => window.location.href = "/");
        }
      },
      topRightExtra: null,
      children: [
        /* @__PURE__ */ jsx(
          ComponentsView,
          {
            components,
            filteredComponents,
            viewMode,
            setViewMode,
            searchQuery,
            setSearchQuery,
            ...isOwnProfile && {
              onCreateClick: () => {
                setShowCreatePage(true);
                setNewComponent({
                  name: "",
                  language: "html",
                  css: "",
                  code: "<div class='p-6 text-center'>Start building your component...</div>"
                });
              }
            },
            onSelectComponent: (c) => setSelectedComponent(c),
            getLanguageBadgeColor,
            currentPage,
            selectedComponent,
            setSelectedComponent,
            handleTogglePublish: canTogglePublish ? handleTogglePublish : void 0
          }
        ),
        showCreatePage && /* @__PURE__ */ jsx(
          CreateComponentPage,
          {
            newComponent,
            onChange: handleNewComponentChange,
            onSubmit: handleCreateSubmit,
            onCancel: () => setShowCreatePage(false),
            getLanguageBadgeColor
          }
        )
      ]
    }
  ) });
}

function Main({ userId }) {
  const [client, setClient] = useState(null);
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient("https://grateful-dodo-887.convex.cloud");
      setClient(convex);
      initializedRef.current = true;
    }
  }, []);
  if (!client) {
    return null;
  }
  return /* @__PURE__ */ jsx(ConvexProvider, { client, children: /* @__PURE__ */ jsx(App, { profileId: userId }) });
}

const $$Astro = createAstro();
const $$userId = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$userId;
  const { userId } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, { "userId": userId, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/ferdi/OpenUI/src/components/main", "client:component-export": "default" })} ` })}`;
}, "/home/ferdi/OpenUI/src/pages/u/[userId].astro", void 0);

const $$file = "/home/ferdi/OpenUI/src/pages/u/[userId].astro";
const $$url = "/u/[userId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$userId,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

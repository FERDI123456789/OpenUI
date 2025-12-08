import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_LM7goxkt.mjs';
import 'piccolore';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ConvexReactClient, ConvexProvider, useQuery } from 'convex/react';
import { a as api } from '../chunks/api__xwehwR1.mjs';
import { C as ComponentRenderer, a as ComponentPanel } from '../chunks/ComponentPanel_CzfS3oCB.mjs';
import { $ as $$Layout } from '../chunks/Layout_3ZPWPviJ.mjs';
export { renderers } from '../renderers.mjs';

const navItems = [];
const MenuIconPlaceholder = () => /* @__PURE__ */ jsx("span", { className: "text-xl", children: "☰" });
const XIconPlaceholder = () => /* @__PURE__ */ jsx("span", { className: "text-xl", children: "✕" });
function NavbarWrapper() {
  const [client, setClient] = useState(null);
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient("https://friendly-labrador-327.convex.cloud");
      setClient(convex);
      initializedRef.current = true;
    }
  }, []);
  if (!client) return null;
  return /* @__PURE__ */ jsx(ConvexProvider, { client, children: /* @__PURE__ */ jsx(Navbar, {}) });
}
function Navbar({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);
  const toggleMenu = () => setIsOpen(!isOpen);
  return /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-purple-800/30", children: /* @__PURE__ */ jsxs("nav", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-20", children: [
      /* @__PURE__ */ jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "text-2xl font-bold text-purple-400 hover:text-purple-300 transition-colors duration-300",
          children: "OpenUI"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
        navItems.map((item) => /* @__PURE__ */ jsx(
          "a",
          {
            href: item.href,
            className: "text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20",
            children: item.name
          },
          item.name
        )),
        userId ? /* @__PURE__ */ jsx(
          "a",
          {
            href: `/u`,
            className: "bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30",
            children: "Dashboard"
          }
        ) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/u`,
              className: "text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20",
              children: "Anmelden"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/u`,
              className: "bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30",
              children: "Registrieren"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleMenu,
          className: "text-gray-300 hover:text-purple-400 p-2 rounded-md transition-colors duration-300",
          "aria-label": "Toggle menu",
          children: isOpen ? /* @__PURE__ */ jsx(XIconPlaceholder, {}) : /* @__PURE__ */ jsx(MenuIconPlaceholder, {})
        }
      ) })
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden pb-4 border-t border-purple-800/30 mt-2 pt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      navItems.map((item) => /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href,
          onClick: toggleMenu,
          className: "text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20",
          children: item.name
        },
        item.name
      )),
      userId ? /* @__PURE__ */ jsx(
        "a",
        {
          href: `/u`,
          onClick: toggleMenu,
          className: "bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 mt-2 text-center",
          children: "Dashboard"
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/u`,
            onClick: toggleMenu,
            className: "text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-purple-900/20 text-left",
            children: "Log In"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `/u`,
            onClick: toggleMenu,
            className: "bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 mt-2 text-center",
            children: "Sign Up"
          }
        )
      ] })
    ] }) })
  ] }) });
}

function PublicComponentsList() {
  const publicComponents = useQuery(api.components.getPublicComponents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const languages = useMemo(() => {
    if (!publicComponents) return [];
    const langs = Array.from(
      new Set(publicComponents.map((c) => c.language))
    );
    return langs;
  }, [publicComponents]);
  const filteredComponents = useMemo(() => {
    if (!publicComponents) return [];
    return publicComponents.filter((component) => {
      const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(component.language);
      return matchesSearch && matchesLanguage;
    });
  }, [publicComponents, searchQuery, selectedLanguages]);
  const getLanguageBadgeColor = (lang) => {
    switch (lang) {
      case "html":
        return "bg-orange-100 text-orange-800";
      case "css":
        return "bg-blue-100 text-blue-800";
      case "javascript":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  if (!publicComponents) {
    return /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-500", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-10 bg-gray-200 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-40 bg-gray-200 rounded" }),
      /* @__PURE__ */ jsx("div", { className: "h-40 bg-gray-200 rounded" })
    ] }) });
  }
  if (publicComponents.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-500 text-center", children: "Keine öffentlichen Komponenten verfügbar." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex text-black bg-orange-100 h-screen p-3", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-64 flex-shrink-0 border border-gray-200 p-4 bg-white rounded-xl shadow-xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-4", children: "Filter Components" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-medium mb-2", children: "Languages" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: languages.map((lang) => /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: selectedLanguages.includes(lang),
              onChange: (e) => {
                if (e.target.checked) {
                  setSelectedLanguages([...selectedLanguages, lang]);
                } else {
                  setSelectedLanguages(
                    selectedLanguages.filter((l) => l !== lang)
                  );
                }
              }
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "capitalize", children: lang })
        ] }, lang)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-full mt-10 px-10", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-bold text-3xl mb-2", children: "UI Komponenten" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by name...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "w-96 mb-4 px-3 py-2 border border-orange-200 shadow-md bg-white rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [
        filteredComponents.map((component) => /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => setSelectedComponent(component),
            className: "block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",
            children: /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-1", children: component.name }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-red-700 mt-1 inline font-bold", children: [
                      /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          className: "w-5 h-5 inline mb-0.5 mr-1",
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
                      component.saveCount || 0
                    ] }),
                    /* @__PURE__ */ jsxs("p", { className: "text-sm text-blue-700 mt-1 inline ml-3 font-bold", children: [
                      /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          className: "w-5 h-5 inline mb-0.5 mr-1",
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
                      component.copyCount || 0
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageBadgeColor(
                      component.language
                    )}`,
                    children: component.language.toUpperCase()
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 border border-gray-200 rounded overflow-hidden h-64", children: /* @__PURE__ */ jsx(
                ComponentRenderer,
                {
                  code: component.code,
                  language: component.language,
                  css: component.css
                }
              ) })
            ] })
          },
          component._id
        )),
        filteredComponents.length === 0 && /* @__PURE__ */ jsx("div", { className: "col-span-full text-center text-gray-500", children: "No components found for your search/filter criteria." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ComponentPanel,
      {
        selectedComponent,
        setSelectedComponent,
        onClose: () => setSelectedComponent(null),
        getLanguageBadgeColor,
        onComponentUpdate: (updatedComponent) => {
          setSelectedComponent(updatedComponent);
        }
      }
    )
  ] });
}

function PubKompWrapper() {
  const [client, setClient] = useState(null);
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient("https://friendly-labrador-327.convex.cloud");
      setClient(convex);
      initializedRef.current = true;
    }
  }, []);
  if (!client) return null;
  return /* @__PURE__ */ jsx(ConvexProvider, { client, children: /* @__PURE__ */ jsx(PublicComponentsList, {}) });
}

const $$Komponenten = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", NavbarWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/ferdi/OpenUI/src/components/Navbar", "client:component-export": "default" })} ${renderComponent($$result2, "PubKompWrapper", PubKompWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/ferdi/OpenUI/src/components/PubKompWrapper", "client:component-export": "default" })} ` })}`;
}, "/home/ferdi/OpenUI/src/pages/komponenten.astro", void 0);

const $$file = "/home/ferdi/OpenUI/src/pages/komponenten.astro";
const $$url = "/komponenten";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Komponenten,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

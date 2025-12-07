import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_LM7goxkt.mjs';
import 'piccolore';
import { a as api, $ as $$Layout } from '../chunks/Layout_oN0H7uQz.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { ConvexReactClient, ConvexProvider, useQuery } from 'convex/react';
import { C as ComponentRenderer, a as ComponentPanel } from '../chunks/ComponentPanel_DnvNnCRo.mjs';
/* empty css                                 */
import { N as NavbarWrapper } from '../chunks/Navbar_4ZcT63VY.mjs';
export { renderers } from '../renderers.mjs';

function LandingPageWrapper() {
  const [client, setClient] = useState(null);
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient("https://grateful-dodo-887.convex.cloud");
      setClient(convex);
      initializedRef.current = true;
    }
  }, []);
  if (!client) return null;
  return /* @__PURE__ */ jsx(ConvexProvider, { client, children: /* @__PURE__ */ jsx(LandingPage, {}) });
}
function LandingPage() {
  const publicComponents = useQuery(api.components.getPublicComponents);
  const [selectedComponent, setSelectedComponent] = useState(null);
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
  const closePanel = () => {
    setSelectedComponent(null);
  };
  return /* @__PURE__ */ jsxs("main", { className: "relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center relative z-10 w-full mb-20", children: [
      /* @__PURE__ */ jsxs(
        "h1",
        {
          className: "text-5xl md:text-6xl max-w-4xl lg:text-6xl font-serif mb-6 leading-tight mx-auto",
          style: { fontFamily: "'Playfair Display', serif" },
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-rotate", children: /* @__PURE__ */ jsxs("span", { className: "justify-items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "Organisierung" }),
              /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "Inspirationen" })
            ] }) }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "Für deine Komponenten mit" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "OpenUI" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed mx-auto", children: "Streamline your component development with seamless automation for every custom UI, tailored by OpenUI." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: /* @__PURE__ */ jsx("button", { className: "bg-purple-600 text-white px-8 py-4 rounded-full font-medium hover:bg-purple-500 transition-all duration-300 text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105", children: "Start for free" }) })
    ] }),
    publicComponents === void 0 ? /* @__PURE__ */ jsx("div", { className: "relative z-10 mt-32", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-gray-800/40 backdrop-blur-sm border border-purple-800/20 rounded-2xl overflow-hidden animate-pulse",
        children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-5 bg-gray-700/50 rounded w-3/4 mb-4" }),
          /* @__PURE__ */ jsx("div", { className: "h-56 bg-gray-700/50 rounded-lg" })
        ] })
      },
      i
    )) }) }) : publicComponents.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "relative z-10 mt-40", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs(
          "h2",
          {
            className: "text-4xl md:text-5xl font-serif text-white mb-4",
            style: { fontFamily: "'Playfair Display', serif" },
            children: [
              "Entdecke unsere",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "Komponenten" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg max-w-2xl mx-auto", children: "Durchstöbere unsere Sammlung von hochgeladenen UI-Komponenten" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: publicComponents.map((component) => /* @__PURE__ */ jsx(
        "div",
        {
          onClick: () => setSelectedComponent(component),
          className: "group bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl overflow-hidden hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer active:scale-[0.98]",
          style: {
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          },
          children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white group-hover:text-purple-400 transition-colors pr-2 flex-1", children: component.name }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border shrink-0 ${getLanguageBadgeColor(
                    component.language
                  )}`,
                  children: component.language.toUpperCase()
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-5 border border-gray-700/50 rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm h-56 shadow-inner", children: /* @__PURE__ */ jsx(
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
      )) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "relative z-10 mt-40 text-center py-20", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-12 max-w-md mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg mb-2", children: "Noch keine Komponenten verfügbar" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Sei der Erste und teile deine Komponente!" })
    ] }) }),
    /* @__PURE__ */ jsx(
      ComponentPanel,
      {
        selectedComponent,
        onClose: closePanel,
        getLanguageBadgeColor
      }
    )
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", NavbarWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/ferdi/OpenUI/src/components/Navbar", "client:component-export": "default" })} ${renderComponent($$result2, "LandingPage", LandingPageWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/ferdi/OpenUI/src/components/LandingPage", "client:component-export": "default" })} ` })}`;
}, "/home/ferdi/OpenUI/src/pages/index.astro", void 0);

const $$file = "/home/ferdi/OpenUI/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { ConvexReactClient, ConvexProvider } from 'convex/react';

const navItems = [{ name: "Docs", href: "#docs" }];
const MenuIconPlaceholder = () => /* @__PURE__ */ jsx("span", { className: "text-xl", children: "☰" });
const XIconPlaceholder = () => /* @__PURE__ */ jsx("span", { className: "text-xl", children: "✕" });
function NavbarWrapper() {
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

export { NavbarWrapper as N };

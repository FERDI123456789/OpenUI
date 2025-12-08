import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_LM7goxkt.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_3ZPWPviJ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { useMutation, ConvexReactClient, ConvexProvider } from 'convex/react';
import { a as api } from '../chunks/api__xwehwR1.mjs';
export { renderers } from '../renderers.mjs';

function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const signupMutation = useMutation(api.auth.signup);
  const loginMutation = useMutation(api.auth.login);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      window.location.href = `/u/${userId}`;
    }
  }, []);
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError(null);
    const form = e.currentTarget;
    const usernameInput = form.elements.namedItem(
      "username"
    );
    const passwordInput = form.elements.namedItem(
      "password"
    );
    try {
      const result = isSignup ? await signupMutation({
        username: usernameInput.value,
        password: passwordInput.value
      }) : await loginMutation({
        username: usernameInput.value,
        password: passwordInput.value
      });
      if (result.userId) {
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("username", result.username);
        window.location.href = `/u/${result.userId}`;
      }
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Authentication failed"
      );
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 -z-10 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-purple-900/30 border border-purple-800/30 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50", children: /* @__PURE__ */ jsx("svg", { className: "w-7 h-7 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" }) }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent", children: "OpenUI" })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-2 text-white", children: isSignup ? "Registrieren" : "Anmelden" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: isSignup ? "Erstelle dein Konto, um zu beginnen" : "Willkommen zurück! Bitte melde dich an" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAuth, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Benutzername" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              name: "username",
              required: true,
              className: "w-full px-4 py-3 bg-gray-900/60 backdrop-blur-sm border border-purple-800/30 rounded-xl outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all hover:border-purple-700/50",
              placeholder: "Gib deinen Benutzernamen ein"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2 text-gray-300", children: "Passwort" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: showPassword ? "text" : "password",
                name: "password",
                required: true,
                className: "w-full px-4 py-3 pr-12 bg-gray-900/60 backdrop-blur-sm border border-purple-800/30 rounded-xl outline-none text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all hover:border-purple-700/50",
                placeholder: "Gib dein Passwort ein"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors",
                title: showPassword ? "Passwort verstecken" : "Passwort anzeigen",
                children: showPassword ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" }) }) : /* @__PURE__ */ jsxs("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                  /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })
                ] })
              }
            )
          ] })
        ] }),
        authError && /* @__PURE__ */ jsx("div", { className: "bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm backdrop-blur-sm", children: authError }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-[1.02] active:scale-[0.98]",
            children: isSignup ? "Registrieren" : "Anmelden"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsSignup(!isSignup),
            className: "w-full text-gray-400 hover:text-purple-400 text-sm mt-2 transition-colors",
            children: isSignup ? "Bereits ein Konto? Anmelden" : "Noch kein Konto? Registrieren"
          }
        )
      ] })
    ] })
  ] });
}

function AuthWrapper() {
  const [client, setClient] = useState(null);
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    const url = "https://friendly-labrador-327.convex.cloud";
    const convex = new ConvexReactClient(url);
    setClient(convex);
    initializedRef.current = true;
  }, []);
  if (!client) return null;
  return /* @__PURE__ */ jsx(ConvexProvider, { client, children: /* @__PURE__ */ jsx(AuthPage, {}) });
}

const $$U = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AuthWrapper", AuthWrapper, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/ferdi/OpenUI/src/components/AuthWrapper", "client:component-export": "default" })} ` })}`;
}, "/home/ferdi/OpenUI/src/pages/u.astro", void 0);

const $$file = "/home/ferdi/OpenUI/src/pages/u.astro";
const $$url = "/u";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$U,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

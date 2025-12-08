import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_LM7goxkt.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_3ZPWPviJ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/ferdi/OpenUI/src/components/Navbar", "client:component-export": "default" })} ${renderComponent($$result2, "LandingPage", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/ferdi/OpenUI/src/components/LandingPage", "client:component-export": "default" })} ` })}`;
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

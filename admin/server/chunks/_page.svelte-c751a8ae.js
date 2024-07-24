import { c as create_ssr_component, v as validate_component } from './ssr-b2a2419a.js';

const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="max-w-7xl mx-auto" data-svelte-h="svelte-15ikrll"><h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1></div> <div class="max-w-7xl mx-auto" data-svelte-h="svelte-2vvouk"><div class="py-4"><div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div></div></div>`;
});
const css = {
  code: "html{background-color:#f3f4f6}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Dashboard, "Dashboard").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c751a8ae.js.map

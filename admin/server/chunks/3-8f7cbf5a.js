async function load({ fetch }) {
  const res = await fetch(`http://localhost:3000/api/v1/orders`);
  const orders = await res.json();
  return { orders };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-1a4c0053.js')).default;
const server_id = "src/routes/orders/+page.server.js";
const imports = ["_app/immutable/nodes/3.8935e748.js","_app/immutable/chunks/scheduler.fdc38835.js","_app/immutable/chunks/index.fdeae3e0.js","_app/immutable/chunks/each.a0137068.js","_app/immutable/chunks/fa.e788405d.js","_app/immutable/chunks/FlatToast.svelte_svelte_type_style_lang.f125988b.js","_app/immutable/chunks/index.e3f73695.js"];
const stylesheets = ["_app/immutable/assets/fa.95b16411.css","_app/immutable/assets/FlatToast.1898e54d.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-8f7cbf5a.js.map

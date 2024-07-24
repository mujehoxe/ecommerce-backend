async function load({ fetch }) {
  const res = await fetch(`http://localhost:3000/api/v1/products?pageSize=9`);
  const products = await res.json();
  return { products };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-8273e26d.js')).default;
const server_id = "src/routes/products/+page.server.js";
const imports = ["_app/immutable/nodes/4.2c30e809.js","_app/immutable/chunks/scheduler.fdc38835.js","_app/immutable/chunks/index.fdeae3e0.js","_app/immutable/chunks/each.a0137068.js","_app/immutable/chunks/fa.e788405d.js","_app/immutable/chunks/Image.c7f928ad.js"];
const stylesheets = ["_app/immutable/assets/fa.95b16411.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=4-6519657b.js.map

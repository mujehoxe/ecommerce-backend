async function load({ fetch }) {
  const res = await fetch(`http://localhost:3000/api/v1/categories`);
  const categories = await res.json();
  return { categories };
}
const actions = {
  create: async ({ fetch, request }) => {
    try {
      const formData = await request.formData();
      const data = new FormData();
      formData.forEach((value, key) => {
        if (value !== "" && value.size !== 0)
          data.append(key, value);
      });
      const res = await fetch("http://localhost:3000/api/v1/products/", {
        method: "POST",
        body: data
      });
      if (!res.ok) {
        console.log(await res.json());
        throw new Error("Request failed");
      }
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      return {
        status: 500,
        body: JSON.stringify({ message: "Internal server error" })
      };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-4435a0de.js')).default;
const server_id = "src/routes/products/create/+page.server.js";
const imports = ["_app/immutable/nodes/6.912726a9.js","_app/immutable/chunks/scheduler.fdc38835.js","_app/immutable/chunks/index.fdeae3e0.js","_app/immutable/chunks/ProductForm.56a47eb8.js","_app/immutable/chunks/each.a0137068.js","_app/immutable/chunks/fa.e788405d.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.1617371e.js","_app/immutable/chunks/index.e3f73695.js","_app/immutable/chunks/Image.c7f928ad.js"];
const stylesheets = ["_app/immutable/assets/fa.95b16411.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=6-63e43869.js.map

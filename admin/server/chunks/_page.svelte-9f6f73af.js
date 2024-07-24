import { c as create_ssr_component, v as validate_component } from './ssr-b2a2419a.js';
import { P as ProductForm } from './ProductForm-7d0e9e18.js';
import '@fortawesome/free-solid-svg-icons';
import './fa-e70255c8.js';
import './Image-3f171196.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { product, categories } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(ProductForm, "ProductForm").$$render($$result, { product, categories, action: "update" }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-9f6f73af.js.map

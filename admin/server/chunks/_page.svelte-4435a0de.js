import { c as create_ssr_component, v as validate_component } from './ssr-b2a2419a.js';
import { P as ProductForm } from './ProductForm-7d0e9e18.js';
import '@fortawesome/free-solid-svg-icons';
import './fa-e70255c8.js';
import './Image-3f171196.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { categories } = data;
  let product = {
    name: "",
    description: "",
    price: 0,
    percentage: null,
    quantity: 0,
    thumbnail: null,
    images: [null, null, null, null],
    category: null
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(ProductForm, "ProductForm").$$render($$result, { product, categories, action: "create" }, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-4435a0de.js.map

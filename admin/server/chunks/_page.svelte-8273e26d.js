import { c as create_ssr_component, v as validate_component, e as each, b as escape, d as add_attribute } from './ssr-b2a2419a.js';
import { faCubes, faPlus, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { F as Fa } from './fa-e70255c8.js';
import { I as Image } from './Image-3f171196.js';

const CreateProduct = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<a href="products/create" type="button" class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      class: "mx-auto text-4xl text-indigo-600",
      icon: faCubes,
      stroke: "currentColor",
      "aria-hidden": "true"
    },
    {},
    {}
  )} <div class="flex flex-row justify-center items-center"><span class="mt-2 block text-sm font-medium text-gray-900" data-svelte-h="svelte-yyzr19">Create a new product</span> ${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: faPlus,
      class: "text-center text-xl text-indigo-600"
    },
    {},
    {}
  )}</div></a>`;
});
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let totalPages;
  let { totalRows = 0 } = $$props;
  let { perPage = 0 } = $$props;
  let { currentPage = 1 } = $$props;
  let { loadPage } = $$props;
  function isPageSelected(page) {
    return page === currentPage;
  }
  if ($$props.totalRows === void 0 && $$bindings.totalRows && totalRows !== void 0)
    $$bindings.totalRows(totalRows);
  if ($$props.perPage === void 0 && $$bindings.perPage && perPage !== void 0)
    $$bindings.perPage(perPage);
  if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
    $$bindings.currentPage(currentPage);
  if ($$props.loadPage === void 0 && $$bindings.loadPage && loadPage !== void 0)
    $$bindings.loadPage(loadPage);
  totalPages = Math.ceil(totalRows / perPage);
  return `${totalRows && totalRows > perPage ? `<nav class="flex justify-center items-center gap-2"><button ${(currentPage === 0 ? true : false) ? "disabled" : ""} aria-label="left arrow icon" aria-describedby="prev">${validate_component(Fa, "Fa").$$render($$result, { icon: faCaretLeft }, {}, {})}</button> <span id="prev" class="sr-only">Load previous ${escape(perPage)} rows</span> <div class="overflow-x-auto whitespace-nowrap max-w-full flex justify-center items-center gap-2">${each(Array(totalPages), (_, index) => {
    return `<button${add_attribute("class", `px-2 rounded-full ${isPageSelected(index) && "bg-indigo-700"}`, 0)} ${(isPageSelected(index) ? true : false) ? "disabled" : ""}${add_attribute("aria-label", `page number ${index}`, 0)} aria-describedby="next"><p>${escape(index + 1)}</p> </button>`;
  })}</div> <button ${(currentPage === totalPages - 1 ? true : false) ? "disabled" : ""} aria-label="right arrow icon" aria-describedby="next">${validate_component(Fa, "Fa").$$render($$result, { icon: faCaretRight }, {}, {})}</button> <span id="next" class="sr-only">Load next ${escape(perPage)} rows</span></nav>` : ``}`;
});
const ProductCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product } = $$props;
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  return `<a${add_attribute("href", `/products/${product.id}`, 0)} class="bg-slate-300 w-80 h-96 relative rounded-xl hover:transform hover:scale-105 transition-transform"><div class="w-full aspect-w-1 aspect-h-1 overflow-hidden group-hover:opacity-75">${validate_component(Image, "Image").$$render(
    $$result,
    {
      image: "http://localhost:3000/" + product.thumbnail
    },
    {},
    {}
  )}</div> <div class="flex flex-row justify-between p-2"><div class="w-full flex flex-col justify-between items-start"><h3 class="text-sm text-gray-700"><span aria-hidden="true" class="absolute inset-0"></span> ${escape(product.name.toUpperCase())}</h3> ${product.description ? `<p class="text-sm text-gray-500 text-ellipsis overflow-hidden w-64">${escape(product.description)}</p>` : ``}</div> <p class="text-sm font-medium text-gray-900">${escape(product.price)} DZD</p></div></a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { products } = data;
  let [pageProducts, totalRows] = products;
  let perPage = pageProducts.length;
  let currentPage = 0;
  async function loadPage() {
    const res = await fetch(`http://localhost:3000/api/v1/products?page=${currentPage + 1}&pageSize=9`);
    [pageProducts, totalRows] = await res.json();
    return { products };
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.loadPage === void 0 && $$bindings.loadPage && loadPage !== void 0)
    $$bindings.loadPage(loadPage);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${pageProducts !== void 0 ? `<section aria-labelledby="related-heading"><h2 id="related-heading" class="text-lg font-medium text-gray-900" data-svelte-h="svelte-1fsm2z7">Products</h2> ${validate_component(CreateProduct, "CreateProduct").$$render($$result, {}, {}, {})} <div class="p-6">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        totalRows,
        perPage,
        loadPage,
        currentPage
      },
      {
        currentPage: ($$value) => {
          currentPage = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-wrap justify-evenly justify-items-start gap-4 mt-4">${each(pageProducts, (product) => {
      return `${validate_component(ProductCard, "ProductCard").$$render($$result, { product }, {}, {})}`;
    })}</div> <div class="p-6">${validate_component(Pagination, "Pagination").$$render(
      $$result,
      {
        totalRows,
        perPage,
        loadPage,
        currentPage
      },
      {
        currentPage: ($$value) => {
          currentPage = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></section>` : `<p data-svelte-h="svelte-qdsr2u">Loading...</p>`}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-8273e26d.js.map

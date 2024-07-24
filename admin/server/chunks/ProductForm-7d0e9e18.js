import { c as create_ssr_component, d as add_attribute, b as escape, v as validate_component, e as each, k as add_classes } from './ssr-b2a2419a.js';
import { faPlus, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import { F as Fa } from './fa-e70255c8.js';
import { I as Image } from './Image-3f171196.js';

const AddImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let imageFile = "Aucun fichier choisi";
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  return `<div${add_attribute("id", id, 0)} class="rounded-md h-[5rem] min-w-[5rem] overflow-hidden"><div class="max-w-lg flex justify-center p-4 border-2 border-gray-300 border-dashed rounded-md"><div class="space-y-1 text-center">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      class: "m-auto text-slate-500",
      icon: faPlus
    },
    {},
    {}
  )} <div class="flex text-sm text-gray-600"><label${add_attribute("for", "images-" + id, 0)} class="relative m-auto w-24 line-clamp-2 truncate cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><span class="overflow-hidden">${escape(imageFile)}</span> <input${add_attribute("id", "images-" + id, 0)} name="images" type="file" accept=".jpg, .jpeg, .png" class="sr-only"></label></div></div></div></div>`;
});
const Combo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedItem } = $$props;
  let query = selectedItem?.name;
  let { items } = $$props;
  let filteredItems = [];
  const updateFilteredItems = () => {
    filteredItems = query === "" ? [] : items.filter((item) => {
      return item.name.toLowerCase().includes(query?.toLowerCase());
    });
  };
  function isItemSelected(item) {
    return item?.name === selectedItem?.name;
  }
  if ($$props.selectedItem === void 0 && $$bindings.selectedItem && selectedItem !== void 0)
    $$bindings.selectedItem(selectedItem);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  {
    updateFilteredItems();
  }
  return `<div class="space-y-4"><div class="relative mt-1"><input type="text" class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"${add_attribute("value", query ? query : "", 0)} placeholder="Search or select an item"> <div class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: faSearch,
      class: "h-5 w-5 text-gray-400",
      "aria-hidden": "true"
    },
    {},
    {}
  )}</div> ${filteredItems.length > 0 ? `<ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">${each(filteredItems, (item) => {
    return `<li class="${[
      "relative cursor-pointer select-none py-2 pl-8 pr-4",
      isItemSelected(item) ? "bg-indigo-700" : ""
    ].join(" ").trim()}"><span${add_classes((isItemSelected(item) ? "font-semibold" : "").trim())}>${escape(item.name)}</span> ${isItemSelected(item) ? `${validate_component(Fa, "Fa").$$render(
      $$result,
      {
        icon: faCheck,
        class: "absolute m-auto inset-y-0 left-0 flex items-center pl-1.5",
        "aria-hidden": "true"
      },
      {},
      {}
    )}` : ``} </li>`;
  })}</ul>` : ``}</div></div>`;
});
const ProductForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product } = $$props;
  let { categories } = $$props;
  let { action } = $$props;
  let thumbnailFile = "Aucun fichier choisi";
  if ($$props.product === void 0 && $$bindings.product && product !== void 0)
    $$bindings.product(product);
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  return `<h3 class="text-lg leading-6 font-medium text-gray-900" data-svelte-h="svelte-11w5x3s">Produit</h3> <form class="space-y-8 divide-y divide-gray-200" method="post"${add_attribute("action", `?/${action}`, 0)} enctype="multipart/form-data"><div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"><label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" for="name" data-svelte-h="svelte-1akg9ml">Nom de produit</label> <div class="mt-1 sm:mt-0 sm:col-span-2"><input type="text" name="name" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"${add_attribute("value", product.name, 0)}></div></div> <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5"><div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"><label for="description" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" data-svelte-h="svelte-lqlf1i">Description</label> <div class="mt-1 sm:mt-0 sm:col-span-2"><textarea rows="3" name="description" class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" placeholder="Quelques phrases sur le produit...">${escape(product.description, false)}</textarea></div></div> <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"><label for="category" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" data-svelte-h="svelte-ner1fo">Category</label> ${validate_component(Combo, "Combo").$$render(
    $$result,
    {
      selectedItem: product.category,
      items: categories
    },
    {},
    {}
  )}</div> <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"><label for="price" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" data-svelte-h="svelte-1sze20u">Prix</label> <div class="mt-1 sm:mt-0 sm:col-span-2"><input type="number" name="price" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" min="0" step="0.01"${add_attribute("value", product.price, 0)}></div></div> <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"><label class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" for="percentage" data-svelte-h="svelte-ge2ffc">Promotion</label> <div class="mt-1 sm:mt-0 sm:col-span-2"><input type="number" name="percentage" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" step="1" min="0" max="100"${add_attribute("value", product.percentage, 0)}></div></div> <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"><label for="quantity" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" data-svelte-h="svelte-1fg0xt4">Quantity</label> <div class="mt-1 sm:mt-0 sm:col-span-2"><input type="number" name="quantity" class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" step="1" min="0"${add_attribute("value", product.quantity, 0)}></div></div> <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"><label for="thumbnail" class="block text-sm font-medium text-gray-700" data-svelte-h="svelte-rtx2w3">Image principale</label> <div class="mt-1 sm:mt-0 sm:col-span-2"><div class="flex gap-2 items-center"><span class="h-52 w-52 rounded-xl overflow-hidden bg-gray-100">${validate_component(Image, "Image").$$render(
    $$result,
    {
      image: "http://localhost:3000/" + product.thumbnail
    },
    {},
    {}
  )}</span> <input type="file" class="ml-5" accept=".jpg, .jpeg, .png" style="display: none;" name="thumbnail" id="thumbnail"> <div class="flex flex-col w-56 p-4 overflow-hidden items-start"><label class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer" for="thumbnail" data-svelte-h="svelte-24qyme">Changer</label> <p class="truncate w-full text-ellipsis overflow-hidden text-left">${escape(thumbnailFile)}</p></div></div></div></div> <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"><label for="other-images" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2" data-svelte-h="svelte-bykwxb">Autres Images</label> <div class="flex flex-row gap-2">${product.images ? `${each(product.images, (image, index) => {
    return `${image ? `<div class="rounded-md h-[5rem] min-w-[5rem] overflow-hidden">${validate_component(Image, "Image").$$render($$result, { image: "http://localhost:3000/" + image }, {}, {})} </div>` : `${validate_component(AddImage, "AddImage").$$render($$result, { id: index }, {}, {})}`}`;
  })}` : ``}</div></div></div> <div class="pt-5"><div class="flex justify-end"><button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-svelte-h="svelte-1ou0jem">Cancel</button> <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">${`Metre a jour`}</button></div></div></form>`;
});

export { ProductForm as P };
//# sourceMappingURL=ProductForm-7d0e9e18.js.map

import { c as create_ssr_component, e as each, v as validate_component, d as add_attribute, b as escape } from './ssr-b2a2419a.js';
import { faArchive, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { F as Fa } from './fa-e70255c8.js';

/* empty css                                                       */const Order = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order } = $$props;
  const statusColors = {
    pending: "orange",
    accepted: "green",
    declined: "red",
    archived: "gray"
  };
  const statusFr = {
    pending: "En Attente",
    accepted: "Accepté",
    declined: "Rejeté",
    archived: "Archivé"
  };
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  return `<tr${add_attribute("class", `${order.status === "archived" ? "opacity-30" : ""}`, 0)}><td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6"><div class="flex items-center"><div class="ml-4"><div class="font-medium text-gray-900">${escape(order.firstName)} ${escape(order.lastName)}</div> <div class="text-gray-500"></div> <div class="text-gray-500">${escape(order.phoneNumber)}</div> <div class="text-gray-500">${escape(order.state)}</div> <div class="text-gray-500">${escape(order.address)}</div></div></div></td> <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${each(order.orderedProducts, ({ product, quantity }) => {
    return `<div class="text-gray-900">${escape(product.name)}</div>`;
  })}</td> <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${each(order.orderedProducts, ({ product, quantity }) => {
    return `<div class="text-gray-500 text-center">${escape(order.status === "pending" ? quantity : "-")}/${escape(product.quantity)} </div>`;
  })}</td> <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${escape(order.totalPrice && order.totalPrice)}</td> <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span${add_attribute("class", `inline-flex rounded-full bg-${statusColors[order.status]}-100 px-2 text-xs font-semibold leading-5 text-${statusColors[order.status]}-800`, 0)}>${escape(statusFr[order.status])}</span></td> <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6"><div class="flex flex-row items-center gap-2 justify-center">${order.status === "accepted" || order.status === "declined" ? `<button class="rounded-full w-6 h-6 bg-gray-200 flex justify-center items-center">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: faArchive,
      class: "text-gray-800 cursor-pointer"
    },
    {},
    {}
  )}</button>` : ``} ${order.status === "pending" ? `<button class="rounded-full w-6 h-6 bg-green-200 flex justify-center items-center">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: faCheck,
      class: "text-green-800 cursor-pointer"
    },
    {},
    {}
  )}</button> <button class="rounded-full w-6 h-6 bg-red-200 flex justify-center items-center">${validate_component(Fa, "Fa").$$render(
    $$result,
    {
      icon: faBan,
      class: "text-red-800 cursor-pointer"
    },
    {},
    {}
  )}</button>` : ``}</div></td></tr>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { orders } = data;
  let archived = false;
  async function reloadOrders() {
    const res = await fetch(`http://localhost:3000/api/v1/orders?archived=${archived}`);
    orders = await res.json();
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.reloadOrders === void 0 && $$bindings.reloadOrders && reloadOrders !== void 0)
    $$bindings.reloadOrders(reloadOrders);
  return `<div class="flex flex-col gap-4 px-4 sm:px-6 lg:px-8"><div class="sm:flex sm:items-center" data-svelte-h="svelte-wo8u1i"><div class="sm:flex-auto"><h1 class="text-xl font-semibold text-gray-900">Orders</h1></div></div> <form class=""><label for="archived" data-svelte-h="svelte-r5qu4q">Archivé</label> <input id="archived" type="checkbox" class="ml-2"></form> <table class="table-auto min-w-full divide-y divide-gray-300 w-full h-full"><thead class="bg-gray-50 w-10" data-svelte-h="svelte-1jr6431"><tr><th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Client</th> <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Produits</th> <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantité (DEM/DISP)</th> <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Prix Totale (DA)</th> <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th> <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Confirmation</th></tr></thead> <tbody class="divide-y divide-gray-200 bg-white">${each(orders, (order) => {
    return `${validate_component(Order, "Order").$$render($$result, { order }, {}, {})}`;
  })}</tbody></table></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-1a4c0053.js.map

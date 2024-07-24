import { c as create_ssr_component, d as add_attribute, v as validate_component } from './ssr-b2a2419a.js';
import { F as Fa } from './fa-e70255c8.js';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image } = $$props;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  return `${image ? `<img class="w-full h-full object-cover bg-slate-400"${add_attribute("src", image, 0)} alt="not found">` : `<div class="flex text-yellow-400 h-full bg-slate-500 flex-col items-center justify-center rounded-t-xl">${validate_component(Fa, "Fa").$$render($$result, { icon: faTriangleExclamation }, {}, {})} <p data-svelte-h="svelte-1l8aj8">Image non trouvée</p></div>`}`;
});

export { Image as I };
//# sourceMappingURL=Image-3f171196.js.map

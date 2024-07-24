import { c as create_ssr_component, v as validate_component, a as subscribe, e as each, b as escape, m as missing_component, i as identity, d as add_attribute, f as assign, g as get_store_value, n as noop } from './ssr-b2a2419a.js';
import { w as writable } from './index-20983faf.js';

/* empty css                                                    */const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function notificationsStore(initialValue = []) {
  const store = writable(initialValue);
  const { set, update, subscribe: subscribe2 } = store;
  let defaultOptions = {
    duration: 3e3,
    placement: "bottom-right",
    type: "info",
    theme: "dark"
  };
  function add(options) {
    const {
      duration = 3e3,
      placement = "bottom-right",
      type = "info",
      theme = "dark",
      ...rest
    } = { ...defaultOptions, ...options };
    const uid = Date.now();
    const obj = {
      ...rest,
      uid,
      placement,
      type,
      theme,
      duration,
      remove: () => {
        update((v) => v.filter((i) => i.uid !== uid));
      },
      update: (data) => {
        delete data.uid;
        const index = get_store_value(store)?.findIndex((v) => v?.uid === uid);
        if (index > -1) {
          update((v) => [
            ...v.slice(0, index),
            { ...v[index], ...data },
            ...v.slice(index + 1)
          ]);
        }
      }
    };
    update((v) => [...v, obj]);
    if (duration > 0) {
      setTimeout(() => {
        obj.remove();
        if (typeof obj.onRemove === "function")
          obj.onRemove();
      }, duration);
    }
    return obj;
  }
  function getById(uid) {
    return get_store_value(store)?.find((v) => v?.uid === uid);
  }
  function clearAll() {
    set([]);
  }
  function clearLast() {
    update((v) => {
      return v.slice(0, v.length - 1);
    });
  }
  function setDefaults(options) {
    defaultOptions = { ...defaultOptions, ...options };
  }
  return {
    subscribe: subscribe2,
    add,
    success: getHelper("success", add),
    info: getHelper("info", add),
    error: getHelper("error", add),
    warning: getHelper("warning", add),
    clearAll,
    clearLast,
    getById,
    setDefaults
  };
}
const toasts = notificationsStore([]);
function getHelper(type, add) {
  return function() {
    if (typeof arguments[0] === "object") {
      const options = arguments[0];
      return add({ ...options, type });
    } else if (typeof arguments[0] === "string" && typeof arguments[1] === "string") {
      const options = arguments[2] || {};
      return add({
        ...options,
        type,
        title: arguments[0],
        description: arguments[1]
      });
    } else if (typeof arguments[0] === "string") {
      const options = arguments[1] || {};
      return add({
        ...options,
        type,
        description: arguments[0]
      });
    }
  };
}
const css$1 = {
  code: "ul.svelte-1rg6zyw.svelte-1rg6zyw{list-style:none;margin:0;padding:0}li.svelte-1rg6zyw.svelte-1rg6zyw{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.toast-container.svelte-1rg6zyw.svelte-1rg6zyw{z-index:9999;position:fixed;padding:4px;box-sizing:border-box;color:#fff;width:max-content;max-width:100%;pointer-events:none}.toast-container.bottom-right.svelte-1rg6zyw.svelte-1rg6zyw{bottom:1em;right:1em}.toast-container.bottom-left.svelte-1rg6zyw.svelte-1rg6zyw{bottom:1em;left:1em}.toast-container.top-left.svelte-1rg6zyw.svelte-1rg6zyw{top:1em;left:1em}.toast-container.top-right.svelte-1rg6zyw.svelte-1rg6zyw{top:1em;right:1em}.toast-container.top-center.svelte-1rg6zyw.svelte-1rg6zyw{top:1em;right:50%;left:50%;transform:translate(-50%, 0)}.toast-container.bottom-center.svelte-1rg6zyw.svelte-1rg6zyw{bottom:1em;right:50%;left:50%;transform:translate(-50%, 0)}.toast-container.center-center.svelte-1rg6zyw.svelte-1rg6zyw{top:50%;right:50%;left:50%;transform:translate(-50%, -50%)}.toast-container.svelte-1rg6zyw>.svelte-1rg6zyw:not(:last-child){margin-bottom:10px}",
  map: null
};
const ToastContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  $$unsubscribe_toasts = subscribe(toasts, (value) => $toasts = value);
  let { theme = "dark" } = $$props;
  let { placement = "bottom-right" } = $$props;
  let { type = "info" } = $$props;
  let { showProgress = false } = $$props;
  let { duration = 3e3 } = $$props;
  let { width = "320px" } = $$props;
  const placements = [
    "bottom-right",
    "bottom-left",
    "top-right",
    "top-left",
    "top-center",
    "bottom-center",
    "center-center"
  ];
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.showProgress === void 0 && $$bindings.showProgress && showProgress !== void 0)
    $$bindings.showProgress(showProgress);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  $$result.css.add(css$1);
  $$unsubscribe_toasts();
  return `${each(placements, (placement2) => {
    return `<div class="${"toast-container " + escape(placement2, true) + " svelte-1rg6zyw"}" style="${"width: " + escape(width, true)}"><ul class="svelte-1rg6zyw">${each($toasts.filter((n) => n.placement === placement2).reverse(), (toast) => {
      return `<li class="svelte-1rg6zyw">${toast.component ? `${validate_component(toast.component || missing_component, "svelte:component").$$render($$result, { data: toast }, {}, {})}` : `${slots.default ? slots.default({ data: toast }) : ``}`} </li>`;
    })}</ul> </div>`;
  })}`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css = {
  code: ".st-toast.svelte-is9c7e.svelte-is9c7e{display:flex;pointer-events:auto;width:320px;height:auto;padding-left:0.875rem;color:#fff;box-shadow:0 2px 6px 0 rgba(0, 0, 0, 0.2);position:relative;cursor:pointer}.st-toast.svelte-is9c7e .st-toast-icon.svelte-is9c7e{flex-shrink:0;margin-right:0.875rem;margin-top:0.875rem}.st-toast.svelte-is9c7e progress[value].svelte-is9c7e{appearance:none;display:block;width:100%;position:absolute;bottom:0;left:0;right:0;height:4px}.st-toast.dark.svelte-is9c7e.svelte-is9c7e{color:#fff;background:#393939}.st-toast.dark.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:#393939}.st-toast.dark.svelte-is9c7e .st-toast-close-btn svg.svelte-is9c7e{fill:#fff}.st-toast.dark.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px #fff}.st-toast.dark.success.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(22, 163, 74)}.st-toast.dark.success.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(22, 163, 74);color:#fff}.st-toast.dark.success.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(22, 163, 74)}.st-toast.dark.info.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(2, 132, 199)}.st-toast.dark.info.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(2, 132, 199);color:#fff}.st-toast.dark.info.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(2, 132, 199)}.st-toast.dark.error.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(225, 29, 72)}.st-toast.dark.error.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(225, 29, 72);color:#fff}.st-toast.dark.error.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(225, 29, 72)}.st-toast.dark.warning.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(202, 138, 4)}.st-toast.dark.warning.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(202, 138, 4);color:#fff}.st-toast.dark.warning.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(202, 138, 4)}.st-toast.light.svelte-is9c7e.svelte-is9c7e{color:#161616;fill:#161616}.st-toast.light.success.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(22, 163, 74);background:rgba(22, 163, 74, 0.2)}.st-toast.light.success.svelte-is9c7e progress.svelte-is9c7e{background:rgba(22, 163, 74, 0.2)}.st-toast.light.success.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.success.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(22, 163, 74)}.st-toast.light.success.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(22, 163, 74)}.st-toast.light.success.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(22, 163, 74)}.st-toast.light.success.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(22, 163, 74);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast.light.info.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(2, 132, 199);background:rgba(2, 132, 199, 0.2)}.st-toast.light.info.svelte-is9c7e progress.svelte-is9c7e{background:rgba(2, 132, 199, 0.2)}.st-toast.light.info.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.info.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(2, 132, 199)}.st-toast.light.info.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(2, 132, 199)}.st-toast.light.info.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(2, 132, 199)}.st-toast.light.info.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(2, 132, 199);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast.light.error.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(225, 29, 72);background:rgba(225, 29, 72, 0.2)}.st-toast.light.error.svelte-is9c7e progress.svelte-is9c7e{background:rgba(225, 29, 72, 0.2)}.st-toast.light.error.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.error.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(225, 29, 72)}.st-toast.light.error.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(225, 29, 72)}.st-toast.light.error.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(225, 29, 72)}.st-toast.light.error.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(225, 29, 72);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast.light.warning.svelte-is9c7e.svelte-is9c7e{border-left:3px solid rgb(202, 138, 4);background:rgba(202, 138, 4, 0.2)}.st-toast.light.warning.svelte-is9c7e progress.svelte-is9c7e{background:rgba(202, 138, 4, 0.2)}.st-toast.light.warning.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-bar{background-color:transparent}.st-toast.light.warning.svelte-is9c7e progress[value].svelte-is9c7e::-webkit-progress-value{background-color:rgb(202, 138, 4)}.st-toast.light.warning.svelte-is9c7e .st-toast-icon.svelte-is9c7e{fill:rgb(202, 138, 4)}.st-toast.light.warning.svelte-is9c7e .st-toast-close-btn.svelte-is9c7e:focus{border:solid 1px rgb(202, 138, 4)}.st-toast.light.warning.svelte-is9c7e.svelte-is9c7e::before{border-color:rgb(202, 138, 4);content:'';pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;filter:opacity(0.4);border-style:solid;border-width:1px 1px 1px 0}.st-toast-details.svelte-is9c7e.svelte-is9c7e{margin-top:0.875rem;margin-right:1rem;text-align:left;align-self:flex-start}.st-toast-details.svelte-is9c7e .st-toast-title.svelte-is9c7e{font-size:0.875rem;font-weight:600;line-height:1.125rem;letter-spacing:0.16px;font-weight:600;word-break:break-word;margin:0;outline:none}.st-toast-details.svelte-is9c7e .st-toast-description.svelte-is9c7e{font-size:0.875rem;font-weight:400;line-height:1.125rem;letter-spacing:0.16px;margin-top:0;margin-bottom:1rem;word-break:break-word}.st-toast-close-btn.svelte-is9c7e.svelte-is9c7e{outline:2px solid transparent;outline-offset:-2px;display:flex;align-items:center;justify-content:center;background-color:transparent;border:none;cursor:pointer;margin-left:auto;padding:0;height:3rem;width:3rem;min-height:3rem;min-width:3rem;transition:outline 110ms, background-color 110ms}",
  map: null
};
const FlatToast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $progress, $$unsubscribe_progress;
  let { theme = "light" } = $$props;
  let { data = {} } = $$props;
  const progress = tweened(1, { duration: data.duration, easing: identity });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_progress();
  return `<div class="${"st-toast flat " + escape(data.theme || theme, true) + " " + escape(data.type || "info", true) + " svelte-is9c7e"}" role="alert" aria-live="assertive" aria-atomic="true">${slots.icon ? slots.icon({}) : ` ${data.type === "success" ? `<svg class="st-toast-icon svelte-is9c7e" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-4.9,0-9,4.1-9,9s4.1,9,9,9s9-4,9-9S15,1,10,1z M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z"></path><path fill="none" d="M8.7,13.5l-3.2-3.2l1-1l2.2,2.2l4.8-4.8l1,1L8.7,13.5z" data-icon-path="inner-path" opacity="0"></path></svg>` : `${data.type === "info" ? `<svg class="st-toast-icon svelte-is9c7e" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,7Zm4,17.12H12V21.88h2.88V15.12H13V12.88h4.13v9H20Z"></path></svg>` : `${data.type === "error" ? `<svg class="st-toast-icon svelte-is9c7e" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z"></path><path d="M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" data-icon-path="inner-path" opacity="0"></path></svg>` : `<svg class="st-toast-icon svelte-is9c7e" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"></path><path d="M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z" data-icon-path="inner-path" opacity="0"></path></svg>`}`}`} `} <div class="st-toast-details svelte-is9c7e">${data.title ? `<h3 class="st-toast-title svelte-is9c7e">${escape(data.title)}</h3>` : ``} <p class="st-toast-description svelte-is9c7e">${escape(data.description)}</p> <div class="st-toast-extra">${slots.extra ? slots.extra({}) : ``}</div></div> <button class="st-toast-close-btn svelte-is9c7e" type="button" aria-label="close">${slots["close-icon"] ? slots["close-icon"]({}) : ` <svg xmlns="http://www.w3.org/2000/svg" class="bx--toast-notification__close-icon svelte-is9c7e" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path></svg> `}</button> ${data.showProgress ? `<progress style="${"height: " + escape(data.duration > 0 ? "4px" : 0, true)}"${add_attribute("value", $progress, 0)} class="svelte-is9c7e"></progress>` : ``} </div>`;
});
const SidebarLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<a${add_attribute("href", "/" + name.toLowerCase(), 0)} class="text-gray-300 shadow-sm shadow-gray-500 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">${escape(name)}</a>`;
});
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<aside class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0"><div class="flex-1 flex flex-col min-h-0 bg-gray-800"><div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto"><div class="flex items-center flex-shrink-0 px-4" data-svelte-h="svelte-17z5js"><img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"></div> <nav class="mt-5 flex flex-col px-2 space-y-1 gap-2">${each(["Products", "Orders"], (name) => {
    return `${validate_component(SidebarLink, "SidebarLink").$$render($$result, { name }, {}, {})}`;
  })}</nav></div></div></aside>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})} <div class="md:pl-64 flex flex-col flex-1"><div class="py-6 px-4 sm:px-6 lg:px-8"><main class="flex-col">${validate_component(ToastContainer, "ToastContainer").$$render($$result, { placement: "bottom-right" }, {}, {
    default: ({ data }) => {
      return `${validate_component(FlatToast, "FlatToast").$$render($$result, { data }, {}, {})}`;
    }
  })} ${slots.default ? slots.default({}) : ``}</main></div></div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-31483373.js.map

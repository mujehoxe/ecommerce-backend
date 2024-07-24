const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.142a2498.js","app":"_app/immutable/entry/app.b8b23db7.js","imports":["_app/immutable/entry/start.142a2498.js","_app/immutable/chunks/scheduler.fdc38835.js","_app/immutable/chunks/singletons.1617371e.js","_app/immutable/chunks/index.e3f73695.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.b8b23db7.js","_app/immutable/chunks/scheduler.fdc38835.js","_app/immutable/chunks/index.fdeae3e0.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-fd3f0d6f.js')),
			__memo(() => import('./chunks/1-bfd31c1e.js')),
			__memo(() => import('./chunks/2-3dbd8ce8.js')),
			__memo(() => import('./chunks/3-8f7cbf5a.js')),
			__memo(() => import('./chunks/4-6519657b.js')),
			__memo(() => import('./chunks/5-586de3d2.js')),
			__memo(() => import('./chunks/6-63e43869.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/orders",
				pattern: /^\/orders\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/products",
				pattern: /^\/products\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/products/create",
				pattern: /^\/products\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/products/[id]",
				pattern: /^\/products\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map

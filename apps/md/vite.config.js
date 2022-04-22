import { defineConfig } from "vite";

export default defineConfig({
	esbuild: {
		jsxInject: 'import { WJS, WJSRouters } from "@wave-studios/wavejs";',
		jsxFactory: "WJS.h",
		jsxFragment: "WJS.f",
		minify: false,
	},
});

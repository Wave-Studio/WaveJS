import { bundle } from "https://deno.land/x/emit@0.9.0/mod.ts";
//import scss from "https://deno.land/x/denosass@1.0.4/mod.ts";

interface Route {
	page?: string;
	css?: string;
}

interface Config {
	siteName: string;
	minify: {
		css: boolean;
		js: boolean;
		html: boolean;
	};
}

self.onmessage = async (e) => {
	const path = Deno.cwd();
	const config: Config = (await import(`${path}/wave.config.ts`)).default;
	const { watch } = e.data;
	console.log("Compiler", watch, path);

	const routesToCompile: { path: string; type: string }[] = [];

	const walkRoute = async (route: string) => {
		for await (const file of Deno.readDir(route)) {
			if (file.isFile) {
				for (const allowedExtension of [
					"ts",
					"js",
					"tsx",
					"jsx",
					"css",
					"scss",
				]) {
					if (file.name.toLowerCase().endsWith(`.${allowedExtension}`)) {
						routesToCompile.push({
							path: `${route}/${file.name}`,
							type: allowedExtension.endsWith("css") ? "css" : "js",
						});
					}
				}
			} else {
				if (file.isDirectory) {
					await walkRoute(`${route}/${file.name}`);
				}
			}
		}
	};

	await walkRoute(`${path}/pages`);

	const mappedRoutes: Route[] = [];

	for (const { path, type } of routesToCompile) {
		const page = mappedRoutes.find(
			({ page, css }) =>
				page?.substring(0, page.lastIndexOf(".")) ===
					path.substring(0, path.lastIndexOf(".")) ||
				css?.substring(0, css.lastIndexOf(".")) ===
					path.substring(0, path.lastIndexOf("."))
		);

		if (page != null) {
			if (type === "css") {
				page.css = path;
			} else {
				page.page = path;
			}
		} else {
			if (type === "css") {
				mappedRoutes.push({
					css: path,
				});
			} else {
				mappedRoutes.push({
					page: path,
				});
			}
		}
	}

	const compileRoute = async (route: Route) => {
		const page = route.page!;
		const css = route.css;

		const { code } = await bundle(page, {
			compilerOptions: {
				jsx: "jsx",
				jsxFactory: "WJS.h",
				jsxFragmentFactory: "WJS.f",
				inlineSourceMap: false,
			},
		});

		console.log(code);

		if (css != null) {
			// const compiledCss = scss(css, {
			// 	quiet: true,
			// 	style: config.minify.css ? "compressed" : "expanded",
			// })
			// 	.to_string()
			// 	.toString();
			// console.log(compiledCss);
		}
	};

	for (const route of mappedRoutes) {
		if (route.page != null) {
			await compileRoute(route);
		}
	}

	if (!watch) {
		self.close();
	}
};

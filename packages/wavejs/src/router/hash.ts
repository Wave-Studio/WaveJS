/**
 * WaveJS
 *
 * Developed by Wave Studios
 */

import WaveJS from "../runtime";

export interface WJSRouter {
	/** Homepage */
	home: WJSRouterPage;
	/** Shown when going to an invalid route */
	404?: WJSRouterPage;
	/** Any other route */
	// Typing hack
	[route: string]: WJSRouterPage | undefined;
}

export interface WJSRouterPage {
	title: string;
	// deno-lint-ignore no-explicit-any
	component: ((...args: any[]) => unknown) | string;
}

export interface WJSHashRouterOptions {
	/** Passes the page as a Children prop - Makes global components easy */
	wrapper?: ({ children }: { children: () => unknown }) => unknown | string;
}

let wjsRouterData: { routes: WJSRouter; options?: WJSHashRouterOptions } = {
	routes: {
		home: {
			title: "Home",
			component: "",
		},
	},
	options: {},
};

export default class HashRouter {
	static create(routes: WJSRouter, options?: WJSHashRouterOptions) {
		let caseRoutes: WJSRouter = {
			home: {
				title: "Home",
				component: "",
			},
		};
		for (let route in routes) {
			caseRoutes[route.toLowerCase()] = routes[route];
		}
		wjsRouterData = {
			routes: caseRoutes,
			options,
		};

		HashRouter.reroutePage();
		window.onhashchange = () => HashRouter.reroutePage();
		return this;
	}

	static addRoute(
		route: string,
		page: WJSRouterPage,
		replace: boolean = false
	) {
		if (wjsRouterData.routes[route.toLowerCase()] && !replace) {
			return this;
		} else {
			wjsRouterData.routes[route.toLowerCase()] = page;
			return this;
		}
	}

	static removeRoute(route: string) {
		if (route === "home") {
			throw new Error("Cannot remove home route");
		}
		if (wjsRouterData.routes[route]) {
			delete wjsRouterData.routes[route];
		}
		return this;
	}

	private static reroutePage(
		hash: string = location.hash.substring(
			location.hash.startsWith("#") ? 1 : 0
		)
	): void {
		WaveJS.states = [];
		hash = hash.toLowerCase();
		if (hash === "") {
			return this.reroutePage("home");
		}
		if (wjsRouterData.routes[hash] != undefined) {
			this.renderPage(hash);
		} else {
			this.renderPage("404");
		}
	}

	private static renderPage(route: string) {
		const { component, title } = (wjsRouterData.routes[route] ??
			wjsRouterData.routes["404"] ?? {
				component: "404",
				title: "404",
			}) as WJSRouterPage;
		if (wjsRouterData.options?.wrapper) {
			WaveJS.renderPage(
				// @ts-ignore - It works but ts says otherwise
				wjsRouterData.options!.wrapper,
				title ?? "WaveJS App",
				{
					children: typeof component !== "string" ? component : () => component,
				}
			);
		} else {
			WaveJS.renderPage(
				typeof component !== "string" ? component : () => component,
				title ?? "WaveJS App"
			);
		}
	}
}

/**
 * WaveJS
 *
 * @author Wave-studios
 */

declare interface WJSJsonCSS {
	always?: string;
	[key: string]: string;
}


// TO REWRITE:
// WaveJS - Hash Router
declare namespace WJSRouters {
	const HashRouter: WJSHashRouter;
}

interface WJSHashRouterReturn {
	addRoute: (
		route: string,
		page: WJSRouterPage,
		replace?: boolean
	) => WJSHashRouterReturn;
	removeRoute: (route: string) => WJSHashRouterReturn;
}

interface WJSRouterPage {
	title: string;
	// deno-lint-ignore no-explicit-any
	component: ((...args: any[]) => unknown) | string;
}

interface WJSHashRouterOptions {
	/** Passes the page as a Children prop - Makes global components easy */
	wrapper?: ({ children }: { children: () => unknown }) => unknown | string;
}

interface WJSRouter {
	/** Homepage */
	home: WJSRouterPage;
	/** Shown when going to an invalid route */
	404?: WJSRouterPage;
	/** Any other route */
	// Typing hack
	[route: string]: WJSRouterPage | undefined;
}

interface WJSHashRouter {
	create(
		routes: WJSRouter,
		options?: WJSHashRouterOptions
	): WJSHashRouterReturn;
}

// WaveJS - Core
declare namespace WJS {
	function h(
		tagName:
			| string
			| ((
					...args: (string | JSX.AttributeCollection)[]
			  ) => Element | DocumentFragment)
			| DocumentFragment,
		attributes: JSX.AttributeCollection | null,
		...children: string[]
	): Element | DocumentFragment;

	function page(
		{}: {
			title?: string;
			route?: string;
		},
		page: () => unknown | string
	): void;

	function useState<T>(initialValue: T): [T, (value: T) => void];

	/** Same as useState except that states are saved for the session */
	function useSessionState<T>(initialValue: T): [() => T, (value: T) => void];

	/** Generates css based on given props */
	function css(
		{}: {
			[key: string]: boolean;
		},
		{}: WJSJsonCSS
	): string;
}
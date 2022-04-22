/**
 * WaveJS
 *
 * @author Wave-studio
 */

import { RouterOptions, RouterPages, RouterPage } from "../interfaces/router";

export default class SlashRouter {
	private static pageRoutes: { [key: string]: RouterPage } = {};
	private static pageStates: { [key: string]: unknown[] } = {};
	private static routerOptions: RouterOptions = {};

	static create(routes: RouterPages, options?: RouterOptions) {
		this.routerOptions = options ?? {};

		const crawlRoute = (route: RouterPage, path: string = "") => {
			this.pageRoutes[`/${path}`] = route;
			if (route.subroutes) {
				for (const subroute of route.subroutes) {
					crawlRoute(subroute, path);
				}
			}
		}

		for (const key in routes) {
			crawlRoute(routes[key]!);
		}
	}

	
}

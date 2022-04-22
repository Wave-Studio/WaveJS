/**
 * WaveJS
 *
 * @author Wave-studio
 */

import { Page } from "../interfaces/render";

export default class Renderer {
	private static pageState: Page = {
		components: [],
		props: {},
	};

	static rerender() {
		this.renderPage(this.pageState);
	}

	static renderPage(page: Page) {
		this.pageState = page;
	}
}
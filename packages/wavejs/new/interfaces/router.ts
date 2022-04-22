/**
 * WaveJS
 *
 * @author Wave-studio
 */
import { WJSComponent } from "./runtime";

export interface RouterPage {
	component: WJSComponent;
	title?: string;
	subroutes?: RouterPage[];
}

interface RequiredRouterPages {
	home: RouterPage;
	"404"?: RouterPage;
}

export interface RouterPages extends RequiredRouterPages {
	[key: string]: RouterPage | undefined;
}

export interface RouterOptions {
	wrapper?: ({ children }: { children: WJSComponent }) => WJSComponent;
	defaultTitle?: string;
}

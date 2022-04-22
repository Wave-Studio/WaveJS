/**
 * WaveJS
 *
 * @author Wave-studio
 */

import { WJSComponent } from "./runtime";

export interface Page {
	components: WJSComponent[];
	props: JSX.AttributeCollection;
}
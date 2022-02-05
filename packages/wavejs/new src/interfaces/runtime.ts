/**
 * WaveJS
 *
 * @author Wave-studio
 */

export interface WJSComponent {
	nodeName: string | 'wjs-fragment';
	attributes: JSX.AttributeCollection | null;
	children: (WJSComponent & string)[];
	eventListeners: {[key: string]: (event: Event) => void} | null;
}
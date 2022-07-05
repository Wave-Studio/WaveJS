/**
 * WaveJS
 *
 * @author Wave-studios
 */

declare interface WJSJsonCSS {
	always?: string;
	[key: string]: string | undefined;
}

// WaveJS - Core
declare namespace WJS {
	/** Store data */
	function useState<T>(initialValue: T): [T, (value: T) => void];

	/** Call a function only once */
	function onMount(func: () => void): void;
}

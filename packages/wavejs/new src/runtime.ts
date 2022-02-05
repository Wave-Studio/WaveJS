/**
 * WaveJS
 *
 * @author Wave-studio
 */

import { WJSComponent } from "./interfaces/runtime";
import Renderer from "./render";
import { htmlifyName } from "./utils/html";

export default class WJS {
	// Utility functions
	private static rerenderCount = -1;
	private static useTempStateIndex = -1;
	private static useStateIndex = -1;
	private static useTempStates: unknown[] = [];
	static useStates: unknown[] = [];

	static useState<T>(initialValue: T): [T, (value: T) => void] {
		this.useStateIndex++;
		const frozenNumber = parseInt(this.useStateIndex.toString());
		this.useStates[frozenNumber] = this.useStates[frozenNumber] ?? initialValue;

		return [
			this.useStates[frozenNumber] as T,
			(newValue: T) => {
				this.useStates[frozenNumber] = newValue;
				Renderer.rerender();
			},
		];
	}

	/** Same as useState except that states get wiped when navigating to a different page */
	static useTempState<T>(initialValue: T): [T, (value: T) => void] {
		this.useTempStateIndex++;
		const frozenNumber = parseInt(this.useTempStateIndex.toString());
		this.useTempStates[frozenNumber] = this.useTempStates[frozenNumber] ?? initialValue;

		return [
			this.useTempStates[frozenNumber] as T,
			(newValue: T) => {
				this.useTempStates[frozenNumber] = newValue;
				Renderer.rerender();
			},
		];
	}

	static onMount(func: () => void): void {
		this.rerenderCount++;
		if (this.rerenderCount < 1) {
			func();
		}
	}

	// Internal functions
	static resetRerenderCount(reroute = false): void {
		this.useStateIndex = -1;
		this.useTempStateIndex = -1;

		if (reroute) {
			this.rerenderCount = -1;
			this.useTempStates = [];
		}
	}

	// Render functions
	static f(): WJSComponent {
		return {
			nodeName: "wjs-fragment",
			attributes: null,
			children: [],
			eventListeners: {},
		};
	}

	static h(
		tagName: string | ((props: JSX.AttributeCollection) => WJSComponent),
		attributes: JSX.AttributeCollection,
		...children: (WJSComponent & string)[]
	) {
		let realChildren: (WJSComponent & string)[] = [];

		for (const child of children) {
			if (Array.isArray(child)) {
				realChildren = [...realChildren, ...child];
			} else {
				realChildren.push(child);
			}
		}

		children = realChildren;

		if (typeof tagName == "function") {
			return tagName({ ...attributes, children: children ?? [] });
		} else {
			if (tagName == "wjs-fragment") {
				return children;
			} else {
				const elementAttributes: { [key: string]: string } = {};
				const eventListeners: { [key: string]: (event: Event) => void } = {};

				for (const [key, value] of Object.entries(attributes)) {
					switch (key.toLowerCase()) {
						case "class":
						case "classname": {
							elementAttributes["class"] = `${
								elementAttributes["class"] ??
								elementAttributes["className"] ??
								""
							} ${value}`;

							break;
						}

						case "style": {
							const css = value as string | WJSCssClasses;

							if (typeof css == "string") {
								elementAttributes["style"] = css;
							} else {
								let generatedCss = "";

								for (const [cssKey, cssValue] of Object.entries(css)) {
									const htmlCssKey = htmlifyName(cssKey);
									generatedCss += `${htmlCssKey}: ${cssValue};`;
								}

								elementAttributes["style"] = generatedCss;
							}

							break;
						}

						case "children": {
							break;
						}

						default: {
							if (key.startsWith("on")) {
								const event = key.substring(2).toLowerCase();

								if (typeof value == "function") {
									eventListeners[event] = value as (event: Event) => void;
								} else {
									throw new Error(
										`Event handler for ${event} must be a function`
									);
								}
							} else {
								elementAttributes[htmlifyName(key)] = value as string;
							}

							break;
						}
					}
				}

				return {
					nodeName: tagName,
					attributes: elementAttributes ?? null,
					children: children ?? [],
					eventListeners: eventListeners ?? null,
				};
			}
		}
	}
}

/**
 * WaveJS
 *
 * @author Wave-studios
 */

import { namespaceEntries } from "./utils/svg";

if (document.getElementById("wjs-app") == null) {
	const div = document.createElement("div");
	div.id = "wjs-app";
	document.body.appendChild(div);
}

export class WJS {
	// States
	static states: unknown[] = [];
	private static stateNum = -1;

	static useState<T>(initialState: T): [T, (newState: T) => void] {
		this.stateNum += 1;
		const state = parseInt(new Number(this.stateNum).toString());

		if (this.states[state] == undefined) {
			this.states[state] = initialState;
		}

		return [
			this.states[state] as T,
			(newState: T) => {
				this.states[state] = newState;
				this.stateNum = -1;
			},
		];
	}

	// Other functions
	public static renderAmount = 0;

	static onMount(callback: () => void) {
		this.renderAmount++;
		if (this.renderAmount <= 1) {
			callback();
		}
	}

	// Compiling JSX
	static get f() {
		return document.createDocumentFragment();
	}

	static h(
		tagName:
			| string
			| ((props: JSX.AttributeCollection) => unknown)
			| DocumentFragment,
		attributes: JSX.AttributeCollection,
		children: unknown[]
	) {
		if (
			typeof tagName == "function" &&
			!(tagName instanceof DocumentFragment)
		) {
			return tagName({ ...attributes, children });
		} else {
			const element =
				tagName instanceof DocumentFragment
					? tagName
					: namespaceEntries.includes(tagName)
					? document.createElementNS("http://www.w3.org/2000/svg", tagName)
					: document.createElement(tagName);

			if (!(element instanceof DocumentFragment)) {
				let classValue = "";
				for (const [key, value] of Object.entries(attributes) as [
					string,
					string | WJSCssClasses
				][]) {
					switch (key) {
						case "children": {
							break;
						}

						case "style": {
							if (typeof value == "string") {
								element.setAttribute(key, value);
							} else {
								let stylesString = "";
								for (const [style, val] of Object.entries(value)) {
									let styleName = "";
									for (const char of style.split("")) {
										if (char.toLowerCase() != char) {
											styleName += `-${char.toLowerCase()}`;
										} else {
											styleName += char;
										}
									}
									stylesString += `${styleName}:${val}; `;
								}
								element.setAttribute("style", stylesString.trim());
							}
							break;
						}

						case "class":
						case "className": {
							classValue += `${value} `;
							element.setAttribute("class", classValue.trim());
							break;
						}

						default: {
							element.setAttribute(key, value as string);
						}
					}
				}
			}

			const appendChild = (parent: Node, child: Node | string) => {
				if (child == undefined) return;

				if (Array.isArray(child)) {
					for (const value of child) {
						appendChild(parent, value);
					}
				} else if (typeof child === "string") {
					parent.appendChild(document.createTextNode(child));
				} else if (child instanceof Node) {
					parent.appendChild(child);
				} else if (typeof child !== "boolean") {
					parent.appendChild(document.createTextNode(String(child)));
				}
			};

			for (const child of children) {
				appendChild(element, child as Node | string);
			}
		}
	}
}

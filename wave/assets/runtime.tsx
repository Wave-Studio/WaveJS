// @ts-expect-error Prevent issues?
globalThis.WJS = class WJS {
	private static hookCount = -1;
	private static hookData: unknown[] = [];

	private static handleRerender() {
		this.hookCount = -1;
		// @ts-expect-error Typing issue
		globalThis.WJS_RERENDER_FUNCTION();
	}

	public static onMount(func: () => void) {
		this.hookCount++;
		const hookNumber = parseInt(this.hookCount.toString());
		const ranFunction = this.hookData[hookNumber] = (this.hookData[hookNumber] ?? false);
		if (!ranFunction) {
			this.hookData[hookNumber] = true;
			func();
		}
	}

	public static useState<T>(initialValue: T) {
		this.hookCount++;
		const hookNumber = parseInt(this.hookCount.toString());
		const state = this.hookData[hookNumber] = (this.hookData[hookNumber] ?? initialValue);
		return [state, (value: T) => {
			this.hookData[hookNumber] = value;
			this.handleRerender();
		}];
	}
	
	private static nameSpaceElements = [
		"g",
		"defs",
		"stop",
		"linearGradient",
		"feColorMatrix",
		"feBlend",
		"filter",
		"path",
		"group",
		"polyline",
		"line",
		"rect",
		"circle",
		"svg",
	];

	private static jsToHTML(js: string) {
		let str = "";

		for (const char of js.split("")) {
			if (char.toLowerCase() != char) {
				str += "-";
			}

			str += char.toLowerCase();
		}

		return str;
	}

	static get f() {
		return document.createDocumentFragment();
	}

	static h(
		tagName: string | ((...children: unknown[]) => unknown),
		attributes: Record<
			string,
			string | Record<string, string> | EventListenerOrEventListenerObject
		>,
		...children: unknown[]
	) {
		if (typeof tagName !== "string" && !(tagName instanceof DocumentFragment)) {
			return tagName({
				...attributes,
				children,
			});
		} else {
			if (tagName == "title") {
				for (const [_, title] of Object.entries(document.getElementsByTagName("title"))) {
					title.remove();
				}
			}

			const element =
				tagName instanceof DocumentFragment
					? tagName
					: this.nameSpaceElements.includes(tagName)
					? document.createElementNS("http://www.w3.org/2000/svg", tagName)
					: tagName == "raw"
					? document.createElement("div")
					: document.createElement(tagName);

			if (!(element instanceof DocumentFragment) && attributes != undefined) {
				for (const [key, value] of Object.entries(attributes)) {
					if (key.startsWith("on")) {
						element.addEventListener(
							key.substring(2).toLowerCase(),
							value as EventListenerOrEventListenerObject
						);
					} else {
						switch(key) {
							case "className": {
								element.setAttribute("class", value as string);
								break;
							}

							case "style": {
								if (typeof value == "string") {
									element.setAttribute("style", value);
								} else {
									let styleStr = '';
									for (const [property, pValue] of Object.entries(value)) {
										styleStr += `${this.jsToHTML(property)}: ${pValue};`;
									}
									element.setAttribute("style", styleStr);
								}

								break;
							}

							default: {
								element.setAttribute(this.jsToHTML(key), value as string);
							}
						}
					}
				}
			}

			const appendChild = (parent: Node, child: Node | string) => {
				if (Array.isArray(child)) {
					for (const value of child) {
						appendChild(parent, value);
					}
				} else if (typeof child === "string") {
					if (tagName == "raw") {
						(element as HTMLDivElement).innerHTML += child;
					} else {
						parent.appendChild(document.createTextNode(child));
					}
				} else if (child instanceof Node) {
					parent.appendChild(child);
				} else if (typeof child !== "boolean") {
					parent.appendChild(document.createTextNode(String(child)));
				}
			};

			for (const child of children) {
				if (child == undefined) continue;
				appendChild(element, child as Node | string);
			}

			return element;
		}
	}
}

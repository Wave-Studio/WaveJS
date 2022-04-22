/**
 * WaveJS
 *
 * Developed by Wave Studios
 */

// Hopefully the last time I'll be rewriting this
import { Head } from "./elements/index";

export default class WaveJS {
	private static readonly svgTypes: string[] = [
		"svg",
		"animate",
		"animateMotion",
		"animateTransform",
		"circle",
		"clipPath",
		"defs",
		"desc",
		"ellipse",
		"feBlend",
		"feColorMatrix",
		"feComponentTransfer",
		"feComposite",
		"feConvolveMatrix",
		"feDiffuseLighting",
		"feDisplacementMap",
		"feDistantLight",
		"feDropShadow",
		"feFlood",
		"feFuncA",
		"feFuncB",
		"feFuncG",
		"feFuncR",
		"feGaussianBlur",
		"feImage",
		"feMerge",
		"feMergeNode",
		"feMorphology",
		"feOffset",
		"fePointLight",
		"feSpecularLighting",
		"feSpotLight",
		"feTile",
		"feTurbulence",
		"filter",
		"foreignObject",
		"g",
		"image",
		"line",
		"linearGradient",
		"marker",
		"mask",
		"metadata",
		"mpath",
		"path",
		"pattern",
		"polygon",
		"polyline",
		"radialGradient",
		"rect",
		"script",
		"set",
		"stop",
		"style",
		"svg",
		"switch",
		"symbol",
		"text",
		"textPath",
		"title",
		"tspan",
		"use",
		"view",
	];

	private static currentPage: {
		title: string;
		page: () => unknown | string;
		props?: { [key: string]: unknown };
	} = {
		title: "WaveJS Page",
		page: () => "",
	};

	private static stateNumber = -1;
	static states: unknown[] = [];

	static useState = <T>(initialValue: T): [T, (state: T) => void] => {
		WaveJS.stateNumber += 1;
		// Freeze the number
		const stateNum = new Number(WaveJS.stateNumber) as number;

		if (WaveJS.states[stateNum] === undefined) {
			WaveJS.states[stateNum] = initialValue;
		}

		return [
			WaveJS.states[stateNum] as T,
			(newState) => {
				WaveJS.states[stateNum] = newState;
				WaveJS.stateNumber = -1;
				const { page, title, props } = WaveJS.currentPage;
				WaveJS.renderPage(page, title, props ?? undefined);
			},
		];
	};

	static useSessionState = <T>(
		initialValue: T
	): [() => T, (state: T) => void] => {
		return [() => initialValue, (newState) => (initialValue = newState)];
	};

	static get f(): DocumentFragment {
		return document.createDocumentFragment();
	}

	// Yw lukas
	static page(
		{
			title = "WaveJS Page",
		}: {
			title?: string;
		},
		page: () => unknown | string
	) {
		if (page == undefined) {
			throw new Error("Page does not have render function");
		} else {
			WaveJS.renderPage(page, title);
		}
	}

	static renderPage(
		page: (...args: (unknown | { children: unknown })[]) => unknown | string,
		title: string,
		props?: { [key: string]: unknown }
	) {
		this.currentPage = {
			page,
			title,
			props: props ?? undefined,
		};

		const result =
			page instanceof HTMLElement || page instanceof DocumentFragment
				? page
				: typeof page == "string"
				? page
				: page(props);

		document.getElementById("app")!.innerHTML = "";
		if (document.title != title) {
			document.title = title;
		}
		if (!(result instanceof HTMLElement)) {
			document.getElementById("app")!.innerHTML = result as string;
		} else {
			document.getElementById("app")!.appendChild(result as Node);
		}
	}

	static css(props: { [key: string]: boolean }, json: WJSJsonCSS) {
		let classes = "";

		for (const key in json) {
			const value = json[key];
			if (key.toLowerCase() == "always" || props[key] == true) {
				classes += ` ${value}`;
			}
		}

		return classes.substring(1);
	}

	static h(
		tagName:
			| string
			| ((...args: unknown[]) => Element | DocumentFragment)
			| DocumentFragment,
		attributes: JSX.AttributeCollection | null,
		...children: unknown[]
	): Element | DocumentFragment {
		if (typeof tagName !== "string" && !(tagName instanceof DocumentFragment)) {
			return tagName(attributes ?? { children });
		} else {
			if (tagName == "head") {
				return Head({ children });
			}
			const element = WaveJS.convertNameToElement(tagName);

			if (attributes == undefined) {
				attributes = { children: undefined };
			}

			if (element instanceof HTMLElement || element instanceof SVGElement) {
				for (const attribute in attributes) {
					if (attribute == "children") continue;
					if (attribute.startsWith("on")) {
						element.addEventListener(
							attribute.substring(2).toLowerCase() as keyof HTMLElementEventMap,
							attributes[attribute] as unknown as () => void
						);
					} else {
						if (attribute === "style") {
							if (typeof attributes[attribute] != "string") {
								let styles = "";
								for (const style in attributes[attribute] as {
									[key: string]: string;
								}) {
									let styleName = "";
									for (const char of style.split("")) {
										if (char.toLowerCase() == char) {
											styleName += char;
										} else {
											styleName += `-${char.toLowerCase()}`;
										}
									}
									styles += `${styleName}: ${
										(attributes["style"] as { [key: string]: string })![style]
									};`;
								}
								attributes[attribute] = styles;
							}
						}

						if (["class", "classname"].includes(attribute.toLowerCase())) {
							const prevclass = element.getAttribute("class") ?? "";

							element.setAttribute(
								"class",
								prevclass +
									`${prevclass == "" ? "" : " "}${attributes[attribute]}`
							);
							continue;
						}

						element.setAttribute(attribute, attributes[attribute] as string);
					}
				}
			}

			const appendChild = (parent: Node, child: Node | string) => {
				if (child == undefined) {
					return;
				}

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

			return element;
		}
	}

	private static isNamespaceElement(tagName: string): boolean {
		return WaveJS.svgTypes.includes(tagName);
	}

	private static convertNameToElement(tagName: string | DocumentFragment) {
		if (tagName instanceof DocumentFragment) {
			return tagName;
		}

		if (WaveJS.isNamespaceElement(tagName)) {
			return document.createElementNS("http://www.w3.org/2000/svg", tagName);
		}

		return document.createElement(tagName);
	}
}

import { jsToHTML } from "./utils.ts";

export const f = "fragment";

const nameSpaceElements = [
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

export const h = (
	tagName: string | ((...children: unknown[]) => unknown),
	attributes: Record<
		string,
		string | Record<string, string> | EventListenerOrEventListenerObject
	>,
	...children: unknown[]
) => {
	if (tagName == "fragment") {
		return document.createDocumentFragment();
	} else {
		if (typeof tagName == "function") {
			return tagName({ ...attributes, children });
		} else {
			const element = nameSpaceElements.includes(tagName)
				? document.createElementNS("http://www.w3.org/2000/svg", tagName)
				: document.createElement(tagName);

			for (const [key, value] of Object.entries(attributes)) {
				if (key.startsWith("on")) {
					element.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
				} else {
					switch (key) {
						case "style": {
							if (typeof value == "string") {
								element.style.cssText += value;
							} else {
								let cssString = "";
								for (const [styleKey, styleValue] of Object.entries(value)) {
									cssString += `${jsToHTML(styleKey)}: ${styleValue}; `;
								}
								element.style.cssText += cssString.trim();
							}
							break;
						}

						case "className":
						case "class": {
							element.setAttribute("class", jsToHTML(value as string));
							break;
						}

						case "children": {
							break;
						}

						default: {
							element.setAttribute(jsToHTML(key), value as string);
						}
					}
				}
			}
		}
	}
};

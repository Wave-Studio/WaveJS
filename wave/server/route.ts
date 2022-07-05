import { fileTypes } from "../assets/mediatypes.ts";
import { WJSConfig } from "../../wave.config.ts";

const routeMap = JSON.parse(await Deno.readTextFile("./.wavejs/routes.json"));

const htmlTemplate = (
	await Deno.readTextFile("./wave/assets/templates/route.html")
)
	.replace(/<!-- WJS_SITE_NAME -->/g, WJSConfig.sitename)
	.replace(/<!-- WJS_HEAD_INJECT -->/g, WJSConfig.htmlInject?.head ?? "")
	.replace(
		/<!-- WJS_BODY_PRE_INJECT -->/g,
		WJSConfig.htmlInject?.body?.beforeApp ?? ""
	)
	.replace(
		/<!-- WJS_BODY_POST_INJECT -->/g,
		WJSConfig.htmlInject?.body?.afterApp ?? ""
	);

export const renderRoute = async (
	req: Request
): Promise<{ status: 404 } | { status: 200; content: Response }> => {
	const { pathname } = new URL(req.url);
	if (pathname.includes(".")) {
		const extension = `${pathname.substring(pathname.lastIndexOf("."))}`;
		const fileType =
			fileTypes[extension] != undefined
				? `${fileTypes[extension]}`
				: "application/octet-stream";

		try {
			return {
				status: 200,
				content: new Response(
					await Deno.readFile(`./.wavejs/dist${pathname}`),
					{
						headers: {
							"content-type": fileType,
						},
						status: 200,
					}
				),
			};
		} catch {
			try {
				return {
					status: 200,
					content: new Response(
						await Deno.readFile(`./.wavejs/assets${pathname}`),
						{
							headers: {
								"content-type": fileType,
							},
							status: 200,
						}
					),
				};
			} catch {
				return { status: 404 };
			}
		}
	} else {
		const { pageData } = isRouteValid(pathname);

		if (pageData == undefined) {
			return {
				status: 404,
			};
		} else {
			pageData.page = pageData.page.substring("./.wavejs/dist".length);

			if (pageData.server != undefined) {
				const res = await (await import(`../.${pageData.server}`)).default();

				return {
					status: res.accessStatus ?? 200,
					content: new Response(
						jsToHTML(pageData.page, false)
							.replace(
								/<!-- WJS_STYLE_INJECT -->/g,
								pageData.style != undefined
									? `<link rel="stylesheet" href="${pageData.style.substring(
											"./.wavejs/dist".length
									  )}">`
									: ""
							)
							.replace(
								/\/\* WJS_DATA_INJECT \*\//g,
								/* javascript */ `globalThis.WJS_SERVER_PROPS = ${JSON.stringify(
									res
								)};`
							),
						{
							headers: {
								"content-type": fileTypes[".html"],
							},
						}
					),
				};
			} else {
				return {
					status: 200,
					content: new Response(
						jsToHTML(pageData.page).replace(
							/<!-- WJS_STYLE_INJECT -->/g,
							pageData.style != undefined
								? `<link rel="stylesheet" href="${pageData.style.substring(
										"./.wavejs/dist".length
								  )}">`
								: ""
						),
						{
							headers: {
								"content-type": fileTypes[".html"],
							},
						}
					),
				};
			}
		}
	}
};

export const isRouteValid = (
	path: string,
	routeJSON = routeMap
): {
	pageData: undefined | { page: string; server?: string; style?: string };
} => {
	if (path.startsWith("/")) {
		path = path.substring(1);
	}

	if (path.endsWith("/")) {
		path = path.substring(0, path.length - 1);
	}

	const [first, ...rest] = path.split("/");

	if (routeJSON[first] != undefined) {
		if (rest.length < 1) {
			const map = routeJSON[first];
			if (map.path != undefined) {
				return {
					pageData: {
						page: map.path,
						server: map.server ?? undefined,
						style: map.style ?? undefined,
					},
				};
			} else {
				if (map.index != undefined) {
					return {
						pageData: {
							page: map.index.path,
							server: map.index.server ?? undefined,
							style: map.index.style ?? undefined,
						},
					};
				}
			}
		} else {
			return isRouteValid(rest.join("/"), routeJSON[first]);
		}
	}

	if (path == "") {
		if (routeJSON.index != undefined) {
			return {
				pageData: {
					page: routeJSON.index.path,
					server: routeJSON.index.server ?? undefined,
				},
			};
		}
	}

	return {
		pageData: undefined,
	};
};

export const jsToHTML = (path: string, replace = true) => {
	let template = htmlTemplate.replace(/<!-- WJS_JS_FILE -->/g, path);

	if (replace) {
		template = template.replace(/<!-- WJS_DATA_INJECT -->/g, "");
	}

	return template
		.split("\n")
		.map((l: string) => l.trim())
		.join("");
};

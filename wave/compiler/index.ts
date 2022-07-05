import { bundle } from "https://deno.land/x/emit@0.2.0/mod.ts";
import {
	yellow,
	red,
	green,
	brightBlue,
	blue,
	cyan,
} from "https://deno.land/std@0.141.0/fmt/colors.ts";
import { copy } from "https://deno.land/std@0.141.0/fs/copy.ts";
import { getEmojiByName } from "https://deno.land/x/getmoji@1.2.4/mod.ts";
import scss from "https://deno.land/x/denosass@1.0.4/mod.ts";

const prefix = [blue("["), cyan("Wave"), brightBlue("JS"), blue("]")].join("");

const convertMsToString = (ms: number) => {
	let seconds = Math.floor(ms / 1000);
	ms -= seconds * 1000;
	let minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;
	let hours = Math.floor(minutes / 60);
	minutes -= hours * 60;
	let days = Math.floor(hours / 24);
	hours -= days * 24;
	const weeks = Math.floor(days / 7);
	days -= weeks * 7;

	return [
		weeks > 0 ? `${weeks}w` : "",
		days > 0 ? `${days}d` : "",
		hours > 0 ? `${hours}h` : "",
		minutes > 0 ? `${minutes}m` : "",
		seconds > 0 ? `${seconds}s` : "",
		ms > 0 ? `${ms}ms` : "",
	].join("");
};

try {
	await Deno.remove("./.wavejs", { recursive: true });
} catch {
	// Ignore
}

const pageRoutes: {
	path: string;
	internalSaveRoute?: string;
	style: boolean;
}[] = [
	{
		path: "./wave/assets/jsx/404.tsx",
		style: false,
		internalSaveRoute: "./.wavejs/dist/404.js",
	},
	{
		path: "./wave/assets/jsx/error.tsx",
		style: false,
		internalSaveRoute: "./.wavejs/dist/error.js",
	},
	{
		path: "./wave/assets/dom.ts",
		style: false,
		internalSaveRoute: "./.wavejs/assets/dom.js",
	},
	{
		path: "./wave/assets/runtime.tsx",
		style: false,
		internalSaveRoute: "./.wavejs/assets/runtime.js",
	},
];

interface PageRoute {
	path: string;
	server?: string;
	style?: string;
}

interface PageRecurse {
	[key: string]: PageRecurse | PageRoute;
}

const builtRoutes: PageRecurse = {};

const walkPath = async (path: string) => {
	for await (const route of Deno.readDir(path)) {
		if (route.isFile) {
			for (const extension of [".tsx", ".ts", ".js", ".jsx", ".scss"]) {
				if (route.name.toLowerCase().endsWith(extension)) {
					const isStyle = extension == ".scss";
					pageRoutes.push({
						path: `${path}/${route.name}`,
						style: isStyle,
					});
				}
			}
		} else {
			if (route.isDirectory) {
				await Deno.mkdir(
					`./.wavejs/dist${path.substring("./pages".length)}/${route.name}`,
					{ recursive: true }
				);
				await walkPath(`${path}/${route.name}`);
			}
		}
	}
};

const saveRouteData = (
	path: string,
	remaningPath = path,
	json = builtRoutes
) => {
	if (remaningPath.startsWith("./")) {
		remaningPath = remaningPath.substring(2);
	}

	if (remaningPath.startsWith(".wavejs/dist")) {
		remaningPath = remaningPath.substring(".wavejs/dist/".length);
	}

	const [first, ...rest] = remaningPath.split("/");

	if (rest.length > 0) {
		json[first] = json[first] ?? {};
		saveRouteData(path, rest.join("/"), json[first] as PageRecurse);
	} else {
		const serverRoute = remaningPath.toLowerCase().endsWith(".server.js");
		const styleRoute = remaningPath.toLowerCase().endsWith(".css");
		let finalData = "";

		if (serverRoute) {
			finalData = remaningPath.substring(
				0,
				remaningPath.length - `.server.js`.length
			);
		} else {
			if (styleRoute) {
				finalData = remaningPath.substring(
					0,
					remaningPath.length - `.css`.length
				);
			} else {
				finalData = remaningPath.substring(
					0,
					remaningPath.length - `.js`.length
				);
			}
		}
		const toSave = { ...((json[finalData] as unknown as PageRoute) ?? {}) };

		if (serverRoute) {
			toSave["server"] = path;
		} else {
			if (styleRoute) {
				toSave["style"] = path;
			} else {
				toSave["path"] = path;
			}
		}

		json[finalData] = toSave;
	}
};

await walkPath("./pages");

const startCompileTime = Date.now();

await Deno.mkdir("./.wavejs/dist", { recursive: true });
await copy("./public", "./.wavejs/assets");

for (let i = 0; i < pageRoutes.length; i++) {
	const route = pageRoutes[i];
	const { path, style } = route;
	const saveRoute =
		route.internalSaveRoute ??
		`./.wavejs/dist${path
			.substring("./pages".length)
			.substring(0, path.substring("./pages".length).lastIndexOf("."))}.${
			style ? "css" : "js"
		}`;

	console.log(
		`${prefix} ${await getEmojiByName("hourglass")} ${yellow(
			`[${i + 1}/${pageRoutes.length}] Compiling ${
				route.internalSaveRoute != undefined
					? `WAVE_INTERNAL${path.substring(path.lastIndexOf("/"))}`
					: `${path}`
			}`
		)}`
	);

	try {
		let dist = "";

		let last = path.split("/")[path.split("/").length - 1];
		last = last.substring(0, last.lastIndexOf("."));

		for (const ext of ["server", "path", "style"]) {
			if (last.toLowerCase() == ext) {
				throw new Error(`Paths cannot be ${last}`);
			}
		}

		const start = Date.now();
		if (style) {
			dist = await scss(path, {
				quiet: true,
				style: "compressed",
			})
				.to_string()
				.toString();
		} else {
			const { code } = await bundle(path, {
				compilerOptions: {
					jsx: "jsx",
					jsxFactory: "WJS.h",
					jsxFragmentFactory: "WJS.f",
					inlineSourceMap: false,
				},
			});

			dist = code
				.split("\n")
				.slice(0, code.split("\n").length - 2)
				.join("\n");
		}

		await saveRouteData(saveRoute);

		await Deno.writeTextFile(saveRoute, dist);
		const end = Date.now();

		console.log(
			`${prefix} ${await getEmojiByName("white_check_mark")} ${green(
				`[${i + 1}/${pageRoutes.length}] Compiled ${
					route.internalSaveRoute != undefined
						? `WAVE_INTERNAL${path.substring(path.lastIndexOf("/"))}`
						: `${path}`
				} (${convertMsToString(end - start)})`
			)}`
		);
	} catch (e) {
		console.log(
			`${prefix} ${await getEmojiByName("exclamation")} [${i + 1}/${
				pageRoutes.length
			}] ${red(`Error compiling: ${path}`)}`
		);
		console.error(e);
		Deno.exit(1);
	}
}

await Deno.writeTextFile("./.wavejs/routes.json", JSON.stringify(builtRoutes));

const endCompileTime = Date.now();

console.log(
	`${prefix} ${await getEmojiByName("checkered_flag")} ${green(
		`[${pageRoutes.length}/${pageRoutes.length}] Compiled ${
			pageRoutes.length
		} files in ${convertMsToString(endCompileTime - startCompileTime)}`
	)}`
);

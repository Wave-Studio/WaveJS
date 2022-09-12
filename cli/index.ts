import {
	brightBlue,
	cyan,
	gray,
	dim,
	bold,
	red,
} from "https://deno.land/std@0.152.0/fmt/colors.ts";

import createProject from "./create.ts";

const prefix = `${cyan("Wave")}${brightBlue("JS")} ${gray("|")} `;

const [action, ...args] = Deno.args.map((arg) => arg.toLowerCase());

const isProject = async () => {
	const projectURL = Deno.cwd();
	const config = `${projectURL}/wave.config.ts`;

	try {
		await Deno.readTextFile(config);
	} catch {
		return false;
	}

	return true;
};

switch (action) {
	case "create": {
		if (args.length == 0) {
			const name =
				prompt(
					`${prefix}Enter the name for your project ${dim("[wave-project]")}:`
				) ?? "wave-project";
			createProject(name.toLowerCase());
		} else {
			createProject(args[0].toLowerCase());
		}

		break;
	}

	case "build": {
		if (!(await isProject())) {
			console.log(`${prefix}${red("You are not in a WaveJS project.")}`);
		} else {
			const compileWorker = new Worker(new URL("./workers/compile.ts", import.meta.url), {
				type: "module",
			});
			compileWorker.postMessage({ watch: false });
		}
		break;
	}

	case "serve": {
		if (!(await isProject())) {
			console.log(`${prefix}${red("You are not in a WaveJS project.")}`);
		} else {
			const serverWorker = new Worker(new URL("./workers/server.ts", import.meta.url), {
				type: "module",
			});
			serverWorker.postMessage({ watch: false });
		}
		break;
	}

	case "dev": {
		if (!(await isProject())) {
			console.log(`${prefix}${red("You are not in a WaveJS project.")}`);
		} else {
			const compileWorker = new Worker(new URL("./workers/compile.ts", import.meta.url), {
				type: "module",
			});
			const serverWorker = new Worker(new URL("./workers/server.ts", import.meta.url), {
				type: "module",
			});
			compileWorker.postMessage({ watch: true });
			serverWorker.postMessage({ watch: true });
		}
		break;
	}

	default: {
		console.log(
			[
				`${prefix} ${gray(`CLI version ${bold(`v1.0.0 - Help Menu`)}`)}`,
				``,
				brightBlue(`Project options: `),
				cyan(` > ${bold("Create")} - Create a new project`),
				cyan(` > ${bold("Build")} - Build the project`),
				cyan(` > ${bold("Serve")} - Start the project's server`),
				cyan(` > ${bold("Dev")} - Start the project's development server`),
				``,
				brightBlue(`General options: `),
				cyan(` > ${bold("Help")} - Show this menu`),
			].join("\n")
		);
	}
}

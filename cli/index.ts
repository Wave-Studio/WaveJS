import {
	brightBlue,
	cyan,
	gray,
	dim,
	bold,
} from "https://deno.land/std@0.152.0/fmt/colors.ts";

import createProject from "./create.ts";

const prefix = `${cyan("Wave")}${brightBlue("JS")} ${gray("|")} `;

const [action, ...args] = Deno.args.map((arg) => arg.toLowerCase());

switch (action) {
	case "create": {
		if (args.length == 0) {
			const name =
				prompt(
					`${prefix}Enter the name for your project ${dim("[wavejs-project]")}:`
				) ?? "wavejs-project";
			createProject(name.toLowerCase());
		} else {
			createProject(args[0].toLowerCase());
		}

		break;
	}

	case "new": {
		break;
	}

	case "build": {
		break;
	}

	case "serve": {
		break;
	}

	case "dev": {
		break;
	}

	default: {
		console.log(
			[
				`${prefix} ${gray(`CLI version ${bold(`v1.0.0 - Help Menu`)}`)}`,
				``,
				brightBlue(`Project options: `),
				cyan(` > ${bold("Create")} - Create a new project`),
				cyan(` > ${bold("New")} - Create a new route in an existing project`),
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

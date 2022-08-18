import {
	cyan,
	brightBlue,
	gray,
	red,
	green,
} from "https://deno.land/std@0.152.0/fmt/colors.ts";
import {
	CONFIG,
	COUNTER,
	DENOCONFIG,
	GITIGNORE,
	IMPORTS,
	INDEX,
	JSXTYPES,
	README,
	WAVEJSDTS,
	WAVEJSTS,
} from "./projectfiles.ts";
const prefix = `${cyan("Wave")}${brightBlue("JS")} ${gray("|")} `;

export default async function createProject(name: string) {
	const localPath = Deno.cwd();
	// I would use new URL but it's being buggy
	const projectURL = `${localPath}/${name}`;

	try {
		await Deno.mkdir(projectURL);
	} catch {
		console.log(
			`${prefix}${red("Project already exists! Please choose another name.")}`
		);
		return;
	}

	for (const path of [
		"pages",
		"components",
		"public",
		".wavejs/internal",
		".vscode",
	]) {
		await Deno.mkdir(`${projectURL}/${path}`, { recursive: true });
	}

	await Deno.writeTextFile(`${projectURL}/README.md`, README);
	await Deno.writeTextFile(`${projectURL}/wavejs.config.ts`, CONFIG);
	await Deno.writeTextFile(`${projectURL}/pages/index.tsx`, INDEX);
	await Deno.writeTextFile(`${projectURL}/components/counter.tsx`, COUNTER);
	await Deno.writeTextFile(`${projectURL}/imports.json`, IMPORTS);
	await Deno.writeTextFile(
		`${projectURL}/.wavejs/internal/wavejs.d.ts`,
		WAVEJSDTS
	);
	await Deno.writeTextFile(
		`${projectURL}/.wavejs/internal/jsx.d.ts`,
		JSXTYPES
	);
	await Deno.writeTextFile(
		`${projectURL}/.wavejs/internal/wavejs.ts`,
		WAVEJSTS
	);
	await Deno.writeTextFile(`${projectURL}/deno.jsonc`, DENOCONFIG);
	await Deno.writeTextFile(
		`${projectURL}/.vscode/settings.json`,
		JSON.stringify(
			{
				"deno.enable": true,
				"deno.lint": true,
				"deno.unstable": true,
				"deno.config": "./deno.jsonc",
			},
			null,
			4
		)
	);
	await Deno.writeTextFile(
		`${projectURL}/.gitattributes`,
		"# Auto detect text files and perform LF normalization\n* text=auto"
	);
	await Deno.writeTextFile(`${projectURL}/.gitignore`, GITIGNORE);

	console.log(
		`${prefix}${green(
			`Project created! Use ${gray(`cd ${name}`)} and ${gray(
				`wavejs dev`
			)} to get started.`
		)}`
	);
}

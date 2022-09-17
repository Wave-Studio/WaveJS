import {
	cyan,
	brightBlue,
	gray,
	red,
	green,
} from "https://deno.land/std@0.152.0/fmt/colors.ts";

const prefix = `${cyan("Wave")}${brightBlue("JS")} ${gray("|")} `;

export default async function createProject(name: string) {
	const localPath = Deno.cwd();
	// I would use new URL but it's being buggy
	const projectURL = `${localPath}/${name}`;

	try {
		await Deno.mkdir(projectURL, { recursive: true });
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
		".wave/internal",
		".wave/internal/types",
		".vscode",
	]) {
		await Deno.mkdir(`${projectURL}/${path}`, { recursive: true });
	}

	// Template files
	for (const path of [
		".gitattributes",

		".wave/internal/shared.ts",
		".wave/internal/wave.ts",
		".wave/internal/types/wave.d.ts",
		".wave/internal/types/jsx.d.ts",

		"imports.json",
		"deno.jsonc",

		"README.md",
		"wave.config.ts",

		"pages/index.tsx",
		"components/counter.tsx",
	]) {
		await Deno.writeTextFile(
			`${projectURL}/${path}`,
			await Deno.readTextFile(
				new URL(`./templates/${path}`, import.meta.url).href.substring("file://".length)
			)
		);
	}

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
		`${projectURL}/.gitignore`,
		[
			"# Generated by WaveJS CLI",
			"# WaveJS output",
			"/.wave",
			"",
			"# Enviroment variables",
			"/.env",
			"/.env.*",
			"",
			"# Editor files",
			"/.vscode",
		].join("\n")
	);

	console.log(
		`${prefix}${green(
			`Project created! Use ${gray(`cd ${name}`)} and ${gray(
				`wave dev`
			)} to get started.`
		)}`
	);
}

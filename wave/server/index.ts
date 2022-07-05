import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import {
	green,
	brightBlue,
	blue,
	cyan,
} from "https://deno.land/std@0.140.0/fmt/colors.ts";
import { renderRoute, jsToHTML } from "./route.ts";
import { fileTypes } from "../assets/mediatypes.ts";

const prefix = `${[blue("["), cyan("Wave"), brightBlue("JS"), blue("]")].join(
	""
)} `;

console.log(`${prefix}${green("Starting WaveJS server")}`);

await serve(
	async (req) => {
		const res = await renderRoute(req);
		if (res.status == 200) {
			return res.content;
		} else {
			return new Response(jsToHTML("404.js"), {
				headers: {
					"content-type": fileTypes[".html"],
				},
				status: 404
			})
		}
	},
	{
		port: parseInt(`${Deno.args[0] ?? 3000}`),
		onListen({ port, hostname }) {
			if (hostname == "0.0.0.0") {
				hostname = "localhost";
			}
			console.log(`${prefix}${green(`Started server on ${hostname}:${port}`)}`);
		},
		onError(error) {
			console.log(
				`${prefix}\x1b[31mAn error occured while rending:`,
				error,
				"\x1b[39m"
			);

			return new Response("error");
		},
	}
);

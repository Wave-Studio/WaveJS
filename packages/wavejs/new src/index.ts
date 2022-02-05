/**
 * WaveJS
 *
 * @author Wave-studios
 */

if (document.getElementById("wjs-app") == null) {
	const div = document.createElement("div");
	div.id = "wjs-app";
	document.body.appendChild(div);
}

export * as WJS from "./runtime";
export * from "./routers";
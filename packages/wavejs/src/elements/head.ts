/**
 * WaveJS
 *
 * Developed by Wave Studios
 */

import { WJS } from "../";

export default function Head({ children }: { children?: unknown[] }) {
	if (children == undefined) throw new Error("Head element requires children");

	for (const child of children) {
		if (child == undefined) throw new Error("Head element requires children");
		document.head.appendChild(child as HTMLElement);
	}

	return WJS.f;
}

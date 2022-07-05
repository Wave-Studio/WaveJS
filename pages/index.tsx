/** @jsx WJS.h */
/** @jsxFrag WJS.f */
import { year } from "../components/vars.ts";

function Head({ children }: { children?: unknown[] }) {
	for (const child of children!) {
		document.head.appendChild(child as Node);
	}

	return <></>;
}

export default function Year() {
	return (
		<>
			<Head>
				<title>{year}</title>
			</Head>

			<h1>Current year: {year}</h1>
		</>
	);
}

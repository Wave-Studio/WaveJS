/** @jsx WJS.h */
/** @jsxFrag WJS.f */

// Same as 404.tsx but for server errors
import { css } from "./shared.ts";

export default function NotFound() {
	return (
		<>
			<div className="main">
				<h1>500</h1>
				<p>Server error</p>
			</div>
			<style>{css}</style>
		</>
	);
}

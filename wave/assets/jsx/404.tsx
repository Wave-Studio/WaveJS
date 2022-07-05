/** @jsx WJS.h */
/** @jsxFrag WJS.f */
import { css } from "./shared.ts";

export default function NotFound() {
	return (
		<>
			<div className="main">
				<h1>404</h1>
				<p>Page not found</p>
			</div>
			<style>{css}</style>
		</>
	);
}

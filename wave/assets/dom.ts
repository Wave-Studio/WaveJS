// @ts-expect-error Typing issue
const file = (await import(globalThis.WJS_SCRIPT)).default;

// @ts-expect-error Typing issue
globalThis.WJS_RERENDER_FUNCTION = async () => {
	// TODO: Replace with proper replacement method
	document.getElementById("_WAVEJS_APP")!.innerHTML = "";

	document
		.getElementById("_WAVEJS_APP")!
		.appendChild(
			// @ts-expect-error Typing issue
			await file({ props: globalThis.WJS_SERVER_PROPS ?? undefined })
		);
};

// @ts-expect-error Typing issue
globalThis.WJS_RERENDER_FUNCTION();

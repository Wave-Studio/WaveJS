import { hookData, hookIndex } from "./shared.ts";

export const version = "0.0.1";

// TODO: Add actual wave stuff

export const useState = <T>(initialState: T): [T, (value: T) => void] => {
	hookIndex(hookIndex() + 1);
	if (hookData[hookIndex()] === undefined) {
		hookData[hookIndex()] = initialState;
	}
	return [
		hookData[hookIndex()] as T,
		(value: T) => {
			hookData[hookIndex()] = value;
		},
	];
};

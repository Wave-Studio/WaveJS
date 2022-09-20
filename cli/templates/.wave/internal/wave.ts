import { hookData, hookIndex } from "./shared.ts";

export const version = "0.0.1";

// TODO: Add actual wave stuff

export const useState = <T>(initialState: T): [T, (value: T) => void] => {
	const index = hookIndex();

	if (hookData[index] === undefined) {
		hookData[index] = initialState;
	}

	return [
		hookData[index] as T,
		(value: T) => {
			hookData[index] = value;
		},
	];
};


export const useEffect = (callback: () => void, dependencies: unknown[]) => {
	const [useEffectDeps, setUseEffectDeps] = useState<null | unknown[]>(null);

	if (useEffectDeps == null || dependencies != useEffectDeps) {
		setUseEffectDeps(dependencies);
		callback();
	}
}

export const onMount = (callback: () => void) => {
	useEffect(callback, []);
}
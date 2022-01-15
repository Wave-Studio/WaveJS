/**
 * WaveJS
 *
 * @author Wave-studios
 */

export class WJS {
	// States
	private static states: unknown[] = [];
	private static stateNum = -1;

	static useState<T>(initialState: T): [T, (newState: T) => void] {
		this.stateNum += 1;
		const state = parseInt(new Number(this.stateNum).toString());

		if (this.states[state] == undefined) {
			this.states[state] = initialState;
		}

		return [
			this.states[state] as T,
			(newState: T) => {
				this.states[state] = newState;
				this.stateNum = -1;
			},
		];
	}

	// Compiling JSX
	static get f() {
		return document.createDocumentFragment();
	}

	static h(
		tagName: string | ((props: JSX.AttributeCollection) => unknown) | DocumentFragment,
		attributes: JSX.AttributeCollection,
		children: unknown[]
	) {
		if (typeof tagName == "function" && !(tagName instanceof DocumentFragment)) {
			return tagName({ ...attributes, children });
		}
	}
}

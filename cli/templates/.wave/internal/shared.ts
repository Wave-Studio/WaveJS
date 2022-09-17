let internalHookIndex = -1;

export const hookIndex = (num?: number) => {
	if (num !== undefined) {
		internalHookIndex = num;
	}
	return internalHookIndex;
};
export const hookData: unknown[] = [];

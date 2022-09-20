let internalHookIndex = -1;

export const hookIndex = () => {
	internalHookIndex++;
	return internalHookIndex;
};
export const hookData: unknown[] = [];

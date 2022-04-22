/**
 * WaveJS
 *
 * @author Wave-studio
 */

export const htmlifyName = (name: string) => {
	let htmlName = "";

	for (const char of name) {
		htmlName += `${char.toLowerCase() != char ? "-" : ""}${char.toLowerCase()}`;
	}

	return htmlName;
};

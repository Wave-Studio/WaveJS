export const jsToHTML = (js: string) => {
	let str = "";
	for (const __char of js.split("")){
		if (__char.toLowerCase() != __char) {
			str += "-";
		}
		str += __char.toLowerCase();
	}
	return str;
}
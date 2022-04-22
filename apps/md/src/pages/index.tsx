import { marked } from "marked";

export default function WJSApp() {
	return <raw id="md">{marked(md)}</raw>;
}

const md = `
# Hello Mario
## Example of WJS Md support
\`\`\`typescript
console.log("Hello WJS");
\`\`\``;

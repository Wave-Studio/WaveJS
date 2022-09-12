self.onmessage = (e) => {
	const { watch } = e.data;
	const path = Deno.cwd();
	console.log("Server", watch, path);
	self.close();
}
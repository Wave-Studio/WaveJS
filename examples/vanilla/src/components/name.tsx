export default function Name() {
	const [name, setName] = WJS.useState("Hi");
	return (
		<>
			<h2>Input Example</h2>
			<p>
				{name == ""
					? "Type something and press Submit"
					: `You typed: ${name}`}
			</p>
			<form
				onSubmit={(e: SubmitEvent) => {
					e.preventDefault();
					setName(
						// Browser Javascript support
						(document.getElementById("form") as HTMLInputElement)?.value ?? ""
					);
				}}
			>
				<input id="form" type="text" placeholder="Name" value={name} />
				<br />
				<button
					type="sumbit"
					style={{
						marginTop: "0.5em",
					}}
				>
					Submit
				</button>
			</form>
		</>
	);
}

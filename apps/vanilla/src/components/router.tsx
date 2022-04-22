export default function Router() {
	return (
		<>
			<h2>WaveJS Router</h2>
			<p>
				Current route: <code>{location.hash == "" ? "#" : location.hash}</code>
			</p>
			<a href="#">Go home</a>
			<br />
			<br />
			<a href="#invalid-route">Go to an invalid route</a>
			<br />
			<br />
			<a href="#myapp">Go to a valid route</a>
		</>
	);
}

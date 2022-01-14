import "./style.css";
import Counter from "../components/counter";
import Name from "../components/name";
import Router from "../components/router";

export default function WJSApp(invalid = false) {
	return (
		<div
			style={{
				textAlign: "center",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<div
				style={{
					backgroundColor: "#23272A",
					padding: "1rem",
					borderRadius: "0.5rem",
				}}
			>
				{invalid ? (
					<>
						<h2>404</h2>
						<h4>Unable to find that!</h4>
						<a href="#">Go home</a>
					</>
				) : (
					<>
						<h2>Welcome to WaveJS!</h2>
						<p className="l">A Lightweight alternative to ReactJS</p>
						<hr />
						<div>
							<h2>Getting Started</h2>
							<p className="l">
								To get started modify <code>src/pages/index.tsx</code>
								<br />
								<br />
								Your code will automatically be reloaded.
							</p>
						</div>
						<div
							className={WJS.css(
								{ diffcolor: Math.random() >= 0.5 },
								{ always: "red", diffcolor: "blue" }
							)}
							onClick={() => {
								location.reload();
							}}
						>
							<p>
								Blue = {">"} 0.5
								<br />
								Red = {"<"} 0.5
								<br />
								Click to reload
							</p>
						</div>
						<hr />
						<Counter />
						<hr />
						<Name />
						<hr />
						<Router />
					</>
				)}
			</div>
		</div>
	);
}

export default function Counter() {
	const [count, setCount] = WJS.useState(0);
	return (
		<>
			<h2>Counter Example</h2>
			<p>Count: {count}</p>
			<p>Multiple of 10: {count % 10 === 0 ? "Yes" : "No"}</p>
			<button
				style={{ marginRight: `${count > 0 ? "0.5rem" : ""}` }}
				onClick={() => {
					setCount(count + 1)}}
			>
				Increment
			</button>
			{count > 0 ? (
				<button onClick={() => setCount(count - 1)}>Decrement</button>
			) : (
				<></>
			)}
		</>
	);
}

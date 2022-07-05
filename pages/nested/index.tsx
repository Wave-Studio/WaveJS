/** @jsx WJS.h */
/** @jsxFrag WJS.f */

export default function Page({ props }: { [key: string]: unknown }) {
	const [count, setCount] = WJS.useState(0);

	return (
		<>
			<div>{JSON.stringify(props)}</div>
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Counter: {count}
			</button>
		</>
	);
}

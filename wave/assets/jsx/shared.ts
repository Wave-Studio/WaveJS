export const css = /* css */ `@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

:root,
html,
body {
  font-family: "Roboto", sans-serif;
  padding: 0rem;
  margin: 0rem;
}

.main {
  min-height: 100vh;
  background-color: #e6eefc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
	padding: 0rem;
	margin: 0rem;
	font-size: 5rem;
}

hr {
	width: 2rem;
	border: 0.01rem;
	border-color: #e6eefc;
	border-style: solid;
	margin-top: 0rem;
	margin-bottom: 1.5rem;
}

p {
	padding: 0rem;
	margin: 0rem;
	font-size: 1rem;
}

@media (prefers-color-scheme: dark) {
	.main {
		background-color: #0a0b0d;
		color: #e6eefc;
	}
}`;
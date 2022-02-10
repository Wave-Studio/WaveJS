<p align="center">
  <a href="https://wave-studios.netlify.app/jsboard">
    <img src="https://wave-studios.netlify.app/logos/wave.png" height="96" style="border-radius: 0.25rem;">
    <h2 align="center" class="size">Wave.js</h3>
  </a>
  <p align="center">Big things can come from a small package</p>
  <br> </br>
</p>

[![forthebadge](https://forthebadge.com/images/badges/as-seen-on-tv.svg)](https://forthebadge.com)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=for-the-badge)](https://github.com/RichardLitt/standard-readme)

## What is WaveJS?

382 bites minified. Thats ~18,00% than React and ~47,400% less than angular. Wavejs is a tiny package that has all the fancy bells and whistles your favorite frameworks have.

## Syntax

WaveJS is built to have a developer-friendly syntax built on Reacts JSX syntax.

### Syntax Example

```tsx
const Page = () => {
	const [counter, setCounter] = WJS.useState(0);
	return (
		<>
			<button onClick={() => setCounter(counter + 1)}>
				Count: {counter}
			</button>
		</>
	);
}

// Using the built in Hash Router
WJSRouters.HashRouter.create(
	{
		home: { title: "WaveJS Counter", component: Page }
	}
);

// Single page app
WJS.page({ title: "WaveJS Counter" }, Page);
```

## Setup

Using Wave.js is super easy!

### Manual install:
1. Clone WaveJS using `git clone https://github.com/wave-studio/wavejs`
1. Copy the example source code to your project directory
1. Install dependencies (We suggest [Yarn classic](https://classic.yarnpkg.com/lang/en/docs/install/))
1. Run `Yarn dev` or `npm run dev`

### Automated installer:
1. Run the script located [Here](https://github.com/Wave-Studio/WaveJS/blob/master/setup.sh)
1. Install dependencies (We suggest [Yarn classic](https://classic.yarnpkg.com/lang/en/docs/install/))
1. Run `Yarn dev` or `npm run dev`

## FAQ

Refer to our FAQ located [Here](https://github.com/wave-studio/WaveJS/blob/main/FAQ.md)

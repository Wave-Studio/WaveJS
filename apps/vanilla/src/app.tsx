import App from "./pages/index";

WJSRouters.HashRouter.create(
	{
		home: { title: "My WaveJS app", component: App },
		myapp: {
			title: "Another WaveJS route",
			component: App,
		},
		404: {
			title: "404",
			component: () => App(true),
		},
	},
	{
		wrapper: ({ children }) => children(),
	}
);
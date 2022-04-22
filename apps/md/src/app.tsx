import App from "./pages/index";

WJSRouters.HashRouter.create(
	{
		home: { title: "My WaveJS app", component: App }
	}
);
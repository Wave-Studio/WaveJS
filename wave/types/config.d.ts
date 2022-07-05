interface WaveJSConfiguration {
	sitename: string;
	htmlInject?: {
		head?: string;
		body?: {
			beforeApp?: string;
			afterApp?: string;
		};
	}
}
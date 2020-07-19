const PROXY_CONFIG = [
	{
		context: [
			"/jam",
			"/api",
			"/graphql",
			"/assets/config"
		],
		target: "http://localhost:4040",
		secure: false,
		"logLevel": "debug"
	}
];

module.exports = PROXY_CONFIG;

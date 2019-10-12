const PROXY_CONFIG = [
	{
		context: [
			"/api",
			"/assets/config"
		],
		target: "http://localhost:4040",
		secure: false,
		"logLevel": "debug"
	}
];

module.exports = PROXY_CONFIG;

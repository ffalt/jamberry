module.exports = [
	{
		context: [
			"/jam",
			"/api",
			"/graphql",
			'/assets/config'
		],
		secure: false,
		logLevel: "debug",
		target: "http://0.0.0.0:4040",
		bypass: function (request, response, proxyOptions) {
			if (request.url === '/assets/config/config.js') {
				config_json = {
					name: 'Jam Debug',
					fixed: {
						server: 'http://localhost:4200',
						user: 'admin',
						pass: 'admin'
					}
				};
				response.type('text/javascript');
				response.end(`document.jamberry_config = ${JSON.stringify(config_json)};`);
				return true;
			}
			return null;
		}
	}
];

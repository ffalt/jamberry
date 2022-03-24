module.exports = [
	{
		context: [
			"/jam",
			"/api",
			"/graphql"
		],
		target: "http://localhost:4040",
		secure: false,
		"logLevel": "debug"
	}
];

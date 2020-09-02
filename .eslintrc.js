module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": false
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"project": "tsconfig.lint.json",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"extends": [
		'eslint:recommended',
		"plugin:@typescript-eslint/eslint-recommended",
		'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
	],
	"rules": {},
	"overrides": [
		{
			// enable the rule specifically for TypeScript files
			"files": ["*.js"],
			"env": {
				"browser": false,
				"es6": true,
				"node": true
			}
		},
		{
			// enable the rule specifically for TypeScript files
			"files": ["*.ts"],
			"extends": [
				'eslint:recommended',
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended'
			],
			"rules": {
				"@typescript-eslint/no-namespace": [2, {"allowDeclarations": true}],
				"@typescript-eslint/interface-name-prefix": "off",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-inferrable-types": "off",
				"@typescript-eslint/no-empty-interface": "off",
				"@typescript-eslint/no-unused-vars": ["error", {"args": "none"}],
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"@typescript-eslint/member-delimiter-style": [
					"error",
					{
						"multiline": {
							"delimiter": "semi",
							"requireLast": true
						},
						"singleline": {
							"delimiter": "semi",
							"requireLast": false
						}
					}
				]
			}
		}
	]
};

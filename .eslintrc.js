module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": false
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"project": "tsconfig.json",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": "error",
		"@typescript-eslint/await-thenable": "error",
		"@typescript-eslint/ban-ts-ignore": "error",
		"@typescript-eslint/ban-types": "error",
		"@typescript-eslint/class-name-casing": "error",
		"@typescript-eslint/consistent-type-assertions": "error",
		"@typescript-eslint/consistent-type-definitions": "error",
		"@typescript-eslint/explicit-member-accessibility": [
			"error",
			{
				"accessibility": "explicit"
			}
		],
		"indent": "off",
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/interface-name-prefix": "error",
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
		],
		"@typescript-eslint/member-ordering": "error",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-extraneous-class": "error",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-misused-new": "error",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-non-null-assertion": "error",
		"@typescript-eslint/no-param-reassign": "error",
		"@typescript-eslint/no-parameter-properties": "off",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-type-arguments": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/no-var-requires": "error",
		"@typescript-eslint/prefer-for-of": "error",
		"@typescript-eslint/prefer-function-type": "error",
		"@typescript-eslint/prefer-namespace-keyword": "error",
		"@typescript-eslint/promise-function-async": "error",
		"@typescript-eslint/quotes": [
			"error",
			"single",
			{
				"avoidEscape": true
			}
		],
		"@typescript-eslint/restrict-plus-operands": "error",
		"@typescript-eslint/semi": [
			"error",
			"always"
		],
		"@typescript-eslint/space-within-parens": [
			"error",
			"always"
		],
		"@typescript-eslint/strict-boolean-expressions": [
			"off",
			{
				"allowNullable": true
			}
		],
		"@typescript-eslint/triple-slash-reference": "error",
		"@typescript-eslint/type-annotation-spacing": "error",
		"@typescript-eslint/unbound-method": "error",
		"@typescript-eslint/unified-signatures": "error",
		"arrow-body-style": [
			"error",
			"always"
		],
		"arrow-parens": [
			"error",
			"as-needed"
		],
		"camelcase": "error",
		"class-methods-use-this": "error",
		"comma-dangle": "error",
		"complexity": [
			"error",
			{
				"max": 20
			}
		],
		"constructor-super": "error",
		"curly": "error",
		"default-case": "error",
		"dot-notation": "error",
		"eol-last": "error",
		"eqeqeq": [
			"error",
			"smart"
		],
		"guard-for-in": "error",
		"id-blacklist": [
			"error",
			"any",
			"Number",
			"number",
			"String",
			"string",
			"Boolean",
			"boolean",
			"Undefined",
			"undefined"
		],
		"id-match": "error",
		"import/no-default-export": "error",
		"import/no-extraneous-dependencies": "error",
		"import/no-internal-modules": [
			"error",
			{
				"allow": [
					"@app/*",
					"@admin/*",
					"@core/*",
					"@shared/*",
					"@library/*",
					"@jam/*",
					"core-js/*",
					"zone.js/*",
					"rxjs/*",
					"@angular/platform-browser-dynamic/*",
					"@angular/platform-browser/*",
					"@angular/common/*",
					"@angular/cdk/*",
					"@angular/router/*",
					"@angular/material/*",
					"@angular/core/testing/*"
				]
			}
		],
		"import/no-unassigned-import": "error",
		"import/order": "error",
		"jsdoc/no-types": "off",
		"max-classes-per-file": [
			"error",
			2
		],
		"max-len": [
			"error",
			{
				"code": 240
			}
		],
		"max-lines": [
			"error",
			1000
		],
		"new-parens": "error",
		"newline-per-chained-call": "off",
		"no-bitwise": "error",
		"no-caller": "error",
		"no-cond-assign": "error",
		"no-console": [
			"error",
			{
				"allow": [
					"warn",
					"dir",
					"timeLog",
					"assert",
					"clear",
					"count",
					"countReset",
					"group",
					"groupEnd",
					"table",
					"dirxml",
					"error",
					"groupCollapsed",
					"Console",
					"profile",
					"profileEnd",
					"timeStamp",
					"context"
				]
			}
		],
		"no-debugger": "error",
		"no-duplicate-case": "error",
		"no-duplicate-imports": "error",
		"no-empty": "error",
		"no-eval": "error",
		"no-extra-bind": "error",
		"no-fallthrough": "error",
		"no-invalid-this": "error",
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 1
			}
		],
		"no-new-func": "error",
		"no-new-wrappers": "error",
		"no-null/no-null": "error",
		"no-plusplus": "error",
		"no-redeclare": "error",
		"no-return-await": "error",
		"no-sequences": "error",
		"no-shadow": [
			"error",
			{
				"hoist": "all"
			}
		],
		"no-sparse-arrays": "error",
		"no-template-curly-in-string": "error",
		"no-throw-literal": "error",
		"no-trailing-spaces": "error",
		"no-undef-init": "error",
		"no-underscore-dangle": "error",
		"no-unsafe-finally": "error",
		"no-unused-expressions": [
			"error",
			{
				"allowShortCircuit": true
			}
		],
		"no-unused-labels": "error",
		"no-useless-constructor": "error",
		"no-var": "error",
		"no-void": "error",
		"object-shorthand": "error",
		"one-var": [
			"error",
			"never"
		],
		"padding-line-between-statements": [
			"off",
			{
				"blankLine": "always",
				"prev": "*",
				"next": "return"
			}
		],
		"prefer-arrow/prefer-arrow-functions": "error",
		"prefer-const": "error",
		"prefer-object-spread": "error",
		"prefer-readonly": "off",
		"prefer-template": "error",
		"quote-props": [
			"error",
			"as-needed"
		],
		"radix": "error",
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "always"
			}
		],
		"spaced-comment": "error",
		"unicorn/filename-case": "error",
		"use-isnan": "error",
		"valid-typeof": "off",
		"yoda": "error",
		"@typescript-eslint/tslint/config": [
			"error",
			{
				"rules": {
					"comment-type": [
						true,
						"singleline",
						"multiline",
						"doc"
					],
					"component-class-suffix": true,
					"component-max-inline-declarations": true,
					"component-selector": [
						true,
						"element",
						"app",
						"kebab-case"
					],
					"contextual-decorator": true,
					"contextual-lifecycle": true,
					"directive-class-suffix": true,
					"directive-selector": [
						true,
						"attribute",
						"app",
						"camelCase"
					],
					"encoding": true,
					"import-blacklist": [
						true,
						"rxjs/Rx"
					],
					"jsdoc-format": [
						true,
						"check-multiline-start"
					],
					"no-attribute-decorator": true,
					"no-boolean-literal-compare": true,
					"no-conflicting-lifecycle": true,
					"no-default-import": true,
					"no-dynamic-delete": true,
					"no-host-metadata-property": true,
					"no-input-rename": true,
					"no-inputs-metadata-property": true,
					"no-lifecycle-call": true,
					"no-output-native": true,
					"no-output-on-prefix": true,
					"no-output-rename": true,
					"no-outputs-metadata-property": true,
					"no-pipe-impure": true,
					"no-queries-metadata-property": true,
					"no-reference-import": true,
					"no-tautology-expression": true,
					"no-unnecessary-callback-wrapper": true,
					"no-unused-css": true,
					"no-unused-declaration": [
						true,
						{
							"declarations": true,
							"ignored": {},
							"imports": true
						}
					],
					"number-literal-format": true,
					"one-line": [
						true,
						"check-open-brace",
						"check-whitespace",
						"check-else",
						"check-catch",
						"check-finally"
					],
					"prefer-conditional-expression": [
						true,
						"check-else-if"
					],
					"prefer-inline-decorator": [
						true,
						{
							"methods": false
						}
					],
					"prefer-method-signature": true,
					"prefer-output-readonly": true,
					"prefer-while": true,
					"relative-url-prefix": true,
					"rxjs-ban-observables": true,
					"rxjs-no-create": true,
					"rxjs-no-unsafe-takeuntil": true,
					"static-this": true,
					"template-accessibility-tabindex-no-positive": true,
					"template-accessibility-valid-aria": true,
					"template-banana-in-box": true,
					"template-conditional-complexity": true,
					"template-no-any": true,
					"template-no-autofocus": true,
					"template-no-call-expression": true,
					"template-no-distracting-elements": true,
					"template-no-negated-async": true,
					"throw-error": true,
					"typedef": [
						true,
						"call-signature",
						"property-declaration"
					],
					"unnecessary-else": true,
					"use-component-view-encapsulation": true,
					"use-lifecycle-interface": true,
					"use-pipe-decorator": true,
					"use-pipe-transform-interface": true,
					"whitespace": [
						true,
						"check-branch",
						"check-decl",
						"check-operator",
						"check-separator",
						"check-type",
						"check-rest-spread",
						"check-typecast",
						"check-type-operator",
						"check-preblock"
					]
				}
			}
		]
	}
};

import {defineConfig, globalIgnores} from "eslint/config";
import angularEslint from "@angular-eslint/eslint-plugin";
import rxjsX from "eslint-plugin-rxjs-x";
import unicorn from "eslint-plugin-unicorn";
import noNull from "eslint-plugin-no-null";
import preferArrow from "eslint-plugin-prefer-arrow";
import angularEslintEslintPluginTemplate from "@angular-eslint/eslint-plugin-template";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
	"**/node_modules/",
	"**/data/",
	"**/coverage/",
	"**/dist/",
	"**/local/",
	"**/static/",
	"**/temp/",
]), {
	files: ["**/*.ts"],

	extends: compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@angular-eslint/recommended",
		"plugin:@angular-eslint/template/process-inline-templates",
	),

	plugins: {
		"@angular-eslint": angularEslint,
		"rxjs-x": rxjsX,
		unicorn,
		"no-null": noNull,
		"prefer-arrow": preferArrow,
	},

	languageOptions: {
		ecmaVersion: 5,
		sourceType: "script",

		parserOptions: {
			project: ["tsconfig.json", "tsconfig.(app|spec).json"],
		},
	},

	rules: {
		"@angular-eslint/component-max-inline-declarations": "error",

		"@angular-eslint/component-selector": ["error", {
			type: "element",
			prefix: "app",
			style: "kebab-case",
		}],

		"@angular-eslint/directive-selector": ["error", {
			type: "attribute",
			prefix: "app",
			style: "camelCase",
		}],

		"@angular-eslint/prefer-standalone": "off",
		"@angular-eslint/no-attribute-decorator": "error",
		"@angular-eslint/no-forward-ref": "off",
		"@angular-eslint/no-lifecycle-call": "error",
		"@angular-eslint/no-pipe-impure": "error",
		"@angular-eslint/no-queries-metadata-property": "error",
		"@angular-eslint/prefer-output-readonly": "error",
		"@angular-eslint/relative-url-prefix": "error",
		"@angular-eslint/use-component-view-encapsulation": "error",

		"@typescript-eslint/array-type": ["error", {
			default: "generic",
		}],

		"@typescript-eslint/await-thenable": "error",
		"@typescript-eslint/ban-ts-comment": "error",
		"@typescript-eslint/consistent-type-definitions": "error",

		"@typescript-eslint/explicit-member-accessibility": ["error", {
			accessibility: "no-public",
		}],

		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-empty-function": "error",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-extraneous-class": "off",
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/no-for-in-array": "error",
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-this-alias": "error",
		"@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
		"@typescript-eslint/no-unnecessary-type-arguments": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "off",

		"@typescript-eslint/no-unused-expressions": ["error", {
			allowShortCircuit: true,
		}],

		"@typescript-eslint/no-var-requires": "error",
		"@typescript-eslint/prefer-readonly": "off",
		"@typescript-eslint/no-empty-object-type": "off",
		"@typescript-eslint/promise-function-async": "error",
		"@typescript-eslint/restrict-plus-operands": "error",

		"@typescript-eslint/strict-boolean-expressions": ["off", {
			allowNullable: true,
		}],

		"@typescript-eslint/unbound-method": "error",
		"@typescript-eslint/no-useless-constructor": "error",

		"@typescript-eslint/member-ordering": ["error", {
			default: [
				"public-static-field",
				"protected-static-field",
				"private-static-field",
				"public-instance-field",
				"protected-instance-field",
				"private-instance-field",
				"public-constructor",
				"protected-constructor",
				"private-constructor",
				"public-static-method",
				"public-instance-method",
				"protected-static-method",
				"protected-instance-method",
				"private-static-method",
				"private-instance-method",
			],
		}],

		"@typescript-eslint/naming-convention": "off",
		"jsdoc/no-types": "off",
		"jsdoc/check-alignment": "off",
		"jsdoc/newline-after-description": "off",
		"rxjs-x/no-create": "error",
		"rxjs-x/no-unsafe-takeuntil": "error",

		"prefer-arrow/prefer-arrow-functions": ["error", {
			allowStandaloneDeclarations: true,
		}],

		"arrow-body-style": ["error", "as-needed"],
		"arrow-parens": ["error", "as-needed"],

		"brace-style": ["error", "1tbs", {
			allowSingleLine: true,
		}],

		"class-methods-use-this": "off",
		"comma-dangle": "error",

		complexity: ["error", {
			max: 20,
		}],

		"default-case": "error",
		"max-classes-per-file": ["error", 2],

		"max-len": ["error", {
			code: 240,
		}],

		"max-lines": ["error", 2000],
		"newline-per-chained-call": "off",
		"no-param-reassign": "error",
		"no-duplicate-case": "error",
		"no-duplicate-imports": "error",
		"no-empty": "error",
		"no-extra-bind": "error",
		"no-invalid-this": "off",

		"no-multiple-empty-lines": ["error", {
			max: 1,
		}],

		"no-new-func": "error",
		"no-null/no-null": "off",
		"no-plusplus": "off",
		"no-redeclare": "error",
		"no-return-await": "error",
		"no-sequences": "error",
		"no-sparse-arrays": "error",
		"no-template-curly-in-string": "error",
		"no-useless-constructor": "off",
		"id-blacklist": "off",
		"no-void": "error",

		"padding-line-between-statements": ["off", {
			blankLine: "always",
			prev: "*",
			next: "return",
		}],

		"prefer-object-spread": "error",
		"prefer-template": "error",
		"space-in-parens": ["error", "never"],
		yoda: "error",
	},
}, {
	files: ["**/*.html"],
	extends: compat.extends("plugin:@angular-eslint/template/all"),

	plugins: {
		"@angular-eslint/template": angularEslintEslintPluginTemplate,
	},

	languageOptions: {
		ecmaVersion: 5,
		sourceType: "script",

		parserOptions: {
			project: ["tsconfig.json", "tsconfig.(app|spec).json"],
		},
	},

	rules: {
		"@angular-eslint/template/cyclomatic-complexity": ["off", {
			maxComplexity: 10,
		}],

		"@angular-eslint/template/button-has-type": "off",
		"@angular-eslint/template/no-call-expression": "off",

		"@angular-eslint/template/i18n": ["warn", {
			checkId: false,

			ignoreAttributes: [
				"rel",
				":xlink:href",
				"clip-path",
				"accept",
				"output",
				"attributeName",
				"attributeType",
			],
		}],

		"@angular-eslint/template/no-inline-styles": "off",
		"@angular-eslint/template/click-events-have-key-events": "off",
		"@angular-eslint/template/interactive-supports-focus": "off",
		"@angular-eslint/template/no-interpolation-in-attributes": "off",
		"@angular-eslint/template/prefer-ngsrc": "off",
	},
}, {
	files: ["**/*.spec.ts"],

	languageOptions: {
		ecmaVersion: 5,
		sourceType: "script",

		parserOptions: {
			project: ["tsconfig.json", "tsconfig.(app|spec).json"],
		},
	},

	rules: {
		"import/no-internal-modules": "off",
	},
}]);

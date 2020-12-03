// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
const tsJestPreset = require('jest-preset-angular/jest-preset').globals['ts-jest'];

module.exports = {
	preset: 'jest-preset-angular',
	roots: ['.'],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	moduleNameMapper: {
		"@app/(.*)": "<rootDir>/src/app/$1",
		"@core/(.*)": "<rootDir>/src/app/modules/core/$1",
		"@admin/(.*)": "<rootDir>/src/app/modules/admin/$1",
		"@shared/(.*)": "<rootDir>/src/app/modules/shared/$1",
		"@library/(.*)": "<rootDir>/src/app/modules/library/$1",
		"@jam": "<rootDir>/src/app/modules/jam/index"
	},
	modulePathIgnorePatterns: ['<rootDir>/local/', '<rootDir>/resources', '<rootDir>/dist'],
	transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
	globals: {
		'ts-jest': {
			...tsJestPreset,
			tsconfig: 'tsconfig.spec.json'
		}
	}
};

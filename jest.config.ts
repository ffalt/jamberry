import type { Config } from 'jest';

const jestConfig: Config = {
	preset: 'jest-preset-angular',
	moduleDirectories: ['node_modules', '<rootDir>'],
	moduleNameMapper: {
		'@core/(.*)': '<rootDir>/src/app/lib/core/$1',
		'@modules/(.*)': '<rootDir>/src/app/modules/$1',
		'@utils/(.*)': '<rootDir>/src/app/utils/$1',
		'@jam': '<rootDir>/src/app/modules/jam/index'
	},
	testPathIgnorePatterns: ['/local/', '/dist/'],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	clearMocks: true,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/*.spec.ts',
		'!src/app/app.mock.ts',
		'!src/environments/**',
		'!src/main.ts',
		'!src/polyfills.ts'
	],
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'<rootDir>/setup-jest.ts',
		'<rootDir>/jest-global-mocks.ts',
		'<rootDir>/src/app/app.mock.ts'
	],
	coverageProvider: 'v8'
};

export default jestConfig;

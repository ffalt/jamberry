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
	clearMocks: true
};

export default jestConfig;

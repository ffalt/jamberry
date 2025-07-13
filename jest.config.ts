/* eslint-disable */
import type { Config } from 'jest';

const jestConfig: Config = {
	preset: 'jest-preset-angular',
	moduleDirectories: ['node_modules', '<rootDir>'],
	moduleNameMapper: {
		'@app/(.*)': '<rootDir>/src/app/$1',
		'@core/(.*)': '<rootDir>/src/app/modules/core/$1',
		'@admin/(.*)': '<rootDir>/src/app/modules/admin/$1',
		'@shared/(.*)': '<rootDir>/src/app/modules/shared/$1',
		'@library/(.*)': '<rootDir>/src/app/modules/library/$1',
		'@jam': '<rootDir>/src/app/modules/jam/index'
	},
	testPathIgnorePatterns: ['/local/', '/dist/'],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	clearMocks: true,
};

export default jestConfig;

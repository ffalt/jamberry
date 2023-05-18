/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	preset: 'jest-preset-angular',
	moduleNameMapper: {
		'@app/(.*)': '<rootDir>/src/app/$1',
		'@core/(.*)': '<rootDir>/src/app/modules/core/$1',
		'@admin/(.*)': '<rootDir>/src/app/modules/admin/$1',
		'@shared/(.*)': '<rootDir>/src/app/modules/shared/$1',
		'@library/(.*)': '<rootDir>/src/app/modules/library/$1',
		'@jam': '<rootDir>/src/app/modules/jam/index'
	},
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
	testPathIgnorePatterns: ['/node_modules/', '/local/', '/dist/'],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
};

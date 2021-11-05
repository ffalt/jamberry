require('jest-preset-angular/ngcc-jest-processor');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	preset: 'jest-preset-angular',
	moduleNameMapper: {
		"@app/(.*)": "<rootDir>/src/app/$1",
		"@core/(.*)": "<rootDir>/src/app/modules/core/$1",
		"@admin/(.*)": "<rootDir>/src/app/modules/admin/$1",
		"@shared/(.*)": "<rootDir>/src/app/modules/shared/$1",
		"@library/(.*)": "<rootDir>/src/app/modules/library/$1",
		"@jam": "<rootDir>/src/app/modules/jam/index"
	},
	testPathIgnorePatterns: ["/node_modules/", "<rootDir>/local/", "<rootDir>/dist/"],
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

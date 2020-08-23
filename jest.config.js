module.exports = {
	clearMocks: true,
	restoreMocks: true,
	resetModules: true,
	testPathIgnorePatterns: [
		"<rootDir>/node_modules",
		"<rootDir>/integration-test",
		"<rootDir>/runners"
	],
	coveragePathIgnorePatterns: ["<rootDir>/test/mocks"],
	collectCoverageFrom: ["src/**/*.js", "functions/**/*.js"],
	coverageReporters: ["json", "lcov", "json-summary", "text"],
	coverageThreshold: {
		global: {
			statements: 0,
			branches: 0,
			functions: 0,
			lines: 0
		}
	}
};

import type { Config } from 'jest';

const config: Config = {
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Match test files
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // Recognize these file extensions
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to transform TypeScript files
  },
  testEnvironment: 'node', // Set the test environment to Node.js
  verbose: true, // Display individual test results with the test suite hierarchy
  collectCoverage: true, // Enable test coverage collection
  coverageDirectory: 'coverage', // Output directory for coverage reports
  coverageReporters: ['text', 'lcov'], // Coverage report formats
};

export default config;
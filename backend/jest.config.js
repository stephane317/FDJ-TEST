module.exports = {
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  testTimeout: 60000,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['node_modules', '.history', '<rootDir>/src/server.ts', '__tests__/stress', '__tests__/migration'],
  moduleNameMapper: {
    '@testUtils/(.*)': '<rootDir>/__tests__/__utils__/$1',
    '@joi/(.*)': '<rootDir>/src/interface/Joi/$1',
    '@type/(.*)': '<rootDir>/src/interface/type/$1',
    '@service/(.*)': '<rootDir>/src/service/$1',
    '@class/(.*)': '<rootDir>/src/helpers/class/$1',
    '@utils/(.*)': '<rootDir>/src/helpers/utils/$1',
    '@middleware/(.*)': '<rootDir>/src/middleware/$1',
    '@manager/(.*)': '<rootDir>/src/manager/$1',
    '@database/(.*)': '<rootDir>/src/database/$1',
    '@app': '<rootDir>/src/app',
    '@init/(.*)': '<rootDir>/src/init/$1',
    '@enum/(.*)': '<rootDir>/src/enum/$1',
    '@migration/(.*)': '<rootDir>/migration/$1'
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'text-summary'
    // "json-summary",
  ]
}

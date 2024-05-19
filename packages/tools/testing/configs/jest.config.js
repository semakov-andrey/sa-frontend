export const jestConfig = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': 'esbuild-jest'
  },
  transformIgnorePatterns: [],
  testMatch: [ '<rootDir>/**/*.test.{ts,tsx}' ],
  moduleNameMapper: {
    '^@/source/(.*)$': '<rootDir>/src/$1'
  }
};

export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\.(j|t)sx?$': 'esbuild-jest',
  },
  transformIgnorePatterns: [],
  testMatch: [ '<rootDir>/tests/**/*.test.{ts,tsx}' ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};

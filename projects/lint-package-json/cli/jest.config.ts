/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import type {Config} from '@jest/types';

export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ['src/{!(main),}.ts'],
  errorOnDeprecated: true,
  testEnvironment: 'node',
  preset: 'ts-jest',
  reporters: ['jest-standard-reporter'],
} as Config.InitialOptions;

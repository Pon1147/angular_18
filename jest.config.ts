import { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testMatch: ['**/?(*.)+(spec|test).ts'],
};
export const preset = 'jest-preset-angular';
export const setupFilesAfterEnv = ['<rootDir>/setup-jest.ts', '<rootDir>/jest.setup.js'];
export const testPathIgnorePatterns = ['<rootDir>/node_modules/', '<rootDir>/dist/'];
export const moduleNameMapper = {
  '@app/(.*)': '<rootDir>/src/app/$1',
  '@assets/(.*)': '<rootDir>/src/assets/$1',
  '@environments/(.*)': '<rootDir>/src/environments/$1',
};
export const transformIgnorePatterns = [
  '/node_modules/(?!.*\\.mjs$|carbon-components-angular|@carbon/icons/es|lodash-es)',
];

export default config;
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
  '@assets/(.*)': '<rootDir>/src/assets/$1',
  '@environments/(.*)': '<rootDir>/src/environments/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!.*\\.mjs$|carbon-components-angular|@carbon/icons/es|lodash-es)',
  ],
};

export default config;

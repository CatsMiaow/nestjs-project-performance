/* eslint-disable import/no-default-export */
import type { Config } from 'jest';

import config from '../jest.config';

const jestConfig: Config = {
  ...config,
  rootDir: '.',
  testMatch: ['**/e2e/**/*.+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.e2e.json',
    }],
  },
};

export default jestConfig;

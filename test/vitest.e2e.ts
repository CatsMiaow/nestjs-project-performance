import { defineConfig, mergeConfig } from 'vitest/config';

import config from '../vitest.config';

export default mergeConfig(config, defineConfig({
  test: {
    root: './',
    include: ['**/e2e/**/*.{spec,test}.ts'],
  },
}));

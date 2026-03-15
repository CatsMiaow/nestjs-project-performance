/* eslint-disable import/no-default-export */
import { loadEnvFile } from 'node:process';
import { defineConfig } from 'vitest/config';

try {
  loadEnvFile();
} catch {}

export default defineConfig({
  test: {
    globals: true,
    root: './',
    testTimeout: 30_000,
  },
});

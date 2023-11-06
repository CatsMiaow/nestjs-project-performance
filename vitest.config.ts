import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    testTimeout: 30_000,
  },
  plugins: [swc.vite()],
});

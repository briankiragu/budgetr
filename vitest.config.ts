/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
import path from 'path';

export default getViteConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.[jt]sx?/],
    },
    threads: false,
    isolate: false,
    setupFiles: ['./tests/setup-tests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});

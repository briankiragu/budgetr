/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import path from 'path';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: { web: [/\.[jt]sx?$/] },
    setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect.js'],
    // otherwise, solid would be loaded twice:
    deps: { registerNodeLoader: true },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    threads: false,
    isolate: false,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@components': path.resolve(__dirname, './src/components'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
    conditions: ['development', 'browser'],
  },
});

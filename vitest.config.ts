/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'jsdom',
    transformMode: {
      web: [/.[jt]sx?/],
    },
    threads: false,
    isolate: false,
    setupFiles: ['./tests/setup-tests.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
  },
});

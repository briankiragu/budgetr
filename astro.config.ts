import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://budgetr.com',
  integrations: [
    solidJs(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    prefetch(),
    sitemap(),
  ],
});

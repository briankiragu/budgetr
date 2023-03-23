import { defineConfig } from 'astro/config';
import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';

import vercel from '@astrojs/vercel/serverless';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';

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
  output: 'server',
  adapter: vercel({
    analytics: true,
  }),
});

import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidJs(),
    tailwind(),
    partytown({ config: { forward: ['dataLayer.push'] } }),
  ],
});

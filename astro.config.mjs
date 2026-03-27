import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://rynek-oze.pl',
  integrations: [tailwind()],
  adapter: netlify(),
  output: 'static',
});

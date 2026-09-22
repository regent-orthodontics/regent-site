// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './site.config.mjs';

export default defineConfig({
  site: site.url,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  integrations: [sitemap({ changefreq: 'monthly', priority: 0.7, lastmod: new Date() })],
});

import type { APIRoute } from 'astro';
import { site } from '../../site.config.mjs';

export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      `Sitemap: ${site.url}/sitemap-index.xml`,
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );

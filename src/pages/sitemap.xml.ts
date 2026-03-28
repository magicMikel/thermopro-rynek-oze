import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const siteUrl = 'https://rynek-oze.pl';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', p => !p.data.noIndex);

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/ranking/', priority: '0.9', changefreq: 'monthly' },
    { url: '/posts/', priority: '0.8', changefreq: 'weekly' },
    { url: '/o-serwisie/', priority: '0.5', changefreq: 'monthly' },
    { url: '/metodologia-rankingu/', priority: '0.6', changefreq: 'monthly' },
  ];

  const postEntries = posts.map(p => ({
    url: `/posts/${p.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: p.data.date.toISOString().split('T')[0],
  }));

  const allEntries = [...staticPages, ...postEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
  .map(
    e => `  <url>
    <loc>${siteUrl}${e.url}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

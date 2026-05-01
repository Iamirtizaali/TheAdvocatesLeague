import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Use same config as in the frontend. Fallbacks needed if env isn't provided during build.
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'dummy_project_id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

async function generateSitemap() {
  const baseUrl = 'https://theadvocatesleague.com';
  
  try {
    console.log('Fetching slugs from Sanity to generate sitemap...');
    
    // Fetch all active slugs
    const data = await client.fetch(`{
      "blogs": *[_type == "blog" && defined(slug.current)].slug.current,
      "events": *[_type == "event" && defined(slug.current)].slug.current,
      "sections": *[_type == "subsection" && defined(slug.current)].slug.current
    }`);
    
    const { blogs, events, sections } = data;
    
    // Define static routes
    const staticRoutes = [
      '',
      '/about',
      '/team',
      '/contact',
      '/events',
      '/blogs',
      '/sections'
    ];
    
    // Build all URLs
    const urls = [
      ...staticRoutes.map(route => `${baseUrl}${route}`),
      ...blogs.map(slug => `${baseUrl}/blog/${slug}`),
      ...events.map(slug => `${baseUrl}/event/${slug}`),
      ...sections.map(slug => `${baseUrl}/section/${slug}`)
    ];
    
    // Create sitemap XML
  // Create sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc> 
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === baseUrl ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  </urlset>`;

    // Make sure public directory exists
    const publicDir = './public';
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    // Write out the file
    fs.writeFileSync(`${publicDir}/sitemap.xml`, sitemap);
    console.log(`Sitemap generated successfully with ${urls.length} URLs.`);
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
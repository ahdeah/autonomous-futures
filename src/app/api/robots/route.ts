// src/app/api/robots/route.ts
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://autonomous-futures.vercel.app';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow API routes
Disallow: /api/

# Allow search engines to index all public pages
Allow: /principles
Allow: /cultural-texts
Allow: /about`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
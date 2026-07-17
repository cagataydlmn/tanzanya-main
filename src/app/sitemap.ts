import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tanzanyamobilya.com';
  const currentDate = new Date();

  // Statik Sayfalar
  const routes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/services', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/projects', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/products', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/gallery', changeFrequency: 'weekly' as const, priority: 0.6 },
    { path: '/quote', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/production', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/kvkk', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.4 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.4 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

import type { MetadataRoute } from 'next';
import breeds from '@/data/breeds.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://what-cat-psi.vercel.app';

  // 기본 및 신규 페이지
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/nyongmatch`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/guides/adoption`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guides/beginner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // 각 품종별 상세 페이지
  const breedPages: MetadataRoute.Sitemap = breeds.breeds.map((breed) => ({
    url: `${baseUrl}/breed/${breed.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 각 품종별 결과 페이지 (검색 결과 형식)
  const resultPages: MetadataRoute.Sitemap = breeds.breeds.map((breed) => ({
    url: `${baseUrl}/result?breed1=${breed.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...breedPages, ...resultPages];
}

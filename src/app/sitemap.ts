import type { MetadataRoute } from 'next';
import breeds from '@/data/breeds.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://what-cat-psi.vercel.app';

  // 기본 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/nyongmatch`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // 각 품종별 결과 페이지 (품종 ID로 생성)
  const breedPages: MetadataRoute.Sitemap = breeds.breeds.map((breed) => ({
    url: `${baseUrl}/result?breed1=${breed.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...breedPages];
}

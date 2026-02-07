import breedsData from '@/data/breeds.json';
import { Breed } from '@/types';
import { Metadata } from 'next';

const breeds = breedsData as unknown as { breeds: Breed[] };

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const breedId = params.id;
  const breed = breeds.breeds.find((b) => b.id === breedId);

  if (!breed) {
    return {
      title: '품종 상세 | 냥이 매칭',
      description: '고양이 품종 상세 정보',
    };
  }

  return {
    title: `${breed.name} 품종 상세 | 냥이 매칭`,
    description: `${breed.name}(${breed.nameEn})의 상세 정보, 성격, 관리 난이도, 비용 등`,
    openGraph: {
      title: `${breed.name} - 냥이 매칭`,
      description: breed.description,
      images: breed.image ? [
        {
          url: breed.image,
          width: 800,
          height: 800,
          alt: breed.name,
        },
      ] : undefined,
    },
  };
}

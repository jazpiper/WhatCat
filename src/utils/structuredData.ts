/**
 * 구조화된 데이터 (JSON-LD) 생성 유틸리티
 * SEO 최적화를 위해 Google에 품종 정보를 제공
 */

export function generateBreedStructuredData(breed: any, url: string) {
  // NOTE:
  // - Google rich results parsers don't reliably support "Cat" as a top-level type.
  // - Use a conservative WebPage + mainEntity(Thing) structure.
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    url,
    name: `${breed.name} (${breed.nameEn})`,
    description: breed.description,
    inLanguage: 'ko-KR',
    primaryImageOfPage: breed.image
      ? {
          '@type': 'ImageObject',
          url: breed.image,
        }
      : undefined,
    mainEntity: {
      '@type': 'Thing',
      name: breed.name,
      alternateName: breed.nameEn,
      identifier: breed.id,
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: '품종 원산',
          value: breed.origin || '알 수 없음',
        },
        {
          '@type': 'PropertyValue',
          name: '수명',
          value: breed.lifespan || '알 수 없음',
        },
        {
          '@type': 'PropertyValue',
          name: '체중',
          value: breed.weight || '알 수 없음',
        },
        {
          '@type': 'PropertyValue',
          name: '털 길이',
          value: breed.coat,
        },
        {
          '@type': 'PropertyValue',
          name: '크기',
          value: breed.size,
        },
        {
          '@type': 'PropertyValue',
          name: '한국 인기도',
          value: `${breed.korea_popularity}%`,
        },
      ],
    },
  };
}

export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '냥이 매치 (What Cat)',
    url: 'https://what-cat-psi.vercel.app',
    description: 'MBTI 스타일 테스트로 나와 가장 잘 맞는 고양이 품종 찾기',
    inLanguage: 'ko-KR',
  };
}

export function generateBreadcrumbStructuredData(items: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * FAQPage 구조화된 데이터 생성
 * Google Rich Results FAQ 스니펫을 위한 JSON-LD
 */
export interface FaqItem {
  question: string;
  answer: string;
  category?: 'personality' | 'care' | 'health' | 'cost' | 'environment';
}

export function generateFaqPageStructuredData(
  breedName: string,
  faqs: FaqItem[],
  url: string
) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/<[^>]*>/g, '') // HTML 태그 제거
      }
    }))
  };
}

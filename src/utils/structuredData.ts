/**
 * 구조화된 데이터 (JSON-LD) 생성 유틸리티
 * SEO 최적화를 위해 Google에 품종 정보를 제공
 */

export function generateBreedStructuredData(breed) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Cat',
    name: breed.name,
    alternateName: breed.nameEn,
    description: breed.description,
    image: breed.image,
    identifier: breed.id,
    breed: breed.name,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: '품종 원산',
        value: breed.origin || '알 수 없음'
      },
      {
        '@type': 'PropertyValue',
        name: '수명',
        value: breed.lifespan || '알 수 없음'
      },
      {
        '@type': 'PropertyValue',
        name: '체중',
        value: breed.weight || '알 수 없음'
      },
      {
        '@type': 'PropertyValue',
        name: '털 길이',
        value: breed.coat
      },
      {
        '@type': 'PropertyValue',
        name: '크기',
        value: breed.size
      },
      {
        '@type': 'PropertyValue',
        name: '한국 인기도',
        value: `${breed.korea_popularity}%`
      }
    ]
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
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://what-cat-psi.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateBreadcrumbStructuredData(items) {
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

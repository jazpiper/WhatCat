import { Metadata } from 'next';
import { breeds } from '@/data/breeds';
import ResultClient from './ResultClient';

// 동적 OG 이미지 생성을 위한 기본 URL
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://what-cat-psi.vercel.app';

// 점수별 매칭 문구
function getMatchMessage(score: number): string {
  if (score >= 90) return '완벽한 인생냥이! 찰떡궁합';
  if (score >= 80) return '아주 잘 맞는 냥이! 최고의 짝꿍';
  if (score >= 70) return '꽤 잘 맞는 냥이! 좋은 친구';
  if (score >= 60) return '나쁘지 않은 매칭! 알아가보세요';
  if (score >= 50) return '흥미로운 조합! 새로운 발견';
  return '의외의 매칭! 다른 스타일';
}

// generateMetadata 함수
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  // searchParams는 Promise이므로 await 필요
  const params = await searchParams;
  const breedId = typeof params.breed1 === 'string' ? params.breed1 : null;
  const scoreParam = typeof params.score1 === 'string' ? params.score1 : null;

  // 기본 메타데이터
  let title = '냥이 매칭 결과 | 나의 인생냥이를 찾아보세요';
  let description = '나와 가장 잘 맞는 고양이 품종을 찾아보세요! 냥이 매칭 테스트로 당신의 인생냥이를 발견하세요.';
  let ogImageUrl = `${BASE_URL}/api/og?type=default`;
  const ogImageWidth = 1200;
  const ogImageHeight = 630;

  // URL 파라미터에서 품종과 점수가 있는 경우 동적 OG 이미지 생성
  if (breedId && scoreParam) {
    const breed = breeds.find((b) => b.id === breedId);
    const score = parseInt(scoreParam, 10);

    if (breed && !isNaN(score) && score >= 0 && score <= 100) {
      const matchMessage = getMatchMessage(score);
      title = `${breed.name}와 ${score}% 매칭! | 냥이 매칭`;
      description = `나의 인생냥이는 ${breed.name}! ${score}% 매칭 - ${matchMessage} 냥이 매칭 테스트로 당신의 인생냥이를 찾아보세요.`;
      ogImageUrl = `${BASE_URL}/api/og?type=result&breed=${breedId}&score=${score}`;
    }
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: BASE_URL,
      siteName: '냥이 매칭',
      locale: 'ko_KR',
      images: [
        {
          url: ogImageUrl,
          width: ogImageWidth,
          height: ogImageHeight,
          alt: title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@nyongmatch',
    },
    other: {
      // 캐싱 헤더는 API Route에서 처리
    },
  };
}

// 페이지 컴포넌트
export default function ResultPage() {
  return <ResultClient />;
}

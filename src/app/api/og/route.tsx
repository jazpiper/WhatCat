import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// 품종 데이터 (Edge Runtime에서 파일 시스템 접근 불가하므로 인라인)
const breedsData: Record<string, {
  name: string;
  nameEn: string;
  emoji: string;
  traits: string[];
}> = {
  'russian-blue': { name: '러시안 블루', nameEn: 'Russian Blue', emoji: '🐱', traits: ['조용함', '충성심', '깔끔함'] },
  'scottish-fold': { name: '스코티시 폴드', nameEn: 'Scottish Fold', emoji: '😺', traits: ['온순함', '차분함', '친근함'] },
  'british-shorthair': { name: '브리티시 숏헤어', nameEn: 'British Shorthair', emoji: '🦁', traits: ['차분함', '독립적', '온순함'] },
  'ragdoll': { name: '랙돌', nameEn: 'Ragdoll', emoji: '🐱', traits: ['온화함', '온순함', '애교'] },
  'american-shorthair': { name: '아메리칸 숏헤어', nameEn: 'American Shorthair', emoji: '🐱', traits: ['활발함', '친근함', '순함'] },
  'maine-coon': { name: '메인 쿤', nameEn: 'Maine Coon', emoji: '🦁', traits: ['온순함', '장난기', '지능'] },
  'siamese': { name: '샴', nameEn: 'Siamese', emoji: '😺', traits: ['활발함', '수다', '지능'] },
  'persian': { name: '페르시안', nameEn: 'Persian', emoji: '😺', traits: ['우아함', '차분함', '고집'] },
  'sphynx': { name: '스핑크스', nameEn: 'Sphynx', emoji: '😺', traits: ['애교', '사교적', '따뜻함'] },
  'norwegian-forest': { name: '노르웨이 숲', nameEn: 'Norwegian Forest Cat', emoji: '🦁', traits: ['큰덩치', '친근함', '독립적'] },
  'bengal': { name: '방갈', nameEn: 'Bengal', emoji: '🐆', traits: ['활발함', '장난꾸러기', '우아함'] },
  'abyssinian': { name: '아비시니안', nameEn: 'Abyssinian', emoji: '🐱', traits: ['활발함', '호기심', '지능'] },
  'siberian': { name: '시베리안', nameEn: 'Siberian', emoji: '🦁', traits: ['친근함', '건강함', '큰덩치'] },
  'turkish-angora': { name: '터키쉬 앙고라', nameEn: 'Turkish Angora', emoji: '😺', traits: ['우아함', '친근함', '지능'] },
  'scottish-straight': { name: '스코티시 스트레이트', nameEn: 'Scottish Straight', emoji: '😺', traits: ['온순함', '차분함', '친근함'] },
  'british-longhair': { name: '브리티시 롱헤어', nameEn: 'British Longhair', emoji: '🦁', traits: ['차분함', '독립적', '푹신함'] },
  'exotic-shorthair': { name: '엑조틱 숏헤어', nameEn: 'Exotic Shorthair', emoji: '😺', traits: ['우아함', '차분함', '순함'] },
  'somali': { name: '소말리', nameEn: 'Somali', emoji: '🐱', traits: ['활발함', '호기심', '친근함'] },
  'ocicat': { name: '오시캣', nameEn: 'Ocicat', emoji: '🐆', traits: ['활발함', '지능', '친근함'] },
};

// 점수별 매칭 문구
function getMatchMessage(score: number): { message: string; color: string } {
  if (score >= 90) {
    return { message: '완벽한 인생냥이! 찰떡궁합', color: '#FF1493' };
  } else if (score >= 80) {
    return { message: '아주 잘 맞는 냥이! 최고의 짝꿍', color: '#FF69B4' };
  } else if (score >= 70) {
    return { message: '꽤 잘 맞는 냥이! 좋은 친구', color: '#9370DB' };
  } else if (score >= 60) {
    return { message: '나쁘지 않은 매칭! 알아가보세요', color: '#87CEEB' };
  } else if (score >= 50) {
    return { message: '흥미로운 조합! 새로운 발견', color: '#FFD700' };
  } else {
    return { message: '의외의 매칭! 다른 스타일', color: '#808080' };
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const breedId = searchParams.get('breed');
  const scoreParam = searchParams.get('score');

  // 기본값 설정
  let breed = {
    name: '냥이 매칭',
    nameEn: 'Cat Match',
    emoji: '🐱',
    traits: ['성격', '활동성', '애정도'],
  };
  let score = 85;

  // 품종 ID가 유효한 경우
  if (breedId && breedsData[breedId]) {
    breed = breedsData[breedId];
  }

  // 점수 파싱 및 검증
  if (scoreParam) {
    const parsedScore = parseInt(scoreParam, 10);
    if (!isNaN(parsedScore) && parsedScore >= 0 && parsedScore <= 100) {
      score = parsedScore;
    }
  }

  const { message, color } = getMatchMessage(score);

  // 동적 배경색 (점수에 따라)
  const bgGradient = score >= 80
    ? 'linear-gradient(135deg, #FF69B4 0%, #9370DB 50%, #87CEEB 100%)'
    : score >= 60
      ? 'linear-gradient(135deg, #9370DB 0%, #87CEEB 50%, #FFD700 100%)'
      : 'linear-gradient(135deg, #87CEEB 0%, #FFD700 50%, #FFA500 100%)';

  try {
    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: bgGradient,
            padding: '40px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* 메인 카드 컨테이너 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '32px',
              padding: '48px 64px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              width: '90%',
              maxWidth: '1000px',
            }}
          >
            {/* 상단: 품종 이모지 */}
            <div
              style={{
                fontSize: '80px',
                marginBottom: '16px',
                lineHeight: 1,
              }}
            >
              {breed.emoji}
            </div>

            {/* 품종명 (한글/영문) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#1a1a2e',
                  marginBottom: '8px',
                }}
              >
                {breed.name}
              </div>
              <div
                style={{
                  fontSize: '24px',
                  color: '#666',
                  letterSpacing: '2px',
                }}
              >
                {breed.nameEn}
              </div>
            </div>

            {/* 매칭 점수 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '100px',
                  fontWeight: 'bold',
                  color: color,
                  lineHeight: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {score}%
              </div>
              <div
                style={{
                  fontSize: '28px',
                  color: '#333',
                  fontWeight: '600',
                  marginTop: '8px',
                }}
              >
                {message}
              </div>
            </div>

            {/* 품종 특징 3개 */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                marginTop: '24px',
              }}
            >
              {breed.traits.slice(0, 3).map((trait, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    fontSize: '20px',
                    color: '#374151',
                    fontWeight: '500',
                  }}
                >
                  {trait}
                </div>
              ))}
            </div>
          </div>

          {/* 하단: 브랜딩 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '32px',
              gap: '12px',
            }}
          >
            <div
              style={{
                fontSize: '36px',
              }}
            >
              🐾
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              냥이 매칭
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    // 캐싱 헤더 추가
    // Cache-Control: public, s-maxage=86400 (1일), stale-while-revalidate=604800 (7일)
    imageResponse.headers.set(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=604800'
    );

    return imageResponse;
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

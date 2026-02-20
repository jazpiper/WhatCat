# WhatCat 품종 상세 페이지 개선 기획서

> ⚠️ 이 문서는 2026-02-05 기준 초안이며, 최신 반영 범위는 `docs/prd-breed-detail-page.md`를 우선 참조하세요.

**작성일:** 2026-02-05
**작성자:** 몰트 (Molt)
**버전:** 1.0

---

## 📋 개요

품종 상세 페이지(`/breed/[id]`)의 사용자 경험(UX)과 컨텐츠 품질을 개선하여, 사용자가 해당 품종을 더 잘 이해하고 입양 결정을 내릴 수 있도록 돕습니다.

---

## 🔍 현재 상황 분석

### ✅ 구현된 기능

#### 1. 기본 정보
- 이모지, 한국어 이름, 영어 이름
- 한국 인기도 순위
- 고양이 이미지 (우선순위 로딩)

#### 2. 품종 프로필
- 성격 키워드
- 크기 (small/medium/large/xlarge)
- 털 길이 (short/medium/long/hairless)
- 관리 난이도 (별 표시)

#### 3. 성격 상세
- 5가지 성격 항목 (활동성, 애정, 사교성, 조용함, 충성심)
- 1-5점 프로그래스 바 시각화

#### 4. 비용 정보
- 초기 비용 (low/medium/high)
- 월 비용 (low/medium/high)
- 한글 텍스트로 변환

#### 5. 적합 환경
- 적합 환경 리스트 (태그로 표시)
- 환경별 한글 텍스트 변환

#### 6. 건강 관리
- 건강 난이도 (1-5점)
- 교육 난이도 (1-5점)
- 프로그래스 바 시각화

#### 7. 추가 정보
- 품종 설명
- 관리 팁
- 유의사항
- 한국 인기도 (0-100%)

#### 8. CTA (Call-to-Action)
- 테스트 시작하기 버튼
- AdSense 배치 (상/하단)

---

### ⚠️ 개선 필요 사항

#### 1. 컨텐츠 부족
- **품종 기원/역사:** 없음
- **품종 특징:** 설명만 존재
- **일반적인 건강 문제:** 없음
- **수명:** 정보 없음
- **체중:** 정보 없음
- **색상:** 품종별 표시되어 있지만 시각화 부족

#### 2. UX 개선 필요
- **반응형:** 데스크톱에서만 최적화
- **모바일:** 프로그래스 바가 너무 작음
- **이동성:** 관련 품종 추천 없음
- **공유:** 품종 상세 페이지 공유 기능 없음

#### 3. SEO 개선 필요
- **메타 태그:** 기본 메타만 사용
- **구조화된 데이터:** 미구현
- **OG 이미지:** 품종별 OG 이미지 부재

#### 4. 성능 개선 필요
- **이미지:** WebP 변환 미확인
- **번들:** 다이나믹 임포트가 적용되었으나 최적화 확인 필요
- **로딩:** 프로그래스 바 애니메이션 확인 필요

---

## 🎯 개선 방안

### 1단계: 컨텐츠 강화 (우선순위: ⭐⭐⭐)

#### 1.1 품종 기원/역사 추가

**위치:** `품종 설명` 섹션 아래

**구현:**
```tsx
<div className="bg-amber-50 rounded-2xl p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-3">
    📜 기원과 역사
  </h2>
  <p className="text-gray-700 text-lg leading-relaxed">
    {breed.origin || `${breed.name}은(는) ${breed.nameEn}의 자연스러운 품종입니다.`}
  </p>
</div>
```

**데이터 구조:**
```typescript
{
  origin: string; // "러시아 원산, 19세기에 발견됨"
}
```

#### 1.2 품종 특징 추가

**위치:** `품종 설명` 섹션

**구현:**
```tsx
<div className="bg-purple-50 rounded-2xl p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    🎭 주요 특징
  </h2>
  <ul className="grid md:grid-cols-2 gap-3">
    {breed.features?.map((feature, index) => (
      <li key={index} className="bg-white rounded-xl p-3 flex items-center gap-2">
        <span className="text-2xl">{feature.icon}</span>
        <span className="text-gray-700">{feature.text}</span>
      </li>
    ))}
  </ul>
</div>
```

**데이터 구조:**
```typescript
{
  features: Array<{
    icon: string;
    text: string;
  }>;
}
```

**예시:**
```json
[
  { "icon": "💜", "text": "보라색 눈을 가집니다." },
  { "icon": "🐾", "text": "보석 같은 눈을 가집니다." },
  { "icon": "🌸", "text": "알레르기가 적습니다." }
]
```

#### 1.3 일반적인 건강 문제 추가

**위치:** `건강 관리` 섹션 아래

**구현:**
```tsx
<div className="bg-red-50 rounded-2xl p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    🏥 일반적인 건강 문제
  </h2>
  <ul className="space-y-2">
    {breed.healthIssues?.map((issue, index) => (
      <li key={index} className="bg-white rounded-xl p-3 flex items-center gap-2">
        <span className="text-red-500">⚠️</span>
        <span className="text-gray-700">{issue}</span>
      </li>
    ))}
  </ul>
</div>
```

**데이터 구조:**
```typescript
{
  healthIssues: string[]; // ["비뇨성 저하증", "심장 질환"]
}
```

#### 1.4 수명 및 체중 추가

**위치:** `품종 프로필` 섹션

**구현:**
```tsx
<div className="grid md:grid-cols-3 gap-4">
  {/* 크기 */}
  <div className="bg-white rounded-xl p-4">
    <h3 className="font-bold text-gray-800 mb-2">크기</h3>
    <p className="text-gray-700 capitalize">{breed.size}</p>
  </div>

  {/* 체중 (신규) */}
  <div className="bg-white rounded-xl p-4">
    <h3 className="font-bold text-gray-800 mb-2">체중</h3>
    <p className="text-gray-700">{breed.weight}</p>
  </div>

  {/* 수명 (신규) */}
  <div className="bg-white rounded-xl p-4">
    <h3 className="font-bold text-gray-800 mb-2">수명</h3>
    <p className="text-gray-700">{breed.lifespan}</p>
  </div>
</div>
```

**데이터 구조:**
```typescript
{
  weight: string; // "3-5kg", "4-8kg"
  lifespan: string; // "12-15년", "15-20년"
}
```

---

### 2단계: UX 개선 (우선순위: ⭐⭐)

#### 2.1 모바일 프로그래스 바 개선

**문제:** 모바일에서 프로그래스 바가 너무 작음

**해결:**
```tsx
// 현재
<div className="w-full bg-gray-200 rounded-full h-2">

// 개선
<div className="w-full bg-gray-200 rounded-full h-3 md:h-2">
```

#### 2.2 관련 품종 추천 추가

**위치:** `테스트 시작하기` 섹션 위

**구현:**
```tsx
<div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
    🐱 비슷한 품종
  </h2>
  <div className="grid md:grid-cols-3 gap-4">
    {getSimilarBreeds(breed.id).map((similarBreed) => (
      <Link
        key={similarBreed.id}
        href={`/breed/${similarBreed.id}`}
        className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 hover:shadow-lg transition-all"
      >
        <div className="text-4xl mb-2 text-center">{similarBreed.emoji}</div>
        <p className="text-center font-semibold text-gray-800">{similarBreed.name}</p>
        <p className="text-center text-sm text-gray-600">{similarBreed.nameEn}</p>
      </Link>
    ))}
  </div>
</div>
```

**알고리즘:**
```typescript
function getSimilarBreeds(currentId: string): Breed[] {
  const currentBreed = breeds.breeds.find(b => b.id === currentId);
  if (!currentBreed) return [];

  // 성격 점수 차이 계산
  const similarities = breeds.breeds
    .filter(b => b.id !== currentId)
    .map(breed => {
      const personalityDiff = Math.abs(
        (breed.personality.activity + breed.personality.affection) -
        (currentBreed.personality.activity + currentBreed.personality.affection)
      );
      const sizeDiff = breed.size === currentBreed.size ? 0 : 1;

      return {
        ...breed,
        score: personalityDiff + sizeDiff
      };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return similarities;
}
```

#### 2.3 품종 상세 페이지 공유 기능 추가

**위치:** `테스트 시작하기` 섹션 위

**구현:**
```tsx
import dynamic from 'next/dynamic';

const SocialShare = dynamic(() => import('@/components/Result/SocialShare'), {
  ssr: false,
});

<div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
    📤 품종 공유하기
  </h2>
  <SocialShare
    title={`내 인생냥이는 ${breed.name}! 🐾`}
    description={breed.description}
    url={`https://whatcat.com/breed/${breed.id}`}
    imageUrl={breed.image}
    hashtags={[`#${breed.nameEn.replace(/\s/g, '')}`, '#냥이매치', '#고양이']}
  />
</div>
```

#### 2.4 접근성 개선

**구현:**
- ARIA 레이블 추가
- 키보드 네비게이션 개선
- 색상 대비 확인 (WCAG AA)

---

### 3단계: SEO 최적화 (우선순위: ⭐⭐⭐)

#### 3.1 메타 태그 개선

**위치:** `src/app/breed/[id]/layout.tsx` 또는 `page.tsx`

**구현:**
```tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const breed = breeds.breeds.find(b => b.id === params.id);

  if (!breed) {
    return {
      title: '품종을 찾을 수 없습니다',
    };
  }

  return {
    title: `${breed.name} (${breed.nameEn}) - 냥이 매칭`,
    description: breed.description,
    keywords: [breed.name, breed.nameEn, ...breed.traits].join(', '),
    openGraph: {
      title: `${breed.name} - 나와 딱 맞는 고양이 품종`,
      description: breed.description,
      images: [
        {
          url: breed.image,
          width: 800,
          height: 800,
          alt: `${breed.name} (${breed.nameEn})`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${breed.name} - 냥이 매칭`,
      description: breed.description,
      images: [breed.image],
    },
  };
}
```

#### 3.2 구조화된 데이터 (JSON-LD) 추가

**위치:** `src/app/breed/[id]/page.tsx`

**구현:**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CatBreed",
      name: breed.name,
      alternateName: breed.nameEn,
      description: breed.description,
      image: breed.image,
      temperament: breed.traits.join(', '),
      lifeSpan: breed.lifespan,
      weight: breed.weight,
      size: breed.size,
      furLength: breed.coat,
      popularity: breed.korea_popularity,
    }),
  }}
/>
```

#### 3.3 품종별 OG 이미지 생성

**위치:** `scripts/generate-og-images.js`

**구현:**
```javascript
// 이미 존재하는 스크립트 활용
// 각 품종별 OG 이미지 생성
for (const breed of breeds.breeds) {
  await generateOGImage({
    title: `${breed.name}\n${breed.nameEn}`,
    image: breed.image,
    emoji: breed.emoji,
    outputPath: `public/og-images/breed-${breed.id}.jpg`,
  });
}
```

---

### 4단계: 성능 최적화 (우선순위: ⭐)

#### 4.1 이미지 최적화

**구현:**
- WebP 변환 확인
- 레이지 로딩 적용
- 이미지 프리로딩 최적화

#### 4.2 번들 최적화

**구현:**
- 다이나믹 임포트 확인
- 코드 스플리팅 최적화
- 트리 쉐이킹 확인

#### 4.3 프로그래스 바 애니메이션 최적화

**구현:**
- 프로그래스 바 애니메이션 제한
- CPU 사용량 최적화
- 프레임 드랭 방지

---

## 🎯 구현 우선순위

### 1순위 (2일): 컨텐츠 강화
- 품종 기원/역사 추가
- 품종 특징 추가
- 일반적인 건강 문제 추가
- 수명 및 체중 추가

### 2순위 (1일): UX 개선
- 모바일 프로그래스 바 개선
- 관련 품종 추천 추가
- 품종 상세 페이지 공유 기능 추가
- 접근성 개선

### 3순위 (1일): SEO 최적화
- 메타 태그 개선
- 구조화된 데이터 추가
- 품종별 OG 이미지 생성

### 4순위 (1일): 성능 최적화
- 이미지 최적화
- 번들 최적화
- 프로그래스 바 애니메이션 최적화

---

## 📊 데이터베이스/JSON 구조 업데이트

### 현재 데이터 구조
```typescript
{
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  image?: string;
  rank: number;
  personality: {
    activity: number;
    affection: number;
    social: number;
    quiet: number;
    loyalty: number;
  };
  maintenance: {
    grooming: number;
    training: number;
    health: number;
  };
  cost: {
    initial: "low" | "medium" | "high";
    monthly: "low" | "medium" | "high";
  };
  environment: string[];
  traits: string[];
  size: "small" | "medium" | "large" | "xlarge";
  coat: "short" | "medium" | "long" | "hairless";
  colors: string[];
  description: string;
  korea_popularity: number;
}
```

### 새로 추가될 필드
```typescript
{
  origin?: string;            // 기원과 역사
  features?: Array<{         // 주요 특징
    icon: string;
    text: string;
  }>;
  healthIssues?: string[];    // 일반적인 건강 문제
  weight?: string;           // 체중
  lifespan?: string;         // 수명
}
```

---

## 💡 추가 기능 아이디어

### 1. AI 추천 시스템
- 사용자 입력 기반 품종 추천
- 챗봇 Q&A
- 맞춤형 정보 제공

### 2. 사용자 리뷰
- 품종별 리뷰 추가
- 별점 기능
- 사진 공유

### 3. 채널 추천
- 품종별 입양 채널 링크
- 브리더 리스트
- 입양 사이트 연동

### 4. 비교 기능
- 두 품종 동시 비교
- 3개 품종 비교
- 시각적 차이점 표시

### 5. 지도 기능
- 한국 내 입양 가능 지역
- 품종별 인기 지역
- 가까운 입양소 찾기

---

## 📅 일정 및 예산

### 1단계: 컨텐츠 강화
- **기간:** 2일
- **인원:** 1명 (몰트)
- **예산:** 0원 (내부 작업)

### 2단계: UX 개선
- **기간:** 1일
- **인원:** 1명 (몰트)
- **예산:** 0원 (내부 작업)

### 3단계: SEO 최적화
- **기간:** 1일
- **인원:** 1명 (몰트)
- **예산:** 0원 (내부 작업)

### 4단계: 성능 최적화
- **기간:** 1일
- **인원:** 1명 (몰트)
- **예산:** 0원 (내부 작업)

### 총 일정: 5일
### 총 예산: 0원

---

## ✅ 완료 기준

### 1단계 완료 기준
- 모든 품종에 기원/역사 추가
- 모든 품종에 특징 추가 (최소 3개)
- 모든 품종에 건강 문제 추가 (최소 2개)
- 모든 품종에 수명/체중 추가

### 2단계 완료 기준
- 모바일 프로그래스 바 개선
- 관련 품종 추천 3개 표시
- 공유 기능 정상 작동
- WCAG AA 준수

### 3단계 완료 기준
- 모든 품종에 메타 태그 적용
- 모든 품종에 JSON-LD 적용
- 모든 품종에 OG 이미지 생성

### 4단계 완료 기준
- Lighthouse 성능 점수 90점 이상
- WebP 이미지 100%
- 번들 사이즈 최소화

---

## 📝 참고 자료

### 레퍼런스
- https://schema.org/CatBreed
- https://developer.mozilla.org/ko/docs/Web/Accessibility
- https://web.dev/lighthouse-performance/

### 품종 데이터 출처
- 고양이 협회 (CFA)
- 국제 고양이 협회 (TICA)
- 한국 고양이 협회 (KCF)

---

## 🎯 다음 단계

### 작업 승인 후
1. 데이터 업데이트 시작 (breeds.json)
2. 1단계 컨텐츠 강화
3. 2단계 UX 개선
4. 3단계 SEO 최적화
5. 4단계 성능 최적화
6. 테스트 및 QA
7. GitHub 푸시
8. Vercel 배포

---

## 📞 문의 사항

기획서와 관련된 문의사항이 있으시면 언제든지 말씀해주세요!

---

**문서 작성일:** 2026-02-05
**최종 업데이트:** 2026-02-05
**버전:** 1.0

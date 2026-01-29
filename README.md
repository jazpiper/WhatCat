# 냥이 매치 (What Cat)

🐱 MBTI 스타일 테스트로 나와 가장 잘 맞는 고양이 품종 찾기

## 서비스 개요

냥이 매치는 사용자의 라이프스타일, 성향, 환경을 분석하여 가장 잘 어울리는 고양이 품종을 추천하는 웹 서비스입니다.

- **테스트 문항**: 14개
- **품종 데이터**: 20종
- **매칭 알고리즘**: 5대 카테고리 가중치 기반
- **공유 기능**: 인스타그램 스토리, 스레드, 카카오톡
- **친구 비교**: URL 파라미터 기반 결과 비교

## 주요 기능

### 1. 메인 페이지 (/)
- 테스트 시작 버튼
- 한국 인기 품종 랭킹 (TOP 6)
- AdSense 광고 배치 (상단/하단)

### 2. 테스트 페이지 (/test)
- 14개 질문
- 진행도 바
- 이전/다음 네비게이션
- 선택지 라디오 버튼
- AdSense 사이드 배너 (데스크톱)

### 3. 결과 페이지 (/result)
- 매칭된 품종 프로필 (성격, 관리 난이도, 적합 환경)
- 매칭 점수 (%)
- TOP 3 추천 품종
- 공유 이미지 다운로드 (html2canvas)
- 카카오톡 공유
- 스레드 공유
- 링크 복사
- 공유 카피 자동 생성 (점수별)
- 친구 결과 비교 기능

### 4. 비교 페이지 (/compare)
- 두 품종 나란히 비교
- 활동성/조용함/사교성 차이 인사이트
- 시각적 차이점 표시

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **상태 관리**: React Context API
- **아이콘**: Lucide React
- **이미지 생성**: html2canvas
- **애니메이션**: canvas-confetti
- **배포**: Vercel (준비 완료)

## 시작하기

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# http://localhost:3000 접속
```

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
nyongmatch/
├── src/
│   ├── app/
│   │   ├── page.tsx          # 메인 페이지
│   │   ├── test/page.tsx     # 테스트 페이지
│   │   ├── result/page.tsx    # 결과 페이지
│   │   ├── compare/page.tsx   # 비교 페이지
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   └── globals.css       # 전역 스타일
│   ├── components/
│   │   └── AdSense.tsx       # AdSense 컴포넌트
│   ├── contexts/
│   │   └── TestContext.tsx    # 테스트 상태 관리
│   ├── data/
│   │   ├── breeds.json        # 품종 데이터 (20종)
│   │   └── questions.json     # 질문 데이터 (14개)
│   ├── types/
│   │   └── index.ts          # TypeScript 타입 정의
│   └── utils/
│       └── matching.ts        # 매칭 알고리즘
├── public/                  # 정적 파일
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 매칭 알고리즘

### 평가 카테고리

1. **라이프스타일** (30%): 외출 빈도, 주거 공간, 혼사 유무
2. **성격** (25%): 활동성, 애정 표현, 사교성
3. **관리 용이성** (20%): 그루밍, 훈련 난이도
4. **외형 선호** (15%): 크기, 털 길이
5. **비용** (10%): 초기 비용, 월 비용

### 점수 계산

- 각 질문별 선택지에 점수 부여
- 5대 카테고리별 점수 집계
- 가중치 적용 후 최종 점수 계산
- 상위 3개 품종 추천

## 배포

### GitHub Repository 생성

1. https://github.com/new 접속
2. Repository name: `what-cat`
3. Public 선택
4. "Initialize this repository" 체크 해제
5. Create repository 클릭

### GitHub에 푸시

```bash
# 원격 레포지토리 추가
git remote add origin https://github.com/[username]/what-cat.git

# 푸시
git push -u origin main
```

### Vercel 배포

1. https://vercel.com/new 접속
2. `nyongmatch` 폴더 선택 (Import)
3. Configure Project 설정
4. Deploy 클릭
5. 도메인 설정 (선택사항)

### 환경 변수

현재 환경 변수는 필요하지 않습니다 (클라이언트 사이드 모든 로직 처리).

### AdSense 설정

AdSense 승인 후 `src/components/AdSense.tsx`의 placeholder를 실제 광고 코드로 교체하세요.

```tsx
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXXXXXXXXXXXXX" data-ad-slot="XXXXXX" data-ad-format="auto"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```

## 트래픽 유입 전략

### SNS 마케팅

- **인스타그램**: 결과 이미지 공유 캠페인
- **유튜브 쇼츠**: 반려동물 유튜버 협업
- **틱톡**: #냥이매치 챌린지
- **네이버 블로그**: 반려동물 블로거 리뷰

### SEO

- 키워드: "고양이 품종 추천", "고양이 테스트", "냥이 매치", "고양이 입양"
- 메타 태그 최적화 완료
- 사이트맵 구조 준비

## 공유 카피 예시

### 90점 이상 (S급)
```
인생냥이 확정! 92% 매칭이라니... 이건 운명이지 않나?
```

### 80-89점 (A급)
```
88% 나왔는데, 꽤 잘 맞는 것 같아! 얼른 입양하고 싶어 ㅠㅠ
```

### 70-79점 (B급)
```
75% 나왔는데... 애매하다 ㅋㅋ 뭐 나쁘지 않은 품종이긴 해
```

### 70점 미만 (C급)
```
60% 나왔는데... 이거 내가 냥이랑 안 맞는 건가? ㅠㅠ
```

## 라이선스

MIT

## 연락처

이 프로젝트는 기획서(`냥이매치_기획서.md`)를 바탕으로 개발되었습니다.

---

## API 및 자동화

### 1. 결과 데이터 구조

테스트 결과는 URL 파라미터를 통해 공유 가능합니다:

```
/result?answers=[questionId:answerId,...]
```

#### 결과 데이터 JSON 구조

```typescript
{
  breed: {
    id: string;              // 품종 ID (예: "russian-blue")
    name: string;            // 한국어 이름
    nameEn: string;          // 영어 이름
    emoji: string;           // 이모지
    image?: string;          // 이미지 URL
    rank: number;            // 한국 인기 순위
    personality: {
      activity: number;      // 1-5
      affection: number;     // 1-5
      social: number;        // 1-5
      quiet: number;         // 1-5
      loyalty: number;       // 1-5
    };
    maintenance: {
      grooming: number;      // 1-5
      training: number;      // 1-5
      health: number;        // 1-5
    };
    cost: {
      initial: "low" | "medium" | "high";
      monthly: "low" | "medium" | "high";
    };
    environment: string[];    // ["apt", "family", "quiet", "house"]
    traits: string[];        // 성격 키워드
    size: "small" | "medium" | "large" | "xlarge";
    coat: "short" | "medium" | "long" | "hairless";
    colors: string[];        // 털 색상
    description: string;      // 품종 설명
    korea_popularity: number; // 0-100
  };
  score: number;             // 매칭 점수 (0-100)
  breakdown: {
    personality: number;     // 성격 점수
    maintenance: number;     // 관리 점수
    lifestyle: number;       // 라이프스타일 점수
    appearance: number;      // 외형 점수
    cost: number;           // 비용 점수
  };
}
```

### 2. 비교 URL 형식

친구 결과와 비교할 때 사용하는 URL:

```
/compare?breed1={품종ID}&score1={점수}&breed2={품종ID}&score2={점수}
```

### 3. 품종별 해시태그/키워드

| 품종 | 키워드 | 해시태그 |
|------|--------|----------|
| 러시안 블루 | 차분, 충성심, 깔끔함 | #러시안블루 #고양이테스트 #냥이매치 |
| 스코티시 폴드 | 온순, 사교적, 귀여움 | #스코티시폴드 #접힌귀고양이 #고양이 |
| 브리티시 숏헤어 | 독립적, 차분, 큼큼함 | #브리티시숏헤어 #둥근얼굴고양이 #냥이 |
| 래그돌 | 얌전, 애정, 조용함 | #래그돌 #인형고양이 #조용한냥이 |
| 아메리칸 숏헤어 | 활동적, 건강, 적응력 | #아메리칸숏헤어 #튼튼한냥이 #고양이 |
| 메인 쿤 | 온순, 지능적, 충성심 | #메인쿤 #거대한고양이 #사랑스러운냥이 |
| 샴 | 목소리 큼, 애정, 활동적 | #샴 #보이스고양이 #활발한냥이 |
| 아비시니안 | 호기심, 활동성, 지능 | #아비시니안 #호기심많은냥이 #고양이 |
| 이그조틱 숏헤어 | 조용, 애정, 깔끔함 | #이그조틱숏헤어 #조용한고양이 #브시안고양이 |
| 페르시안 | 조용, 우아, 고급스러움 | #페르시안 #고양이황제 #우아한고양이 |
| 벵갈 | 활동적, 지능, 에너지 | #벵갈 #표범무늬 #활기찬냥이 |
| 스핑크스 | 애정, 활동적, 독특함 | #스핑크스 #털없는고양이 #특별한냥이 |

### 4. 공유 콘텐츠 템플릿

#### 인스타그램 스토리 (이미지 + 캡션)

```typescript
const caption = `
나와 가장 잘 맞는 냥이는 "${breed.name}"! 🐾

📊 매칭 점수: ${score}%
🐱 품종: ${breed.nameEn}
👀 성격: ${breed.traits.join(', ')}

너랑 딱 맞는 냥이는?
👉 테스트 받기: ${url}

#냥이매치 #고양이테스트 #${breed.nameEn.replace(/\s/g, '')}
`;
```

#### 스레드 포스팅

```typescript
const threadPost = {
  text: `내 인생냥이 찾았다! ${score}%로 "${breed.name}"가 나왔고 🐾

테스트 링크: ${url}`,
  media: breed.image, // 결과 이미지
  hashtags: ['#냥이매치', '#고양이테스트', `#${breed.nameEn.replace(/\s/g, '')}`]
};
```

#### 카카오톡 공유 (자동화 시)

```javascript
Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '나의 냥이 품종 찾기',
    description: `나와 가장 잘 맞는 냥이는 "${breed.name}"! 매칭 점수: ${score}%`,
    imageUrl: `${origin}/og-images/${breed.id}.jpg`,
    link: {
      mobileWebUrl: url,
      webUrl: url
    }
  },
  buttons: [{
    title: '테스트받기',
    link: {
      mobileWebUrl: url,
      webUrl: url
    }
  }]
});
```

### 5. 자동화 스크립트 예시

#### 매일 자동 게시물 생성 스크립트

```typescript
// scripts/auto-post.ts
import breeds from '@/data/breeds.json';
import fs from 'fs';

// 오늘의 품종 선택 (하루에 하나)
const today = new Date().getDate();
const breed = breeds.breeds[today % breeds.breeds.length];

// 포스팅 콘텐츠 생성
const post = {
  title: `❤️ ${breed.name}가 당신의 인생냥이일까요?`,
  description: breed.description,
  keywords: breed.traits,
  hashtags: ['#냥이매치', '#고양이테스트', `#${breed.nameEn.replace(/\s/g, '')}`],
  imageUrl: breed.image,
  callToAction: '테스트 받기',
  url: 'https://your-domain.com/test'
};

// JSON 파일로 저장
fs.writeFileSync('daily-post.json', JSON.stringify(post, null, 2));
console.log(`생성된 게시물: ${breed.name}`);
```

#### 주간 요약 자동화

```typescript
// scripts/weekly-summary.ts
import { spawn } from 'child_process';

const weeklyStats = {
  totalTests: 0,  // 애널리틱스에서 가져옴
  topBreeds: [],    // 인기 품종 TOP 3
  avgScore: 0,      // 평균 매칭 점수
  popularHours: []  // 테스트 시간대 분석
};

// 주간 통계 기반 콘텐츠 생성
const summaryPost = {
  title: '📊 이번 주 냥이 매치 통계',
  content: `총 ${weeklyStats.totalTests}명이 테스트를 완료했습니다!
  
  가장 인기 있는 품종:
  1️⃣ ${weeklyStats.topBreeds[0]?.name}
  2️⃣ ${weeklyStats.topBreeds[1]?.name}
  3️⃣ ${weeklyStats.topBreeds[2]?.name}
  
  평균 매칭 점수: ${weeklyStats.avgScore}%
  
  지금 바로 테스트 받아보세요! 👉 https://your-domain.com/test`,
  hashtags: ['#냥이매치', '#주간통계', '#고양이']
};

console.log(summaryPost);
```

### 6. OG 이미지 경로

각 품종별 OG(Open Graph) 이미지 경로 (미리보기용):

```
/og-images/russian-blue.jpg
/og-images/scottish-fold.jpg
/og-images/british-shorthair.jpg
... (총 20종)
```

**이미지 규격**:
- 권장: 1200x630 (1.91:1 비율)
- 최대: 5MB
- 형식: JPG, PNG

### 7. 블로거/유튜버 제안 템플릿

```typescript
const bloggerTemplate = (breed: Breed) => `
안녕하세요! 오늘은 ${breed.name}에 대해 소개해 드릴게요 🐱

## ${breed.name} (${breed.nameEn})

${breed.description}

### 특징
- 성격: ${breed.traits.join(', ')}
- 관리 난이도: ${'⭐'.repeat(breed.maintenance.grooming)}
- 적합 환경: ${breed.environment.join(', ')}
- 크기: ${breed.size}
- 털 길이: ${breed.coat}

### 내 냥이가 ${breed.name}와 잘 맞을까요?

테스트를 통해 확인해보세요! 👉
https://your-domain.com/test

#고양이 #${breed.nameEn.replace(/\s/g, '')} #반려동물
`;
```

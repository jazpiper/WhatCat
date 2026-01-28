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

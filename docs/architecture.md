# Architecture

WhatCat(냥이 매치)는 **질문(설문) → 사용자 프로필 점수/벡터 생성 → 품종별 점수화 → 결과/공유** 흐름으로 동작합니다.

## 1) High-level Flow
1. 사용자가 `/nyongmatch`에서 14개 질문에 답변
2. 답변을 기반으로 사용자 프로필을 구성
3. 품종 데이터(`breeds.json`)와 비교하여 매칭 점수 산출
4. `/result`에서 Top3 추천 + (왜 추천하는지) 설명 제공
5. 공유 이미지/링크 생성

## 2) Key Data
- 질문: `src/data/questions.json`
- 품종: `src/data/breeds.json`

## 3) Matching (Core)
- 엔트리: `src/utils/matching.ts`
  - 기본: 벡터 기반 매칭 사용(옵션으로 원본 매칭/비교 가능)
- 벡터 매칭: `src/utils/vectorMatching.ts`
  - userAnswers + questions → 사용자 벡터
  - breed → 품종 벡터
  - cosine similarity + distance 기반으로 점수화

## 4) Result Explanations (UX)
- UI: `src/components/Result/RecommendationReasonCards.tsx`
- 규칙/문구 생성: `src/utils/matchingExplanation.ts`

## 5) Pages (App Router)
- 테스트 관련 라우트는 route group으로 분리되어 있습니다: `src/app/(test)/...`
  - `src/app/(test)/nyongmatch/page.tsx`: 설문 진행
  - `src/app/(test)/result/page.tsx`: 결과(Top3 + 추천 이유)
  - `src/app/(test)/compare/page.tsx`: 비교
- 품종 상세는 SSG로 생성됩니다
  - `src/app/breed/[id]/page.tsx`: 품종 상세 (generateStaticParams 기반)
- 품종 목록은 server wrapper + client UI로 분리되어 있습니다
  - `src/app/breeds/page.tsx` (server) + `src/app/breeds/BreedsClient.tsx` (client)

## 6) Analytics/Ads
- GA4/Vercel Analytics 관련 문서: `docs/ANALYTICS_GUIDE.md`, `docs/GA4_IMPLEMENTATION_SUMMARY.md`

## 7) Design Principles
- **Deterministic**: 동일 답변 → 동일 결과
- **Explainable**: 결과에 “이유”를 항상 같이 제공
- **Cheap to run**: 서버 의존 최소화(정적/클라이언트 기반)

# PR Summary

## PR Title
`refactor: clean up lint/type errors and align analytics types`

## Summary
정적 분석 경고와 타입 에러를 정리하고, 공유/마이저니/벡터 매칭/에러 핸들링 경로의 계약 정합성을 맞춘 유지보수성 개선 커밋입니다.

- Commit: `346850d`
- Branch: `main`
- Files changed: 73 files (`1226 insertions(+), 1305 deletions(-)`)

## One-line Description
ESLint/TypeScript/Jest 회귀를 줄이기 위한 정비성 리팩터 및 정합성 정리.

## Why
- 기존 코드에서 미사용 변수/파라미터 경고와 `google-analytics` 이벤트 타입 불일치가 누적되어 있었습니다.
- 타입/린트 깨짐 상태가 유지보수 비용을 증가시켜, 기능 변경 없이 정합성 정리 우선으로 정비가 필요했습니다.

## What Changed

### 1) Lint cleanup (warning 0)
- `src/components/AsyncBoundary.tsx`
  - `AsyncBoundaryProvider` 미사용 상태 제거 및 콘텍스트 값 정합성 정리
- `src/components/Result/MatchExplanation.tsx`
  - 미사용 state 제거(측정값은 `ref` 유지)
- `src/app/api/og/route.tsx`
  - 미사용 `type` 파라미터 제거
- `src/components/TestPreviewModal.tsx`
  - `set/getStorageValue`를 컴포넌트 외부로 이동해 `useCallback` 의존성 경고 해결
- `src/utils/errorHandler.ts`, `src/utils/resultStorage.ts`, `src/utils/structuredData.ts`
  - 미사용 인자/import 정리
- `src/utils/share.ts`, `src/utils/vectorMatching.ts`, `src/utils/__tests__/breedFilters.test.ts`
  - 미사용 파라미터/변수 정리

### 2) TypeScript 정합성 개선
- `src/lib/google-analytics.tsx`
  - 이벤트 타입들을 `GtagParams`와 정합되게 정리
- `src/utils/__tests__/matching.test.ts`
  - `mockBreed`를 `Breed` 타입으로 명시

### 3) 계약 정합성(컴포넌트/API)
- `src/components/Result/SocialShare.tsx`
  - 호출부 호환을 위해 `onShareInstagram`를 optional prop으로 복원
- `src/app/my-journey/page.tsx`
  - `useResultsStorage()`에서 `deleteResult`, `formatResultDate`를 바르게 호출
- `src/utils/vectorMatching.ts`
  - 라이프스타일 매칭 함수 시그니처 정리

### 4) 추가 정리
- `docs/theme-qa-checklist.md` 추가
- `src/components/ThemeProvider.tsx` 삭제 (기존 체계 반영)

## Verification
- `npx eslint .` → pass (warning/error 0)
- `npx tsc --noEmit` → pass
- `npm test -- --runInBand` → pass
  - `Test Suites: 3 passed, 3 total`
  - `Tests: 47 passed, 47 total`

## Risks / Follow-up
- `src/components/ThemeProvider.tsx` 삭제 및 테마 동작 관련 변경은 히스토리 맥락 상 통합 테스트 재확인 필요
- `SocialShare` prop 경로는 컴파일 통과 기준에서는 안정적이지만, 브라우저 클릭 플로우별 수동 확인 권장
- `google-analytics` 타입 정렬은 런타임 이벤트 송신 동작을 바꾸지 않지만, GA 수집 로그를 확인하는 E2E 추천

## Checklist
- [x] 타입/린트 경고 정리
- [x] TSC 통과
- [x] Jest 통과
- [x] 커밋/푸시 완료 (`346850d`, `origin/main`)

## Suggested Next Steps
1. 테마 경로(초기 렌더/FOUC) 수동 점검
2. 소셜 공유 버튼 동작(카카오/트위터/스레드/스토리) e2e 확인
3. 주요 페이지(결과/마이저니/홈)에서 기본 UX 회귀 테스트

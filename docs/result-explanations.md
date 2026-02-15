# Result Explanations (추천 이유)

결과 페이지에서 Top3 추천 품종에 대해 **감성 톤 요약 + 장점/주의**를 보여주기 위한 규칙입니다.

## 구현 위치
- UI: `src/components/Result/RecommendationReasonCards.tsx`
- 텍스트 생성: `src/utils/matchingExplanation.ts`

## 출력 형태
- summary: 1~2문장
- pros: 2~3개
- cons: 1~2개
- badges: 선택(칩)

## 규칙 개요
- `breakdown` 점수 기준으로 강점/주의 포인트를 뽑아 문장을 구성합니다.
- breakdown이 비정상(0에 가깝게 들어오는) 케이스는 fallback 문구를 사용합니다.

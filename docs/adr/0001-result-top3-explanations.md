# ADR 0001: Show Top3 + Explanation Cards on Result Page

- Date: 2026-02-15

## Context
기존 결과 페이지는 점수/Top3 리스트는 있었지만, 사용자가 "왜 이 품종이 추천되는지"를 직관적으로 이해하기 어려웠다.

## Decision
- 결과 페이지에서 추천 품종을 **Top3까지만** 노출한다.
- Top3 각각에 대해 **요약(감성 톤) + 장점 2~3 + 주의 1~2**의 "추천 이유 카드"를 제공한다.

## Consequences
- 추천 결과의 설득력이 올라가고, 공유/완료율 개선에 긍정적일 것으로 기대.
- breakdown이 비정상(0)으로 들어오는 공유 링크 등의 케이스는 fallback 문구로 처리한다.

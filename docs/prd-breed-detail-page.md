# PRD: Breed Detail Page Enhancement (v2)

- Target: `/breed/[id]`
- Language: ko-KR
- Owner: Molt Company
- Last updated: 2026-02-15

## 1. Problem
현재 품종 상세 페이지는 기본 정보는 충분하지만, **검색 유입(SEO)** 과 **공유/탐색(UX)** 관점에서 전환(테스트 시작, 다른 품종 탐색)까지 이어지는 설계가 약합니다.

## 2. Goals (Success Metrics)
1) 검색 유입 증가
- GSC에서 `/breed/*` 노출/클릭 증가
- Rich result(구조화 데이터) 인식률 상승

2) UX 개선
- 상세 페이지 → 테스트 시작 CTA 클릭률 증가
- 상세 페이지 → 다른 품종 탐색(관련 품종 클릭) 증가
- 모바일에서 읽기/탭/스크롤 편의성 향상

3) 공유 확산
- 상세 페이지 공유 클릭률/복사율 확보

## 3. Non-goals
- 커뮤니티/댓글/회원 기능
- 서버 DB 구축(현재는 정적 JSON 기반 유지)

## 4. Current State (Implemented)
> (코드 기준) 이미 구현된 영역
- 기본 정보(이름/영문명/이미지/랭킹)
- 품종 프로필(성격 키워드, 크기, 털길이, 관리 난이도)
- 성격/관리/비용/환경/인기도/관리팁/유의사항
- 컨텐츠 강화: origin, features, health_issues, lifespan, weight
- CTA 및 AdSense

## 5. Requirements

### 5.1 SEO (P0)
**R1. Breed-specific metadata**
- `generateMetadata`로 품종별 title/description/OG/twitter card 적용
- Canonical 지정

**R2. Structured data (JSON-LD)**
- Breed JSON-LD 삽입 (`generateBreedStructuredData` 활용)
- Breadcrumb JSON-LD 삽입

**R3. OG image strategy**
- 최소: breed.image 기반 OG
- 권장: 품종별 OG 프리렌더(선택)

### 5.2 Share (P0)
**R4. Share actions**
- 링크 복사 버튼(성공 토스트)
- (선택) Web Share API 지원 시 native share
- 플랫폼 공유는 우선순위 낮음(카카오/스레드 등은 P1)

### 5.3 Discovery / Related breeds (P1)
**R5. Related breeds module**
- 상세 페이지 하단에 “비슷한 친구들” 3개 노출
- 기준(예시): traits overlap + size/coat + personality 거리

### 5.4 UX / Mobile (P1)
**R6. Mobile readability**
- 프로그래스 바/태그/리스트(health issues/features)가 모바일에서 읽기 좋은지 점검
- 터치 타겟(버튼/링크) 최소 44px 권장

### 5.5 Performance (P2)
**R7. Image optimization review**
- 이미지 포맷(WebP/AVIF) 및 loading 전략 확인
- 불필요한 번들(동적 import 후보) 점검

## 6. User Stories
- US1: "이 품종이 어떤 성격/관리 난이도인지 한눈에 이해하고 싶다"
- US2: "이 페이지를 친구에게 보내고 싶다"
- US3: "비슷한 품종도 같이 보고 싶다"
- US4: "검색에서 들어왔는데 신뢰할 수 있는 정보인지 확인하고 싶다(SEO/구조화 데이터)"

## 7. Acceptance Criteria
- AC1: `/breed/[id]`에서 품종별 meta가 적용되고, OG preview가 품종에 맞게 나온다
- AC2: JSON-LD가 실제 HTML에 포함된다(브라우저 View Source로 확인 가능)
- AC3: 링크 복사/공유 버튼이 동작하고, 모바일에서도 버튼이 누르기 쉽다
- AC4: 관련 품종 3개가 노출되고 클릭 시 해당 상세로 이동한다

## 8. Rollout Plan
- Phase 1 (P0): SEO + Share 기본
- Phase 2 (P1): Related breeds + UX polish
- Phase 3 (P2): OG 프리렌더/성능 최적화

## 9. Open Questions
- OG 이미지를 "동적"으로 만들지(서버/엣지 필요) vs "정적"으로 갈지(사전 생성)
- 관련 품종 추천 기준을 얼마나 설명 가능하게(why) 보여줄지

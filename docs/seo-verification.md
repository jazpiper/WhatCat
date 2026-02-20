# SEO Verification (Breed Detail)

이 문서는 `/breed/[id]`의 SEO/OG/JSON-LD가 정상적으로 적용되는지 확인하는 체크리스트입니다.

## 1) Control UI로 확인(빠른 수동 체크)
1. WhatCat 실행
   - `npm run dev`(로컬 개발) 또는 `npm run start`
2. 브라우저에서 예시 페이지 열기
   - `http://localhost:3001/breed/<id>`

### 체크 포인트
- View Source(페이지 소스 보기)에서 아래 항목이 있는지 확인
  - `<title>...`
  - `<meta name="description" ...>`
  - `<link rel="canonical" ...>`
  - `og:title`, `og:description`, `og:image`
  - `<script type="application/ld+json">` (Cat)
  - `<script type="application/ld+json">` (BreadcrumbList)

## 2) 자동 체크(추천)
서버가 실행 중인 상태에서 아래 스크립트를 실행합니다.

```bash
node scripts/verify-breed-seo.mjs --id russian-blue --base http://localhost:3001
```

- 모든 항목이 OK면 `Result: OK`
- 하나라도 누락되면 FAIL로 표시됩니다.

## 3) OG Preview(선택)
- 로컬에서는 플랫폼 프리뷰가 제한될 수 있어, 배포 URL에서 확인 권장
- 최소 확인: HTML에 `og:image`가 실제로 들어가 있는지

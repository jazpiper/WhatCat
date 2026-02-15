# Development

## Requirements
- Node.js (권장: LTS)
- npm

## Install
```bash
npm install
```

## Run
```bash
npm run dev
```

- 기본 개발 포트: `http://localhost:3001` (package.json의 `dev` 스크립트에서 고정)

## Build
```bash
npm run build
npm run start
```

## Notes
- `next build` 시 GA 측정 ID가 없으면 경고 로그가 뜰 수 있습니다. (기능상 문제는 없음)
- 멀티 lockfile 환경에서 Turbopack root를 명시하여 루트 추론 경고를 방지합니다 (`next.config.ts`).

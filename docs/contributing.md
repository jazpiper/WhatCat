# Contributing

## Branch / PR
- 기본 브랜치: `main`
- 작은 단위로 PR/커밋 (한 PR = 한 목적)

## Code style
- TypeScript 우선
- 유틸/로직은 `src/utils/`로 분리
- UI는 `src/components/`로 분리

## Testing / Quality Gate
- 빌드 통과:
```bash
npm run build
```
- (선택) 린트:
```bash
npm run lint
```

## Docs
- 기능 추가/변경 시 문서도 같이 업데이트
- 변경 규칙/의사결정은 ADR로 남기기: `docs/adr/`

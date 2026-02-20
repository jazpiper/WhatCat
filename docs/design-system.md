# WhatCat 디자인 시스템

**버전:** 1.1.1  
**업데이트:** 2026-02-20

## 목표
- 라이트/다크 전환 시 시각적 안정성 유지
- 공용 컴포넌트 재사용으로 화면 일관성 확보
- 전역 강제 오버라이드(`!important`) 없이 토큰 기반 운영

## 테마 아키텍처
- 테마 엔진: `next-themes`
- 지원 모드: `light`, `dark`, `system`
- 저장 키: `whatcat-theme`
- 레이아웃 설정: `src/app/layout.tsx`
- 토글 동작 규칙: 클래스 기반 토글(`light`/`dark`) + `system` 자동해석은 `next-themes`가 담당한다.
- 권장 CSS 바인딩: 전역은 `:root`(light baseline) + `.dark`(dark tokens) + `.light`(명시적 light override)만 사용한다.

## 전역 토큰
정의 위치: `src/app/globals.css`

### 핵심 토큰
- `--bg-page`: 페이지 기본 배경
- `--bg-surface`: 카드/패널 표면 배경
- `--text-primary`: 주요 텍스트
- `--text-secondary`: 보조 텍스트
- `--border-default`: 기본 경계선
- `--accent-primary`: 포커스/강조

### 네비게이션 토큰
- `--nav-bg-start`
- `--nav-bg-mid`
- `--nav-bg-end`
- `--nav-text`
- `--nav-muted`

## 타이포그래피
- 기본 폰트: `var(--font-geist-sans), Pretendard, Noto Sans KR, ...`
- 헤드라인/본문은 `text-[var(--text-primary)]`, `text-[var(--text-secondary)]`를 우선 사용

## 공용 컴포넌트

### `ThemeToggle`
- 위치: `src/components/ThemeToggle.tsx`
- 3상태 선택형 (`light` / `dark` / `system`)
- 접근성: `radiogroup` + `role="radio"`

### `Navigation`
- 위치: `src/components/Navigation.tsx`
- 토큰 기반 그라디언트/텍스트 색상 사용
- 모바일/데스크톱 모두 동일한 테마 색 규칙 적용

### `Card`
- 위치: `src/components/ui/Card.tsx`
- variants: `default`, `elevated`, `outlined`
- 표면/텍스트/보더 모두 토큰 사용

### `PageTitle`
- 위치: `src/components/ui/PageTitle.tsx`
- 제목: `--text-primary`
- 부제: `--text-secondary`

### `Section`
- 위치: `src/components/ui/Section.tsx`
- 기본 배경: `--bg-surface`
- 색상 variant: `pink`, `purple`, `blue`, `amber`, `green`

## 사용 가이드
- 신규 화면은 `PageContainer + Card + PageTitle + Section` 조합 우선
- `bg-white`, `text-gray-800` 단독 사용은 지양하고 `dark:*` 또는 토큰을 함께 사용
- 다크 대응 없는 고정 색상은 PR에서 차단

## 금지 사항
- `.dark .bg-*` 형태 전역 강제 치환
- `!important` 기반 다크모드 덮어쓰기
- 전역 `*` 트랜지션으로 색상 변경 강제
- `prefers-color-scheme: dark`를 이용한 전역 루트 오버라이드(`:root`)와 클래스 기반 다크(`.dark`) 동시 사용

## 분석 노트 (2026-02-20)
- `next-themes`가 루트에 `light`/`dark` 클래스를 넣어 모드를 제어할 때, `:root`에 `prefers-color-scheme: dark`를 함께 두면 OS 다크가 클래스보다 넓은 범위를 덮어써 라이트 강제 반영이 깨진다.
- 라이트 선택 시 즉시 반영되지 않는 이슈를 막기 위해 루트는 라이트 기본값만 유지하고 `.light`를 명시해 사용자가 라이트를 선택했을 때를 항상 덮어쓰도록 해야 한다.

## 적용 상태 (2026-02-20)
- 테마 토글/네비게이션/공용 UI 컴포넌트 토큰화 완료
- 핵심 페이지(`/`, `/nyongmatch`, `/result`, `/breeds`) 다크모드 보정 완료
- 보조 페이지(`/about`, `/privacy`, `/terms`) 및 주요 skeleton 다크모드 보정 완료
- 전체 스캔 기준 `src/app`, `src/components`, `src/data` 내 `gray-*` 하드컬러 클래스 잔존 없음 (`rg` 기준)
- 57개 파일에 대해 `text/bg/border/ring/fill/stroke/placeholder` 계열 토큰 치환 일괄 반영

## 관련 문서
- 재기획안: `docs/theme-uiux-replan-2026-02-20.md`
- QA 체크리스트: `docs/theme-qa-checklist.md`

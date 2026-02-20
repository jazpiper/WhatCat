# WhatCat 테마 토큰 명세

**작성일:** 2026-02-20  
**범위:** `src/app/globals.css` 기반 라이트/다크 테마 변수

## 1) 테마 토큰

### 루트/모드 토큰

| 토큰 | 라이트(`:root`, `.light`) | 다크(`.dark`) | 용도 |
| --- | --- | --- | --- |
| `--background` | `#fff7fb` | `#0f172a` | Tailwind 기본 배경 토큰(`--color-background`) |
| `--foreground` | `#1f2937` | `#f1f5f9` | Tailwind 기본 전경 토큰(`--color-foreground`) |
| `--bg-page` | `#fff7fb` | `#0f172a` | 페이지 최상위 `body` 배경 |
| `--bg-surface` | `#ffffff` | `#1f2937` | 카드/패널 표면, 콘텐츠 블록 배경 |
| `--text-primary` | `#1f2937` | `#f8fafc` | 제목/본문 주요 텍스트 |
| `--text-secondary` | `#4b5563` | `#cbd5e1` | 보조 텍스트, 설명문 |
| `--border-default` | `#e5e7eb` | `#374151` | 카드/입력/구획 경계 |
| `--accent-primary` | `#ec4899` | `#f472b6` | 포커스/강조 포인트 |

### 네비게이션 토큰

| 토큰 | 라이트 | 다크 | 용도 |
| --- | --- | --- | --- |
| `--nav-bg-start` | `#ec4899` | `#7e124e` | 내비게이션 그라디언트 시작 |
| `--nav-bg-mid` | `#a855f7` | `#4c1d95` | 내비게이션 그라디언트 중간 |
| `--nav-bg-end` | `#db2777` | `#6a103f` | 내비게이션 그라디언트 끝 |
| `--nav-text` | `#ffffff` | `#f8fafc` | 내비게이션 기본 텍스트 |
| `--nav-muted` | `rgba(255, 255, 255, 0.75)` | `rgba(248, 250, 252, 0.75)` | 비활성/보조 내비 텍스트 |

### 파생 규칙

- `@theme inline`에서 `--background`, `--foreground`는 Tailwind 토큰 `background`/`foreground`로 노출됨.
- 컴포넌트에서 라이트/다크 분기 없이 색상을 쓸 때는 `var(--token)` 방식으로 통일한다.
- 다크 고정값이 필요한 경우에는 기존 브랜딩 컬러(핑크/보라/오렌지 등)로 구체 클래스 유지.

## 2) 적용 우선순위

1. `--bg-page`, `--bg-surface`, `--text-primary`, `--text-secondary`, `--border-default`, `--accent-primary`
2. 네비게이션 토큰
3. 전용 브랜딩 색상(현재 의도된 gradient/아이콘)은 예외로 유지

## 3) 사용 예시

- 카드 배경: `bg-[var(--bg-surface)]`
- 본문 텍스트: `text-[var(--text-primary)]`
- 경계선: `border-[var(--border-default)]`
- 헤더 토큰: `from-[var(--nav-bg-start)] via-[var(--nav-bg-mid)] to-[var(--nav-bg-end)]`
- 토큰 검사: `getComputedStyle(document.documentElement).getPropertyValue('--bg-page')`

## 4) 예외 목록

- 브랜딩 버튼/아이콘/차트에 쓰는 고정 색상은 현재 정책상 토큰화 대상 제외:
  - `from-pink-500`, `to-purple-600`, `text-pink-500` 등
- 배경 반전이 시각적으로 중요하거나 다크에서 충분히 대비되지 않으면, 토큰으로 억지 변환하지 않음.

## 5) 운영 기준

- 신규 화면은 `--bg-*`/`--text-*` 우선 + `dark:` 보완으로 작성.
- `bg-white`/`text-gray-*` 단독 사용은 제한(기존 컴포넌트 예외 제외).
- 핵심 경로 변경 시 `rg -n "bg-gray-|text-gray-|border-gray-" src` 결과를 회귀 체크에 남긴다.

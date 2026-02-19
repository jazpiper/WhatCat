# WhatCat 디자인 시스템

**버전:** 1.0.0
**작성일:** 2026-02-19

---

## 개요

WhatCat 프로젝트의 일관된 UI/UX를 위한 디자인 시스템입니다. 모든 페이지에서 통일된 스타일과 다크모드를 지원합니다.

---

## 디자인 토큰

### 색상

| 용도 | 라이트 모드 | 다크 모드 |
|------|------------|----------|
| 배경 그라데이션 | `from-pink-50 via-purple-50 to-blue-50` | `dark:from-gray-900 dark:via-purple-950 dark:to-gray-900` |
| 카드 배경 | `bg-white` | `dark:bg-gray-800` |
| 타이틀 | `text-gray-800` | `dark:text-gray-100` |
| 본문 | `text-gray-600` | `dark:text-gray-300` |
| 설명/부제 | `text-gray-500` | `dark:text-gray-400` |
| 보더 | `border-gray-200` | `dark:border-gray-700` |

### 둥글기 (Border Radius)

| 이름 | 값 | 용도 |
|------|-----|------|
| `rounded-xl` | 12px | 작은 카드, 버튼 |
| `rounded-2xl` | 16px | 섹션 내부 |
| `rounded-3xl` | 24px | 메인 카드 |

### 그림자 (Shadow)

| 이름 | 값 | 용도 |
|------|-----|------|
| `shadow-md` | 중간 | 일반 카드 |
| `shadow-lg` | 큼 | 강조 카드 |
| `shadow-xl` | 매우 큼 | 메인 컨테이너 |

---

## 컴포넌트

### 1. PageContainer

페이지 전체를 감싸는 컨테이너입니다. 통일된 배경과 다크모드를 제공합니다.

**위치:** `src/components/ui/PageContainer.tsx`

```tsx
import { PageContainer } from '@/components/ui';

// 사용 예시
export default function MyPage() {
  return (
    <PageContainer>
      {/* 페이지 내용 */}
    </PageContainer>
  );
}
```

**Props:**

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `children` | `React.ReactNode` | O | 페이지 내용 |
| `className` | `string` | X | 추가 클래스 |

**스타일:**
- `min-h-screen`
- `bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50`
- `dark:from-gray-900 dark:via-purple-950 dark:to-gray-900`
- `container mx-auto px-4 py-8 max-w-4xl`

---

### 2. Card

콘텐츠를 담는 카드 컴포넌트입니다. 3가지 variant를 지원합니다.

**위치:** `src/components/ui/Card.tsx`

```tsx
import { Card } from '@/components/ui';

// 사용 예시
<Card>
  기본 카드
</Card>

<Card variant="elevated">
  강조된 카드
</Card>

<Card variant="outlined">
  테두리만 있는 카드
</Card>
```

**Props:**

| 이름 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `children` | `React.ReactNode` | O | - | 카드 내용 |
| `variant` | `'default' \| 'elevated' \| 'outlined'` | X | `'default'` | 카드 스타일 |
| `className` | `string` | X | - | 추가 클래스 |

**Variant 스타일:**

| Variant | 스타일 |
|---------|-------|
| `default` | `bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6` |
| `elevated` | `bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 ring-1 ring-purple-100 dark:ring-purple-900/50` |
| `outlined` | `bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-6` |

---

### 3. PageTitle

페이지 제목을 표시하는 컴포넌트입니다.

**위치:** `src/components/ui/PageTitle.tsx`

```tsx
import { PageTitle } from '@/components/ui';

// 사용 예시
<PageTitle emoji="🐱" subtitle="고양이 성격 테스트">
  WhatCat
</PageTitle>
```

**Props:**

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `children` | `React.ReactNode` | O | 제목 텍스트 |
| `subtitle` | `string` | X | 부제 |
| `emoji` | `string` | X | 이모지 |
| `className` | `string` | X | 추가 클래스 |

**스타일:**
- 제목: `text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4`
- 이모지: `text-4xl md:text-5xl mb-2 text-center`
- 부제: `text-gray-600 dark:text-gray-300 text-center`

---

### 4. Section

섹션 제목과 내용을 감싸는 컴포넌트입니다. 다양한 색상 variant를 지원합니다.

**위치:** `src/components/ui/Section.tsx`

```tsx
import { Section } from '@/components/ui';

// 사용 예시
<Section title="소개" emoji="✨" variant="purple">
  <p>테스트에 대한 설명...</p>
</Section>
```

**Props:**

| 이름 | 타입 | 필수 | 기본값 | 설명 |
|------|------|------|--------|------|
| `title` | `string` | O | - | 섹션 제목 |
| `emoji` | `string` | X | - | 이모지 |
| `children` | `React.ReactNode` | O | - | 섹션 내용 |
| `variant` | `'default' \| 'pink' \| 'purple' \| 'blue' \| 'amber' \| 'green'` | X | `'default'` | 색상 |
| `className` | `string` | X | - | 추가 클래스 |

**Variant 스타일:**

| Variant | 배경 그라데이션 |
|---------|----------------|
| `default` | `from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900` |
| `pink` | `from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30` |
| `purple` | `from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30` |
| `blue` | `from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30` |
| `amber` | `from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30` |
| `green` | `from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30` |

---

## 사용 예시

### 기본 페이지 구조

```tsx
import { PageContainer, Card, PageTitle, Section } from '@/components/ui';

export default function MyPage() {
  return (
    <PageContainer>
      <PageTitle emoji="🐱" subtitle="고양이 성격 테스트">
        WhatCat
      </PageTitle>

      <Card variant="elevated">
        <Section title="소개" emoji="✨" variant="purple">
          <p>테스트에 대한 설명...</p>
        </Section>
      </Card>

      <Card>
        <Section title="특징" emoji="🎭" variant="pink">
          <ul>
            <li>특징 1</li>
            <li>특징 2</li>
          </ul>
        </Section>
      </Card>
    </PageContainer>
  );
}
```

### 다크모드 고려사항

모든 컴포넌트는 자동으로 다크모드를 지원합니다. 추가 작업 없이 `ThemeProvider`가 관리합니다.

```tsx
// layout.tsx에서 이미 설정됨
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  storageKey="whatcat-theme"
>
```

---

## 적용된 페이지

| 페이지 | 적용 컴포넌트 |
|--------|--------------|
| `/` (홈) | PageContainer, Card |
| `/nyongmatch` | PageContainer, Card |
| `/result` | PageContainer, Card |
| `/compare` | PageContainer, Card |
| `/breeds` | PageContainer, Card |
| `/breed/[id]` | PageContainer, Card |
| `/my-results` | PageContainer, Card, PageTitle |
| `/my-journey` | PageContainer, Card, PageTitle |
| `/achievements` | PageContainer, Card, PageTitle, Section |
| `/daily-quiz` | PageContainer, Card, PageTitle, Section |
| `/guides` | PageContainer, Card, PageTitle, Section |
| `/faq` | PageContainer, Card, PageTitle, Section |

---

## 유틸리티

### cn 함수

클래스를 병합하는 유틸리티 함수입니다.

**위치:** `src/lib/utils.ts`

```tsx
import { cn } from '@/lib/utils';

// 사용 예시
<div className={cn(
  'bg-white dark:bg-gray-800',
  isActive && 'bg-pink-500',
  className
)}>
```

---

## 유지보수 가이드

### 새 페이지 추가 시

1. `PageContainer`로 페이지 감싸기
2. 내용은 `Card` 컴포넌트 사용
3. 제목은 `PageTitle` 사용
4. 섹션은 `Section` 사용

### 색상 변경 시

1. `globals.css`의 CSS 변수 확인
2. 컴포넌트의 Tailwind 클래스 수정
3. 다크모드 스타일도 함께 수정

### 새 컴포넌트 추가 시

1. `src/components/ui/`에 파일 생성
2. `index.ts`에 export 추가
3. 이 문서에 사용법 추가

---

## 참고 파일

- 컴포넌트: `src/components/ui/`
- 유틸리티: `src/lib/utils.ts`
- 글로벌 스타일: `src/app/globals.css`
- Tailwind 설정: `tailwind.config.js`

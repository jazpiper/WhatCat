# Theme QA Checklist

**기준일:** 2026-02-20  
**범위:** 라이트/다크/시스템 테마, 핵심 페이지 및 공용 컴포넌트

## 1. 기능 체크
- [ ] 테마 토글에서 `라이트/다크/시스템` 선택이 즉시 반영된다.
- [ ] 페이지 이동 후에도 선택한 테마가 유지된다.
- [ ] `system` 선택 시 OS 다크모드 변경을 따라간다.

## 2. 페이지 체크
### 핵심 페이지
- [ ] `/` 홈: 카드/텍스트/배지가 다크에서 대비를 유지한다.
- [ ] `/nyongmatch`: 질문 카드, 옵션 버튼, 진행 UI가 다크에서 읽힌다.
- [ ] `/result`: 결과 카드, 공유 섹션, 추천/연관 품종 섹션이 다크에서 깨지지 않는다.
- [ ] `/breeds`: 필터 패널, 검색 입력, 카드, 모바일 드로어가 다크에서 정상이다.

### 보조 페이지
- [ ] `/about`: 본문/강조 텍스트 대비가 정상이다.
- [ ] `/privacy`: 정책 박스(핑크/블루) 대비가 정상이다.
- [ ] `/terms`: `prose` 영역과 문의 박스가 다크에서 정상이다.

## 3. 공용 컴포넌트 체크
- [ ] `ThemeToggle` 접근성 속성(`radiogroup`, `aria-checked`)이 정상이다.
- [ ] `Navigation`의 활성/비활성 링크 대비가 충분하다.
- [ ] `Card`, `PageTitle`, `Section`이 토큰 기반 색상으로 표시된다.
- [ ] skeleton 화면에서 흰 배경 플래시나 보더 깨짐이 없다.

## 4. 접근성 체크
- [ ] 키보드만으로 테마 선택 및 주요 네비게이션 조작이 가능하다.
- [ ] 포커스 링이 라이트/다크 모두에서 식별 가능하다.
- [ ] 본문 텍스트 대비가 WCAG AA(4.5:1) 기준을 크게 벗어나지 않는다.

## 5. 반응형 체크
- [ ] 모바일(360px 기준)에서 네비게이션/토글이 겹치지 않는다.
- [ ] 모바일 필터 드로어에서 닫기/적용 동작이 정상이다.
- [ ] 데스크톱에서 카드 간격/섀도/보더가 일관적이다.

## 6. 회귀 체크
- [ ] `npm run build`가 성공한다.
- [ ] 콘솔에 hydration mismatch가 없다.
- [ ] 테마 변경 시 눈에 띄는 깜빡임/잔상 전환이 없다.

## 최근 정리 결과 (2026-02-20)
- 적용: `src/app`, `src/components`, `src/data/achievements.ts` 내 `-gray-*` 하드컬러 토큰 정리
- 검증:
  - `npm run build` ✅
  - `npm run lint` ✅
  - `npm run theme:qa:snap`(현재 환경) ❌
    - 실패 원인: `playwright`가 브라우저 실행 중 `content/browser/sandbox_host_linux.cc: Check failed: . shutdown: Operation not permitted`
    - `theme-qa`는 운영/CI에서 별도 환경 재시도 필요
  - `rg -n "gray-[0-9]{2,3}" src` → `0` 건
- 미완료: FOUC 체감 점검, 스크린샷 회귀는 운영 브라우저에서 수동 실행 필요

## 실행 메모
- 권장 브라우저: Chrome 최신, Safari(iOS), Samsung Internet
- 체크 순서: `light -> dark -> system`
- 스크린샷 비교 대상: 홈, 테스트, 결과, 품종

## 7. FOUC 체감 점검 (수동)
- 사전 준비
  - 개발/배포 환경에서 동일 빌드 번들 사용
  - 브라우저 확장 프로그램은 최소화
  - Chrome 최신 + Safari(iOS) + Samsung Internet에서 실행

### 시나리오 A: 초기 렌더 FOUC
- [ ] 1) 앱 진입 전 캐시/쿠키 초기화(또는 시크릿 모드)
- [ ] 2) 라이트 모드에서 `/` 진입 시 최초 렌더 2초 동안 배경/텍스트가 깜박이거나 잘못 반전되는지
- [ ] 3) 동일 조건으로 다크 선호(시스템 다크) 상태에서 `/` 진입 시 배경이 바로 다크로 정착하는지
- [ ] 4) 네비/카드/텍스트가 1초 내에 최소 횟수로 안정되는지(불필요한 왕복 토글 없음)

### 시나리오 B: 시스템 다크 모드 변경 동기화
- [ ] 1) 테마가 `system`인 상태에서 운영체제 다크 토글
- [ ] 2) 페이지 재로드 없이 UI가 다크/라이트로 즉시 전환되는지
- [ ] 3) 테마 토글 버튼의 선택값(`light/dark/system`)과 실제 클래스(`.dark`)가 일치하는지

### 시나리오 C: 네비게이션 전환 안정성
- [ ] 1) `/` → `/nyongmatch` → `/result` 순으로 이동
- [ ] 2) 페이지 전환 중 헤더/본문의 텍스트 가독성이 일시적으로 떨어지지 않는지
- [ ] 3) 이동 전후 다크/라이트 선택이 유지되는지

### 시나리오 D: 회귀 확인 후 정리
- [ ] 1) 점검 중 콘솔 경고/에러(특히 hydration/theme mismatch) 없음
- [ ] 2) 점검 스크린샷(라이트/다크, 모바일/데스크톱)으로 전/후 변경점 비교 보관
- [ ] 3) 이상 징후(미세 깜박임 지속/비정상 텍스트 색 반전)가 있으면 즉시 색 토큰/헤더 스크립트 적용 지점 추적

### 시나리오 E: 라이트 강제 반전 회피
- [ ] 1) 코드에서 `:root`에 `prefers-color-scheme: dark` 오버라이드가 없고, 라이트/다크 토글은 `.light` `.dark`로만 제어되는지 확인
- [ ] 2) 라이트 모드에서 임의 OS 다크 환경으로 재시작해도 `light` 사용자 설정이 유지되는지 확인
- [ ] 3) 스위처 상태(`light/dark/system`)와 실제 렌더 토큰(`--bg-page`, `--text-primary`)가 동기화되는지 확인

## 8. 테마/스크린샷 한 번 점검 체크리스트 (권장)
- [ ] 실행 명령(선택)
  - 수동 실행: `node scripts/theme-screenshot-check.mjs`
  - 권장 사전 준비
    - `npm i -D playwright`
    - `npx playwright install chromium`
    - `npm run dev`

- [ ] 준비
  - `npm run dev` 실행 (`localhost:3001` 기본)
  - 브라우저 콘솔에서 기존 캐시/확장 프로그램 영향 최소화
  - `localStorage.removeItem('whatcat-theme')`로 초기화(필요 시)

- [ ] 체크 대상 페이지
  - `/`
  - `/breeds`
  - `/daily-quiz`
  - `/compare`
  - `/nyongmatch`
  - `/result`

- [ ] ThemeToggle 기능 확인
  - 네비게이션의 토글을 `라이트` → `다크` → `시스템` 순으로 클릭
  - 각 단계에서 **1초 내** 아래 토큰이 반영되는지 확인
    - `getComputedStyle(document.documentElement).getPropertyValue('--bg-page')`
    - `getComputedStyle(document.documentElement).getPropertyValue('--text-primary')`
    - `document.documentElement.classList.contains('dark')`
  - 변경 직후 페이지 새로고침해도 동일 테마 유지

- [ ] 스크린샷 체크(모바일/데스크톱)
  - 각 페이지에서 아래 2배열 화면(라이트/다크) 각각 1장 캡처
  - 데스크톱: `>= 1280` 기준, 모바일: `375x812` 기준
  - 캡처 저장 파일명 예시
    - `theme-home-light.png`
    - `theme-home-dark.png`
    - `theme-breeds-light.png`
    - `theme-breeds-dark.png`
    - `theme-daily-quiz-light.png`
    - `theme-daily-quiz-dark.png`

- [ ] 시스템 모드 상호작용
  - OS/브라우저 다크 모드 토글 전환 시 `ThemeToggle`이 `system` 상태일 때 페이지가 재로드 없이 따라오는지 확인

- [ ] 실패 징후가 보일 때 확인점
  - 라이트에서 `--bg-page`가 `#0f172a` 계열로 고정되는지
  - 토글 버튼은 바뀌는데 실제 UI token이 안 바뀌는지
  - 이동 경로별 초기 렌더에서 2회 이상 색상 깜박임(FOUC) 발생 여부

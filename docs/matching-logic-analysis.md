# WhatCat 매칭 로직 분석

## 현재 로직 문제점

### 1. 성격 매칭 (30%)
```typescript
const personalityDiff =
  Math.abs(userScore.personality.activity - breed.personality.activity) +
  Math.abs(userScore.personality.affection - breed.personality.affection) +
  Math.abs(userScore.personality.social - breed.personality.social) +
  Math.abs(userScore.personality.quiet - breed.personality.quiet) +
  Math.abs(userScore.personality.loyalty - breed.personality.loyalty);
const personalityScore = Math.max(0, 100 - (personalityDiff / 25) * 100);
```

**문제점:**
- 최대 차이: (5-1) * 5 = 20
- 나누는 값: 25
- 최소 점수: `100 - (20/25)*100 = 20%` → 너무 높음
- 실제 최대 차이를 반영하지 않음

**개선안:**
```typescript
// 최대 차이: 20
const personalityScore = Math.max(0, 100 - (personalityDiff / 20) * 100);
```

### 2. 관리 용이성 매칭 (25%)
```typescript
const maintenanceDiff =
  Math.abs(userScore.maintenance.grooming - breed.maintenance.grooming) +
  Math.abs(userScore.maintenance.training - breed.maintenance.training) +
  Math.abs(userScore.maintenance.health - breed.maintenance.health);
const maintenanceScore = Math.max(0, 100 - (maintenanceDiff / 15) * 100);
```

**문제점:**
- 최대 차이: (5-1) * 3 = 12
- 나누는 값: 15
- 최소 점수: `100 - (12/15)*100 = 20%` → 너무 높음

**개선안:**
```typescript
// 최대 차이: 12
const maintenanceScore = Math.max(0, 100 - (maintenanceDiff / 12) * 100);
```

### 3. 라이프스타일 매칭 (20%)
```typescript
const lifestyleScore = Math.min(100, (userScore.lifestyle / 5) * 100);
```

**문제점:**
- 사용자 라이프스타일 점수만 사용 (0-5)
- 품종의 환경 적합성(`breed.environment`)을 고려하지 않음
- 품종 데이터에 환경 정보가 있지만 사용하지 않음

**개선안:**
- 사용자의 거주 환경과 품종의 적합 환경 비교
- `breed.environment`에 있는 `apt`, `family`, `quiet` 등을 활용

### 4. 외형 선호 매칭 (15%)
```typescript
let appearanceScore = 50; // 기본 점수
if (userScore.appearance.size !== 'any') {
  if (userScore.appearance.size === breed.size) {
    appearanceScore += 25;
  } else if (...) {
    appearanceScore += 10;
  }
}
if (userScore.appearance.coat !== 'any') {
  if (userScore.appearance.coat === breed.coat) {
    appearanceScore += 25;
  } else if (...) {
    appearanceScore += 10;
  }
}
```

**문제점:**
- 기본 점수가 50%
- 정확한 매칭 시 50+25+25 = 100%
- 부분 매칭 시 50+10 또는 50+10+10 = 70%
- 로직은 이상적이나 효율적일지 확인 필요

### 5. 비용 매칭 (10%)
```typescript
let costScore = 50; // 기본 점수
const costOrder = { low: 1, medium: 2, high: 3, veryhigh: 4 };
const userInitial = costOrder[userScore.cost.initial as keyof typeof costOrder];
const breedInitial = costOrder[breed.cost.initial as keyof typeof costOrder];

if (userInitial >= breedInitial) {
  costScore += 25;
} else if (userInitial + 1 >= breedInitial) {
  costScore += 15;
}
```

**문제점:**
- 기본 점수가 50%
- 예산 충족 시 50+25+25 = 100%
- 부분 충족 시 50+15 또는 50+15+15 = 80%
- 로직은 이상적

## 개선 우선순위

1. **긴급**: 성격 매칭 최대 차이 수정 (25 → 20)
2. **긴급**: 관리 용이성 최대 차이 수정 (15 → 12)
3. **중요**: 라이프스타일 매칭 개선 (환경 정보 활용)
4. **선택**: 외형/비용 매칭 로직 검토 (현재는 이상적)

## 추천 개선안

```typescript
// 성격 매칭 개선
const maxPersonalityDiff = 20; // 5개 속성 * 4점 차이
const personalityScore = Math.max(0, 100 - (personalityDiff / maxPersonalityDiff) * 100);

// 관리 용이성 개선
const maxMaintenanceDiff = 12; // 3개 속성 * 4점 차이
const maintenanceScore = Math.max(0, 100 - (maintenanceDiff / maxMaintenanceDiff) * 100);

// 라이프스타일 개선 (환경 정보 활용)
// - questions.json에서 환경 정보를 수집
// - breeds.json의 environment와 비교
```

import type { Achievement, UserAchievementState } from '@/types';

/**
 * Achievement Badge Data
 * 8 achievements with rarity system (common, rare, epic, legendary)
 */

export const achievements: Achievement[] = [
  {
    id: 'first-match',
    name: 'First Match',
    nameKo: '첫 매칭',
    description: '냥이 매칭 테스트를 처음 완료했습니다',
    icon: '🎯',
    rarity: 'common',
    condition: (state) => state.testsCompleted >= 1,
  },
  {
    id: 'serial-adopter',
    name: 'Serial Adopter',
    nameKo: '연쇄 입양자',
    description: '냥이 매칭 테스트를 5회 완료했습니다',
    icon: '🔥',
    rarity: 'rare',
    condition: (state) => state.testsCompleted >= 5,
  },
  {
    id: 'all-rounder',
    name: 'All-Rounder',
    nameKo: '올라운더',
    description: '상위 10개 품종을 모두 받아보았습니다',
    icon: '🌟',
    rarity: 'epic',
    condition: (state) => {
      const top10Breeds = new Set([
        'russian-blue',
        'scottish-fold',
        'british-shorthair',
        'maine-coon',
        'ragdoll',
        'siamese',
        'persian',
        'bengal',
        'sphynx',
        'norwegian-forest',
      ]);
      const matched = state.breedsMatched.filter((b) => top10Breeds.has(b));
      return matched.length >= 10;
    },
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    nameKo: '소셜 버터플라이',
    description: '3개 이상 플랫폼에서 결과를 공유했습니다',
    icon: '📢',
    rarity: 'rare',
    condition: (state) => state.platformsShared >= 3,
  },
  {
    id: 'cat-scholar',
    name: 'Cat Scholar',
    nameKo: '고양이 학자',
    description: '10개 이상의 품종 상세를 조회했습니다',
    icon: '📚',
    rarity: 'rare',
    condition: (state) => state.breedsViewed >= 10,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    nameKo: '탐험가',
    description: '모든 가이드 페이지를 방문했습니다',
    icon: '🔍',
    rarity: 'epic',
    condition: (state) => state.guidesViewed >= 5,
  },
  {
    id: 'connector',
    name: 'Connector',
    nameKo: '커넥터',
    description: '3명 이상의 친구와 결과를 비교했습니다',
    icon: '🤝',
    rarity: 'rare',
    condition: (state) => state.friendsCompared >= 3,
  },
  {
    id: 'perfect-match',
    name: 'Perfect Match',
    nameKo: '완벽한 매칭',
    description: '95% 이상의 매칭 점수를 받았습니다',
    icon: '⭐',
    rarity: 'legendary',
    condition: (state) => state.highestScore >= 95,
  },
];

/**
 * Get achievement by ID
 */
export function getAchievementById(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id);
}

/**
 * Get achievements by rarity
 */
export function getAchievementsByRarity(rarity: Achievement['rarity']): Achievement[] {
  return achievements.filter((a) => a.rarity === rarity);
}

/**
 * Get unlocked achievements based on user state
 */
export function getUnlockedAchievements(state: UserAchievementState): Achievement[] {
  return achievements.filter((a) => a.condition(state));
}

/**
 * Get locked achievements based on user state
 */
export function getLockedAchievements(state: UserAchievementState): Achievement[] {
  return achievements.filter((a) => !a.condition(state));
}

/**
 * Get newly unlocked achievements (compare previous and current state)
 */
export function getNewlyUnlockedAchievements(
  previousState: UserAchievementState,
  currentState: UserAchievementState
): Achievement[] {
  const previouslyUnlocked = new Set(getUnlockedAchievements(previousState).map((a) => a.id));
  return getUnlockedAchievements(currentState).filter((a) => !previouslyUnlocked.has(a.id));
}

/**
 * Rarity configuration for styling and display
 */
export const RARITY_CONFIG = {
  common: {
    label: '일반',
    icon: '⚪',
    color: 'from-gray-400 to-gray-500',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-300',
    progressColor: 'bg-gray-500',
  },
  rare: {
    label: '희귀',
    icon: '🔵',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-300',
    progressColor: 'bg-blue-500',
  },
  epic: {
    label: '에픽',
    icon: '🟣',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-300',
    progressColor: 'bg-purple-500',
  },
  legendary: {
    label: '전설',
    icon: '🟡',
    color: 'from-yellow-400 to-orange-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-300',
    progressColor: 'bg-yellow-500',
  },
} as const;

/**
 * Calculate achievement progress percentage
 */
export function getAchievementProgress(achievement: Achievement, state: UserAchievementState): number {
  // For achievements with numeric thresholds
  switch (achievement.id) {
    case 'first-match':
      return Math.min(100, (state.testsCompleted / 1) * 100);
    case 'serial-adopter':
      return Math.min(100, (state.testsCompleted / 5) * 100);
    case 'all-rounder':
      const top10Breeds = new Set([
        'russian-blue',
        'scottish-fold',
        'british-shorthair',
        'maine-coon',
        'ragdoll',
        'siamese',
        'persian',
        'bengal',
        'sphynx',
        'norwegian-forest',
      ]);
      const matched = state.breedsMatched.filter((b) => top10Breeds.has(b));
      return Math.min(100, (matched.length / 10) * 100);
    case 'social-butterfly':
      return Math.min(100, (state.platformsShared / 3) * 100);
    case 'cat-scholar':
      return Math.min(100, (state.breedsViewed / 10) * 100);
    case 'explorer':
      return Math.min(100, (state.guidesViewed / 5) * 100);
    case 'connector':
      return Math.min(100, (state.friendsCompared / 3) * 100);
    case 'perfect-match':
      return Math.min(100, (state.highestScore / 95) * 100);
    default:
      return achievement.condition(state) ? 100 : 0;
  }
}

/**
 * Get achievement progress text
 */
export function getAchievementProgressText(achievement: Achievement, state: UserAchievementState): string {
  switch (achievement.id) {
    case 'first-match':
      return `${state.testsCompleted}/1`;
    case 'serial-adopter':
      return `${state.testsCompleted}/5`;
    case 'all-rounder':
      const top10Breeds = new Set([
        'russian-blue',
        'scottish-fold',
        'british-shorthair',
        'maine-coon',
        'ragdoll',
        'siamese',
        'persian',
        'bengal',
        'sphynx',
        'norwegian-forest',
      ]);
      const matched = state.breedsMatched.filter((b) => top10Breeds.has(b));
      return `${matched.length}/10`;
    case 'social-butterfly':
      return `${state.platformsShared}/3`;
    case 'cat-scholar':
      return `${state.breedsViewed}/10`;
    case 'explorer':
      return `${state.guidesViewed}/5`;
    case 'connector':
      return `${state.friendsCompared}/3`;
    case 'perfect-match':
      return `${state.highestScore}%`;
    default:
      return '';
  }
}

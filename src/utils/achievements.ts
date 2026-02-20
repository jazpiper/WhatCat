import { UserAchievements, UserAchievementState } from '@/types';
import { achievements, getNewlyUnlockedAchievements } from '@/data/achievements';
import { safeGetStorage, safeSetStorage, safeRemoveStorage, logError } from '@/utils/errorHandler';

const ACHIEVEMENTS_STORAGE_KEY = 'whatcat_achievements';
type UnknownAchievementShape = { [key: string]: unknown };

function isUserAchievementState(value: unknown): value is UserAchievementState {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const state = value as UserAchievementState;
  return (
    typeof state.testsCompleted === 'number' &&
    Number.isFinite(state.testsCompleted) &&
    Array.isArray(state.breedsMatched) &&
    typeof state.platformsShared === 'number' &&
    Number.isFinite(state.platformsShared) &&
    typeof state.breedsViewed === 'number' &&
    Number.isFinite(state.breedsViewed) &&
    typeof state.guidesViewed === 'number' &&
    Number.isFinite(state.guidesViewed) &&
    typeof state.friendsCompared === 'number' &&
    Number.isFinite(state.friendsCompared) &&
    typeof state.highestScore === 'number' &&
    Number.isFinite(state.highestScore)
  );
}

function isUserAchievements(value: unknown): value is UserAchievements {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const achievements = value as UnknownAchievementShape;
  return (
    Array.isArray(achievements.unlocked) &&
    isUserAchievementState(achievements.state)
  );
}

/**
 * Default user achievement state
 */
export const DEFAULT_ACHIEVEMENT_STATE: UserAchievementState = {
  testsCompleted: 0,
  breedsMatched: [],
  platformsShared: 0,
  breedsViewed: 0,
  guidesViewed: 0,
  friendsCompared: 0,
  highestScore: 0,
};

/**
 * Default user achievements
 */
export const DEFAULT_USER_ACHIEVEMENTS: UserAchievements = {
  unlocked: [],
  state: DEFAULT_ACHIEVEMENT_STATE,
  lastUpdated: new Date().toISOString(),
};

/**
 * Load user achievements from localStorage
 */
export function loadUserAchievements(): UserAchievements {
  const stored = safeGetStorage<unknown>(ACHIEVEMENTS_STORAGE_KEY, null);

  if (!isUserAchievements(stored)) {
    return DEFAULT_USER_ACHIEVEMENTS;
  }

  // Validate and merge with defaults to handle schema changes
  return {
    unlocked: stored.unlocked || [],
    state: {
      ...DEFAULT_ACHIEVEMENT_STATE,
      ...stored.state,
      breedsMatched: stored.state?.breedsMatched || [],
    },
    lastUpdated: stored.lastUpdated || new Date().toISOString(),
  };
}

/**
 * Save user achievements to localStorage
 */
export function saveUserAchievements(achievements: UserAchievements): void {
  const toSave: UserAchievements = {
    ...achievements,
    lastUpdated: new Date().toISOString(),
  };
  safeSetStorage(ACHIEVEMENTS_STORAGE_KEY, toSave);
}

/**
 * Update user achievement state and check for new unlocks
 */
export function updateAchievementState(
  updates: Partial<UserAchievementState>
): { newAchievements: string[]; state: UserAchievementState } {
  const current = loadUserAchievements();
  const previousState = current.state;

  // Merge updates with current state
  const newState: UserAchievementState = {
    ...previousState,
    ...updates,
    // Handle arrays specially
    breedsMatched: updates.breedsMatched
      ? [...new Set([...previousState.breedsMatched, ...updates.breedsMatched])]
      : previousState.breedsMatched,
    // Handle max values
    highestScore: updates.highestScore
      ? Math.max(previousState.highestScore, updates.highestScore)
      : previousState.highestScore,
  };

  // Check for newly unlocked achievements
  const newAchievementsList = getNewlyUnlockedAchievements(previousState, newState);
  const newAchievementIds = newAchievementsList.map((a) => a.id);

  // Update unlocked list
  const updatedUnlocked = [
    ...new Set([...current.unlocked, ...newAchievementIds]),
  ];

  // Save updated achievements
  const updated: UserAchievements = {
    unlocked: updatedUnlocked,
    state: newState,
    lastUpdated: new Date().toISOString(),
  };

  saveUserAchievements(updated);

  return {
    newAchievements: newAchievementIds,
    state: newState,
  };
}

/**
 * Reset all achievements (for testing/debugging)
 */
export function resetAchievements(): void {
  safeRemoveStorage(ACHIEVEMENTS_STORAGE_KEY);
}

/**
 * Check if a specific achievement is unlocked
 */
export function isAchievementUnlocked(achievementId: string): boolean {
  const current = loadUserAchievements();
  return current.unlocked.includes(achievementId);
}

/**
 * Get achievement progress for display
 */
export function getAchievementProgress(achievementId: string): number {
  const current = loadUserAchievements();
  const achievement = achievements.find((a) => a.id === achievementId);

  if (!achievement) {
    return 0;
  }

  return achievement.condition(current.state) ? 100 : 0;
}

/**
 * Track test completion
 */
export function trackTestCompleted(breedId: string, score: number): string[] {
  return updateAchievementState({
    testsCompleted: (loadUserAchievements().state.testsCompleted || 0) + 1,
    breedsMatched: [breedId],
    highestScore: score,
  }).newAchievements;
}

/**
 * Track breed detail view
 */
export function trackBreedViewed(): void {
  updateAchievementState({
    breedsViewed: (loadUserAchievements().state.breedsViewed || 0) + 1,
  });
}

/**
 * Track guide page view
 */
export function trackGuideViewed(): void {
  updateAchievementState({
    guidesViewed: (loadUserAchievements().state.guidesViewed || 0) + 1,
  });
}

/**
 * Track friend comparison
 */
export function trackFriendComparison(): void {
  updateAchievementState({
    friendsCompared: (loadUserAchievements().state.friendsCompared || 0) + 1,
  });
}

/**
 * Track social share
 */
export function trackSocialShare(): void {
  updateAchievementState({
    platformsShared: (loadUserAchievements().state.platformsShared || 0) + 1,
  });
}

/**
 * Export achievements as JSON (for sharing/backup)
 */
export function exportAchievements(): string {
  const current = loadUserAchievements();
  return JSON.stringify(current, null, 2);
}

/**
 * Import achievements from JSON
 */
export function importAchievements(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as unknown;

    if (!isUserAchievements(parsed)) {
      return false;
    }

    // Basic validation
    saveUserAchievements(parsed);
    return true;
  } catch (error) {
    logError(error, 'importAchievements');
    return false;
  }
}

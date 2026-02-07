/**
 * Achievement System Hook
 * Manages achievement tracking and state
 */
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { UserAchievements, UserAchievementState } from '@/types';
import {
  loadUserAchievements,
  updateAchievementState,
  trackTestCompleted,
  trackBreedViewed,
  trackGuideViewed,
  trackFriendComparison,
  trackSocialShare,
} from '@/utils/achievements';
import { achievements } from '@/data/achievements';
import {
  logAchievementUnlocked,
  logAchievementViewed,
  logAchievementsPageViewed,
} from '@/lib/google-analytics';

export function useAchievements() {
  const [userAchievements, setUserAchievements] = useState<UserAchievements>({
    unlocked: [],
    state: {
      testsCompleted: 0,
      breedsMatched: [],
      platformsShared: 0,
      breedsViewed: 0,
      guidesViewed: 0,
      friendsCompared: 0,
      highestScore: 0,
    },
    lastUpdated: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load achievements on mount
  useEffect(() => {
    const loaded = loadUserAchievements();
    setUserAchievements(loaded);
    setIsLoading(false);
  }, []);

  // Track test completion and check for new achievements
  const completeTest = useCallback((breedId: string, score: number) => {
    setUserAchievements((prev) => {
      const { newAchievements, state } = updateAchievementState({
        testsCompleted: prev.state.testsCompleted + 1,
        breedsMatched: [breedId],
        highestScore: Math.max(prev.state.highestScore, score),
      });

      // Log analytics for newly unlocked achievements
      newAchievements.forEach((id) => {
        const achievement = achievements.find((a) => a.id === id);
        if (achievement) {
          logAchievementUnlocked({
            achievement_id: id,
            achievement_name: achievement.nameKo,
            rarity: achievement.rarity,
          });
        }
      });

      return {
        ...prev,
        unlocked: [...new Set([...prev.unlocked, ...newAchievements])],
        state,
      };
    });
  }, []);

  // Track breed detail view
  const viewBreed = useCallback(() => {
    setUserAchievements((prev) => {
      const { state } = updateAchievementState({
        breedsViewed: prev.state.breedsViewed + 1,
      });
      return { ...prev, state };
    });
  }, []);

  // Track guide page view
  const viewGuide = useCallback(() => {
    setUserAchievements((prev) => {
      const { state } = updateAchievementState({
        guidesViewed: prev.state.guidesViewed + 1,
      });
      return { ...prev, state };
    });
  }, []);

  // Track friend comparison
  const compareWithFriend = useCallback(() => {
    setUserAchievements((prev) => {
      const { state, newAchievements } = updateAchievementState({
        friendsCompared: prev.state.friendsCompared + 1,
      });

      // Log analytics for newly unlocked achievements
      newAchievements.forEach((id) => {
        const achievement = achievements.find((a) => a.id === id);
        if (achievement) {
          logAchievementUnlocked({
            achievement_id: id,
            achievement_name: achievement.nameKo,
            rarity: achievement.rarity,
          });
        }
      });

      return {
        ...prev,
        unlocked: [...new Set([...prev.unlocked, ...newAchievements])],
        state,
      };
    });
  }, []);

  // Track social share
  const shareResult = useCallback(() => {
    setUserAchievements((prev) => {
      const { state, newAchievements } = updateAchievementState({
        platformsShared: prev.state.platformsShared + 1,
      });

      // Log analytics for newly unlocked achievements
      newAchievements.forEach((id) => {
        const achievement = achievements.find((a) => a.id === id);
        if (achievement) {
          logAchievementUnlocked({
            achievement_id: id,
            achievement_name: achievement.nameKo,
            rarity: achievement.rarity,
          });
        }
      });

      return {
        ...prev,
        unlocked: [...new Set([...prev.unlocked, ...newAchievements])],
        state,
      };
    });
  }, []);

  // Check if a specific achievement is unlocked
  const isUnlocked = useCallback((achievementId: string) => {
    return userAchievements.unlocked.includes(achievementId);
  }, [userAchievements.unlocked]);

  // View achievement details (for analytics)
  const viewAchievement = useCallback((achievementId: string, source: 'gallery' | 'result' | 'profile') => {
    logAchievementViewed({
      achievement_id: achievementId,
      source,
    });
  }, []);

  // Get unlocked achievements (memoized)
  const unlockedAchievements = useMemo(() =>
    achievements.filter((a) =>
      userAchievements.unlocked.includes(a.id)
    ), [userAchievements.unlocked]);

  // Get locked achievements (memoized)
  const lockedAchievements = useMemo(() =>
    achievements.filter((a) =>
      !userAchievements.unlocked.includes(a.id)
    ), [userAchievements.unlocked]);

  return {
    // State
    userAchievements,
    unlockedAchievements,
    lockedAchievements,
    isLoading,

    // Actions
    completeTest,
    viewBreed,
    viewGuide,
    compareWithFriend,
    shareResult,
    isUnlocked,
    viewAchievement,
  };
}

/**
 * Hook for achievements page analytics
 */
export function useAchievementsPageViewed() {
  useEffect(() => {
    const { unlocked, state } = loadUserAchievements();

    logAchievementsPageViewed({
      total_unlocked: unlocked.length,
      total_achievements: 8, // Total number of achievements
    });
  }, []);
}

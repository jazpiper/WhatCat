'use client';

import { useCallback, useState } from 'react';
import { AchievementBanner } from '@/components/Achievement';
import {
  loadUserAchievements,
  trackTestCompleted,
  updateAchievementState,
} from '@/utils/achievements';
import type { UserAchievements, UserAchievementState } from '@/types';

interface AchievementTrackerProps {
  breedId: string;
  score: number;
}

export function useAchievementTracker(breedId: string, score: number) {
  const [userAchievements, setUserAchievements] = useState<UserAchievements>(() => loadUserAchievements());
  const [newAchievements, setNewAchievements] = useState<string[]>(() => {
    const unlocked = trackTestCompleted(breedId, score);
    const current = loadUserAchievements();
    return unlocked.filter((id) => !current.unlocked.includes(id));
  });

  const applyAchievementState = useCallback((updates: Partial<UserAchievementState>) => {
    const result = updateAchievementState(updates);
    setUserAchievements(loadUserAchievements());

    if (result.newAchievements.length > 0) {
      setNewAchievements((prev) => Array.from(new Set([...prev, ...result.newAchievements])));
    }

    return result;
  }, []);

  const trackShare = useCallback(() => {
    return applyAchievementState({
      platformsShared: userAchievements.state.platformsShared + 1,
    });
  }, [applyAchievementState, userAchievements.state.platformsShared]);

  const trackCompareFriend = useCallback(() => {
    return applyAchievementState({
      friendsCompared: userAchievements.state.friendsCompared + 1,
    });
  }, [applyAchievementState, userAchievements.state.friendsCompared]);

  const trackViewBreed = useCallback(() => {
    applyAchievementState({
      breedsViewed: userAchievements.state.breedsViewed + 1,
    });
  }, [applyAchievementState, userAchievements.state.breedsViewed]);

  return {
    newAchievements,
    setNewAchievements,
    userAchievements,
    trackShare,
    trackCompareFriend,
    trackViewBreed,
  };
}

export default function AchievementTracker({
  breedId,
  score,
}: AchievementTrackerProps) {
  const { newAchievements, setNewAchievements } = useAchievementTracker(breedId, score);

  const handleCloseBanner = () => {
    setNewAchievements([]);
  };

  return (
    <>
      {newAchievements.length > 0 && (
        <AchievementBanner
          achievementIds={newAchievements}
          onClose={handleCloseBanner}
        />
      )}
    </>
  );
}

/**
 * Hook to manually trigger achievement tracking
 * Can be used in components that can't use the AchievementTracker directly
 */
export function useManualAchievementTracking() {
  const trackShareAchievement = () => {
    const { newAchievements } = updateAchievementState({
      platformsShared: (loadUserAchievements().state.platformsShared || 0) + 1,
    });
    return newAchievements;
  };

  const trackComparisonAchievement = () => {
    const { newAchievements } = updateAchievementState({
      friendsCompared: (loadUserAchievements().state.friendsCompared || 0) + 1,
    });
    return newAchievements;
  };

  const trackBreedViewAchievement = () => {
    updateAchievementState({
      breedsViewed: (loadUserAchievements().state.breedsViewed || 0) + 1,
    });
  };

  return {
    trackShareAchievement,
    trackComparisonAchievement,
    trackBreedViewAchievement,
  };
}

'use client';

import { useEffect, useState, useCallback } from 'react';
import { AchievementBanner } from '@/components/Achievement';
import {
  trackTestCompleted,
  loadUserAchievements,
} from '@/utils/achievements';
import type { UserAchievements } from '@/types';

interface AchievementTrackerProps {
  breedId: string;
  score: number;
  onShare?: () => void;
  onCompareFriend?: () => void;
  onViewBreed?: () => void;
}

/**
 * Achievement Tracker Component
 *
 * This component automatically tracks achievement progress when mounted.
 * Place it on pages where user actions should trigger achievements.
 *
 * Props:
 * - breedId: The matched breed ID (for test completion tracking)
 * - score: The matching score (for perfect match achievement)
 * - onShare: Callback when user shares result
 * - onCompareFriend: Callback when user compares with friend
 * - onViewBreed: Callback when user views breed details
 */
export function useAchievementTracker(breedId: string, score: number) {
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
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

  useEffect(() => {
    // Load current achievements
    const loaded = loadUserAchievements();
    setUserAchievements(loaded);

    // Track test completion
    const unlocked = trackTestCompleted(breedId, score);
    setNewAchievements(unlocked);

    // Update state
    const updated = loadUserAchievements();
    setUserAchievements(updated);
  }, [breedId, score]);

  const trackShare = useCallback(() => {
    const { updateAchievementState } = require('@/utils/achievements');
    const { newAchievements: newOnes } = updateAchievementState({
      platformsShared: userAchievements.state.platformsShared + 1,
    });

    if (newOnes.length > 0) {
      setNewAchievements((prev) => [...new Set([...prev, ...newOnes])]);
    }

    // Update state
    const updated = loadUserAchievements();
    setUserAchievements(updated);

    return newOnes;
  }, [userAchievements.state.platformsShared]);

  const trackCompareFriend = useCallback(() => {
    const { updateAchievementState } = require('@/utils/achievements');
    const { newAchievements: newOnes } = updateAchievementState({
      friendsCompared: userAchievements.state.friendsCompared + 1,
    });

    if (newOnes.length > 0) {
      setNewAchievements((prev) => [...new Set([...prev, ...newOnes])]);
    }

    // Update state
    const updated = loadUserAchievements();
    setUserAchievements(updated);

    return newOnes;
  }, [userAchievements.state.friendsCompared]);

  const trackViewBreed = useCallback(() => {
    const { updateAchievementState } = require('@/utils/achievements');
    updateAchievementState({
      breedsViewed: userAchievements.state.breedsViewed + 1,
    });

    // Update state
    const updated = loadUserAchievements();
    setUserAchievements(updated);
  }, [userAchievements.state.breedsViewed]);

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
  onShare,
  onCompareFriend,
  onViewBreed,
}: AchievementTrackerProps) {
  const { newAchievements, setNewAchievements, trackShare, trackCompareFriend } = useAchievementTracker(
    breedId,
    score
  );

  // Expose tracking functions via ref or callback
  useEffect(() => {
    if (onShare) {
      (window as any).__achievementTrackShare = trackShare;
    }
    if (onCompareFriend) {
      (window as any).__achievementTrackCompareFriend = trackCompareFriend;
    }
  }, [trackShare, trackCompareFriend, onShare, onCompareFriend]);

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
    const { updateAchievementState } = require('@/utils/achievements');
    const { newAchievements } = updateAchievementState({
      platformsShared: (loadUserAchievements().state.platformsShared || 0) + 1,
    });
    return newAchievements;
  };

  const trackComparisonAchievement = () => {
    const { updateAchievementState } = require('@/utils/achievements');
    const { newAchievements } = updateAchievementState({
      friendsCompared: (loadUserAchievements().state.friendsCompared || 0) + 1,
    });
    return newAchievements;
  };

  const trackBreedViewAchievement = () => {
    const { updateAchievementState } = require('@/utils/achievements');
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

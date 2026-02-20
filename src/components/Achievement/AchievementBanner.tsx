'use client';

import { useCallback, useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { achievements } from '@/data/achievements';
import { RARITY_CONFIG } from '@/data/achievements';
import { logAchievementUnlocked } from '@/lib/google-analytics';

interface AchievementBannerProps {
  achievementIds: string[];
  onClose?: () => void;
  autoClose?: boolean;
}

export default function AchievementBanner({
  achievementIds,
  onClose,
  autoClose = true,
}: AchievementBannerProps) {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAchievement = achievements.find((a) => a.id === achievementIds[currentIndex]);
  const totalToShow = achievementIds.length;
  const hasMore = currentIndex < totalToShow - 1;

  const handleClose = useCallback(() => {
    setVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (currentAchievement) {
      logAchievementUnlocked({
        achievement_id: currentAchievement.id,
        achievement_name: currentAchievement.nameKo,
        rarity: currentAchievement.rarity,
      });
    }
  }, [currentAchievement]);

  useEffect(() => {
    if (!autoClose) return;

    const timer = setTimeout(() => {
      if (hasMore) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        handleClose();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, hasMore, autoClose, handleClose]);

  const handleNext = () => {
    if (hasMore) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  if (!visible || !currentAchievement) {
    return null;
  }

  const rarityConfig = RARITY_CONFIG[currentAchievement.rarity];

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-slide-in">
      <div
        className={`bg-white rounded-2xl shadow-2xl border-2 overflow-hidden ${rarityConfig.borderColor}`}
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${rarityConfig.color} px-4 py-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="text-white" size={20} fill="currentColor" />
              <span className="text-white font-bold">도전 과제 달성!</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/80 text-sm">
                {currentIndex + 1} / {totalToShow}
              </span>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{currentAchievement.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-800">{currentAchievement.nameKo}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${rarityConfig.bgColor} ${rarityConfig.textColor}`}
                >
                  {rarityConfig.label}
                </span>
              </div>
              <p className="text-sm text-gray-600">{currentAchievement.description}</p>
            </div>
          </div>

          {/* Progress dots */}
          {totalToShow > 1 && (
            <div className="flex justify-center gap-1 mt-3">
              {achievementIds.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? rarityConfig.progressColor
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            {hasMore ? (
              <button
                onClick={handleNext}
                className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                다음 ({totalToShow - currentIndex}개 남음)
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                닫기
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confetti effect for legendary achievements */}
      {currentAchievement.rarity === 'legendary' && <ConfettiOverlay />}
    </div>
  );
}

function ConfettiOverlay() {
  useEffect(() => {
    const loadConfetti = async () => {
      const canvasConfetti = (await import('canvas-confetti')).default;
      canvasConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'],
      });
    };
    loadConfetti();
  }, []);

  return null;
}

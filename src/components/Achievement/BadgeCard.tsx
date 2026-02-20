'use client';

import { Achievement, UserAchievementState } from '@/types';
import { RARITY_CONFIG, getAchievementProgress, getAchievementProgressText } from '@/data/achievements';
import { Lock, Trophy } from 'lucide-react';

interface BadgeCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  userState?: UserAchievementState;
  onClick?: () => void;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_CLASSES = {
  sm: {
    card: 'p-3',
    icon: 'text-3xl',
    title: 'text-sm',
    description: 'text-xs',
  },
  md: {
    card: 'p-4',
    icon: 'text-4xl',
    title: 'text-base',
    description: 'text-sm',
  },
  lg: {
    card: 'p-6',
    icon: 'text-6xl',
    title: 'text-lg',
    description: 'text-base',
  },
};

export default function BadgeCard({
  achievement,
  isUnlocked,
  userState,
  onClick,
  showProgress = true,
  size = 'md',
}: BadgeCardProps) {
  const sizeClasses = SIZE_CLASSES[size];
  const rarityConfig = RARITY_CONFIG[achievement.rarity];
  const progress = userState ? getAchievementProgress(achievement, userState) : 0;
  const progressText = userState ? getAchievementProgressText(achievement, userState) : '';

  return (
    <button
      onClick={onClick}
      className={`relative ${sizeClasses.card} bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-2 text-left overflow-hidden group ${
        isUnlocked
          ? `${rarityConfig.borderColor} border-opacity-50 hover:scale-105`
          : 'border-[var(--border-default)] opacity-70 hover:opacity-100'
      }`}
    >
      {/* Background gradient based on rarity */}
      {isUnlocked && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${rarityConfig.color} opacity-5`}
        />
      )}

      {/* Lock overlay for locked achievements */}
      {!isUnlocked && (
        <div className="absolute top-2 right-2 text-[var(--text-secondary)]">
          <Lock size={16} />
        </div>
      )}

      {/* Trophy icon for unlocked achievements */}
      {isUnlocked && (
        <div className="absolute top-2 right-2 text-yellow-500">
          <Trophy size={16} fill="currentColor" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`${sizeClasses.icon} mb-2 ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
          {achievement.icon}
        </div>

        {/* Title and Rarity */}
        <div className="mb-1">
          <h3 className={`${sizeClasses.title} font-bold text-[var(--text-primary)]`}>
            {achievement.nameKo}
          </h3>
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${rarityConfig.bgColor} ${rarityConfig.textColor}`}
          >
            {rarityConfig.label}
          </span>
        </div>

        {/* Description */}
        <p className={`${sizeClasses.description} text-[var(--text-secondary)] mb-2`}>
          {achievement.description}
        </p>

        {/* Progress Bar */}
        {showProgress && !isUnlocked && progress > 0 && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-1">
              <span>진행률</span>
              <span className="font-medium">{progressText}</span>
            </div>
            <div className="w-full bg-[var(--bg-page)] rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${rarityConfig.progressColor} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Unlocked date if available */}
        {isUnlocked && size !== 'sm' && (
          <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
            <Trophy size={12} fill="currentColor" />
            달성 완료!
          </div>
        )}
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full pointer-events-none" />
    </button>
  );
}

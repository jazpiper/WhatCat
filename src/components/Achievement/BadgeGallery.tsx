'use client';

import { useState } from 'react';
import { useAchievements } from '@/hooks/useAchievements';
import { achievements } from '@/data/achievements';
import BadgeCard from './BadgeCard';
import { RARITY_CONFIG } from '@/data/achievements';
import { Filter, Trophy, Lock } from 'lucide-react';

type FilterType = 'all' | 'unlocked' | 'locked' | 'common' | 'rare' | 'epic' | 'legendary';

interface BadgeGalleryProps {
  onAchievementClick?: (achievementId: string) => void;
  showFilters?: boolean;
  maxDisplay?: number;
}

export default function BadgeGallery({
  onAchievementClick,
  showFilters = true,
  maxDisplay,
}: BadgeGalleryProps) {
  const { userAchievements, unlockedAchievements, lockedAchievements, isLoading, viewAchievement } =
    useAchievements();

  const [filter, setFilter] = useState<FilterType>('all');

  const handleAchievementClick = (achievementId: string) => {
    viewAchievement(achievementId, 'gallery');
    if (onAchievementClick) {
      onAchievementClick(achievementId);
    }
  };

  const getFilteredAchievements = () => {
    switch (filter) {
      case 'unlocked':
        return unlockedAchievements;
      case 'locked':
        return lockedAchievements;
      case 'common':
      case 'rare':
      case 'epic':
      case 'legendary':
        return achievements.filter((a) => a.rarity === filter);
      default:
        return achievements;
    }
  };

  const filteredAchievements = getFilteredAchievements();
  const displayAchievements = maxDisplay
    ? filteredAchievements.slice(0, maxDisplay)
    : filteredAchievements;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500" />
          <p className="text-gray-600 mt-4">도전 과제를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              icon="📋"
              label="전체"
              count={achievements.length}
            />
            <FilterButton
              active={filter === 'unlocked'}
              onClick={() => setFilter('unlocked')}
              icon={<Trophy size={16} />}
              label="달성"
              count={unlockedAchievements.length}
              color="text-yellow-600"
            />
            <FilterButton
              active={filter === 'locked'}
              onClick={() => setFilter('locked')}
              icon={<Lock size={16} />}
              label="미달성"
              count={lockedAchievements.length}
              color="text-gray-600"
            />
            <div className="w-px bg-gray-300 mx-1" />
            {(['legendary', 'epic', 'rare', 'common'] as const).map((rarity) => (
              <FilterButton
                key={rarity}
                active={filter === rarity}
                onClick={() => setFilter(rarity)}
                icon={RARITY_CONFIG[rarity].icon}
                label={RARITY_CONFIG[rarity].label}
                count={achievements.filter((a) => a.rarity === rarity).length}
                color={RARITY_CONFIG[rarity].textColor}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mb-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">달성률</p>
            <p className="text-2xl font-bold text-gray-800">
              {unlockedAchievements.length} / {achievements.length}
            </p>
          </div>
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">진행률</p>
            <p className="text-2xl font-bold text-pink-600">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayAchievements.map((achievement) => (
          <BadgeCard
            key={achievement.id}
            achievement={achievement}
            isUnlocked={userAchievements.unlocked.includes(achievement.id)}
            userState={userAchievements.state}
            onClick={() => handleAchievementClick(achievement.id)}
          />
        ))}
      </div>

      {/* No results message */}
      {displayAchievements.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">표시할 도전 과제가 없습니다.</p>
        </div>
      )}

      {/* Show more indicator */}
      {maxDisplay && filteredAchievements.length > maxDisplay && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            외 {filteredAchievements.length - maxDisplay}개의 도전 과제가 더 있습니다
          </p>
        </div>
      )}
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string | React.ReactNode;
  label: string;
  count: number;
  color?: string;
}

function FilterButton({ active, onClick, icon, label, count, color }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {typeof icon === 'string' ? <span>{icon}</span> : icon}
      <span>{label}</span>
      <span
        className={`px-1.5 py-0.5 rounded-full text-xs ${
          active ? 'bg-white/20' : 'bg-gray-200'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

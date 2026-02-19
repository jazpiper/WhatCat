'use client';

import { memo } from 'react';
import { Breed, FamousMatch } from '@/types';

interface CelebrityMatchStoryCardProps {
  breed: Breed;
  score: number;
  celebrityMatch: FamousMatch;
}

/**
 * seed 문자열을 기반으로 일관된 해시값을 생성합니다.
 */
const getSeededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
};

/**
 * 품종과 점수를 기반으로 일관된 유명인 매칭을 반환합니다.
 */
export const getConsistentCelebrityMatch = (breed: Breed, score: number): FamousMatch | null => {
  if (!breed.famous_matches || breed.famous_matches.length === 0) {
    return null;
  }
  const seed = `${breed.id}-${score}`;
  const hash = getSeededRandom(seed);
  return breed.famous_matches[hash % breed.famous_matches.length];
};

/**
 * 유명인 타입에 따른 이모지 반환
 */
const getTypeEmoji = (type: FamousMatch['type']): string => {
  switch (type) {
    case 'celebrity':
      return '🌟';
    case 'character':
      return '🎭';
    case 'historical':
      return '📜';
    default:
      return '✨';
  }
};

/**
 * 유명인 타입에 따른 라벨 반환
 */
const getTypeLabel = (type: FamousMatch['type']): string => {
  switch (type) {
    case 'celebrity':
      return '유명인';
    case 'character':
      return '캐릭터';
    case 'historical':
      return '역사적 인물';
    default:
      return '';
  }
};

/**
 * CelebrityMatchStoryCard component
 * Displays celebrity match result in 9:16 (1080x1920px) aspect ratio optimized for Instagram Stories
 *
 * Design principles:
 * - Fixed 9:16 aspect ratio container
 * - Vibrant gradients and bold typography for mobile visibility
 * - High contrast for Stories format
 * - Focus on celebrity match information
 */
const CelebrityMatchStoryCard = memo(function CelebrityMatchStoryCard({
  breed,
  score,
  celebrityMatch,
}: CelebrityMatchStoryCardProps) {
  // Instagram Stories recommended size: 1080x1920px (9:16 ratio)
  const STORY_WIDTH = 1080;
  const STORY_HEIGHT = 1920;
  const ASPECT_RATIO = STORY_WIDTH / STORY_HEIGHT;

  // Get score color based on match percentage
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'from-amber-400 to-orange-500';
    if (score >= 80) return 'from-purple-400 to-pink-500';
    if (score >= 70) return 'from-blue-400 to-indigo-500';
    if (score >= 60) return 'from-green-400 to-emerald-500';
    return 'from-pink-400 to-rose-500';
  };

  const scoreGradient = getScoreColor(score);
  const typeEmoji = getTypeEmoji(celebrityMatch.type);
  const typeLabel = getTypeLabel(celebrityMatch.type);

  return (
    <div
      className="relative w-full bg-white"
      style={{
        aspectRatio: ASPECT_RATIO,
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #f59e0b 2px, transparent 2px),
                           radial-gradient(circle at 80% 70%, #ec4899 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Top: Branding header */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl" role="img" aria-label="star">
                {typeEmoji}
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight">
                유명인 매칭
              </h1>
              <span className="text-3xl" role="img" aria-label="sparkle">
                ✨
              </span>
            </div>
          </div>
        </div>

        {/* Center: Main content */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          {/* Celebrity match type badge */}
          <div className="mb-3">
            <div className="bg-white rounded-full px-4 py-2 shadow-md border border-amber-200">
              <span className="text-sm font-bold text-amber-600">{typeLabel} 매치</span>
            </div>
          </div>

          {/* Celebrity emoji */}
          <div className="text-6xl mb-4">{typeEmoji}</div>

          {/* Celebrity name */}
          <h2 className="text-4xl font-black text-center bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent mb-3">
            {celebrityMatch.name}
          </h2>

          {/* Match description */}
          <p className="text-lg text-gray-600 text-center mb-6 px-4">
            당신은 <span className="font-bold text-amber-600">{celebrityMatch.name}</span>과(와) 같은 냥이 타입!
          </p>

          {/* Breed info card */}
          <div className="bg-white rounded-2xl p-5 shadow-xl border border-amber-100 w-full max-w-xs mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">나의 인생냥이</p>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {breed.emoji} {breed.name}
              </p>
              <p className="text-xs text-gray-400">{breed.nameEn}</p>
            </div>
          </div>

          {/* Match score circle */}
          <div className="relative">
            {/* Outer glow */}
            <div className={`absolute inset-0 bg-gradient-to-r ${scoreGradient} rounded-full blur-xl opacity-40`} />
            {/* Score circle */}
            <div
              className={`relative bg-gradient-to-br ${scoreGradient} rounded-full w-28 h-28 flex items-center justify-center shadow-2xl border-4 border-white`}
            >
              <div className="text-center">
                <div className="text-white text-xs font-semibold mb-1">매칭</div>
                <div className="text-white text-4xl font-black leading-none">
                  {score}
                </div>
                <div className="text-white text-lg font-bold">%</div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex gap-2 mt-4">
            <span className="text-2xl" role="img" aria-label="star">
              ⭐
            </span>
            <span className="text-2xl" role="img" aria-label="sparkle">
              ✨
            </span>
            <span className="text-2xl" role="img" aria-label="star">
              ⭐
            </span>
          </div>
        </div>

        {/* Bottom: CTA */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl px-5 py-4 shadow-xl">
            <p className="text-white text-center text-xl font-bold leading-tight mb-2">
              나의 유명인 매칭 찾기!
            </p>
            <p className="text-white/90 text-center text-sm font-medium">
              what-cat-psi.vercel.app
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-3 mt-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <span>🌟</span> 유명인 매칭
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>😺</span> 20종 품종
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>✨</span> 무료 테스트
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CelebrityMatchStoryCard;

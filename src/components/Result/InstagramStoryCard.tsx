'use client';

import { memo } from 'react';
import CatImage from '@/components/CatImage';
import { Breed } from '@/types';
import { getRankEmoji } from '@/utils/matching';

interface InstagramStoryCardProps {
  breed: Breed;
  score: number;
}

/**
 * InstagramStoryCard component
 * Displays test result in 9:16 (1080×1920px) aspect ratio optimized for Instagram Stories
 *
 * Design principles:
 * - Fixed 9:16 aspect ratio container
 * - Vibrant gradients and bold typography for mobile visibility
 * - High contrast for Stories format
 * - Fun visual elements with emojis and decorative patterns
 */
const InstagramStoryCard = memo(function InstagramStoryCard({
  breed,
  score,
}: InstagramStoryCardProps) {
  // Instagram Stories recommended size: 1080×1920px (9:16 ratio)
  const STORY_WIDTH = 1080;
  const STORY_HEIGHT = 1920;
  const ASPECT_RATIO = STORY_WIDTH / STORY_HEIGHT;

  // Get score color based on match percentage
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'from-green-400 to-emerald-500';
    if (score >= 80) return 'from-blue-400 to-indigo-500';
    if (score >= 70) return 'from-purple-400 to-pink-500';
    if (score >= 60) return 'from-orange-400 to-amber-500';
    return 'from-pink-400 to-rose-500';
  };

  const scoreGradient = getScoreColor(score);

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
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50" />

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #ec4899 2px, transparent 2px),
                           radial-gradient(circle at 80% 70%, #8b5cf6 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Top: Branding header */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl" role="img" aria-label="cat">
                🐱
              </span>
              <h1 className="text-2xl font-black text-white tracking-tight">
                냥이 매칭
              </h1>
              <span className="text-3xl" role="img" aria-label="sparkle">
                ✨
              </span>
            </div>
          </div>
        </div>

        {/* Center: Main content */}
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          {/* Rank badge */}
          <div className="mb-3">
            <span className="text-5xl" role="img" aria-label="rank">
              {getRankEmoji(1)}
            </span>
          </div>

          {/* Breed name */}
          <h2 className="text-4xl font-black text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {breed.name}
          </h2>

          {/* Breed emoji */}
          <div className="text-5xl mb-3">{breed.emoji}</div>

          {/* Cat image */}
          <div className="relative mb-4">
            <div className="bg-white rounded-3xl p-3 shadow-2xl">
              {breed.image ? (
                <CatImage
                  src={breed.image}
                  alt={breed.name}
                  width={280}
                  height={280}
                  sizes="280px"
                  priority
                  className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">{breed.emoji}</span>
                </div>
              )}
            </div>
          </div>

          {/* Match score circle */}
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-40" />
            {/* Score circle */}
            <div
              className={`relative bg-gradient-to-br ${scoreGradient} rounded-full w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center shadow-2xl border-4 border-white`}
            >
              <div className="text-center">
                <div className="text-white text-sm font-semibold mb-1">매칭 점수</div>
                <div className="text-white text-5xl sm:text-6xl font-black leading-none">
                  {score}
                </div>
                <div className="text-white text-xl font-bold">%</div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="flex gap-2 mt-4">
            <span className="text-2xl" role="img" aria-label="heart">
              💕
            </span>
            <span className="text-2xl" role="img" aria-label="star">
              ⭐
            </span>
            <span className="text-2xl" role="img" aria-label="heart">
              💕
            </span>
          </div>
        </div>

        {/* Bottom: CTA */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl px-5 py-4 shadow-xl">
            <p className="text-white text-center text-xl font-bold leading-tight mb-2">
              나의 인생냥이 찾기! 🐾
            </p>
            <p className="text-white/90 text-center text-sm font-medium">
              what-cat-psi.vercel.app
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-3 mt-3 text-[var(--text-secondary)] text-xs">
            <span className="flex items-center gap-1">
              <span>🎯</span> 정확한 분석
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

export default InstagramStoryCard;

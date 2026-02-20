'use client';

import { Breed, FamousMatch } from '@/types';
import { Star, Sparkles } from 'lucide-react';

interface FamousMatchCardProps {
  breed: Breed;
  score?: number;
}

/**
 * seed 문자열을 기반으로 일관된 해시값을 생성합니다.
 * 같은 seed에 대해 항상 동일한 결과를 반환합니다.
 */
const getSeededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash; // 32비트 정수로 변환
  }
  return Math.abs(hash);
};

export default function FamousMatchCard({ breed, score = 0 }: FamousMatchCardProps) {
  if (!breed.famous_matches || breed.famous_matches.length === 0) {
    return null;
  }

  const resultPercentage = breed.result_percentage || 0;
  const isRare = resultPercentage < 5;

  const getTypeLabel = (type: FamousMatch['type']) => {
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

  // seed 기반 일관된 유명인 선택 (breed.id + score 조합)
  const seed = `${breed.id}-${score}`;
  const hash = getSeededRandom(seed);
  const selectedMatch = breed.famous_matches[hash % breed.famous_matches.length];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] flex items-center gap-2">
          <Sparkles className="text-amber-500" size={20} />
          당신과 같은 냥이를 가진 사람들
        </h3>
        {isRare && (
          <div className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
            <Star size={12} />
            희귀 결과
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[var(--bg-surface)] rounded-xl p-4 shadow-sm border border-transparent dark:border-[var(--border-default)]">
        <div className="flex items-start gap-4">
          <div className="text-4xl">
            {selectedMatch.type === 'celebrity' ? '🌟' : selectedMatch.type === 'character' ? '🎭' : '📜'}
          </div>
          <div className="flex-1">
            <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-1">
              {getTypeLabel(selectedMatch.type)} 매치
            </p>
            <p className="text-lg font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-1">
              {selectedMatch.name}
            </p>
            {selectedMatch.description && (
              <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                {selectedMatch.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
          <span className="font-semibold text-amber-600">{resultPercentage}%</span>의 사용자가 이 품종을 받았습니다
        </p>
        {isRare && (
          <p className="text-xs text-purple-600 dark:text-purple-300 mt-2">
            선택된 소수의 사람들만 이 희귀한 품종과 매칭되었습니다! 🎉
          </p>
        )}
      </div>
    </div>
  );
}

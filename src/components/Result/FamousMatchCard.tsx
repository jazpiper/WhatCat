'use client';

import { Breed, FamousMatch } from '@/types';
import { Star, Sparkles } from 'lucide-react';

interface FamousMatchCardProps {
  breed: Breed;
}

export default function FamousMatchCard({ breed }: FamousMatchCardProps) {
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

  const getTypeIcon = (type: FamousMatch['type']) => {
    switch (type) {
      case 'celebrity':
        return '⭐';
      case 'character':
        return '🎭';
      case 'historical':
        return '📜';
      default:
        return '✨';
    }
  };

  // Select a random famous match to display
  const randomMatch = breed.famous_matches[Math.floor(Math.random() * breed.famous_matches.length)];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
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

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-4xl">
            {randomMatch.type === 'celebrity' ? '🌟' : randomMatch.type === 'character' ? '🎭' : '📜'}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">
              {getTypeLabel(randomMatch.type)} 매치
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-1">
              {randomMatch.name}
            </p>
            {randomMatch.description && (
              <p className="text-sm text-gray-600">
                {randomMatch.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-amber-600">{resultPercentage}%</span>의 사용자가 이 품종을 받았습니다
        </p>
        {isRare && (
          <p className="text-xs text-purple-600 mt-2">
            선택된 소수의 사람들만 이 희귀한 품종과 매칭되었습니다! 🎉
          </p>
        )}
      </div>
    </div>
  );
}

'use client';

/**
 * Breed of the Day Component
 * Displays a featured breed with fun facts and CTA
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Share2, Calendar } from 'lucide-react';
import { getBreedOfTheDay, getNextBreedOfTheDayCountdown } from '@/utils/breedOfTheDay';
import { logBreedOfTheDayViewed, logBreedOfTheDayClicked, logBreedOfTheDayShared } from '@/lib/google-analytics';
import CatImage from '@/components/CatImage';
import { logError, ErrorType } from '@/utils/errorHandler';

export function BreedOfTheDay() {
  const [breedData, setBreedData] = useState(getBreedOfTheDay());
  const [countdown, setCountdown] = useState(getNextBreedOfTheDayCountdown());

  useEffect(() => {
    // Track view event
    logBreedOfTheDayViewed({
      breed_id: breedData.breed.id,
      breed_name: breedData.breed.name,
    });

    // Update countdown every minute
    const interval = setInterval(() => {
      setCountdown(getNextBreedOfTheDayCountdown());
    }, 60000);

    return () => clearInterval(interval);
  }, [breedData]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/breed/${breedData.breed.id}`;
    const text = `🐱 오늘의 냥이: ${breedData.breed.name}\n\n${breedData.funFact}\n\n나랑 잘 맞는 냥이 찾기 👉`;

    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      logBreedOfTheDayShared({
        breed_id: breedData.breed.id,
        breed_name: breedData.breed.name,
        platform: 'copy',
      });
      alert('클립보드에 복사되었습니다!');
    } catch (err) {
      logError(err, 'BreedOfTheDay.handleShare');
    }
  };

  const handleCTAClick = () => {
    logBreedOfTheDayClicked({
      breed_id: breedData.breed.id,
      breed_name: breedData.breed.name,
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-6 shadow-xl border-2 border-purple-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-500" size={24} />
          <h3 className="text-xl font-bold text-gray-800">오늘의 냥이</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full">
          <Calendar size={16} />
          <span>{countdown}시간 후 변경</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Image */}
          {breedData.breed.image && (
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
                <CatImage
                  src={breedData.breed.image}
                  alt={breedData.breed.name}
                  width={128}
                  height={128}
                  className="object-cover"
                  sizes="128px"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                  #{breedData.breed.rank}
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="text-3xl">{breedData.breed.emoji}</span>
              <h4 className="text-2xl font-bold text-gray-800">{breedData.breed.name}</h4>
            </div>
            <p className="text-sm text-gray-500 mb-3">{breedData.breed.nameEn}</p>

            {/* Fun Fact */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 mb-3">
              <p className="text-sm font-medium text-gray-700 flex items-start gap-2">
                <span>💡</span>
                <span>{breedData.funFact}</span>
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
              {breedData.breed.traits.slice(0, 3).map((trait) => (
                <span
                  key={trait}
                  className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Link
                href="/nyongmatch"
                onClick={handleCTAClick}
                className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                테스트하러 가기
              </Link>
              <Link
                href={`/breed/${breedData.breed.id}`}
                onClick={handleCTAClick}
                className="inline-flex items-center gap-1 px-4 py-2 bg-white border-2 border-purple-300 text-purple-600 rounded-full text-sm font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                상세정보
              </Link>
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center p-2 bg-white border-2 border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-all duration-300"
                title="공유하기"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-3 gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === 0 ? 'bg-purple-400' : i === 1 ? 'bg-pink-400' : i === 2 ? 'bg-blue-400' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { memo } from 'react';
import { Breed } from '@/types';
import CatImage from './CatImage';
import { getMaintenanceStars, getSizeEmoji, getCoatEmoji } from '@/utils/breedHelpers';

interface BreedCardProps {
  breed: Breed;
  score?: number;
  showRank?: boolean;
}

function BreedCard({ breed, score, showRank = false }: BreedCardProps) {
  return (
    <Link
      href={`/breed/${breed.id}`}
      prefetch={false}
      className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-500/60 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
      aria-label={`${breed.name}(${breed.nameEn}) 상세 정보${score ? ` - 매칭 점수 ${score}%` : ''}`}
    >
      <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
        {breed.image ? (
          <CatImage
            src={breed.image}
            alt={breed.name}
            width={400}
            height={200}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl">{breed.emoji}</span>
          </div>
        )}
        {showRank && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
            #{breed.rank}
          </div>
        )}
        {score !== undefined && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
            {score}%
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-pink-600 transition-colors">
              {breed.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{breed.nameEn}</p>
          </div>
          <span className="text-2xl">{breed.emoji}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {breed.traits.slice(0, 3).map((trait) => (
            <span
              key={trait}
              className="inline-block bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full text-xs"
            >
              {trait}
            </span>
          ))}
          {breed.traits.length > 3 && (
            <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
              +{breed.traits.length - 3}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <span>{getSizeEmoji(breed.size)}</span>
            <span className="capitalize">{breed.size}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{getCoatEmoji(breed.coat)}</span>
            <span className="capitalize">{breed.coat}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span>{getMaintenanceStars(breed.maintenance.grooming)}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">한국 인기도</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${breed.korea_popularity}%` }}
                />
              </div>
              <span className="text-xs font-bold text-pink-600">{breed.korea_popularity}%</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(BreedCard);

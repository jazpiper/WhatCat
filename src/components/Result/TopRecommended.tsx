'use client';

import { memo } from 'react';
import Link from 'next/link';
import CatImage from '@/components/CatImage';
import { getRankEmoji } from '@/utils/matching';
import { Breed } from '@/types';

interface TopRecommendedProps {
    results: { breed: Breed; score: number }[];
}

// Memoized breed card item for better performance
const BreedResultCard = memo(function BreedResultCard({
    result,
    index,
}: {
    result: { breed: Breed; score: number };
    index: number;
}) {
    return (
        <Link
            href={`/breed/${result.breed.id}`}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 ${
                index === 0
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-purple-900/40 dark:to-pink-900/40 border border-pink-200 dark:border-pink-800/50'
                    : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700'
            }`}
            aria-label={`${result.breed.name}(${result.breed.nameEn}) 상세보기 - ${result.score}% 매칭`}
        >
            <div className="text-3xl flex-shrink-0" aria-hidden="true">{getRankEmoji(index + 1)}</div>
            <div className="text-4xl flex-shrink-0" aria-hidden="true">{result.breed.emoji}</div>
            {result.breed.image && (
                <CatImage
                    src={result.breed.image}
                    alt={result.breed.name}
                    width={48}
                    height={48}
                    sizes="48px"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
            )}
            <div className="flex-1">
                <h4 className="font-bold text-gray-800 dark:text-gray-100">{result.breed.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{result.breed.nameEn}</p>
            </div>
            <div className="text-2xl font-bold text-pink-600">
                {result.score}%
            </div>
        </Link>
    );
});

export default function TopRecommended({ results }: TopRecommendedProps) {
    return (
        <div className="border-t-2 border-pink-100 dark:border-pink-900/50 pt-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                🏆 추천 품종 TOP 3
            </h3>
            <div className="space-y-3">
                {results.map((result, index) => (
                    <BreedResultCard key={result.breed.id} result={result} index={index} />
                ))}
            </div>
        </div>
    );
}

'use client';

import { Breed, SimilarBreed } from '@/types';
import { useRouter } from 'next/navigation';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useRelatedBreed } from '@/hooks/useAnalytics';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface RelatedBreedsProps {
  mainBreed: Breed;
  relatedBreeds: SimilarBreed[];
}

export default function RelatedBreeds({ mainBreed, relatedBreeds }: RelatedBreedsProps) {
  const router = useRouter();
  const { trackView, trackClick } = useRelatedBreed();
  const [viewedBreeds, setViewedBreeds] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Track when related breeds come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (!viewedBreeds.has(index)) {
              const relatedBreed = relatedBreeds[index];
              if (relatedBreed) {
                trackView(mainBreed.id, relatedBreed.breed.id, relatedBreed.similarity, index + 1);
                setViewedBreeds((prev) => new Set([...prev, index]));
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    relatedBreeds.forEach((_, index) => {
      const element = document.querySelector(`[data-index="${index}"]`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [mainBreed.id, relatedBreeds, trackView, viewedBreeds]);

  const handleBreedClick = (relatedBreed: SimilarBreed) => {
    trackClick(mainBreed.id, relatedBreed.breed.id, relatedBreed.similarity);
    router.push(`/breed/${relatedBreed.breed.id}`);
  };

  if (!relatedBreeds || relatedBreeds.length === 0) {
    return null;
  }

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return 'text-green-600 dark:text-green-300 bg-green-50 dark:bg-green-900/30';
    if (similarity >= 80) return 'text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30';
    if (similarity >= 70) return 'text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30';
    return 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/50">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-blue-500" size={24} />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          비슷한 품종도 좋아하실 것 같아요
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        성격이 비슷한 다른 품종들도 함께 확인해보세요!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedBreeds.map((relatedBreed, index) => (
          <div
            key={relatedBreed.breed.id}
              data-index={index}
            onClick={() => handleBreedClick(relatedBreed)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500"
          >
            {/* Breed Image */}
            <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              {relatedBreed.breed.image ? (
                <Image
                  src={relatedBreed.breed.image}
                  alt={relatedBreed.breed.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-4xl">
                  {relatedBreed.breed.emoji}
                </div>
              )}
            </div>

            {/* Similarity Badge */}
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold mb-2 ${getSimilarityColor(relatedBreed.similarity)}`}>
              <span>{relatedBreed.similarity}%</span>
              <span>매칭</span>
            </div>

            {/* Breed Name */}
            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
              {relatedBreed.breed.name}
            </h4>

            {/* Key Difference */}
            {relatedBreed.keyDifference && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {relatedBreed.keyDifference}
              </p>
            )}

            {/* Traits */}
            <div className="flex flex-wrap gap-1">
              {relatedBreed.breed.traits.slice(0, 2).map((trait) => (
                <span
                  key={trait}
                  className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Arrow Indicator */}
            <div className="flex items-center justify-end mt-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm mr-1">자세히 보기</span>
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white/60 dark:bg-gray-800/70 rounded-xl border border-blue-200 dark:border-blue-800/50">
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          <span className="font-semibold text-blue-600">유사도</span>는 성격 특성(활동성, 애정도, 사교성, 조용함, 충성심)을
          기반으로 계산되어요. 클릭하면 품종 상세 페이지로 이동해요!
        </p>
      </div>
    </div>
  );
}

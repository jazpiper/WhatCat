import Link from 'next/link';
import breeds from '@/data/breeds.json';
import { Star } from 'lucide-react';
import AdSense from '@/components/AdSense';
import CatImage from '@/components/CatImage';
import StructuredData from '@/components/StructuredData';
import { BreedOfTheDay } from '@/components/BreedOfTheDay';
import { DailyQuizStreak } from '@/components/DailyQuizStreak';
import StartTestCTA from '@/components/Home/StartTestCTA';

// 정적 데이터 계산 (렌더링 전에 계산)
const popularBreeds = breeds.breeds
  .sort((a, b) => b.korea_popularity - a.korea_popularity)
  .slice(0, 6);

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 transition-colors duration-300">
      {/* 구조화된 데이터 */}
      <StructuredData
        type="WebSite"
        data={{
          '@type': 'WebSite',
          name: '냥이 매칭',
          url: 'https://what-cat-psi.vercel.app',
          description: 'MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요!',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://what-cat-psi.vercel.app/nyongmatch',
            'query-input': 'required name=breed'
          }
        }}
      />

      <StructuredData
        type="Organization"
        data={{
          '@type': 'Organization',
          name: 'Molt Company',
          url: 'https://what-cat-psi.vercel.app',
          logo: 'https://what-cat-psi.vercel.app/logo.png'
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            냥이 매칭 🐱
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            MBTI 스타일로 나와 가장 잘 맞는 고양이 품종 찾기
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            14개 질문으로 당신의 인생냥이를 찾아보세요! 20종의 인기 품종 데이터를 바탕으로 5대 카테고리를 분석하여 정확한 매칭 결과를 제공합니다.
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">
              나랑 잘 맞는 냥이 찾기
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              간단한 냥이매치로 나의 인생냥이를 찾아보세요!
            </p>
            <StartTestCTA />
          </div>
        </div>

        {/* Daily Quiz Streak Section */}
        <div className="mb-8">
          <DailyQuizStreak />
        </div>

        {/* Breed of the Day Section */}
        <div className="mb-8">
          <BreedOfTheDay />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="text-yellow-400 fill-current" size={24} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              한국 인기 품종 랭킹
            </h2>
            <Star className="text-yellow-400 fill-current" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularBreeds.map((breed, index) => (
              <Link
                key={breed.id}
                href={`/breed/${breed.id}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-pink-100 dark:border-gray-500">
                  <div className="flex items-start justify-between mb-3">
                    {breed.image && (
                      <CatImage
                        src={breed.image}
                        alt={breed.name}
                        width={64}
                        height={64}
                        sizes="(max-width: 640px) 64px, (max-width: 1024px) 64px, 64px"
                        className="w-16 h-16 rounded-full object-cover"
                        priority={index === 0}
                      />
                    )}
                    <div className="text-4xl">{breed.emoji}</div>
                    <div className="flex items-center gap-1">
                      {index === 0 && (
                        <div className="bg-yellow-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                      )}
                      {index === 1 && (
                        <div className="bg-gray-300 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                      )}
                      {index === 2 && (
                        <div className="bg-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                      )}
                      {index > 2 && (
                        <div className="bg-pink-200 text-pink-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{breed.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{breed.nameEn}</p>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {breed.traits.slice(0, 3).map((trait) => (
                      <span
                        key={trait}
                        className="bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <AdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "5187796077"} />

        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
        </footer>
      </div>

    </main>
  );
}

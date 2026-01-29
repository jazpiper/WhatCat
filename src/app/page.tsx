import Link from 'next/link';
import Image from 'next/image';
import breeds from '@/data/breeds.json';
import { ArrowRight, Star } from 'lucide-react';
import AdSense from '@/components/AdSense';

export default function HomePage() {
  const popularBreeds = breeds.breeds
    .sort((a, b) => b.korea_popularity - a.korea_popularity)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            냥이 매치 🐱
          </h1>
          <p className="text-xl text-gray-600">
            MBTI 스타일로 나와 가장 잘 맞는 고양이 품종 찾기
          </p>
        </header>

        <AdSense adSlot="5187796077" />

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-3xl font-bold mb-3 text-gray-800">
              나랑 잘 맞는 냥이 찾기
            </h2>
            <p className="text-gray-600 mb-6">
              간단한 테스트로 나의 인생냥이를 찾아보세요!
            </p>
            <Link
              href="/test"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              테스트 시작
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="text-yellow-400 fill-current" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              한국 인기 품종 랭킹
            </h2>
            <Star className="text-yellow-400 fill-current" size={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularBreeds.map((breed, index) => (
              <div
                key={breed.id}
                className="group"
              >
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-pink-100">
                  <div className="flex items-start justify-between mb-3">
                    {breed.image && (
                      <Image
                        src={breed.image}
                        alt={breed.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
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
                  <h3 className="font-bold text-gray-800 mb-1">{breed.name}</h3>
                  <p className="text-sm text-gray-600">{breed.nameEn}</p>
                  <div className="mt-3 flex gap-1 flex-wrap">
                    {breed.traits.slice(0, 3).map((trait) => (
                      <span
                        key={trait}
                        className="bg-white px-2 py-1 rounded-full text-xs text-gray-600"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AdSense adSlot="5187796077" />

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; 2026 냥이 매치. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

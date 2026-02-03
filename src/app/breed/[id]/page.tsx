'use client';

import breedsData from '@/data/breeds.json';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { Breed } from '@/types';
import { useParams } from 'next/navigation';
import CatImage from '@/components/CatImage';

const breeds = breedsData as unknown as { breeds: Breed[] };

export default function BreedDetailPage() {
  const params = useParams();
  const breedId = params.id as string;

  const breed = breeds.breeds.find((b) => b.id === breedId);

  if (!breed) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">😿</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              품종을 찾을 수 없습니다
            </h1>
            <p className="text-gray-600 mb-6">
              요청하신 품종 정보가 없습니다.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              처음으로 돌아가기
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const getMaintenanceStars = (level: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < level ? '⭐' : '☆');
    }
    return stars.join('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-pink-500 hover:underline flex items-center gap-2">
            <ArrowLeft size={20} />
            처음으로
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          {breed.image && (
            <div className="relative h-80 bg-gradient-to-br from-pink-100 to-purple-100">
              <CatImage
                src={breed.image}
                alt={breed.name}
                width={800}
                height={320}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 right-4 bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                #{breed.rank}
              </div>
            </div>
          )}

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="text-7xl mb-2">{breed.emoji}</div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {breed.name}
              </h1>
              <p className="text-xl text-gray-600">{breed.nameEn}</p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                📋 품종 프로필
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">성격</h3>
                  <p className="text-gray-700">{breed.traits.join(', ')}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">크기</h3>
                  <p className="text-gray-700 capitalize">{breed.size}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">털 길이</h3>
                  <p className="text-gray-700 capitalize">{breed.coat}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">관리 난이도</h3>
                  <p className="text-2xl text-gray-800">
                    {getMaintenanceStars(breed.maintenance.grooming)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                💡 품종 설명
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">{breed.description}</p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                🎭 성격 상세
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">활동성</span>
                    <span className="font-bold text-gray-800 text-lg">{breed.personality.activity}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(breed.personality.activity / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">애정</span>
                    <span className="font-bold text-gray-800 text-lg">{breed.personality.affection}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(breed.personality.affection / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">사교성</span>
                    <span className="font-bold text-gray-800 text-lg">{breed.personality.social}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(breed.personality.social / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">조용함</span>
                    <span className="font-bold text-gray-800 text-lg">{breed.personality.quiet}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(breed.personality.quiet / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-600">충성심</span>
                    <span className="font-bold text-gray-800 text-lg">{breed.personality.loyalty}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(breed.personality.loyalty / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                💰 비용 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">초기 비용</h3>
                  <p className="text-gray-700 capitalize">{breed.cost.initial}</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">월 비용</h3>
                  <p className="text-gray-700 capitalize">{breed.cost.monthly}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                🏠 적합 환경
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {breed.environment.map((env) => (
                  <span
                    key={env}
                    className="inline-block bg-white px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {env}
                  </span>
                ))}
              </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="text-yellow-400 fill-current" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              한국 인기도
            </h2>
          </div>
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-4xl font-bold text-pink-600">{breed.korea_popularity}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${breed.korea_popularity}%` }}
              />
            </div>
          </div>
          <p className="text-center text-gray-600 mt-2">
            한국에서 {breed.name} 품종의 인기도입니다.
          </p>
        </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🧪 테스트 시작하기
          </h2>
          <p className="text-gray-700 text-center mb-6">
            나와 딱 맞는 냥이는? 테스트를 시작해보세요!
          </p>
          <Link
            href="/test"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            냥이 매칭 테스트 시작하기
          </Link>
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

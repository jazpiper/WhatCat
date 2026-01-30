'use client';

import breeds from '@/data/breeds.json';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Suspense } from 'react';

function CompareContent() {
  const searchParams = useSearchParams();

  const breed1Id = searchParams.get('breed1');
  const score1 = searchParams.get('score1');
  const breed2Id = searchParams.get('breed2');
  const score2 = searchParams.get('score2');

  const breed1 = breeds.breeds.find((b) => b.id === breed1Id);
  const breed2 = breeds.breeds.find((b) => b.id === breed2Id);

  const numScore1 = score1 ? parseInt(score1) : 0;
  const numScore2 = score2 ? parseInt(score2) : 0;

  if (!breed1 || !breed2) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              비교할 결과를 찾을 수 없습니다
            </h1>
            <p className="text-gray-600 mb-6">
              결과 URL이 올바르지 않습니다.
            </p>
            <Link
              href="/nyongmatch"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              냥이매칭 다시하기
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const personalityDiff = Math.abs(
    breed1.personality.activity - breed2.personality.activity
  );
  const activityDiff = Math.abs(
    breed1.personality.activity - breed2.personality.activity
  );
  const quietDiff = Math.abs(
    breed1.personality.quiet - breed2.personality.quiet
  );
  const socialDiff = Math.abs(
    breed1.personality.social - breed2.personality.social
  );
  const maintenanceDiff = Math.abs(
    breed1.maintenance.grooming - breed2.maintenance.grooming
  );

  const maxDiff = Math.max(
    personalityDiff,
    activityDiff,
    quietDiff,
    socialDiff,
    maintenanceDiff
  );

  let insight = '';
  if (maxDiff === personalityDiff) {
    insight = '두 분은 전반적인 성격 유형에서 가장 차이가 커요!';
  } else if (maxDiff === activityDiff) {
    insight = '두 분은 활동성 면에서 가장 차이가 커요!';
  } else if (maxDiff === quietDiff) {
    insight = '두 분은 조용함 정도에서 가장 차이가 커요!';
  } else if (maxDiff === socialDiff) {
    insight = '두 분은 사교성 면에서 가장 차이가 커요!';
  } else if (maxDiff === maintenanceDiff) {
    insight = '두 분은 관리 난이도 측면에서 가장 차이가 커요!';
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Link href="/" className="text-pink-500 hover:underline flex items-center gap-2">
            <ArrowLeft size={20} />
            처음으로
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            🤝 결과 비교
          </h1>
          <p className="text-center text-gray-600 mb-8">
            두 분의 테스트 결과를 비교해봤어요!
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">🙋</div>
                <p className="text-sm text-gray-600 mb-2">나의 결과</p>
                <div className="text-4xl mb-2">{breed1.emoji}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {breed1.name}
                </h2>
                <p className="text-sm text-gray-600">{breed1.nameEn}</p>
                <div className="mt-4 text-3xl font-bold text-pink-600">
                  {numScore1}%
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">조용함:</span>
                  <span className="font-semibold text-gray-800">
                    {breed1.personality.quiet}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">활동성:</span>
                  <span className="font-semibold text-gray-800">
                    {breed1.personality.activity}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">사교성:</span>
                  <span className="font-semibold text-gray-800">
                    {breed1.personality.social}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">관리 난이도:</span>
                  <span className="font-semibold text-gray-800">
                    {breed1.maintenance.grooming}/5
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">🧑‍🤝‍🧑</div>
                <p className="text-sm text-gray-600 mb-2">친구 결과</p>
                <div className="text-4xl mb-2">{breed2.emoji}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {breed2.name}
                </h2>
                <p className="text-sm text-gray-600">{breed2.nameEn}</p>
                <div className="mt-4 text-3xl font-bold text-purple-600">
                  {numScore2}%
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">조용함:</span>
                  <span className="font-semibold text-gray-800">
                    {breed2.personality.quiet}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">활동성:</span>
                  <span className="font-semibold text-gray-800">
                    {breed2.personality.activity}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">사교성:</span>
                  <span className="font-semibold text-gray-800">
                    {breed2.personality.social}/5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">관리 난이도:</span>
                  <span className="font-semibold text-gray-800">
                    {breed2.maintenance.grooming}/5
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">📊</span>
              <h3 className="text-xl font-bold text-gray-800">
                비교 인사이트
              </h3>
            </div>
            <p className="text-gray-700 text-center text-lg mb-4">{insight}</p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activityDiff < 2 ? 'bg-green-100' : 'bg-orange-100'
                    }`}
                  >
                    {activityDiff < 2 ? (
                      <Minus size={16} className="text-green-600" />
                    ) : activityDiff > 2 ? (
                      <TrendingUp size={16} className="text-orange-600" />
                    ) : (
                      <Minus size={16} className="text-gray-600" />
                    )}
                  </div>
                  <span className="font-semibold text-gray-800">활동성</span>
                </div>
                <p className="text-sm text-gray-600">
                  {breed1.personality.activity > breed2.personality.activity
                    ? '나의 냥이가 더 활동적이에요'
                    : '친구 냥이가 더 활동적이에요'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      quietDiff < 2 ? 'bg-green-100' : 'bg-orange-100'
                    }`}
                  >
                    {quietDiff < 2 ? (
                      <Minus size={16} className="text-green-600" />
                    ) : quietDiff > 2 ? (
                      <TrendingDown size={16} className="text-orange-600" />
                    ) : (
                      <Minus size={16} className="text-gray-600" />
                    )}
                  </div>
                  <span className="font-semibold text-gray-800">조용함</span>
                </div>
                <p className="text-sm text-gray-600">
                  {breed1.personality.quiet > breed2.personality.quiet
                    ? '나의 냥이가 더 조용해요'
                    : '친구 냥이가 더 조용해요'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      socialDiff < 2 ? 'bg-green-100' : 'bg-orange-100'
                    }`}
                  >
                    {socialDiff < 2 ? (
                      <Minus size={16} className="text-green-600" />
                    ) : socialDiff > 2 ? (
                      <TrendingUp size={16} className="text-orange-600" />
                    ) : (
                      <Minus size={16} className="text-gray-600" />
                    )}
                  </div>
                  <span className="font-semibold text-gray-800">사교성</span>
                </div>
                <p className="text-sm text-gray-600">
                  {breed1.personality.social > breed2.personality.social
                    ? '나의 냥이가 더 사교적이에요'
                    : '친구 냥이가 더 사교적이에요'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/nyongmatch"
            className="flex items-center justify-center gap-2 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <span className="text-4xl">🧪</span>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">다시 냥이매칭하기</h3>
              <p className="text-sm text-gray-600">새로운 품종 찾기</p>
            </div>
          </Link>

          <Link
            href="/result"
            className="flex items-center justify-center gap-2 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <span className="text-4xl">🏠</span>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">내 결과 보기</h3>
              <p className="text-sm text-gray-600">나의 품종 상세보기</p>
            </div>
          </Link>
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; 2026 냥이 매치. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
      <CompareContent />
    </Suspense>
  );
}

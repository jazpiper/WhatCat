'use client';

/**
 * My Journey Page
 * Displays user's test history, personality trends, and breed distribution
 */

import React, { useEffect, useState, Suspense, lazy } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Trash2,
  Download,
  Upload,
  Calendar,
  TrendingUp,
  Award,
} from 'lucide-react';
import {
  loadResults,
  clearAllResults,
  deleteResult,
  exportResults,
  getPersonalityTrends,
  formatResultDate,
} from '@/utils/resultStorage';
import type { SavedResult } from '@/types';
import { useResultsStorage } from '@/hooks/useResultsStorage';
import { logJourneyViewed, logJourneyCleared, logJourneyExported, logJourneyImported } from '@/lib/google-analytics';
import JourneySkeleton from '@/components/Skeleton/JourneySkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Lazy load chart components for better performance
const TimelineChart = lazy(() =>
  import('@/components/Journey/TimelineChart').then(m => ({ default: m.TimelineChart }))
);
const TrendChart = lazy(() =>
  import('@/components/Journey/TrendChart').then(m => ({ default: m.TrendChart }))
);
const BreedDistributionChart = lazy(() =>
  import('@/components/Journey/BreedDistributionChart').then(m => ({ default: m.BreedDistributionChart }))
);

export default function MyJourneyPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<JourneySkeleton />}>
        <MyJourneyPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}

function MyJourneyPageContent() {
  const router = useRouter();
  const { results, isLoading, clearAll, exportResults: exportResultsHook, importResults } = useResultsStorage();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [chartsLoading, setChartsLoading] = useState(true);

  useEffect(() => {
    // Analytics
    logJourneyViewed({
      total_tests: results.length,
      unique_breeds: new Set(results.map((r) => r.breedId)).size,
      has_data: results.length > 0,
    });
    // Simulate charts loading for smoother UX
    const timer = setTimeout(() => setChartsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [results.length]);

  const handleClearAll = async () => {
    if (showClearConfirm) {
      const success = clearAll();
      if (success) {
        logJourneyCleared({ results_count: results.length });
        setShowClearConfirm(false);
      }
    } else {
      setShowClearConfirm(true);
    }
  };

  const handleDeleteResult = (id: string) => {
    const success = deleteResult(id);
    if (success) {
      // Reload results via hook
      window.location.reload();
    }
  };

  const handleExport = async () => {
    const success = await exportResultsHook();
    if (success) {
      logJourneyExported({ results_count: results.length });
    }
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const result = await importResults(file);
      if (result.success) {
        logJourneyImported({ imported_count: result.imported });
        alert('데이터를 성공적으로 불러왔습니다!');
      } else {
        alert('데이터를 불러오는데 실패했습니다: ' + (result.error || '알 수 없는 오류'));
      }
    };
    input.click();
  };

  // Calculate additional stats
  const breedCounts: Record<string, { breedName: string; count: number }> = {};
  for (const result of results) {
    if (!breedCounts[result.breedId]) {
      breedCounts[result.breedId] = { breedName: result.breedName, count: 0 };
    }
    breedCounts[result.breedId].count++;
  }

  const sortedBreeds = Object.entries(breedCounts).sort((a, b) => b[1].count - a[1].count);
  const mostFrequent = sortedBreeds.length > 0 ? { breedId: sortedBreeds[0][0], breedName: sortedBreeds[0][1].breedName, count: sortedBreeds[0][1].count } : null;
  const uniqueBreeds = new Set(results.map((r) => r.breedId)).size;

  // Personality trends data for the chart
  const trendsData = results.map((r) => ({
    timestamp: r.date,
    personality: r.personality || { activity: 3, affection: 3, social: 3, quiet: 3, loyalty: 3 },
  }));

  // Breed distribution data
  const breedDistribution = sortedBreeds.map(([breedId, data]) => ({
    breedId,
    breedName: data.breedName,
    count: data.count,
    percentage: Math.round((data.count / results.length) * 100),
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-6xl animate-bounce">🐱</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft size={24} />
            <span>홈으로</span>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleImport}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-purple-600"
              title="데이터 불러오기"
            >
              <Upload size={20} />
            </button>
            <button
              onClick={handleExport}
              disabled={results.length === 0}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="데이터 내보내기"
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleClearAll}
              disabled={results.length === 0}
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              title="전체 삭제"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            나의 냥이 여정
          </h1>
          <p className="text-gray-600">성격이 어떻게 변화했는지 확인해보세요!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold text-pink-600">{results.length}</div>
            <div className="text-sm text-gray-500">테스트 횟수</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-3xl mb-2">🐱</div>
            <div className="text-2xl font-bold text-purple-600">{uniqueBreeds}</div>
            <div className="text-sm text-gray-500">발견한 품종</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center col-span-2">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              {mostFrequent ? `${mostFrequent.breedName} (${mostFrequent.count}회)` : '아직 없음'}
            </div>
            <div className="text-sm text-gray-500">가장 자주 매칭된 품종</div>
          </div>
        </div>

        {/* Clear Confirmation */}
        {showClearConfirm && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
            <div>
              <p className="text-red-800 font-semibold">정말 모든 기록을 삭제하시겠어요?</p>
              <p className="text-red-600 text-sm">이 작업은 되돌릴 수 없습니다.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-white border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                삭제하기
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => router.push('/my-journey')}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold whitespace-nowrap"
          >
            📊 전체 보기
          </button>
          <Link
            href="/nyongmatch"
            className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 font-semibold whitespace-nowrap"
          >
            🐱 새 테스트
          </Link>
        </div>

        {/* Content Grid */}
        {results.length > 0 ? (
          <div className="grid gap-6">
            {/* Timeline */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-pink-500" size={24} aria-hidden="true" />
                테스트 기록
              </h2>
              <Suspense fallback={
                <div className="h-48 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                </div>
              }>
                <TimelineChart
                  items={results.map((r) => ({
                    id: r.id,
                    timestamp: r.date,
                    breedName: r.breedName,
                    breedEmoji: r.emoji,
                    matchScore: r.score,
                  }))}
                  onItemClick={(id) => {
                    const result = results.find((r) => r.id === id);
                    if (result) {
                      router.push(`/breed/${result.breedId}`);
                    }
                  }}
                />
              </Suspense>
            </div>

            {/* Two column layout for trends and distribution */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personality Trends */}
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-purple-500" size={24} aria-hidden="true" />
                  성격 트렌드
                </h2>
                <Suspense fallback={
                  <div className="h-48 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  <TrendChart data={trendsData} />
                </Suspense>
              </div>

              {/* Breed Distribution */}
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="text-blue-500" size={24} aria-hidden="true" />
                  품종 분포
                </h2>
                <Suspense fallback={
                  <div className="h-48 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  <BreedDistributionChart data={breedDistribution} />
                </Suspense>
              </div>
            </div>

            {/* Detailed Results List */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">상세 기록</h2>
              <div className="space-y-3">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{result.emoji}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{result.breedName}</h3>
                        <p className="text-sm text-gray-500">{formatResultDate(result.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-pink-600">{result.score}%</div>
                        <div className="text-xs text-gray-400">매칭 점수</div>
                      </div>
                      <button
                        onClick={() => router.push(`/breed/${result.breedId}`)}
                        className="px-3 py-1 text-sm bg-white rounded-full text-purple-600 hover:bg-purple-50 transition-colors"
                      >
                        상세보기
                      </button>
                      <button
                        onClick={() => handleDeleteResult(result.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-8xl mb-6">🐱</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">아직 테스트 기록이 없어요</h2>
            <p className="text-gray-600 mb-6">
              냥이매치를 시작해서 나의 인생냥이를 찾아보세요!
            </p>
            <Link
              href="/nyongmatch"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              테스트 시작하기
            </Link>
          </div>
        )}

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

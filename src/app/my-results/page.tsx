'use client';

import { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { useResultsStorage } from '@/hooks/useResultsStorage';
import { logResultsViewed } from '@/lib/google-analytics';
import {
  Trash2,
  Download,
  Upload,
  X,
  FileDown,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import type { SavedResult } from '@/types';
import MyResultsSkeleton from '@/components/Skeleton/MyResultsSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface PersonalityBarProps {
  label: string;
  value: number;
  color: string;
}

const PersonalityBar = memo(function PersonalityBar({ label, value, color }: PersonalityBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 w-16">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-8 text-right">{value}</span>
    </div>
  );
});

export default function MyResultsPage() {
  return (
    <ErrorBoundary>
      <MyResultsPageContent />
    </ErrorBoundary>
  );
}

function MyResultsPageContent() {
  const {
    results,
    isLoading,
    isExporting,
    isImporting,
    deleteResult,
    clearAll,
    exportResults,
    importResults,
    trends,
    formatResultDate,
  } = useResultsStorage();

  // Pagination
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleResults = useMemo(
    () => results.slice(0, visibleCount),
    [results, visibleCount]
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Track page view
  useEffect(() => {
    if (!isLoading && results.length >= 0) {
      logResultsViewed({
        total_results: results.length,
        has_trends: trends !== null,
      });
    }
  }, [isLoading, results.length, trends]);

  // Reset pagination when results change (import/delete)
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [results.length]);

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTargetId) {
      deleteResult(deleteTargetId);
      setShowDeleteConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClearAll = () => {
    clearAll();
    setShowClearConfirm(false);
  };

  const handleExport = async () => {
    if (results.length === 0) {
      alert('내보낼 결과가 없습니다.');
      return;
    }
    await exportResults();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(null);

    const result = await importResults(file);

    if (result.success) {
      setImportSuccess(`${result.imported}개의 결과를 가져왔습니다.`);
      setTimeout(() => setImportSuccess(null), 3000);
    } else {
      setImportError(result.error || '가져오기에 실패했습니다.');
      setTimeout(() => setImportError(null), 3000);
    }

    // Reset input
    e.target.value = '';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xl text-gray-600 mt-4">불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-pink-500 hover:underline flex items-center gap-2 font-medium mb-4 inline-block"
          >
            <span>←</span>
            <span>홈으로</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Sparkles className="text-pink-500" />
            내 결과 히스토리
          </h1>
          <p className="text-gray-600">
            지난 테스트 결과들을 확인하고 관리하세요
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleExport}
            disabled={isExporting || results.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Download size={18} />
            {isExporting ? '내보내는 중...' : '내보내기'}
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors">
            <Upload size={18} />
            {isImporting ? '가져오는 중...' : '가져오기'}
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              disabled={isImporting}
            />
          </label>
          {results.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ml-auto"
            >
              <Trash2 size={18} />
              전체 삭제
            </button>
          )}
        </div>

        {/* Import Status Messages */}
        {importError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {importError}
          </div>
        )}
        {importSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg">
            {importSuccess}
          </div>
        )}

        {/* Personality Trends */}
        {trends && results.length >= 2 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-purple-500" />
              내 성격 트렌드
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              총 {trends.totalTests}회 테스트 기반
            </p>
            <div className="space-y-3">
              <PersonalityBar label="활동성" value={trends.avgActivity} color="bg-pink-500" />
              <PersonalityBar label="애정도" value={trends.avgAffection} color="bg-red-500" />
              <PersonalityBar label="사교성" value={trends.avgSocial} color="bg-purple-500" />
              <PersonalityBar label="조용함" value={trends.avgQuiet} color="bg-blue-500" />
              <PersonalityBar label="충성심" value={trends.avgLoyalty} color="bg-amber-500" />
            </div>
          </div>
        )}

        {/* Results List */}
        {results.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🐱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              아직 저장된 결과가 없어요
            </h3>
            <p className="text-gray-600 mb-6">
              테스트를 완료하면 결과가 자동으로 저장됩니다
            </p>
            <Link
              href="/nyongmatch"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all font-medium"
            >
              테스트 시작하기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleResults.map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                onDelete={handleDelete}
                formatResultDate={formatResultDate}
              />
            ))}

            {visibleCount < results.length && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => Math.min(results.length, c + PAGE_SIZE))}
                  className="px-6 py-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  더 보기 ({visibleCount}/{results.length})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs mt-12">
          <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">결과 삭제</h3>
            <p className="text-gray-600 mb-6">이 결과를 삭제하시겠습니까?</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteTargetId(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">전체 삭제</h3>
            <p className="text-gray-600 mb-6">
              모든 결과를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
              <button
                onClick={confirmClearAll}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                전체 삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

interface ResultCardProps {
  result: SavedResult;
  onDelete: (id: string) => void;
  formatResultDate: (date: string) => string;
}

const ResultCard = memo(function ResultCard({ result, onDelete, formatResultDate }: ResultCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{result.emoji}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{result.breedName}</h3>
            <p className="text-sm text-gray-500">{result.breedNameEn}</p>
            <p className="text-xs text-gray-400 mt-1">{formatResultDate(result.date)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {result.score}%
          </div>
          <button
            onClick={() => onDelete(result.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="삭제"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {result.personality && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-5 gap-2 text-center">
            <div>
              <div className="text-xs text-gray-500 mb-1">활동성</div>
              <div className="text-sm font-semibold text-pink-500">{result.personality.activity}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">애정도</div>
              <div className="text-sm font-semibold text-red-500">{result.personality.affection}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">사교성</div>
              <div className="text-sm font-semibold text-purple-500">{result.personality.social}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">조용함</div>
              <div className="text-sm font-semibold text-blue-500">{result.personality.quiet}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">충성심</div>
              <div className="text-sm font-semibold text-amber-500">{result.personality.loyalty}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

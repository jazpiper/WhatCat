'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { breeds } from '@/data/breeds';
import BreedCard from '@/components/BreedCard';
import { PageContainer, Card } from '@/components/ui';

const BreedFilters = dynamic(() => import('@/components/BreedFilters'), {
  ssr: false,
  loading: () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 animate-pulse h-[520px]" />
  ),
});

import {
  filterBreeds,
  sortBreeds,
  filtersToSearchParams,
  defaultFilters,
  type BreedFilters as BreedFiltersType,
  type SortOption,
} from '@/utils/breedFilters';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { logBreedSearchUsed } from '@/lib/google-analytics';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { isSafeInput } from '@/utils/sanitize';

const PAGE_SIZE = 18;

export default function BreedsClient({
  initialFilters,
  initialSort,
}: {
  initialFilters: Partial<BreedFiltersType>;
  initialSort: SortOption;
}) {
  const [searchError, setSearchError] = useState<string>('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Partial<BreedFiltersType>>(() => ({
    ...defaultFilters,
    ...initialFilters,
  }));
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 250);

  // Pagination (keep initial render cheap)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const isFiltering = debouncedSearchQuery !== searchQuery;

  const activeFilters = useMemo(
    () => ({
      ...filters,
      searchQuery: debouncedSearchQuery,
    }),
    [filters, debouncedSearchQuery]
  );

  // Filter and sort breeds
  const filteredBreeds = useMemo(() => {
    const filtered = filterBreeds(breeds, activeFilters);
    return sortBreeds(filtered, sort);
  }, [activeFilters, sort]);

  const visibleBreeds = useMemo(
    () => filteredBreeds.slice(0, visibleCount),
    [filteredBreeds, visibleCount]
  );

  // Debounce URL updates to avoid churn while dragging sliders / tapping filters
  const queryString = useMemo(
    () => filtersToSearchParams(activeFilters, sort).toString(),
    [activeFilters, sort]
  );
  const debouncedQueryString = useDebouncedValue(queryString, 200);

  // Update URL when filters change (debounced)
  useEffect(() => {
    const url = debouncedQueryString ? `${pathname}?${debouncedQueryString}` : pathname;
    router.replace(url, { scroll: false });

    if (activeFilters.searchQuery) {
      logBreedSearchUsed({
        search_query: activeFilters.searchQuery,
        result_count: filteredBreeds.length,
      });
    }
  }, [debouncedQueryString, pathname, router, filteredBreeds.length, activeFilters.searchQuery]);

  const handleSearchChange = (value: string) => {
    const sanitized = value.trim().slice(0, 50);

    if (!isSafeInput(sanitized)) {
      setSearchError('안전하지 않은 검색어가 포함되어 있습니다.');
      return;
    }

    setSearchError('');
    setSearchQuery(sanitized);
    setVisibleCount(PAGE_SIZE);
  };

  const clearSearch = () => {
    setSearchError('');
    setSearchQuery('');
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = useCallback((newSort: SortOption) => {
    setSort(newSort);
    setVisibleCount(PAGE_SIZE);
  }, []);

  return (
    <ErrorBoundary>
      <PageContainer contentClassName="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 text-center">
            🐱 고양이 품종 찾기
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            원하는 조건으로 나에게 딱 맞는 냥이를 찾아보세요!
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={20}
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="품종명, 특징으로 검색..."
                maxLength={50}
                className={`w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border focus:ring-2 outline-none transition-all text-lg text-gray-800 dark:text-gray-100 ${
                  searchError
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-200 dark:border-gray-700 focus:border-pink-400 focus:ring-pink-200'
                }`}
                aria-label="품종 검색"
                aria-invalid={!!searchError}
                aria-describedby={searchError ? 'search-error' : undefined}
              />
              {searchQuery && !searchError && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="검색어 지우기"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            {searchError && (
              <p
                id="search-error"
                className="mt-2 text-sm text-red-600 dark:text-red-400 text-center flex items-center justify-center gap-1"
              >
                <span>⚠️</span>
                <span>{searchError}</span>
              </p>
            )}
            {!searchError && searchQuery && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                {searchQuery.length} / 50자
              </p>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {searchQuery && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">검색어:</span>
              <span className="inline-flex items-center gap-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm">
              &quot;{searchQuery}&quot;
              <button
                onClick={clearSearch}
                className="ml-1 hover:text-pink-900 dark:hover:text-pink-100 transition-colors"
              >
                <X size={16} />
              </button>
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile: Filters button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm text-gray-800 dark:text-gray-100"
            >
              <SlidersHorizontal size={18} />
              필터 열기
            </button>
          </div>

          {/* Desktop: Filters sidebar */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <BreedFilters
              filters={filters}
              onFiltersChange={(f) => {
                setFilters(f);
                setVisibleCount(PAGE_SIZE);
              }}
              sort={sort}
              onSortChange={(s) => {
                setSort(s);
                setVisibleCount(PAGE_SIZE);
              }}
              resultCount={filteredBreeds.length}
              totalCount={breeds.length}
            />
          </div>

          {/* Mobile: Filters drawer */}
          {isFiltersOpen && (
            <div
              className="fixed inset-0 z-50 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="필터"
            >
              <button
                className="absolute inset-0 bg-black/40"
                onClick={() => setIsFiltersOpen(false)}
                aria-label="필터 닫기"
              />
              <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                  <div className="font-bold text-gray-800 dark:text-gray-100">필터</div>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="닫기"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="p-2">
                  <BreedFilters
                    filters={filters}
                    onFiltersChange={(f) => {
                      setFilters(f);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    sort={sort}
                    onSortChange={(s) => {
                      setSort(s);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    resultCount={filteredBreeds.length}
                    totalCount={breeds.length}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {filteredBreeds.length}개의 품종
                </h2>
                {filteredBreeds.length !== breeds.length && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    총 {breeds.length}개 품종 중 필터링됨
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">정렬:</span>
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none text-gray-800 dark:text-gray-100"
                >
                  <option value="popularity">인기순</option>
                  <option value="name-asc">이름 오름차순</option>
                  <option value="name-desc">이름 내림차순</option>
                  <option value="size">크기순</option>
                  <option value="maintenance">관리 쉬운순</option>
                </select>
              </div>
            </div>

            {filteredBreeds.length > 0 ? (
              <div className="relative">
                <div className={isFiltering ? 'opacity-60 pointer-events-none transition-opacity' : 'transition-opacity'}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {visibleBreeds.map((breed) => (
                      <BreedCard key={breed.id} breed={breed} showRank />
                    ))}
                  </div>

                  {!isFiltering && visibleCount < filteredBreeds.length && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setVisibleCount((c) => Math.min(filteredBreeds.length, c + PAGE_SIZE))}
                        className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition text-gray-800 dark:text-gray-100"
                      >
                        더 보기 ({visibleCount}/{filteredBreeds.length})
                      </button>
                    </div>
                  )}
                </div>

                {isFiltering && (
                  <div className="absolute inset-0 flex items-start justify-center pt-6">
                    <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">필터 적용 중…</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Card variant="outlined" className="text-center">
                <div className="text-6xl mb-4">😿</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  조건에 맞는 품종이 없습니다
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">필터 조건을 완화해보세요.</p>
                <button
                  onClick={() => {
                    setFilters(defaultFilters);
                    setSearchQuery('');
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <X size={20} />
                  필터 초기화
                </button>
              </Card>
            )}
          </div>
        </div>
      </PageContainer>
    </ErrorBoundary>
  );
}

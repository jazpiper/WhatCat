'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useRouter, usePathname } from 'next/navigation';
import { breeds } from '@/data/breeds';
import BreedCard from '@/components/BreedCard';
import BreedFilters from '@/components/BreedFilters';
import BreedsGridSkeleton from '@/components/Skeleton/BreedsGridSkeleton';
import {
  filterBreeds,
  sortBreeds,
  filtersToSearchParams,
  defaultFilters,
  type BreedFilters as BreedFiltersType,
  type SortOption,
} from '@/utils/breedFilters';
import { Search, X } from 'lucide-react';
import { logBreedSearchUsed } from '@/lib/google-analytics';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { isSafeInput } from '@/utils/sanitize';

export default function BreedsClient({
  initialFilters,
  initialSort,
}: {
  initialFilters: Partial<BreedFiltersType>;
  initialSort: SortOption;
}) {
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchError, setSearchError] = useState<string>('');
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
  const PAGE_SIZE = 18;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filter and sort breeds
  const filteredBreeds = useMemo(() => {
    const filtered = filterBreeds(breeds, filters);
    return sortBreeds(filtered, sort);
  }, [filters, sort]);

  const visibleBreeds = useMemo(
    () => filteredBreeds.slice(0, visibleCount),
    [filteredBreeds, visibleCount]
  );

  // Apply debounced searchQuery to filters (avoid re-filtering + URL churn on every keystroke)
  useEffect(() => {
    setIsFiltering(true);
    setFilters((prev) => ({ ...prev, searchQuery: debouncedSearchQuery }));
    setVisibleCount(PAGE_SIZE); // reset pagination on new search
    const t = setTimeout(() => setIsFiltering(false), 200);
    return () => clearTimeout(t);
  }, [debouncedSearchQuery]);

  // Update URL when filters change
  useEffect(() => {
    const params = filtersToSearchParams(filters, sort);
    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });

    if (filters.searchQuery) {
      logBreedSearchUsed({
        search_query: filters.searchQuery,
        result_count: filteredBreeds.length,
      });
    }
  }, [filters, sort, pathname, router, filteredBreeds.length]);

  const handleSearchChange = (value: string) => {
    const sanitized = value.trim().slice(0, 50);

    if (!isSafeInput(sanitized)) {
      setSearchError('안전하지 않은 검색어가 포함되어 있습니다.');
      return;
    }

    setSearchError('');
    setSearchQuery(sanitized);
  };

  const clearSearch = () => {
    setSearchError('');
    setSearchQuery('');
  };

  const handleSortChange = useCallback((newSort: SortOption) => {
    setIsFiltering(true);
    setSort(newSort);
    setVisibleCount(PAGE_SIZE);
    setTimeout(() => setIsFiltering(false), 300);
  }, []);

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
              🐱 고양이 품종 찾기
            </h1>
            <p className="text-gray-600 text-center mb-6">
              원하는 조건으로 나에게 딱 맞는 냥이를 찾아보세요!
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="품종명, 특징으로 검색..."
                  maxLength={50}
                  className={`w-full pl-12 pr-12 py-4 bg-white rounded-2xl shadow-md border focus:ring-2 outline-none transition-all text-lg ${
                    searchError
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-200 focus:border-pink-400 focus:ring-pink-200'
                  }`}
                  aria-label="품종 검색"
                  aria-invalid={!!searchError}
                  aria-describedby={searchError ? 'search-error' : undefined}
                />
                {searchQuery && !searchError && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="검색어 지우기"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              {searchError && (
                <p
                  id="search-error"
                  className="mt-2 text-sm text-red-600 text-center flex items-center justify-center gap-1"
                >
                  <span>⚠️</span>
                  <span>{searchError}</span>
                </p>
              )}
              {!searchError && searchQuery && (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {searchQuery.length} / 50자
                </p>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {searchQuery && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">검색어:</span>
              <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                "{searchQuery}"
                <button
                  onClick={clearSearch}
                  className="ml-1 hover:text-pink-900 transition-colors"
                >
                  <X size={16} />
                </button>
              </span>
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-72 flex-shrink-0">
              <BreedFilters
                filters={filters}
                onFiltersChange={setFilters}
                sort={sort}
                onSortChange={setSort}
                resultCount={filteredBreeds.length}
                totalCount={breeds.length}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {filteredBreeds.length}개의 품종
                  </h2>
                  {filteredBreeds.length !== breeds.length && (
                    <p className="text-sm text-gray-600">
                      총 {breeds.length}개 품종 중 필터링됨
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">정렬:</span>
                  <select
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none"
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
                isFiltering ? (
                  <BreedsGridSkeleton count={Math.min(filteredBreeds.length, 6)} />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {visibleBreeds.map((breed) => (
                        <BreedCard key={breed.id} breed={breed} showRank />
                      ))}
                    </div>

                    {visibleCount < filteredBreeds.length && (
                      <div className="mt-8 flex justify-center">
                        <button
                          onClick={() => setVisibleCount((c) => Math.min(filteredBreeds.length, c + PAGE_SIZE))}
                          className="px-6 py-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                        >
                          더 보기 ({visibleCount}/{filteredBreeds.length})
                        </button>
                      </div>
                    )}
                  </>
                )
              ) : (
                <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                  <div className="text-6xl mb-4">😿</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    조건에 맞는 품종이 없습니다
                  </h3>
                  <p className="text-gray-600 mb-6">필터 조건을 완화해보세요.</p>
                  <button
                    onClick={() => {
                      setFilters(defaultFilters);
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <X size={20} />
                    필터 초기화
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}

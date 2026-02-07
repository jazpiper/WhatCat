'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import {
  SIZE_OPTIONS,
  COAT_OPTIONS,
  COST_OPTIONS,
  ENVIRONMENT_OPTIONS,
  SORT_OPTIONS,
  PERSONALITY_TRAITS,
  MAINTENANCE_TRAITS,
  getActiveFilterCount,
  type SortOption,
  type BreedFilters,
} from '@/utils/breedFilters';

interface BreedFiltersProps {
  filters: Partial<BreedFilters>;
  onFiltersChange: (filters: Partial<BreedFilters>) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
  totalCount: number;
}

interface FilterSectionProps {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const FilterSection = memo(function FilterSection({ title, icon, defaultOpen = false, children }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionId = `section-${title.replace(/\s+/g, '-').toLowerCase()}`;

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h3>
        <button
          onClick={toggleOpen}
          className="w-full flex items-center justify-between py-3 px-2 hover:bg-gray-50 transition-colors"
          aria-expanded={isOpen}
          aria-controls={sectionId}
        >
          <span className="flex items-center gap-2 font-medium text-gray-700">
            <span aria-hidden="true">{icon}</span>
            <span>{title}</span>
          </span>
          {isOpen ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
        </button>
      </h3>
      {isOpen && <div id={sectionId} className="pb-4 px-2" role="region">{children}</div>}
    </div>
  );
});

interface RangeSliderProps {
  label: string;
  icon: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

const RangeSlider = memo(function RangeSlider({ label, icon, value, onChange, min = 1, max = 5 }: RangeSliderProps) {
  const [localMin, localMax] = value;
  const minSliderId = `slider-${label.replace(/\s+/g, '-')}-min`;
  const maxSliderId = `slider-${label.replace(/\s+/g, '-')}-max`;

  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), localMax - 1);
    onChange([newValue, localMax]);
  }, [localMax, onChange]);

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(e.target.value), localMin + 1);
    onChange([localMin, newValue]);
  }, [localMin, onChange]);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600" id={`label-${label.replace(/\s+/g, '-')}`}>
          <span aria-hidden="true">{icon}</span> {label}
        </span>
        <span className="text-xs text-gray-500" aria-live="polite">
          {localMin} - {localMax}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          id={minSliderId}
          type="range"
          min={min}
          max={max - 1}
          value={localMin}
          onChange={handleMinChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
          aria-label={`${label} 최소값`}
          aria-valuemin={min}
          aria-valuemax={max - 1}
          aria-valuenow={localMin}
        />
        <input
          id={maxSliderId}
          type="range"
          min={min + 1}
          max={max}
          value={localMax}
          onChange={handleMaxChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
          aria-label={`${label} 최대값`}
          aria-valuemin={min + 1}
          aria-valuemax={max}
          aria-valuenow={localMax}
        />
      </div>
    </div>
  );
});

interface CheckboxGroupProps {
  options: Array<{ value: string; label: string; icon?: string }>;
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CheckboxGroup = memo(function CheckboxGroup({ options, selectedValues, onChange }: CheckboxGroupProps) {
  const toggleValue = useCallback((value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  }, [selectedValues, onChange]);

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="필터 옵션">
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        return (
          <button
            key={option.value}
            onClick={() => toggleValue(option.value)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-1 ${
              isSelected
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={isSelected}
          >
            {option.icon && <span aria-hidden="true">{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default function BreedFilters({
  filters,
  onFiltersChange,
  sort,
  onSortChange,
  resultCount,
  totalCount,
}: BreedFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const activeFilterCount = useMemo(
    () => getActiveFilterCount(filters),
    [filters]
  );

  const updateFilters = useCallback((updates: Partial<BreedFilters>) => {
    onFiltersChange({
      ...filters,
      ...updates,
    });
  }, [filters, onFiltersChange]);

  const clearAllFilters = useCallback(() => {
    onFiltersChange({
      searchQuery: '',
      sizes: [],
      coats: [],
      personality: {
        activity: [1, 5],
        affection: [1, 5],
        social: [1, 5],
        quiet: [1, 5],
        loyalty: [1, 5],
      },
      maintenance: {
        grooming: [1, 5],
        training: [1, 5],
        health: [1, 5],
      },
      costs: {
        initial: [],
        monthly: [],
      },
      environments: [],
    });
  }, [onFiltersChange]);

  const handleSortChange = useCallback((optionValue: SortOption) => {
    onSortChange(optionValue);
  }, [onSortChange]);

  const FilterContent = useMemo(() => () => (
    <div className="space-y-1">
      {/* Sort */}
      <FilterSection title="정렬" icon="📊" defaultOpen>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-all ${
                sort === option.value
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="크기" icon="📏">
        <CheckboxGroup
          options={SIZE_OPTIONS}
          selectedValues={filters.sizes || []}
          onChange={(values) => updateFilters({ sizes: values })}
        />
      </FilterSection>

      {/* Coat */}
      <FilterSection title="털 길이" icon="🧶">
        <CheckboxGroup
          options={COAT_OPTIONS}
          selectedValues={filters.coats || []}
          onChange={(values) => updateFilters({ coats: values })}
        />
      </FilterSection>

      {/* Cost */}
      <FilterSection title="비용" icon="💰">
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-2">초기 비용</p>
          <CheckboxGroup
            options={COST_OPTIONS.initial}
            selectedValues={filters.costs?.initial || []}
            onChange={(values) =>
              updateFilters({
                costs: { initial: values, monthly: filters.costs?.monthly || [] },
              })
            }
          />
        </div>
        <div>
          <p className="text-xs text-gray-600 mb-2">월 비용</p>
          <CheckboxGroup
            options={COST_OPTIONS.monthly}
            selectedValues={filters.costs?.monthly || []}
            onChange={(values) =>
              updateFilters({
                costs: { initial: filters.costs?.initial || [], monthly: values },
              })
            }
          />
        </div>
      </FilterSection>

      {/* Environment */}
      <FilterSection title="환경" icon="🏠">
        <CheckboxGroup
          options={ENVIRONMENT_OPTIONS}
          selectedValues={filters.environments || []}
          onChange={(values) => updateFilters({ environments: values })}
        />
      </FilterSection>

      {/* Personality */}
      <FilterSection title="성격" icon="🎭">
        {PERSONALITY_TRAITS.map((trait) => (
          <RangeSlider
            key={trait.key}
            label={trait.label}
            icon={trait.icon}
            value={
              filters.personality?.[trait.key] || [1, 5]
            }
            onChange={(value) =>
              updateFilters({
                personality: {
                  activity: filters.personality?.activity || [1, 5],
                  affection: filters.personality?.affection || [1, 5],
                  social: filters.personality?.social || [1, 5],
                  quiet: filters.personality?.quiet || [1, 5],
                  loyalty: filters.personality?.loyalty || [1, 5],
                  [trait.key]: value,
                },
              })
            }
          />
        ))}
      </FilterSection>

      {/* Maintenance */}
      <FilterSection title="관리 난이도" icon="🔧">
        {MAINTENANCE_TRAITS.map((trait) => (
          <RangeSlider
            key={trait.key}
            label={trait.label}
            icon={trait.icon}
            value={
              filters.maintenance?.[trait.key] || [1, 5]
            }
            onChange={(value) =>
              updateFilters({
                maintenance: {
                  grooming: filters.maintenance?.grooming || [1, 5],
                  training: filters.maintenance?.training || [1, 5],
                  health: filters.maintenance?.health || [1, 5],
                  [trait.key]: value,
                },
              })
            }
          />
        ))}
      </FilterSection>

      {/* Clear All */}
      {activeFilterCount > 0 && (
        <div className="pt-4">
          <button
            onClick={clearAllFilters}
            className="w-full py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            모든 필터 초기화
          </button>
        </div>
      )}
    </div>
  ), [filters, sort, updateFilters, clearAllFilters, activeFilterCount]);

  const openMobileFilters = useCallback(() => setIsMobileOpen(true), []);
  const closeMobileFilters = useCallback(() => setIsMobileOpen(false), []);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={openMobileFilters}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-xl shadow-md border border-gray-200 hover:border-pink-300 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
          aria-label={`필터 열기${activeFilterCount > 0 ? ` (${activeFilterCount}개 적용됨)` : ''}`}
          aria-expanded={isMobileOpen}
        >
          <SlidersHorizontal size={20} className="text-pink-500" aria-hidden="true" />
          <span className="font-medium text-gray-700">필터</span>
          {activeFilterCount > 0 && (
            <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full" aria-label={`${activeFilterCount}개 필터 적용됨`}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-filter-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMobileFilters}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
              <h2 id="mobile-filter-title" className="text-lg font-bold text-gray-800">필터</h2>
              <button
                onClick={closeMobileFilters}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="필터 닫기"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <button
                onClick={closeMobileFilters}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                결과 보기 ({resultCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block" aria-label="품종 필터">
        <div className="sticky top-20 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
            <h2 className="text-lg font-bold text-gray-800">필터</h2>
            <p className="text-sm text-gray-600 mt-1">
              {resultCount}개의 품종 / 총 {totalCount}개
            </p>
          </div>
          <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <FilterContent />
          </div>
        </div>
      </aside>
    </>
  );
}

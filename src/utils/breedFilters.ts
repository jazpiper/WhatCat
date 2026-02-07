import { Breed } from '@/types';
import { isSafeInput } from '@/utils/sanitize';

/**
 * Filter options interface
 */
export interface BreedFilters {
  searchQuery: string;
  sizes: string[];
  coats: string[];
  personality: {
    activity: [number, number];
    affection: [number, number];
    social: [number, number];
    quiet: [number, number];
    loyalty: [number, number];
  };
  maintenance: {
    grooming: [number, number];
    training: [number, number];
    health: [number, number];
  };
  costs: {
    initial: string[];
    monthly: string[];
  };
  environments: string[];
}

/**
 * Sort options for breeds
 */
export type SortOption =
  | 'popularity'
  | 'name-asc'
  | 'name-desc'
  | 'size'
  | 'maintenance';

/**
 * Default filter state
 */
export const defaultFilters: BreedFilters = {
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
};

/**
 * Size mapping for Korean values
 */
const SIZE_MAP: Record<string, string[]> = {
  small: ['small', '소형'],
  medium: ['medium', '중형'],
  large: ['large', '대형'],
  xlarge: ['xlarge', '초대형'],
};

/**
 * Coat mapping for Korean values
 */
const COAT_MAP: Record<string, string[]> = {
  short: ['short', '단모'],
  medium: ['medium', '중장모'],
  long: ['long', '장모'],
  hairless: ['hairless', '무모'],
};

/**
 * Normalize size value
 */
function normalizeSize(size: string): string {
  for (const [key, values] of Object.entries(SIZE_MAP)) {
    if (values.includes(size.toLowerCase())) {
      return key;
    }
  }
  return size.toLowerCase();
}

/**
 * Normalize coat value
 */
function normalizeCoat(coat: string): string {
  for (const [key, values] of Object.entries(COAT_MAP)) {
    if (values.includes(coat.toLowerCase())) {
      return key;
    }
  }
  return coat.toLowerCase();
}

/**
 * Check if value is within range
 */
function isInRange(value: number, range: [number, number]): boolean {
  return value >= range[0] && value <= range[1];
}

/**
 * Check if breed matches size filters
 */
function matchesSize(breed: Breed, sizes: string[]): boolean {
  if (sizes.length === 0) return true;
  const normalizedSize = normalizeSize(breed.size);
  return sizes.includes(normalizedSize);
}

/**
 * Check if breed matches coat filters
 */
function matchesCoat(breed: Breed, coats: string[]): boolean {
  if (coats.length === 0) return true;
  const normalizedCoat = normalizeCoat(breed.coat);
  return coats.includes(normalizedCoat);
}

/**
 * Check if breed matches personality filters
 */
function matchesPersonality(
  breed: Breed,
  personality: BreedFilters['personality']
): boolean {
  return (
    isInRange(breed.personality.activity, personality.activity) &&
    isInRange(breed.personality.affection, personality.affection) &&
    isInRange(breed.personality.social, personality.social) &&
    isInRange(breed.personality.quiet, personality.quiet) &&
    isInRange(breed.personality.loyalty, personality.loyalty)
  );
}

/**
 * Check if breed matches maintenance filters
 */
function matchesMaintenance(
  breed: Breed,
  maintenance: BreedFilters['maintenance']
): boolean {
  return (
    isInRange(breed.maintenance.grooming, maintenance.grooming) &&
    isInRange(breed.maintenance.training, maintenance.training) &&
    isInRange(breed.maintenance.health, maintenance.health)
  );
}

/**
 * Check if breed matches cost filters
 */
function matchesCost(breed: Breed, costs: BreedFilters['costs']): boolean {
  const initialMatch = costs.initial.length === 0 || costs.initial.includes(breed.cost.initial);
  const monthlyMatch = costs.monthly.length === 0 || costs.monthly.includes(breed.cost.monthly);
  return initialMatch && monthlyMatch;
}

/**
 * Check if breed matches environment filters
 */
function matchesEnvironment(breed: Breed, environments: string[]): boolean {
  if (environments.length === 0) return true;
  return environments.some((env) => breed.environment.includes(env));
}

/**
 * Check if breed matches search query
 */
function matchesSearchQuery(breed: Breed, query: string): boolean {
  if (!query.trim()) return true;
  const searchTerms = query.toLowerCase().split(/\s+/);

  return searchTerms.every((term) => {
    return (
      breed.name.toLowerCase().includes(term) ||
      breed.nameEn.toLowerCase().includes(term) ||
      breed.traits.some((trait) => trait.toLowerCase().includes(term)) ||
      breed.description.toLowerCase().includes(term)
    );
  });
}

/**
 * Filter breeds based on provided filters
 */
export function filterBreeds(breeds: Breed[], filters: Partial<BreedFilters>): Breed[] {
  const mergedFilters = { ...defaultFilters, ...filters };

  return breeds.filter((breed) => {
    return (
      matchesSearchQuery(breed, mergedFilters.searchQuery) &&
      matchesSize(breed, mergedFilters.sizes) &&
      matchesCoat(breed, mergedFilters.coats) &&
      matchesPersonality(breed, mergedFilters.personality) &&
      matchesMaintenance(breed, mergedFilters.maintenance) &&
      matchesCost(breed, mergedFilters.costs) &&
      matchesEnvironment(breed, mergedFilters.environments)
    );
  });
}

/**
 * Sort breeds based on sort option
 */
export function sortBreeds(breeds: Breed[], sortOption: SortOption): Breed[] {
  const sorted = [...breeds];

  switch (sortOption) {
    case 'popularity':
      return sorted.sort((a, b) => b.korea_popularity - a.korea_popularity);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name, 'ko'));
    case 'size':
      const sizeOrder = { small: 1, medium: 2, large: 3, xlarge: 4 };
      return sorted.sort((a, b) => {
        const aSize = sizeOrder[normalizeSize(a.size) as keyof typeof sizeOrder] || 0;
        const bSize = sizeOrder[normalizeSize(b.size) as keyof typeof sizeOrder] || 0;
        return aSize - bSize;
      });
    case 'maintenance':
      return sorted.sort(
        (a, b) =>
          a.maintenance.grooming +
          a.maintenance.training +
          a.maintenance.health -
          (b.maintenance.grooming + b.maintenance.training + b.maintenance.health)
      );
    default:
      return sorted;
  }
}

/**
 * Convert filters to URL search params
 */
export function filtersToSearchParams(filters: Partial<BreedFilters>, sort: SortOption): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.searchQuery) {
    params.set('q', filters.searchQuery);
  }

  if (filters.sizes?.length) {
    params.set('sizes', filters.sizes.join(','));
  }

  if (filters.coats?.length) {
    params.set('coats', filters.coats.join(','));
  }

  if (filters.environments?.length) {
    params.set('env', filters.environments.join(','));
  }

  if (filters.costs?.initial?.length) {
    params.set('costInit', filters.costs.initial.join(','));
  }

  if (filters.costs?.monthly?.length) {
    params.set('costMonth', filters.costs.monthly.join(','));
  }

  // Personality ranges
  if (filters.personality?.activity) {
    params.set('activity', filters.personality.activity.join('-'));
  }
  if (filters.personality?.affection) {
    params.set('affection', filters.personality.affection.join('-'));
  }
  if (filters.personality?.social) {
    params.set('social', filters.personality.social.join('-'));
  }
  if (filters.personality?.quiet) {
    params.set('quiet', filters.personality.quiet.join('-'));
  }
  if (filters.personality?.loyalty) {
    params.set('loyalty', filters.personality.loyalty.join('-'));
  }

  // Maintenance ranges
  if (filters.maintenance?.grooming) {
    params.set('grooming', filters.maintenance.grooming.join('-'));
  }
  if (filters.maintenance?.training) {
    params.set('training', filters.maintenance.training.join('-'));
  }
  if (filters.maintenance?.health) {
    params.set('health', filters.maintenance.health.join('-'));
  }

  if (sort !== 'popularity') {
    params.set('sort', sort);
  }

  return params;
}

/**
 * Parse URL search params to filters
 */
export function searchParamsToFilters(params: URLSearchParams): {
  filters: Partial<BreedFilters>;
  sort: SortOption;
} {
  const filters: Partial<BreedFilters> = {
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
  };

  const parseRange = (value: string | null): [number, number] | undefined => {
    if (!value) return undefined;
    const [min, max] = value.split('-').map(Number);
    if (isNaN(min) || isNaN(max)) return undefined;
    return [min, max] as [number, number];
  };

  const parseArray = (value: string | null): string[] => {
    if (!value) return [];
    return value.split(',').filter(Boolean);
  };

  // Sanitize search query from URL to prevent XSS
  const rawSearchQuery = params.get('q') || '';
  filters.searchQuery = isSafeInput(rawSearchQuery) ? rawSearchQuery.slice(0, 50) : '';
  filters.sizes = parseArray(params.get('sizes'));
  filters.coats = parseArray(params.get('coats'));
  filters.environments = parseArray(params.get('env'));

  filters.personality!.activity = parseRange(params.get('activity')) || [1, 5];
  filters.personality!.affection = parseRange(params.get('affection')) || [1, 5];
  filters.personality!.social = parseRange(params.get('social')) || [1, 5];
  filters.personality!.quiet = parseRange(params.get('quiet')) || [1, 5];
  filters.personality!.loyalty = parseRange(params.get('loyalty')) || [1, 5];

  filters.maintenance!.grooming = parseRange(params.get('grooming')) || [1, 5];
  filters.maintenance!.training = parseRange(params.get('training')) || [1, 5];
  filters.maintenance!.health = parseRange(params.get('health')) || [1, 5];

  filters.costs!.initial = parseArray(params.get('costInit'));
  filters.costs!.monthly = parseArray(params.get('costMonth'));

  const sort = (params.get('sort') as SortOption) || 'popularity';

  return { filters, sort };
}

/**
 * Get active filter count
 */
export function getActiveFilterCount(filters: Partial<BreedFilters>): number {
  let count = 0;

  if (filters.searchQuery?.trim()) count++;
  if (filters.sizes?.length) count++;
  if (filters.coats?.length) count++;
  if (filters.environments?.length) count++;
  if (filters.costs?.initial?.length) count++;
  if (filters.costs?.monthly?.length) count++;

  // Count personality filters that are not default
  if (filters.personality) {
    if (filters.personality.activity?.[0] !== 1 || filters.personality.activity?.[1] !== 5) count++;
    if (filters.personality.affection?.[0] !== 1 || filters.personality.affection?.[1] !== 5) count++;
    if (filters.personality.social?.[0] !== 1 || filters.personality.social?.[1] !== 5) count++;
    if (filters.personality.quiet?.[0] !== 1 || filters.personality.quiet?.[1] !== 5) count++;
    if (filters.personality.loyalty?.[0] !== 1 || filters.personality.loyalty?.[1] !== 5) count++;
  }

  // Count maintenance filters that are not default
  if (filters.maintenance) {
    if (filters.maintenance.grooming?.[0] !== 1 || filters.maintenance.grooming?.[1] !== 5) count++;
    if (filters.maintenance.training?.[0] !== 1 || filters.maintenance.training?.[1] !== 5) count++;
    if (filters.maintenance.health?.[0] !== 1 || filters.maintenance.health?.[1] !== 5) count++;
  }

  return count;
}

/**
 * Size options for filter UI
 */
export const SIZE_OPTIONS = [
  { value: 'small', label: '소형', icon: '🐱' },
  { value: 'medium', label: '중형', icon: '🐈' },
  { value: 'large', label: '대형', icon: '🦁' },
  { value: 'xlarge', label: '초대형', icon: '🐯' },
];

/**
 * Coat options for filter UI
 */
export const COAT_OPTIONS = [
  { value: 'short', label: '단모', icon: '🧥' },
  { value: 'medium', label: '중장모', icon: '🧶' },
  { value: 'long', label: '장모', icon: '✨' },
  { value: 'hairless', label: '무모', icon: '👁️' },
];

/**
 * Cost options for filter UI
 */
export const COST_OPTIONS = {
  initial: [
    { value: 'low', label: '낮음 (20만원 이하)' },
    { value: 'medium', label: '중간 (20-50만원)' },
    { value: 'high', label: '높음 (50-100만원)' },
    { value: 'veryhigh', label: '매우 높음 (100만원+)' },
  ],
  monthly: [
    { value: 'low', label: '낮음 (5만원 이하)' },
    { value: 'medium', label: '중간 (5-10만원)' },
    { value: 'high', label: '높음 (10만원+)' },
  ],
};

/**
 * Environment options for filter UI
 */
export const ENVIRONMENT_OPTIONS = [
  { value: 'apt', label: '아파트', icon: '🏢' },
  { value: 'family', label: '가족과 함께', icon: '👨‍👩‍👧‍👦' },
  { value: 'quiet', label: '조용한 환경', icon: '🤫' },
  { value: 'children', label: '아이가 있는 집', icon: '👶' },
  { value: 'pets', label: '다른 동물과 공존', icon: '🐕' },
  { value: 'outdoor', label: '외부 활동', icon: '🌳' },
  { value: 'indoor', label: '실내 사육', icon: '🏠' },
];

/**
 * Sort options for filter UI
 */
export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: '인기순' },
  { value: 'name-asc', label: '이름 오름차순' },
  { value: 'name-desc', label: '이름 내림차순' },
  { value: 'size', label: '크기순' },
  { value: 'maintenance', label: '관리 쉬운순' },
];

/**
 * Personality traits for filter UI
 */
export const PERSONALITY_TRAITS = [
  { key: 'activity', label: '활동성', icon: '🏃' },
  { key: 'affection', label: '애정', icon: '❤️' },
  { key: 'social', label: '사교성', icon: '👥' },
  { key: 'quiet', label: '조용함', icon: '🤫' },
  { key: 'loyalty', label: '충성심', icon: '🐕' },
] as const;

/**
 * Maintenance traits for filter UI
 */
export const MAINTENANCE_TRAITS = [
  { key: 'grooming', label: '그루밍', icon: '✂️' },
  { key: 'training', label: '훈련', icon: '🎓' },
  { key: 'health', label: '건강', icon: '🏥' },
] as const;

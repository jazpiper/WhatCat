/**
 * Tests for breed filters utility
 */

import {
  filterBreeds,
  sortBreeds,
  defaultFilters,
  getActiveFilterCount,
  filtersToSearchParams,
  searchParamsToFilters,
} from '../breedFilters';
import { Breed } from '@/types';

// Mock breed data
const mockBreeds: Breed[] = [
  {
    id: 'persian',
    name: '페르시안',
    nameEn: 'Persian',
    emoji: '🐱',
    rank: 1,
    personality: { activity: 1, affection: 5, social: 2, quiet: 5, loyalty: 4 },
    maintenance: { grooming: 5, training: 3, health: 2 },
    cost: { initial: 'medium', monthly: 'medium' },
    environment: ['apartment'],
    traits: ['조용함', '온순함'],
    size: 'medium',
    coat: 'long',
    colors: ['white', 'black'],
    description: '조용하고 우아한 고양이',
    korea_popularity: 80,
  },
  {
    id: 'siamese',
    name: '샴',
    nameEn: 'Siamese',
    emoji: '🐱',
    rank: 2,
    personality: { activity: 5, affection: 4, social: 5, quiet: 1, loyalty: 5 },
    maintenance: { grooming: 1, training: 2, health: 3 },
    cost: { initial: 'low', monthly: 'low' },
    environment: ['apartment', 'house'],
    traits: ['활동적', '사교적'],
    size: 'medium',
    coat: 'short',
    colors: ['cream', 'brown'],
    description: '활동적이고 사교적인 고양이',
    korea_popularity: 70,
  },
  {
    id: 'maine-coon',
    name: '메인쿤',
    nameEn: 'Maine Coon',
    emoji: '🦁',
    rank: 3,
    personality: { activity: 3, affection: 4, social: 4, quiet: 3, loyalty: 5 },
    maintenance: { grooming: 5, training: 3, health: 3 },
    cost: { initial: 'high', monthly: 'medium' },
    environment: ['house'],
    traits: ['친절함', '온순함', '큰크기'],
    size: 'large',
    coat: 'long',
    colors: ['brown', 'black'],
    description: '크고 친근한 고양이',
    korea_popularity: 60,
  },
];

describe('filterBreeds', () => {
  it('should return all breeds when no filters applied', () => {
    const result = filterBreeds(mockBreeds, defaultFilters);
    expect(result.length).toBe(mockBreeds.length);
  });

  it('should filter by search query', () => {
    const filters = { ...defaultFilters, searchQuery: '페르시안' };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('persian');
  });

  it('should filter by English name', () => {
    const filters = { ...defaultFilters, searchQuery: 'Siamese' };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('siamese');
  });

  it('should filter by traits', () => {
    const filters = { ...defaultFilters, searchQuery: '활동적' };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('siamese');
  });

  it('should filter by size', () => {
    const filters = { ...defaultFilters, sizes: ['large'] };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('maine-coon');
  });

  it('should filter by coat', () => {
    const filters = { ...defaultFilters, coats: ['short'] };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('siamese');
  });

  it('should filter by environment', () => {
    const filters = { ...defaultFilters, environments: ['house'] };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(2);
    expect(result.map(b => b.id)).toContain('siamese');
    expect(result.map(b => b.id)).toContain('maine-coon');
  });

  it('should filter by personality range', () => {
    const filters = {
      ...defaultFilters,
      personality: { activity: [4, 5], affection: [1, 5], social: [1, 5], quiet: [1, 5], loyalty: [1, 5] }
    };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('siamese');
  });

  it('should filter by cost', () => {
    const filters = { ...defaultFilters, costs: { initial: ['low'], monthly: [] } };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('siamese');
  });

  it('should combine multiple filters', () => {
    const filters = {
      ...defaultFilters,
      coats: ['long'],
      environments: ['apartment'],
    };
    const result = filterBreeds(mockBreeds, filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('persian');
  });
});

describe('sortBreeds', () => {
  it('should sort by popularity descending', () => {
    const result = sortBreeds([...mockBreeds], 'popularity');
    expect(result[0].korea_popularity).toBeGreaterThanOrEqual(result[1].korea_popularity);
    expect(result[1].korea_popularity).toBeGreaterThanOrEqual(result[2].korea_popularity);
  });

  it('should sort by name ascending', () => {
    const result = sortBreeds([...mockBreeds], 'name-asc');
    expect(result[0].name).toBe('메인쿤');
    expect(result[1].name).toBe('샴');
    expect(result[2].name).toBe('페르시안');
  });

  it('should sort by name descending', () => {
    const result = sortBreeds([...mockBreeds], 'name-desc');
    expect(result[0].name).toBe('페르시안');
    expect(result[1].name).toBe('샴');
    expect(result[2].name).toBe('메인쿤');
  });

  it('should sort by size', () => {
    const result = sortBreeds([...mockBreeds], 'size');
    const sizeOrder = ['small', 'medium', 'large', 'xlarge'];
    const resultSizes = result.map(b => b.size);
    expect(sizeOrder.indexOf(resultSizes[0])).toBeLessThanOrEqual(sizeOrder.indexOf(resultSizes[1]));
  });

  it('should sort by maintenance (easiest first)', () => {
    const result = sortBreeds([...mockBreeds], 'maintenance');
    // Siamese has grooming 1 (easiest), Persian and Maine Coon have 5
    expect(result[0].id).toBe('siamese');
  });
});

describe('getActiveFilterCount', () => {
  it('should return 0 for default filters', () => {
    const count = getActiveFilterCount(defaultFilters);
    expect(count).toBe(0);
  });

  it('should count active filters', () => {
    const filters = {
      ...defaultFilters,
      sizes: ['large'],
      coats: ['long'],
      searchQuery: 'test',
    };
    const count = getActiveFilterCount(filters);
    expect(count).toBe(3);
  });

  it('should count personality range filters', () => {
    const filters = {
      ...defaultFilters,
      personality: { activity: [3, 5], affection: [1, 5], social: [1, 5], quiet: [1, 5], loyalty: [1, 5] }
    };
    const count = getActiveFilterCount(filters);
    expect(count).toBe(1);
  });
});

describe('filtersToSearchParams', () => {
  it('should convert filters to URLSearchParams', () => {
    const filters = {
      ...defaultFilters,
      searchQuery: 'test',
      sizes: ['large'],
    };
    const params = filtersToSearchParams(filters, 'popularity');
    expect(params.get('q')).toBe('test');
    expect(params.get('sizes')).toBe('large');
    expect(params.get('sort')).toBeNull(); // popularity is default and not included
  });

  it('should handle array parameters', () => {
    const filters = {
      ...defaultFilters,
      sizes: ['large', 'medium'],
    };
    const params = filtersToSearchParams(filters, 'popularity');
    const sizeValues = params.get('sizes');
    expect(sizeValues).toBe('large,medium');
  });

  it('should include sort parameter when not default', () => {
    const filters = {
      ...defaultFilters,
      sizes: ['large'],
    };
    const params = filtersToSearchParams(filters, 'name-asc');
    expect(params.get('sort')).toBe('name-asc');
  });
});

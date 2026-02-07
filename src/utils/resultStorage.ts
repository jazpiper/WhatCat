/**
 * Result Storage Utility
 * Handles localStorage operations for test results
 */

import type { SavedResult, ResultStorageState } from '@/types';
import { safeGetStorage, safeSetStorage, safeRemoveStorage, ErrorType, logError } from '@/utils/errorHandler';

const STORAGE_KEY = 'nyongmatch_results';
const MAX_RESULTS = 10;

/**
 * Load all saved results from localStorage
 */
export function loadResults(): SavedResult[] {
  return safeGetStorage<SavedResult[]>(STORAGE_KEY, []);
}

/**
 * Save a new result to localStorage
 * Keeps only the most recent MAX_RESULTS
 */
export function saveResult(result: Omit<SavedResult, 'id' | 'date'>): boolean {
  if (typeof window === 'undefined') return false;

  const currentResults = loadResults();
  const newResult: SavedResult = {
    ...result,
    id: generateId(),
    date: new Date().toISOString(),
  };

  // Add new result at the beginning
  const updatedResults = [newResult, ...currentResults];

  // Keep only MAX_RESULTS most recent
  const trimmedResults = updatedResults.slice(0, MAX_RESULTS);

  const state: ResultStorageState = {
    results: trimmedResults,
    lastUpdated: new Date().toISOString(),
  };

  return safeSetStorage(STORAGE_KEY, state);
}

/**
 * Delete a specific result by ID
 */
export function deleteResult(id: string): boolean {
  if (typeof window === 'undefined') return false;

  const currentResults = loadResults();
  const filteredResults = currentResults.filter((r) => r.id !== id);

  const state: ResultStorageState = {
    results: filteredResults,
    lastUpdated: new Date().toISOString(),
  };

  return safeSetStorage(STORAGE_KEY, state);
}

/**
 * Clear all saved results
 */
export function clearAllResults(): boolean {
  return safeRemoveStorage(STORAGE_KEY);
}

/**
 * Export all results as JSON
 */
export function exportResults(): string {
  const results = loadResults();
  return JSON.stringify(results, null, 2);
}

/**
 * Import results from JSON file
 */
export function importResults(jsonString: string): { success: boolean; imported: number; error?: string } {
  try {
    const imported: SavedResult[] = JSON.parse(jsonString);

    if (!Array.isArray(imported)) {
      return { success: false, imported: 0, error: 'Invalid format: expected array' };
    }

    // Validate each result
    const validResults = imported.filter((r) => {
      return (
        r.breedId &&
        r.breedName &&
        typeof r.score === 'number' &&
        r.date
      );
    });

    if (validResults.length === 0) {
      return { success: false, imported: 0, error: 'No valid results found' };
    }

    // Merge with existing results
    const currentResults = loadResults();
    const mergedResults = [...validResults, ...currentResults];

    // Remove duplicates by breedId and date, keep most recent
    const uniqueResults = mergedResults.reduce<SavedResult[]>((acc, result) => {
      const exists = acc.some(
        (r) => r.breedId === result.breedId && r.date === result.date
      );
      if (!exists) {
        acc.push(result);
      }
      return acc;
    }, []);

    // Sort by date descending and keep MAX_RESULTS
    const sortedResults = uniqueResults
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_RESULTS);

    const state: ResultStorageState = {
      results: sortedResults,
      lastUpdated: new Date().toISOString(),
    };

    const success = safeSetStorage(STORAGE_KEY, state);
    return success
      ? { success: true, imported: validResults.length }
      : { success: false, imported: 0, error: 'Failed to save imported results' };
  } catch (error) {
    logError(error, 'importResults');
    return {
      success: false,
      imported: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Calculate personality trends from saved results
 */
export function getPersonalityTrends(results: SavedResult[]): {
  avgActivity: number;
  avgAffection: number;
  avgSocial: number;
  avgQuiet: number;
  avgLoyalty: number;
  totalTests: number;
} | null {
  const resultsWithPersonality = results.filter((r) => r.personality);

  if (resultsWithPersonality.length === 0) return null;

  const totals = resultsWithPersonality.reduce(
    (acc, r) => {
      if (r.personality) {
        acc.activity += r.personality.activity;
        acc.affection += r.personality.affection;
        acc.social += r.personality.social;
        acc.quiet += r.personality.quiet;
        acc.loyalty += r.personality.loyalty;
      }
      return acc;
    },
    { activity: 0, affection: 0, social: 0, quiet: 0, loyalty: 0 }
  );

  const count = resultsWithPersonality.length;

  return {
    avgActivity: Math.round((totals.activity / count) * 10) / 10,
    avgAffection: Math.round((totals.affection / count) * 10) / 10,
    avgSocial: Math.round((totals.social / count) * 10) / 10,
    avgQuiet: Math.round((totals.quiet / count) * 10) / 10,
    avgLoyalty: Math.round((totals.loyalty / count) * 10) / 10,
    totalTests: results.length,
  };
}

/**
 * Generate unique ID for result
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format date for display
 */
export function formatResultDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 1 ? '방금 전' : `${diffMinutes}분 전`;
    }
    return `${diffHours}시간 전`;
  } else if (diffDays === 1) {
    return '어제';
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
}

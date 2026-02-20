/**
 * Results Storage Hook
 * Custom hook for managing test results in localStorage
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SavedResult } from '@/types';
import {
  loadResults,
  saveResult as saveResultUtil,
  deleteResult as deleteResultUtil,
  clearAllResults as clearAllResultsUtil,
  exportResults as exportResultsUtil,
  importResults as importResultsUtil,
  getPersonalityTrends,
  formatResultDate,
} from '@/utils/resultStorage';
import { logError } from '@/utils/errorHandler';

export function useResultsStorage() {
  const [results, setResults] = useState<SavedResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Load results on mount
  useEffect(() => {
    setResults(loadResults());
    setIsLoading(false);
  }, []);

  // Save a new result
  const saveResult = useCallback(
    (result: Omit<SavedResult, 'id' | 'date'>) => {
      const success = saveResultUtil(result);
      if (success) {
        setResults(loadResults());
      }
      return success;
    },
    []
  );

  // Delete a specific result
  const deleteResult = useCallback((id: string) => {
    const success = deleteResultUtil(id);
    if (success) {
      setResults((prev) => prev.filter((r) => r.id !== id));
    }
    return success;
  }, []);

  // Clear all results
  const clearAll = useCallback(() => {
    const success = clearAllResultsUtil();
    if (success) {
      setResults([]);
    }
    return success;
  }, []);

  // Export results as JSON file
  const exportResults = useCallback(async () => {
    setIsExporting(true);
    try {
      const jsonString = exportResultsUtil();

      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `nyongmatch-results-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      logError(error, 'useResultsStorage.exportResults');
      return false;
    } finally {
      setIsExporting(false);
    }
  }, []);

  // Import results from JSON file
  const importResults = useCallback(async (file: File) => {
    setIsImporting(true);
    try {
      const text = await file.text();
      const result = importResultsUtil(text);

      if (result.success) {
        setResults(loadResults());
      }

      return result;
    } catch (error) {
      logError(error, 'useResultsStorage.importResults');
      return {
        success: false,
        imported: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } finally {
      setIsImporting(false);
    }
  }, []);

  // Get personality trends
  const trends = getPersonalityTrends(results);

  return {
    results,
    isLoading,
    isExporting,
    isImporting,
    saveResult,
    deleteResult,
    clearAll,
    exportResults,
    importResults,
    trends,
    formatResultDate,
  };
}

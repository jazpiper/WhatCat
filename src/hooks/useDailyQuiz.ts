/**
 * Daily Quiz Hook
 * Custom hook for managing daily quiz state in localStorage
 * Enhanced with comprehensive error handling
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nyongmatch_daily_quiz';

export interface DailyQuizState {
  lastQuizDate: string;
  streak: number;
  totalCompleted: number;
  lastCompletedDate: string;
}

const initialState: DailyQuizState = {
  lastQuizDate: '',
  streak: 0,
  totalCompleted: 0,
  lastCompletedDate: '',
};

export interface DailyQuizError {
  type: 'localStorage' | 'streakCalc' | 'unknown';
  message: string;
  readonly error: Error | null;
}

export function useDailyQuiz() {
  const [state, setState] = useState<DailyQuizState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<DailyQuizError | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate the parsed data structure
        if (parsed && typeof parsed === 'object' && 'streak' in parsed) {
          setState(parsed);
        } else {
          console.warn('[DailyQuiz] Invalid state data, using defaults');
          setState(initialState);
        }
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('[DailyQuiz] Failed to load quiz state:', err);

      // Set error state for UI to handle
      setError({
        type: 'localStorage',
        message: '퀴즈 데이터를 불러오지 못했습니다.',
        error: err,
      });

      // Log to analytics if available
      if (typeof window !== 'undefined' && 'gtag' in window) {
        try {
          (window as any).gtag('event', 'daily_quiz_storage_error', {
            error_type: 'load',
            error_message: err.message,
          });
        } catch {
          // Analytics failed
        }
      }
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        // Clear error if save succeeds
        if (error) {
          setError(null);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error('[DailyQuiz] Failed to save quiz state:', err);

        // Check if it's a quota exceeded error
        if (err.name === 'QuotaExceededError' || err.message.includes('quota')) {
          setError({
            type: 'localStorage',
            message: '저장 공간이 부족합니다. 일부 브라우저 데이터를 정리해주세요.',
            error: err,
          });
        } else {
          setError({
            type: 'localStorage',
            message: '퀴즈 진행 상황을 저장할 수 없습니다.',
            error: err,
          });
        }

        // Log to analytics
        if (typeof window !== 'undefined' && 'gtag' in window) {
          try {
            (window as any).gtag('event', 'daily_quiz_storage_error', {
              error_type: 'save',
              error_message: err.message,
              is_quota_error: err.name === 'QuotaExceededError',
            });
          } catch {
            // Analytics failed
          }
        }
      }
    }
  }, [state, isLoaded, error]);

  // Get today's date string (YYYY-MM-DD format)
  const getTodayString = useCallback(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  // Check if today's quiz is already completed
  const isCompletedToday = useCallback(() => {
    const today = getTodayString();
    return state.lastQuizDate === today;
  }, [state.lastQuizDate, getTodayString]);

  // Calculate streak based on last completion date
  const calculateStreak = useCallback((lastDate: string): number => {
    try {
      if (!lastDate) return 0;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const last = new Date(lastDate);
      last.setHours(0, 0, 0, 0);

      // Validate date
      if (isNaN(last.getTime())) {
        console.warn('[DailyQuiz] Invalid last completion date');
        return 0;
      }

      const diffTime = today.getTime() - last.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // If last completed today or yesterday, streak continues
      if (diffDays <= 1) {
        return state.streak;
      }

      // Streak is broken
      return 0;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('[DailyQuiz] Streak calculation error:', err);

      setError({
        type: 'streakCalc',
        message: '연속 기록 계산 중 오류가 발생했습니다.',
        error: err,
      });

      // Log to analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        try {
          (window as any).gtag('event', 'daily_quiz_streak_error', {
            error_message: err.message,
            last_date: lastDate,
          });
        } catch {
          // Analytics failed
        }
      }

      return 0;
    }
  }, [state.streak]);

  // Update streak (call this on page load to check if streak is broken)
  const updateStreak = useCallback(() => {
    const currentStreak = calculateStreak(state.lastCompletedDate);
    if (currentStreak !== state.streak) {
      setState((prev) => ({ ...prev, streak: currentStreak }));
    }
  }, [state.lastCompletedDate, state.streak, calculateStreak]);

  // Check and update streak on mount and daily
  useEffect(() => {
    if (isLoaded) {
      updateStreak();
    }
  }, [isLoaded, updateStreak]);

  // Complete today's quiz
  const completeQuiz = useCallback(() => {
    try {
      const today = getTodayString();
      const lastCompleted = state.lastCompletedDate;

      // Calculate if streak should increase
      let newStreak = state.streak;
      if (lastCompleted) {
        const lastDate = new Date(lastCompleted);
        lastDate.setHours(0, 0, 0, 0);
        const todayDate = new Date(today);
        todayDate.setHours(0, 0, 0, 0);

        // Validate dates
        if (isNaN(lastDate.getTime()) || isNaN(todayDate.getTime())) {
          throw new Error('Invalid date in completeQuiz');
        }

        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive day
          newStreak += 1;
        } else if (diffDays > 1) {
          // Streak was broken
          newStreak = 1;
        }
        // If diffDays === 0, already completed today, don't increase
      } else {
        // First completion
        newStreak = 1;
      }

      // Ensure streak doesn't go negative
      newStreak = Math.max(0, newStreak);

      setState({
        lastQuizDate: today,
        streak: newStreak,
        totalCompleted: state.totalCompleted + (today !== state.lastQuizDate ? 1 : 0),
        lastCompletedDate: today,
      });

      // Clear any existing errors on successful completion
      if (error) {
        setError(null);
      }

      return { streak: newStreak, isNewMilestone: true };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('[DailyQuiz] Error completing quiz:', error);

      setError({
        type: 'streakCalc',
        message: '퀴즈 완료 처리 중 오류가 발생했습니다.',
        error,
      });

      // Log to analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        try {
          (window as any).gtag('event', 'daily_quiz_complete_error', {
            error_message: error.message,
          });
        } catch {
          // Analytics failed
        }
      }

      // Return a safe default state
      return { streak: state.streak, isNewMilestone: false };
    }
  }, [state, getTodayString, error]);

  // Reset quiz state (for testing)
  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  // Get time until next quiz (midnight)
  const getTimeUntilNextQuiz = useCallback(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diffMs = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { hours, minutes };
  }, []);

  // Clear error state (for user-initiated retry)
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    state,
    isLoaded,
    isCompletedToday: isCompletedToday(),
    completeQuiz,
    resetQuiz,
    getTimeUntilNextQuiz,
    updateStreak,
    error,
    clearError,
  };
}

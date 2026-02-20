'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { AnswerScore } from '@/types';
import { safeSetStorage, safeRemoveStorage, logError, ErrorType, createError } from '@/utils/errorHandler';

const STORAGE_KEY = 'nyongmatch_answers';
const QUESTION_KEY = 'nyongmatch_question';

interface NyongmatchContextType {
  currentQuestion: number;
  answers: AnswerScore[];
  setAnswer: (questionId: string, answerId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetTest: () => void;
  goToQuestion: (index: number) => void;
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
}

const NyongmatchContext = createContext<NyongmatchContextType | undefined>(undefined);

function safeGetStorageItem(storageKey: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function isAnswerScore(value: unknown): value is AnswerScore {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const answer = value as { questionId?: unknown; answerId?: unknown };
  return typeof answer.questionId === 'string' && typeof answer.answerId === 'string';
}

function safeParseNumberStorageValue(storageKey: string): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  const saved = safeGetStorageItem(storageKey);
  if (!saved) {
    return 0;
  }

  const parsed = parseInt(saved, 10);
  return Number.isFinite(parsed) ? Math.max(0, Math.min(parsed, 13)) : 0;
}

function safeParseAnswersStorageValue(storageKey: string): AnswerScore[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = safeGetStorageItem(storageKey);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved) as unknown;
    if (Array.isArray(parsed) && parsed.every(isAnswerScore)) {
      return parsed as AnswerScore[];
    }
  } catch {
    return [];
  }

  return [];
}

export function NyongmatchProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return safeParseNumberStorageValue(QUESTION_KEY);
  });

  const [answers, setAnswers] = useState<AnswerScore[]>(() => {
    return safeParseAnswersStorageValue(STORAGE_KEY);
  });

  const [isCompleted, setIsCompleted] = useState(false);

  const debouncedAnswers = useDebouncedValue(answers, 200);

  // Save answers to localStorage (debounced to reduce write churn)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const success = safeSetStorage(STORAGE_KEY, debouncedAnswers);
    if (!success) {
      logError(
        createError(ErrorType.LOCAL_STORAGE, 'Failed to persist nyongmatch answers', { key: STORAGE_KEY })
      );
    }
  }, [debouncedAnswers]);

  // Save current question to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const success = safeSetStorage(QUESTION_KEY, currentQuestion.toString());
    if (!success) {
      logError(
        createError(ErrorType.LOCAL_STORAGE, 'Failed to persist current question', { key: QUESTION_KEY })
      );
    }
  }, [currentQuestion]);

  const setAnswer = useCallback((questionId: string, answerId: string) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingIndex] = { questionId, answerId };
        return newAnswers;
      }
      return [...prev, { questionId, answerId }];
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setCurrentQuestion((prev) => Math.min(prev + 1, 13)); // Max index is 13 for 14 questions
  }, []);

  const previousQuestion = useCallback(() => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  }, []);

  const resetTest = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
    // Clear localStorage
    if (typeof window === 'undefined') {
      return;
    }

    const resultStored = safeRemoveStorage(STORAGE_KEY);
    const resultQuestion = safeRemoveStorage(QUESTION_KEY);

    if (!resultStored || !resultQuestion) {
      logError(
        createError(ErrorType.LOCAL_STORAGE, 'Failed to clear nyongmatch test storage', {
          answersCleared: resultStored,
          questionCleared: resultQuestion,
        })
      );
    }
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setCurrentQuestion(index);
  }, []);

  const value = useMemo(
    () => ({
      currentQuestion,
      answers,
      setAnswer,
      nextQuestion,
      previousQuestion,
      resetTest,
      goToQuestion,
      isCompleted,
      setIsCompleted,
    }),
    [
      currentQuestion,
      answers,
      setAnswer,
      nextQuestion,
      previousQuestion,
      resetTest,
      goToQuestion,
      isCompleted,
    ]
  );

  return (
    <NyongmatchContext.Provider value={value}>
      {children}
    </NyongmatchContext.Provider>
  );
}

export function useTest() {
  const context = useContext(NyongmatchContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a NyongmatchProvider');
  }
  return context;
}

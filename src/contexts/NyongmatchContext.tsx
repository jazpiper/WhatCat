'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { AnswerScore } from '@/types';

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

export function NyongmatchProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(QUESTION_KEY);
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [answers, setAnswers] = useState<AnswerScore[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  // Save current question to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(QUESTION_KEY, currentQuestion.toString());
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(QUESTION_KEY);
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

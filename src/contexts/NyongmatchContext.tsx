'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnswerScore } from '@/types';

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerScore[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const setAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingIndex] = { questionId, answerId };
        return newAnswers;
      }
      return [...prev, { questionId, answerId }];
    });
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, 13)); // Max index is 13 for 14 questions
  };

  const previousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1));
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  return (
    <NyongmatchContext.Provider
      value={{
        currentQuestion,
        answers,
        setAnswer,
        nextQuestion,
        previousQuestion,
        resetTest,
        goToQuestion,
        isCompleted,
        setIsCompleted,
      }}
    >
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

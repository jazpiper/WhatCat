'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnswerScore, Question } from '@/types';

interface TestContextType {
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

const TestContext = createContext<TestContextType | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
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
    setCurrentQuestion((prev) => prev + 1);
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
    <TestContext.Provider
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
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}

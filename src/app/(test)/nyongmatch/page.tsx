'use client';

import { useCallback } from 'react';
import AnswerOptionButton from '@/components/Test/AnswerOptionButton';
import { useTest } from '@/contexts/NyongmatchContext';
import { questions } from '@/data/questions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdSense from '@/components/AdSense';
import ProgressIndicator from '@/components/ProgressIndicator';
import { getRandomCatTip } from '@/data/catTips';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useQuestionViewed, useQuestionAnswered } from '@/hooks/useAnalytics';

export default function TestPage() {
  const { currentQuestion, answers, setAnswer, nextQuestion, previousQuestion } = useTest();
  const { trackAnswer } = useQuestionAnswered();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  // Track when user views a question
  useQuestionViewed(currentQuestion);

  const question = questions[currentQuestion];

  // 선택된 답변 찾기 (단순화)
  const selectedAnswer = question
    ? answers.find((a) => a.questionId === question.id)?.answerId ?? null
    : null;

  // 냥이 힌트 (질문마다 무작위)
  const catTip = getRandomCatTip();

  const handleAnswer = useCallback((answerId: string) => {
    if (!question) return;
    setAnswer(question.id, answerId);
    trackAnswer(currentQuestion, answerId); // Track answer
    setTimeout(() => {
      nextQuestion();
    }, 300);
  }, [question, setAnswer, trackAnswer, currentQuestion, nextQuestion]);

  const handleNext = () => {
    if (selectedAnswer) {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswer = question ? answers.some((a) => a.questionId === question.id) : false;

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 dark:from-[var(--bg-surface)] dark:via-purple-950 dark:to-[var(--bg-surface)] transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="text-pink-500 dark:text-pink-400 hover:underline">
            ← 처음으로
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <div className="bg-white dark:bg-[var(--bg-surface)] rounded-3xl shadow-xl p-8">
            {/* Progress Indicator */}
            <div className="mb-8">
              <ProgressIndicator
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                questions={questions}
              />
            </div>

            {/* 냥이 힌트 */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-4 mb-6 text-center">
              <div className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                💡 <span className="font-semibold">냥이 팁!</span> {catTip}
              </div>
            </div>

            {/* 질문 전환 애니메이션 */}
            <div className="relative overflow-hidden min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  transition={prefersReducedMotion ? { duration: 0.1 } : { duration: 0.3 }}
                  className="w-full"
                >
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-6">🤔</div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-4">
                      {question.question}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {question.options.map((option) => (
                      <AnswerOptionButton
                        key={option.id}
                        id={option.id}
                        text={option.text}
                        selected={selectedAnswer === option.id}
                        onSelect={handleAnswer}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between mt-8">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 rounded-full border-2 border-[var(--border-default)] dark:border-[var(--border-default)] text-[var(--text-secondary)] dark:text-[var(--text-secondary)] hover:bg-[var(--bg-page)] dark:hover:bg-[var(--bg-surface)] transition-colors"
                >
                  이전
                </button>
              )}
              <div className="flex-1" />
              {hasAnswer && (
                <button
                  onClick={isLastQuestion ? () => router.push('/result') : handleNext}
                  className={`px-6 py-3 rounded-full font-semibold transition-colors ${isLastQuestion
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                    }`}
                >
                  {isLastQuestion ? '결과 보기' : '다음'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <AdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "5187796077"} />
        </div>
      </div>
    </main>
  );
}

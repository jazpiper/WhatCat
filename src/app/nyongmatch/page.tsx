'use client';

import { useMemo } from 'react';
import { useTest } from '@/contexts/NyongmatchContext';
import { questions } from '@/data/questions';
import Link from 'next/link';
import AdSense from '@/components/AdSense';

export default function TestPage() {
  const { currentQuestion, answers, setAnswer, nextQuestion, previousQuestion } = useTest();

  const question = questions[currentQuestion];

  // 진행률 계산 (useMemo로 캐싱)
  const progress = useMemo(
    () => Math.min(((currentQuestion + 1) / questions.length) * 100, 100),
    [currentQuestion]
  );

  // 선택된 답변 찾기 (단순화)
  const selectedAnswer = question
    ? answers.find((a) => a.questionId === question.id)?.answerId ?? null
    : null;

  const handleAnswer = (answerId: string) => {
    setAnswer(question.id, answerId);
    setTimeout(() => {
      nextQuestion();
    }, 300);
  };

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
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="text-pink-500 hover:underline">
            ← 처음으로
          </Link>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-semibold text-pink-500">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-pink-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="text-6xl mb-6">🤔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {question.question}
            </h2>
          </div>

          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full text-center p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg active:scale-98 min-h-[56px] md:min-h-auto ${
                  selectedAnswer === option.id
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/50'
                }`}
              >
                <div className="flex items-center justify-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAnswer === option.id
                        ? 'border-pink-500 bg-pink-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswer === option.id && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-800 font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            {currentQuestion > 0 && (
              <button
                onClick={handlePrevious}
                className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                이전
              </button>
            )}
            <div className="flex-1" />
            {hasAnswer && (
              <Link
                href={isLastQuestion ? '/result' : '#'}
                onClick={isLastQuestion ? undefined : handleNext}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  isLastQuestion
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                {isLastQuestion ? '결과 보기' : '다음'}
              </Link>
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

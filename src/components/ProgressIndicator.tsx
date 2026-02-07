'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  questions: Question[];
}

// 카테고리별 아이콘 매핑
const CATEGORY_ICONS: Record<string, string> = {
  lifestyle: '🏠',
  personality: '🧠',
  maintenance: '🧹',
  appearance: '✨',
  cost: '💰',
};

// 카테고리별 한국어 라벨
const CATEGORY_LABELS: Record<string, string> = {
  lifestyle: '라이프스타일',
  personality: '성격',
  maintenance: '관리',
  appearance: '외모',
  cost: '비용',
};

// 질문별 평균 소요 시간 (초 단위)
const AVG_TIME_PER_QUESTION = 6; // 평균 6초

export default function ProgressIndicator({
  currentQuestion,
  totalQuestions,
  questions,
}: ProgressIndicatorProps) {
  // 남은 시간 계산
  const remainingTime = useMemo(() => {
    const remainingQuestions = totalQuestions - currentQuestion;
    const totalSeconds = remainingQuestions * AVG_TIME_PER_QUESTION;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `약 ${minutes}분 ${seconds > 0 ? `${seconds}초 ` : ''}남음`;
    }
    return `약 ${seconds}초 남음`;
  }, [currentQuestion, totalQuestions]);

  // 진행률 퍼센트
  const progressPercent = useMemo(
    () => Math.round(((currentQuestion + 1) / totalQuestions) * 100),
    [currentQuestion, totalQuestions]
  );

  return (
    <div className="w-full" role="region" aria-label="테스트 진행률">
      {/* 상단 정보 바 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            질문 {currentQuestion + 1} / {totalQuestions}
          </span>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white" aria-live="polite" aria-atomic="true">
            {progressPercent}%
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {remainingTime}
        </span>
      </div>

      {/* 진행 바 */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6 overflow-hidden" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label="전체 진행률">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* 질문 도트 인디케이터 */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap" role="list" aria-label="질문 목록">
        {questions.map((question, index) => {
          const status =
            index < currentQuestion
              ? 'completed'
              : index === currentQuestion
                ? 'current'
                : 'remaining';

          return (
            <QuestionDot
              key={question.id}
              status={status}
              icon={CATEGORY_ICONS[question.category] || '❓'}
              label={CATEGORY_LABELS[question.category] || question.category}
              questionNumber={index + 1}
            />
          );
        })}
      </div>

      {/* 범례 */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600" />
          <span>완료</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border-2 border-pink-500 bg-white dark:bg-gray-800" />
          <span>현재</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600" />
          <span>남음</span>
        </div>
      </div>
    </div>
  );
}

interface QuestionDotProps {
  status: 'completed' | 'current' | 'remaining';
  icon: string;
  label: string;
  questionNumber: number;
}

function QuestionDot({ status, icon, label, questionNumber }: QuestionDotProps) {
  const baseClasses = 'relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base transition-all duration-300';

  const statusClasses = {
    completed:
      'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md',
    current:
      'bg-white dark:bg-gray-800 border-2 border-pink-500 text-pink-500 shadow-lg',
    remaining:
      'bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500',
  };

  const statusLabels = {
    completed: '완료됨',
    current: '현재 질문',
    remaining: '남음',
  };

  return (
    <div className="group relative" role="listitem" aria-label={`${label} - 질문 ${questionNumber}, ${statusLabels[status]}`}>
      <motion.div
        className={`${baseClasses} ${statusClasses[status]}`}
        initial={false}
        animate={{
          scale: status === 'current' ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: status === 'current' ? Infinity : 0,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      >
        {status === 'completed' ? <span aria-hidden="true">✓</span> : <span aria-hidden="true">{icon}</span>}
      </motion.div>

      {/* 툴팁 (Desktop hover) */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block z-10" role="tooltip">
        <div className="font-medium">{label}</div>
        <div className="text-gray-300">질문 {questionNumber}</div>
        {/* 화살표 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" aria-hidden="true" />
      </div>

      {/* 현재 질문 표시 애니메이션 */}
      {status === 'current' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

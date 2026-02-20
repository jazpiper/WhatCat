'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useDailyQuiz } from '@/hooks/useDailyQuiz';
import { getTodaysQuiz, STREAK_MILESTONES, getNextMilestone } from '@/data/dailyQuizzes';
import {
  logDailyQuizViewed,
  logDailyQuizAnswered,
  logStreakMilestone,
  logEvent,
} from '@/lib/google-analytics';
import {
  CheckCircle,
  XCircle,
  Trophy,
  Share2,
  Flame,
  Clock,
} from 'lucide-react';
import { QuizErrorAlert, QuizErrorMessage } from '@/components/QuizErrorMessage';
import DailyQuizSkeleton from '@/components/Skeleton/DailyQuizSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PageContainer, Card, PageTitle, Section } from '@/components/ui';

const MILESTONES = [3, 7, 14, 30];

export default function DailyQuizPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<DailyQuizSkeleton />}>
        <DailyQuizPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}

function DailyQuizPageContent() {
  const {
    state,
    isLoaded,
    isCompletedToday,
    completeQuiz,
    getTimeUntilNextQuiz,
    error,
    clearError,
  } = useDailyQuiz();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sharedStreak, setSharedStreak] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  // Safely get today's quiz with error handling
  const quiz = useMemo(() => {
    try {
      return getTodaysQuiz();
    } catch (err) {
      console.error('[DailyQuiz] Failed to load quiz data:', err);
      // Log error to analytics
      logEvent({
        name: 'daily_quiz_data_error',
        params: {
          error_message: err instanceof Error ? err.message : String(err),
        },
      });
      return null;
    }
  }, []);

  const timeUntilNext = getTimeUntilNextQuiz();
  const nextMilestone = getNextMilestone(state.streak);

  // Track page view
  useEffect(() => {
    if (isLoaded && !error) {
      try {
        logDailyQuizViewed({
          current_streak: state.streak,
          total_completed: state.totalCompleted,
          is_completed_today: isCompletedToday,
        });
      } catch (err) {
        console.error('[DailyQuiz] Analytics tracking failed:', err);
      }
    }
  }, [isLoaded, state.streak, state.totalCompleted, isCompletedToday, error]);

  const handleAnswer = (index: number) => {
    if (showResult || !quiz) return;

    try {
      setSelectedAnswer(index);
      const correct = index === quiz.correctIndex;
      setIsCorrect(correct);
      setShowResult(true);

      // Track answer
      try {
        logDailyQuizAnswered({
          question_id: quiz.id,
          is_correct: correct,
          current_streak: state.streak,
        });
      } catch (err) {
        console.error('[DailyQuiz] Answer tracking failed:', err);
      }

      // If correct and not completed today, mark as complete
      if (correct && !isCompletedToday) {
        const result = completeQuiz();

        // Check if milestone reached
        const milestone = MILESTONES.find((m) => m === result.streak);
        if (milestone) {
          try {
            logStreakMilestone({
              milestone,
              total_completed: state.totalCompleted + 1,
            });
          } catch (err) {
            console.error('[DailyQuiz] Milestone tracking failed:', err);
          }
        }
      }
    } catch (err) {
      console.error('[DailyQuiz] Error handling answer:', err);
      // Show inline error but don't block the UI
      setShareError('답변 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      setTimeout(() => setShareError(null), 3000);
    }
  };

  const handleShareStreak = async () => {
    setShareError(null);
    const shareText = `🐱 냥이 퀴즈 ${state.streak}일 연속 정답! 🔥\n나도 고양이 퀴즈 도전하기:`;
    const shareUrl = 'https://what-cat-psi.vercel.app/daily-quiz';

    try {
      // Check if navigator.share is available
      if (typeof navigator !== 'undefined' && 'share' in navigator) {
        try {
          await navigator.share({
            title: '냥이 데일리 퀴즈',
            text: shareText,
            url: shareUrl,
          });
          setSharedStreak(true);
          setTimeout(() => setSharedStreak(false), 2000);
          return;
        } catch (err) {
          // Share was canceled, not an error
          if ((err as Error).name !== 'AbortError') {
            throw err;
          }
        }
      }

      // Fallback: copy to clipboard
      if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setSharedStreak(true);
        setTimeout(() => setSharedStreak(false), 2000);
      } else {
        throw new Error('공유 기능을 사용할 수 없습니다.');
      }

      // Log share success to analytics
      logEvent({
        name: 'daily_quiz_shared',
        params: {
          method: 'clipboard',
          streak: state.streak,
        },
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error('[DailyQuiz] Share failed:', error);

      // Show error message
      setShareError('공유에 실패했습니다. 다시 시도해주세요.');
      setTimeout(() => setShareError(null), 3000);

      // Log share error to analytics
      logEvent({
        name: 'daily_quiz_share_error',
        params: {
          error_message: error.message,
          streak: state.streak,
        },
      });
    }
  };

  // Handle critical errors (no quiz data or localStorage unavailable)
  if (error) {
    return (
      <QuizErrorMessage
        errorType={error.type}
        message={error.message}
        onRetry={clearError}
      />
    );
  }

  // Handle missing quiz data
  if (!quiz) {
    return (
      <QuizErrorMessage
        errorType="quizData"
        message="퀴즈 데이터를 불러오지 못했습니다."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (!isLoaded) {
    return (
      <PageContainer className="flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </PageContainer>
    );
  }

  return (
    <PageContainer contentClassName="max-w-2xl">
      {/* Inline Error Alert */}
      {shareError && (
        <QuizErrorAlert
          message={shareError}
          onDismiss={() => setShareError(null)}
        />
      )}

      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-pink-500 hover:underline flex items-center gap-2 font-medium mb-4 inline-block"
        >
          <span>←</span>
          <span>홈으로</span>
        </Link>
        <PageTitle emoji="🎯" subtitle="매일 새로운 고양이 퀴즈를 풀고 연속 기록을 달성하세요!">
          데일리 고양이 퀴즈
        </PageTitle>
      </div>

      {/* Streak Counter */}
      <Card className="mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={24} />
              <span className="text-sm opacity-90">연속 정답</span>
            </div>
            <div className="text-4xl font-bold">{state.streak}일</div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1 justify-end">
              <Trophy size={20} />
              <span className="text-sm opacity-90">총 완료</span>
            </div>
            <div className="text-2xl font-bold">{state.totalCompleted}회</div>
          </div>
        </div>

        {/* Progress to next milestone */}
        {nextMilestone && state.streak < 30 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>다음 목표</span>
              <span className="font-bold">{nextMilestone.days}일</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{
                  width: `${Math.min((state.streak / nextMilestone.days) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Share button */}
        {state.streak > 0 && (
          <button
            onClick={handleShareStreak}
            className="mt-4 w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Share2 size={18} />
            {sharedStreak ? '공유 완료!' : '기록 공유하기'}
          </button>
        )}
      </Card>

      {/* Already Completed Message */}
      {isCompletedToday && showResult && isCorrect ? (
        <Card className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">오늘의 퀴즈 완료!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">내일 다시 도전해주세요</p>

          {/* Countdown */}
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-purple-700 dark:text-purple-300">
              <Clock size={20} />
              <span className="font-medium">
                다음 퀴즈까지 {timeUntilNext.hours}시간 {timeUntilNext.minutes}분
              </span>
            </div>
          </div>

          {/* Milestone badges */}
          {state.streak > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {STREAK_MILESTONES.map((milestone) => {
                const achieved = state.streak >= milestone.days;
                return (
                  <div
                    key={milestone.days}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      achieved
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {milestone.emoji} {milestone.days}일
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      ) : (
        /* Quiz Card */
        <Card>
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium mb-4">
            {quiz.category === 'behavior' && '🐱 행동'}
            {quiz.category === 'health' && '🏥 건강'}
            {quiz.category === 'care' && '💝 케어'}
            {quiz.category === 'fun' && '✨ 재미있는 사실'}
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">{quiz.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {quiz.options.map((option, index) => {
              let buttonClass = 'w-full text-left p-4 rounded-xl border-2 transition-all ';

              if (!showResult) {
                buttonClass += 'border-gray-200 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 cursor-pointer';
              } else if (index === quiz.correctIndex) {
                buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/30';
              } else if (index === selectedAnswer && !isCorrect) {
                buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/30';
              } else {
                buttonClass += 'border-gray-200 dark:border-gray-600 opacity-60';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        showResult && index === quiz.correctIndex
                          ? 'bg-green-500 text-white'
                          : showResult && index === selectedAnswer && !isCorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {showResult && index === quiz.correctIndex ? (
                        <CheckCircle size={18} />
                      ) : showResult && index === selectedAnswer && !isCorrect ? (
                        <XCircle size={18} />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-100">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Result & Explanation */}
          {showResult && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="text-green-500" />
                    <span className="font-bold text-green-700 dark:text-green-300">정답입니다!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500" />
                    <span className="font-bold text-red-700 dark:text-red-300">틀렸습니다!</span>
                  </>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{quiz.explanation}</p>

              {!isCorrect && !isCompletedToday && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  내일 다시 도전해주세요! 연속 기록은 초기화되지 않아요.
                </p>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Milestones Info */}
      <Section title="연속 도전 업적" emoji="🏆" className="mt-8 bg-white/50 dark:bg-gray-800/50">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STREAK_MILESTONES.map((milestone) => {
            const achieved = state.streak >= milestone.days;
            return (
              <div
                key={milestone.days}
                className={`text-center p-3 rounded-xl ${
                  achieved
                    ? 'bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/50 dark:to-purple-900/50 border-2 border-pink-300 dark:border-pink-600'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{milestone.emoji}</div>
                <div className="text-sm font-bold text-gray-800 dark:text-gray-100">{milestone.days}일</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{milestone.title}</div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Footer */}
      <div className="text-center text-gray-400 dark:text-gray-500 text-xs mt-8">
        <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
      </div>
    </PageContainer>
  );
}

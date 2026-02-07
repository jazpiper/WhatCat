'use client';

/**
 * Error Boundary for Daily Quiz Page
 * Catches and handles errors that occur during rendering or in child components
 */

import { useEffect } from 'react';
import { QuizErrorMessage, type QuizErrorMessageProps } from '@/components/QuizErrorMessage';

export default function DailyQuizError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('[DailyQuiz] Error boundary caught:', error);

    // Log to analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      try {
        (window as any).gtag('event', 'daily_quiz_error', {
          error_message: error.message,
          error_name: error.name,
          error_digest: error.digest,
        });
      } catch {
        // Analytics logging failed
      }
    }

    // Note: Sentry integration can be added later if needed
    // For now, we log to console and analytics
  }, [error]);

  // Determine error type based on error message
  const getErrorType = (): QuizErrorMessageProps['errorType'] => {
    const message = error.message.toLowerCase();

    if (message.includes('storage') || message.includes('localstorage') || message.includes('quota')) {
      return 'localStorage';
    }
    if (message.includes('quiz') || message.includes('data') || message.includes('question')) {
      return 'quizData';
    }
    if (message.includes('streak') || message.includes('date') || message.includes('calculate')) {
      return 'streakCalc';
    }
    if (message.includes('share') || message.includes('clipboard') || message.includes('navigator')) {
      return 'share';
    }
    return 'unknown';
  };

  return (
    <QuizErrorMessage
      errorType={getErrorType()}
      message={error.message}
      onRetry={reset}
      showHomeButton={true}
    />
  );
}

/**
 * A loading fallback that's shown while the error boundary is recovering
 */
export function DailyQuizErrorFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600">복구 중입니다...</p>
      </div>
    </div>
  );
}

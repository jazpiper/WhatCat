'use client';

import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export interface QuizErrorMessageProps {
  /**
   * The type of error that occurred
   */
  errorType: 'localStorage' | 'quizData' | 'streakCalc' | 'share' | 'unknown';
  /**
   * Custom error message (optional, will use default based on errorType)
   */
  message?: string;
  /**
   * Callback for retry action
   */
  onRetry?: () => void;
  /**
   * Whether to show the home button
   */
  showHomeButton?: boolean;
}

const errorConfig = {
  localStorage: {
    title: '데이터 저장 오류',
    description: '퀴즈 진행 상황을 저장할 수 없습니다. 브라우저의 localStorage가 비활성화되어 있거나 용량이 부족할 수 있습니다.',
    icon: '🔒',
  },
  quizData: {
    title: '퀴즈 데이터 오류',
    description: '퀴즈 정보를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
    icon: '📝',
  },
  streakCalc: {
    title: '연속 기록 계산 오류',
    description: '연속 기록을 계산하는 중 문제가 발생했습니다. 기록이 초기화될 수 있습니다.',
    icon: '🔥',
  },
  share: {
    title: '공유 오류',
    description: '기록을 공유하는 중 문제가 발생했습니다. 다시 시도해주세요.',
    icon: '📤',
  },
  unknown: {
    title: '알 수 없는 오류',
    description: '예기치 않은 문제가 발생했습니다. 다시 시도해주세요.',
    icon: '⚠️',
  },
};

export function QuizErrorMessage({
  errorType,
  message,
  onRetry,
  showHomeButton = true,
}: QuizErrorMessageProps) {
  const config = errorConfig[errorType];
  const displayMessage = message || config.description;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-[var(--border-default)]">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Emoji Icon */}
        <div className="text-5xl text-center mb-4">{config.icon}</div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-4">
          {config.title}
        </h2>

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-center mb-6">{displayMessage}</p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <RefreshCw size={20} />
              다시 시도하기
            </button>
          )}

          {showHomeButton && (
            <Link
              href="/"
              className="w-full bg-[var(--bg-page)] text-[var(--text-primary)] py-3 px-6 rounded-xl font-medium hover:bg-[var(--bg-page)] transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              홈으로 가기
            </Link>
          )}
        </div>

        {/* Additional Info for localStorage errors */}
        {errorType === 'localStorage' && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>해결 방법:</strong>
              <br />
              1. 브라우저 설정에서 쿠키와 사이트 데이터를 허용하세요
              <br />
              2. 다른 탭이나 앱을 닫아 저장 공간을 확보하세요
              <br />
              3. 시크릿 모드가 아닌 일반 모드를 이용하세요
            </p>
          </div>
        )}

        {/* Tech Support Link */}
        <div className="mt-6 text-center">
          <Link
            href="/contact"
            className="text-sm text-purple-600 hover:text-purple-700 underline"
          >
            문제가 지속되나요? 문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Inline error alert component (for smaller errors within the quiz UI)
 */
export interface QuizErrorAlertProps {
  message: string;
  onDismiss?: () => void;
}

export function QuizErrorAlert({ message, onDismiss }: QuizErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 transition-colors"
            aria-label="닫기"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

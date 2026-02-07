'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Clock, FileQuestion, Target, Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { logPreviewModalShown, logPreviewModalDismissed, logTestStartedAfterPreview } from '@/lib/google-analytics';

interface TestPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const SAMPLE_QUESTIONS = [
  {
    category: '라이프스타일',
    question: '하루 중 가장 좋아하는 시간은?',
    options: ['아침에 활기차게 시작', '오후의 여유로운 시간', '밤에 조용히 집중'],
  },
  {
    category: '성격',
    question: '새로운 사람을 만났을 때 어떤 편이세요?',
    options: ['먼저 말을 건넨다', '상대가 말을 걸 때까지 기다린다'],
  },
];

export function TestPreviewModal({ isOpen, onClose, onStart }: TestPreviewModalProps) {
  const router = useRouter();
  const [hasSeenBefore, setHasSeenBefore] = useState(false);
  const [modalOpenTime, setModalOpenTime] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Focus trap implementation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose('close');
      return;
    }

    if (e.key !== 'Tab') return;

    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }, []);

  useEffect(() => {
    // Check if user has seen the preview before
    const seen = localStorage.getItem('hasSeenTestPreview');
    setHasSeenBefore(!!seen);

    if (isOpen) {
      setModalOpenTime(Date.now());
      // Track preview modal shown
      logPreviewModalShown({ seen_before: !!seen });

      // Store the previously focused element
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // Focus the close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);

      // Add event listener for focus trap
      document.addEventListener('keydown', handleKeyDown);
    } else {
      // Remove event listener when modal closes
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus to previously focused element
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleClose = (action: 'later' | 'start' | 'close') => {
    // Track dismissal action
    logPreviewModalDismissed({ action });

    if (action === 'start') {
      // Mark as seen
      localStorage.setItem('hasSeenTestPreview', 'true');
      // Track test started
      const timeToStart = Date.now() - modalOpenTime;
      logTestStartedAfterPreview({ time_to_start: timeToStart });
      onStart();
    } else if (action === 'later') {
      // Mark as seen so we don't show again
      localStorage.setItem('hasSeenTestPreview', 'true');
    }

    onClose();
  };

  const handleStart = () => {
    handleClose('start');
  };

  const handleLater = () => {
    handleClose('later');
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose('close');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-600 dark:to-purple-700 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-2xl font-bold flex items-center gap-2">
              <Sparkles size={24} aria-hidden="true" />
              냥이 매칭 테스트 안내
            </h2>
            <button
              ref={closeButtonRef}
              onClick={() => handleClose('close')}
              className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="모달 닫기"
            >
              <X size={24} />
            </button>
          </div>
          <p id="modal-description" className="text-pink-100 dark:text-pink-200">
            테스트를 시작하기 전에 간단히 안내를 드릴게요!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center border border-blue-100 dark:border-blue-700">
              <Clock className="text-blue-500 dark:text-blue-400 mx-auto mb-2" size={24} />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                소요 시간
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">약 2분</p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center border border-purple-100 dark:border-purple-700">
              <FileQuestion className="text-purple-500 dark:text-purple-400 mx-auto mb-2" size={24} />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                질문 수
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">14개</p>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/30 rounded-xl p-4 text-center border border-pink-100 dark:border-pink-700">
              <Target className="text-pink-500 dark:text-pink-400 mx-auto mb-2" size={24} />
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                카테고리
              </p>
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">5가지</p>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              📋 분석 카테고리
            </p>
            <div className="flex flex-wrap gap-2">
              {['라이프스타일', '성격', '관리', '외형', '비용'].map((cat) => (
                <span
                  key={cat}
                  className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Questions */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              미리보기 질문
            </p>
            <div className="space-y-3">
              {SAMPLE_QUESTIONS.map((q, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-700 text-amber-700 dark:text-amber-200 rounded-full">
                      {q.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Q. {q.question}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {q.options.map((opt, optIndex) => (
                      <span
                        key={optIndex}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              🎯 <span className="font-semibold text-blue-600 dark:text-blue-400">정확한 분석</span>을 위해
              각 질문에 신중하게 답변해 주세요. 결과는 20종의 인기 품종 데이터를 바탕으로
              계산되며, 다양한 요소를 종합적으로 고려하여 최적의 매칭을 찾아드립니다!
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <button
            ref={startButtonRef}
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
          >
            테스트 시작
            <ArrowRight size={20} aria-hidden="true" />
          </button>
          <button
            onClick={handleLater}
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            다음에 하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPreviewModal;

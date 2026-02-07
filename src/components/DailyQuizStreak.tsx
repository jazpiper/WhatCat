/**
 * Daily Quiz Streak Display Component
 * Shows the user's current quiz streak on the home page
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDailyQuiz } from '@/hooks/useDailyQuiz';
import { Flame, Calendar } from 'lucide-react';

export function DailyQuizStreak() {
  const { state, isLoaded, isCompletedToday, getTimeUntilNextQuiz } = useDailyQuiz();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    if (!isCompletedToday) {
      const updateTime = () => {
        const time = getTimeUntilNextQuiz();
        setTimeLeft({ hours: time.hours, minutes: time.minutes });
      };

      updateTime();
      const interval = setInterval(updateTime, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [isCompletedToday, getTimeUntilNextQuiz]);

  if (!isLoaded) return null;

  return (
    <Link
      href="/daily-quiz"
      className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
      aria-label={`데일리 고양이 퀴즈 ${state.streak}일 연속${isCompletedToday ? ` 다음 퀴즈까지 ${timeLeft.hours}시간 ${timeLeft.minutes}분` : ' 도전하기'}`}
    >
      <div className="flex items-center justify-between text-white">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Flame size={20} aria-hidden="true" />
            <span className="text-sm opacity-90">데일리 고양이 퀴즈</span>
          </div>
          <div className="text-2xl font-bold" aria-live="polite">{state.streak}일 연속!</div>
        </div>

        {isCompletedToday ? (
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm opacity-90 mb-1">
              <Calendar size={16} aria-hidden="true" />
              <span>다음 퀴즈까지</span>
            </div>
            <div className="text-lg font-semibold">
              {timeLeft.hours}시간 {timeLeft.minutes}분
            </div>
          </div>
        ) : (
          <div className="text-right">
            <div className="text-sm opacity-90 mb-1">오늘의 퀴즈</div>
            <div className="text-lg font-semibold">도전하기 →</div>
          </div>
        )}
      </div>
    </Link>
  );
}

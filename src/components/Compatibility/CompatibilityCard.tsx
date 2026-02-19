'use client';

import { CompatibilityResult } from '@/utils/compatibility';
import MBTIBadge from '@/components/Result/MBTIBadge';

interface CompatibilityCardProps {
  result: CompatibilityResult;
  breed1Emoji?: string;
  breed2Emoji?: string;
  breed1Name?: string;
  breed2Name?: string;
  className?: string;
}

export default function CompatibilityCard({
  result,
  breed1Emoji,
  breed2Emoji,
  breed1Name,
  breed2Name,
  className = '',
}: CompatibilityCardProps) {
  const { score, grade, emoji, message, mbti1, mbti2 } = result;

  // 점수에 따른 색상
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-pink-600';
    if (score >= 80) return 'text-rose-500';
    if (score >= 70) return 'text-orange-500';
    if (score >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  // 프로그레스 바 색상
  const getProgressGradient = (score: number) => {
    if (score >= 90) return 'from-pink-500 to-rose-500';
    if (score >= 80) return 'from-rose-400 to-pink-500';
    if (score >= 70) return 'from-orange-400 to-rose-400';
    if (score >= 60) return 'from-yellow-400 to-orange-400';
    return 'from-gray-400 to-gray-500';
  };

  // 배경 그라디언트
  const getBackgroundGradient = (score: number) => {
    if (score >= 90) return 'from-pink-100 via-rose-50 to-purple-100';
    if (score >= 80) return 'from-rose-50 via-pink-50 to-purple-50';
    if (score >= 70) return 'from-orange-50 via-yellow-50 to-pink-50';
    if (score >= 60) return 'from-yellow-50 via-orange-50 to-gray-50';
    return 'from-gray-50 via-slate-50 to-gray-100';
  };

  return (
    <div
      className={`bg-gradient-to-br ${getBackgroundGradient(
        score
      )} rounded-3xl shadow-xl p-6 md:p-8 ${className}`}
    >
      {/* 헤더 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {emoji} MBTI 궁합 결과
        </h2>
        <p className="text-gray-600">두 냥이의 궁합을 분석했어요!</p>
      </div>

      {/* MBTI 비교 섹션 */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
        {/* MBTI 1 */}
        <div className="flex flex-col items-center">
          {breed1Emoji && <span className="text-4xl mb-2">{breed1Emoji}</span>}
          {breed1Name && (
            <p className="text-sm text-gray-600 mb-2">{breed1Name}</p>
          )}
          <MBTIBadge mbti={mbti1} size="lg" showEmoji={true} showNickname={true} />
        </div>

        {/* 하트 애니메이션 */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl md:text-5xl animate-pulse">💕</div>
          <div className="mt-2 text-gray-400 text-2xl">✦</div>
        </div>

        {/* MBTI 2 */}
        <div className="flex flex-col items-center">
          {breed2Emoji && <span className="text-4xl mb-2">{breed2Emoji}</span>}
          {breed2Name && (
            <p className="text-sm text-gray-600 mb-2">{breed2Name}</p>
          )}
          <MBTIBadge mbti={mbti2} size="lg" showEmoji={true} showNickname={true} />
        </div>
      </div>

      {/* 점수 표시 */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-4xl md:text-5xl font-bold ${getScoreColor(score)}">
            {score}
          </span>
          <span className="text-2xl text-gray-500">점</span>
        </div>

        {/* 프로그레스 바 */}
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full bg-gradient-to-r ${getProgressGradient(
              score
            )} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${score}%` }}
          />
        </div>

        {/* 등급 */}
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-lg font-bold shadow-sm">
            {emoji} {grade}
          </span>
        </div>
      </div>

      {/* 메시지 */}
      <div className="text-center">
        <p className="text-gray-700 leading-relaxed">{message}</p>
      </div>

      {/* MBTI 설명 */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-white/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MBTIBadge mbti={mbti1} size="sm" showEmoji={false} showNickname={false} />
            <span className="font-semibold text-gray-800">{mbti1.nickname}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{mbti1.description}</p>
        </div>
        <div className="bg-white/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MBTIBadge mbti={mbti2} size="sm" showEmoji={false} showNickname={false} />
            <span className="font-semibold text-gray-800">{mbti2.nickname}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{mbti2.description}</p>
        </div>
      </div>
    </div>
  );
}

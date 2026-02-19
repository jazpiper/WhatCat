'use client';

import { CatMBTI } from '@/utils/catMBTI';

interface MBTIBadgeProps {
  mbti: CatMBTI;
  size?: 'sm' | 'md' | 'lg';
  showEmoji?: boolean;
  showNickname?: boolean;
  className?: string;
}

export default function MBTIBadge({
  mbti,
  size = 'md',
  showEmoji = true,
  showNickname = true,
  className = '',
}: MBTIBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const codeSizeClasses = {
    sm: 'text-xs font-bold',
    md: 'text-sm font-bold',
    lg: 'text-lg font-bold',
  };

  const emojiSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  // MBTI 타입별 색상
  const getTypeColor = (code: string) => {
    const firstLetter = code[0];
    switch (firstLetter) {
      case 'I':
        return 'from-blue-500 to-indigo-600';
      case 'E':
        return 'from-orange-500 to-pink-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${getTypeColor(
        mbti.code
      )} text-white ${sizeClasses[size]} ${className}`}
    >
      {showEmoji && (
        <span className={emojiSizeClasses[size]}>{mbti.emoji}</span>
      )}
      <span className={codeSizeClasses[size]}>{mbti.code}</span>
      {showNickname && (
        <span className="opacity-90 hidden sm:inline">{mbti.nickname}</span>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { useBreedExplore } from '@/hooks/useAnalytics';
import { trackBreedViewed } from '@/utils/achievements';
import type { Breed } from '@/types';

export default function BreedDetailActions({ breed }: { breed: Breed }) {
  const { trackExplore } = useBreedExplore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!breed) return;
    trackExplore(breed.id);
    trackBreedViewed();
  }, [breed, trackExplore]);

  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://what-cat-psi.vercel.app/breed/${breed.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleNativeShare = async () => {
    if (!('share' in navigator)) {
      await handleCopyLink();
      return;
    }

    try {
      await navigator.share({
        title: `${breed.name} (${breed.nameEn}) | 냥이 매칭`,
        text: `${breed.name} 품종 정보 같이 볼래?`,
        url: shareUrl,
      });
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleNativeShare}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs md:text-sm hover:shadow-sm transition"
        aria-label="공유하기"
      >
        <Share2 size={16} />
        공유
      </button>
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-xs md:text-sm hover:shadow-sm transition"
        aria-label="링크 복사"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? '복사됨' : '링크 복사'}
      </button>
    </div>
  );
}

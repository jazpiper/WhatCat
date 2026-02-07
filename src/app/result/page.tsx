'use client';

import { useTest } from '@/contexts/NyongmatchContext';
import { breeds } from '@/data/breeds';
import { questions } from '@/data/questions';
import { calculateMatch, getRankEmoji } from '@/utils/matching';
import {
  createShareUrl,
  createTwitterShareUrl,
  createThreadsShareUrl,
  createInstagramShareUrl,
  getResultsFromUrl,
  getShareTextByScore,
} from '@/utils/share';
import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Breed, ShareResult } from '@/types';
import {
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdSense from '@/components/AdSense';
import {
  useTestCompleted,
  useResultShared,
  useFriendComparison,
  useResultRetry,
} from '@/hooks/useAnalytics';

import ResultHeader from '@/components/Result/ResultHeader';
import BreedProfile from '@/components/Result/BreedProfile';
import TopRecommended from '@/components/Result/TopRecommended';
import SocialShare from '@/components/Result/SocialShare';
import FriendCompare from '@/components/Result/FriendCompare';

const CONFETTI_CONFIG = {
  particleCount: 150,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#FF69B4', '#9370DB', '#87CEEB', '#FFD700'],
};

const COPY_FEEDBACK_DURATION_MS = 2000;

export default function ResultPage() {
  const { answers, resetTest } = useTest();
  const router = useRouter();
  const { trackComparison } = useFriendComparison();
  const { trackShare } = useResultShared();
  const { trackRetry } = useResultRetry();
  const [copied, setCopied] = useState(false);
  const [friendLink, setFriendLink] = useState('');
  const [urlResults, setUrlResults] = useState<ShareResult[] | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [hasUrlParams, setHasUrlParams] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // URL 파라미터에서 결과 읽어오기
  useEffect(() => {
    setIsLoadingUrl(true);
    const urlData = getResultsFromUrl();
    if (urlData && urlData.length > 0) {
      setHasUrlParams(true);
      setUrlResults(urlData);
    }
    setIsLoadingUrl(false);
  }, []);

  // URL 파라미터 결과를 Breed 데이터로 변환 (useMemo로 캐싱)
  const urlBreedResults = useMemo(
    () =>
      urlResults
        ? urlResults
          .map((result) => {
            const breed = breeds.find((b) => b.id === result.breedId);
            if (!breed) return null;
            return {
              breed,
              score: result.score,
            };
          })
          .filter((r): r is { breed: Breed; score: number } => r !== null)
        : null,
    [urlResults]
  );

  // Context에서 계산한 결과 (useMemo로 캐싱)
  const contextResults = useMemo(
    () =>
      answers.length > 0
        ? calculateMatch(answers, breeds, questions)
        : null,
    [answers]
  );

  // URL 파라미터 결과가 있으면 우선, 없으면 Context 결과 사용
  const displayResults = urlBreedResults || contextResults;
  const top3Results = displayResults ? displayResults.slice(0, 3) : [];
  const firstResult = top3Results[0];

  // 공유 결과 캐싱 (firstResult가 정의된 후에 실행)
  const primaryShareResult = useMemo(
    () => firstResult ? [{ breedId: firstResult.breed.id, score: firstResult.score }] : null,
    [firstResult]
  );

  // 결과가 없으면 첫 페이지로 리다이렉트
  useEffect(() => {
    // URL 파라미터가 있거나 Context 결과가 있으면 리다이렉트하지 않음
    if (!isLoadingUrl && !hasUrlParams && !contextResults) {
      router.push('/');
    }
  }, [isLoadingUrl, hasUrlParams, contextResults, router]);

  // 매칭 점수 애니메이션 상태
  const [animatedScore, setAnimatedScore] = useState(0);
  const [startTime] = useState<number>(Date.now());

  // 매칭 점수 애니메이션 (0%에서 실제 점수로)
  useEffect(() => {
    if (firstResult && animatedScore === 0) {
      const targetScore = firstResult.score;
      const duration = 1500; // 1.5초
      const interval = 20; // 20ms마다 업데이트
      const increment = targetScore / (duration / interval);

      let currentScore = 0;
      const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
          setAnimatedScore(targetScore);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.round(currentScore));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [firstResult, animatedScore]);

  // Track test completion
  useEffect(() => {
    if (firstResult && !isLoadingUrl && !hasUrlParams) {
      const totalTime = Math.floor((Date.now() - startTime) / 1000); // seconds
      useTestCompleted(totalTime, firstResult.breed.id, firstResult.score);
    }
  }, [firstResult, isLoadingUrl, hasUrlParams, startTime]);

  // 결과가 로드되면 confetti 시작
  useEffect(() => {
    if (firstResult) {
      // ✅ confetti 다이나믹 임포트
      import('canvas-confetti').then((module) => {
        module.default(CONFETTI_CONFIG);
      });

      // 이미지 로딩 대기 (2초 후 완료로 처리)
      setTimeout(() => setImageLoaded(true), 2000);
    }
  }, [firstResult]);

  const handleShareKakao = () => {
    if (!firstResult || !primaryShareResult) return;

    const shareUrl = createShareUrl(primaryShareResult);
    const text = `나와 가장 잘 맞는 냥이는 "${firstResult.breed.name}"! 🐾\n매칭 점수: ${firstResult.score}%`;

    const kakao = (window as unknown as { Kakao: { Share: { sendDefault: (config: unknown) => void } } }).Kakao;
    if (typeof window !== 'undefined' && kakao) {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '냥이 매칭',
          description: text,
          imageUrl: `https://what-cat-psi.vercel.app/og-images/${firstResult.breed.id}.jpg`,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '냥이매칭받기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      alert('카카오톡 앱이 필요하거나 아직 초기화되지 않았습니다.');
    }

    // Track share event
    trackShare('kakaotalk', firstResult.breed.id);
  };

  const handleShareTwitter = () => {
    if (!firstResult) return;

    const shareUrl = createTwitterShareUrl(
      { breedId: firstResult.breed.id, score: firstResult.score },
      firstResult.breed.name,
      firstResult.breed.emoji
    );

    window.open(shareUrl, '_blank');

    // Track share event
    trackShare('thread', firstResult.breed.id); // Twitter is now X/Thread
  };

  const handleShareThreads = () => {
    if (!firstResult) return;

    const shareUrl = createThreadsShareUrl(
      { breedId: firstResult.breed.id, score: firstResult.score },
      firstResult.breed.name,
      firstResult.breed.emoji
    );

    window.open(shareUrl, '_blank');

    // Track share event
    trackShare('thread', firstResult.breed.id);
  };

  const handleShareInstagram = () => {
    if (!firstResult) return;

    // 인스타그램은 웹에서 직접 공유할 수 없으므로 이미지 저장으로 유도
    if (!imageLoaded) {
      alert('이미지가 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    alert('인스타그램은 사진을 직접 업로드해야 합니다.\n\n"이미지 저장"을 먼저 눌러 이미지를 저장한 후 인스타그램 앱에서 업로드해주세요! 📸');

    // 바로 이미지 저장으로 연결
    handleDownloadImage();

    // Track share event
    trackShare('instagram', firstResult.breed.id);
  };

  const handleCopyLink = async () => {
    if (!firstResult || !primaryShareResult) return;

    const shareUrl = createShareUrl(primaryShareResult);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
      
      // Track share event
      trackShare('copy', firstResult.breed.id);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCompareWithFriend = () => {
    if (friendLink.trim() && firstResult) {
      try {
        const url = new URL(friendLink.trim());
        const params = new URLSearchParams(url.search);

        const breed2Id = params.get('breed1');
        const score2 = params.get('score1');

        if (breed2Id && score2) {
          // Track comparison event
          trackComparison(firstResult.breed.id, breed2Id);
          
          router.push(`/compare?breed1=${firstResult.breed.id}&score1=${firstResult.score}&breed2=${breed2Id}&score2=${score2}`);
        } else {
          alert('올바른 결과 링크를 입력해주세요.');
        }
      } catch (e) {
        alert('올바른 URL 형식이 아닙니다.');
      }
    } else {
      alert('친구의 결과 링크를 입력해주세요.');
    }
  };

  const handleDownloadImage = async () => {
    if (!firstResult) return;

    if (isDownloading) return;

    try {
      setIsDownloading(true);

      if (!imageLoaded) {
        alert('이미지가 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      if (!resultRef.current) return;

      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(resultRef.current, {
        background: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      } as Record<string, unknown>);

      const link = document.createElement('a');
      const breedName = firstResult.breed.name.replace(/\s+/g, '_');
      link.download = `냥이매치_${breedName}_${firstResult.score}점.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
      alert('이미지 저장에 실패했습니다. 직접 화면을 캡처해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };

  const shareCopy = firstResult
    ? getShareTextByScore(firstResult.score, firstResult.breed.name, firstResult.breed.emoji)
    : '';

  if (!firstResult) {
    if (hasUrlParams || isLoadingUrl) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-xl text-gray-600 mt-4">결과를 불러오는 중...</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" onClick={resetTest} className="text-pink-500 hover:underline flex items-center gap-2 font-medium">
            <ArrowLeft size={20} />
            처음으로
          </Link>
          <button
            onClick={() => {
              trackRetry(false, true); // breed_change: false, new_answers: true
              resetTest();
            }}
            className="text-purple-500 hover:underline flex items-center gap-2 font-medium"
          >
            <RotateCcw size={20} />
            다시 테스트하기
          </button>
        </div>

        <div ref={resultRef} className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <ResultHeader
            breed={firstResult.breed}
            animatedScore={animatedScore}
          />

          <BreedProfile breed={firstResult.breed} />

          <div className="mt-8">
            <TopRecommended results={top3Results} />
          </div>
        </div>

        <SocialShare
          onDownload={handleDownloadImage}
          onShareKakao={handleShareKakao}
          onShareX={handleShareTwitter}
          onShareThreads={handleShareThreads}
          onShareInstagram={handleShareInstagram}
          onCopyLink={handleCopyLink}
          isDownloading={isDownloading}
          copied={copied}
          shareCopy={shareCopy}
        />

        <FriendCompare
          friendLink={friendLink}
          setFriendLink={setFriendLink}
          onCompare={handleCompareWithFriend}
        />

        <AdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "5187796077"} />

        <div className="text-center text-gray-400 text-xs mt-8">
          <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}

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
  type ShareResult,
} from '@/utils/share';
import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Breed, Question } from '@/types';
import {
  Share2,
  Download,
  Copy,
  MessageCircle,
  ArrowLeft,
  RotateCcw,
  Instagram,
  AtSign,
} from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';
import CatImage from '@/components/CatImage';

// ✅ 다이나믹 임포트 (번들 최적화)
const AdSense = dynamic(() => import('@/components/AdSense'), {
  ssr: false,
  loading: () => <div className="w-full h-[100px] my-6 bg-gray-100 animate-pulse" />,
});

// 상수 정의
const COPY_FEEDBACK_DURATION_MS = 2000;
const CONFETTI_CONFIG = {
  particleCount: 150,
  spread: 100,
  origin: { y: 0.6 } as const,
} as const;

export default function ResultPage() {
  const { answers, resetTest } = useTest();
  const router = useRouter();
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
  }, [firstResult]);

  // 결과가 로드되면 confetti와 점수 애니메이션 시작
  useEffect(() => {
    if (firstResult) {
      // ✅ confetti 다이나믹 임포트
      import('canvas-confetti').then((module) => {
        module.default({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 } as const,
        });
      });

      // 점수 애니메이션 시작
      setAnimatedScore(0);

      // 이미지 로딩 대기 (2초 후 완료로 처리)
      setTimeout(() => setImageLoaded(true), 2000);
    }
  }, [firstResult]);

  const handleShareKakao = () => {
    if (!firstResult || !primaryShareResult) return;

    const shareUrl = createShareUrl(primaryShareResult);
    const text = `나와 가장 잘 맞는 냥이는 "${firstResult.breed.name}"! 🐾\n매칭 점수: ${firstResult.score}%`;

    const kakao = (window as unknown as { Kakao?: { Share: { sendDefault: (options: unknown) => void } } }).Kakao;
    if (typeof window !== 'undefined' && kakao) {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '냥이 매칭',
          description: text,
          imageUrl: `${window.location.origin}/og-images/${firstResult.breed.id}.jpg`,
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
      alert('카카오톡 앱이 필요합니다.');
    }
  };

  const handleShareTwitter = () => {
    if (!firstResult) return;

    const shareUrl = createTwitterShareUrl(
      { breedId: firstResult.breed.id, score: firstResult.score },
      firstResult.breed.name,
      firstResult.breed.emoji
    );

    window.open(shareUrl, '_blank');
  };

  const handleShareThreads = () => {
    if (!firstResult) return;

    const shareUrl = createThreadsShareUrl(
      { breedId: firstResult.breed.id, score: firstResult.score },
      firstResult.breed.name,
      firstResult.breed.emoji
    );

    window.open(shareUrl, '_blank');
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
  };

  const handleCopyLink = async () => {
    if (!firstResult || !primaryShareResult) return;

    const shareUrl = createShareUrl(primaryShareResult);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCompareWithFriend = () => {
    if (friendLink.trim() && firstResult) {
      const url = new URL(friendLink.trim());
      const params = new URLSearchParams(url.search);

      const breed2Id = params.get('breed1');
      const score2 = params.get('score1');

      if (breed2Id && score2) {
        const compareUrl = `/compare?breed1=${firstResult.breed.id}&score1=${firstResult.score}&breed2=${breed2Id}&score2=${score2}`;
        window.location.href = compareUrl;
      } else {
        alert('올바른 결과 링크를 입력해주세요.');
      }
    }
  };

  const handleDownloadImage = async () => {
    if (!firstResult) {
      alert('결과가 없습니다.');
      return;
    }

    if (isDownloading) {
      return;
    }

    try {
      setIsDownloading(true);

      // 이미지가 로딩되지 않은 경우 대기
      if (!imageLoaded) {
        alert('이미지가 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.');
        setIsDownloading(false);
        return;
      }

      if (!resultRef.current) {
        alert('결과 영역을 찾을 수 없습니다.');
        setIsDownloading(false);
        return;
      }

      // html2canvas 다이나믹 임포트
      const html2canvas = (await import('html2canvas')).default;

      // 캡처 옵션
      const canvas = await html2canvas(resultRef.current, {
        background: '#faf5ff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      } as any); // eslint-disable-line @typescript-eslint/no-explicit-any

      // 다운로드
      const link = document.createElement('a');
      const breedName = firstResult.breed.name.replace(/\s+/g, '_');
      link.download = `냥이매치_${breedName}_${firstResult.score}점.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
      alert('이미지 저장에 실패했습니다.\n\n브라우저에서 직접 캡처하거나 잠시 후 다시 시도해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getMaintenanceStars = (level: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < level ? '⭐' : '☆');
    }
    return stars.join('');
  };

  const getShareCopy = () => {
    if (!firstResult) return '';

    return getShareTextByScore(firstResult.score, firstResult.breed.name, firstResult.breed.emoji);
  };

  if (!firstResult) {
    // URL 파라미터가 있으면 로딩 중 표시
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

    // URL 파라미터도 없고 Context 결과도 없으면 홈으로 리다이렉트
    // (이 useEffect가 실행되기 전이므로 빈 화면 표시)
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" onClick={resetTest} className="text-pink-500 hover:underline flex items-center gap-2">
            <ArrowLeft size={20} />
            처음으로
          </Link>
          <button
            onClick={resetTest}
            className="text-purple-500 hover:underline flex items-center gap-2"
          >
            <RotateCcw size={20} />
            다시 냥이매칭
          </button>
        </div>

        <div ref={resultRef} className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 나와 가장 잘 맞는 냥이는!
            </h1>

            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 mb-8">
              {firstResult.breed.image && (
                <CatImage
                  src={firstResult.breed.image}
                  alt={firstResult.breed.name}
                  width={192}
                  height={192}
                  sizes="(max-width: 640px) 192px, 192px"
                  priority
                  className="w-48 h-48 mx-auto rounded-2xl object-cover mb-4 shadow-lg"
                />
              )}
              <div className="text-6xl mb-2">{firstResult.breed.emoji}</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl">{getRankEmoji(1)}</span>
                <h2 className="text-4xl font-bold text-gray-800">
                  {firstResult.breed.name}
                </h2>
              </div>
              <p className="text-xl text-pink-600 font-semibold transition-all duration-300">
                매칭 점수: {animatedScore}%
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-left mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📋 품종 프로필
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">성격:</span>
                  <span className="font-semibold text-gray-800">
                    {firstResult.breed.traits.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">관리 난이도:</span>
                  <span className="font-semibold text-gray-800">
                    {getMaintenanceStars(firstResult.breed.maintenance.grooming)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">크기:</span>
                  <span className="font-semibold text-gray-800">
                    {firstResult.breed.size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">털 길이:</span>
                  <span className="font-semibold text-gray-800">
                    {firstResult.breed.coat}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                💡 적합 환경
              </h3>
              <p className="text-gray-700">{firstResult.breed.description}</p>
            </div>
          </div>

          <div className="border-t-2 border-pink-100 pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              🏆 추천 품종 TOP 3
            </h3>
            <div className="space-y-3">
              {top3Results.map((result, index) => (
                <Link
                  key={result.breed.id}
                  href={`/breed/${result.breed.id}`}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:scale-102 hover:shadow-lg ${
                    index === 0
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="text-3xl">{getRankEmoji(index + 1)}</div>
                  <div className="text-4xl">{result.breed.emoji}</div>
                  {result.breed.image && (
                    <CatImage
                      src={result.breed.image}
                      alt={result.breed.name}
                      width={48}
                      height={48}
                      sizes="(max-width: 640px) 48px, (max-width: 1024px) 48px, 48px"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{result.breed.name}</h4>
                    <p className="text-sm text-gray-600">{result.breed.nameEn}</p>
                  </div>
                  <div className="text-2xl font-bold text-pink-600">
                    {result.score}%
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
            💬 공유 카피
          </h3>
          <div className="bg-pink-50 rounded-xl p-4 mb-4">
            <p className="text-gray-800">{getShareCopy()}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl transition-all active:scale-95 min-h-[80px] md:min-h-auto ${
                isDownloading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-br from-pink-500 to-purple-600 text-white hover:shadow-lg'
              }`}
            >
              {isDownloading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download size={20} />
              )}
              <span className="text-xs md:text-sm font-semibold">
                {isDownloading ? '저장 중...' : '이미지 저장'}
              </span>
            </button>

            <button
              onClick={handleShareKakao}
              className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-yellow-400 text-yellow-900 hover:shadow-lg transition-all active:scale-95 min-h-[80px] md:min-h-auto"
            >
              <MessageCircle size={20} />
              <span className="text-xs md:text-sm font-semibold">카카오톡</span>
            </button>

            <button
              onClick={handleShareTwitter}
              className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-black text-white hover:shadow-lg transition-all active:scale-95 min-h-[80px] md:min-h-auto"
            >
              <Share2 size={20} />
              <span className="text-xs md:text-sm font-semibold">X</span>
            </button>

            <button
              onClick={handleShareThreads}
              className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-gray-800 text-white hover:shadow-lg transition-all active:scale-95 min-h-[80px] md:min-h-auto"
            >
              <AtSign size={20} />
              <span className="text-xs md:text-sm font-semibold">스레드</span>
            </button>

            <button
              onClick={handleShareInstagram}
              className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all active:scale-95 min-h-[80px] md:min-h-auto"
            >
              <Instagram size={20} />
              <span className="text-xs md:text-sm font-semibold">인스타</span>
            </button>

            <button
              onClick={handleCopyLink}
              className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl transition-all active:scale-95 min-h-[80px] md:min-h-auto ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:shadow-lg'
              }`}
            >
              <Copy size={20} />
              <span className="text-xs md:text-sm font-semibold">
                {copied ? '복사 완료!' : '링크 복사'}
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
            🤝 친구 결과랑 비교하기
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              친구 결과 링크 입력하기
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={friendLink}
                onChange={(e) => setFriendLink(e.target.value)}
                placeholder="https://nyongmatch.com/result?breed1=1&score1=85..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-gray-800"
              />
              <button
                onClick={handleCompareWithFriend}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
              >
                비교하기
              </button>
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl p-4">
            <p className="text-sm text-gray-700 mb-2">
              💡 친구 결과 링크를 받으셨나요?
            </p>
            <p className="text-sm text-gray-600">
              링크을 입력하고 비교하기 버튼을 누르면 두 분의 냥이 품종을 나란히 볼 수 있어요!
            </p>
          </div>
        </div>

        <AdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "5187796077"} />

        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}

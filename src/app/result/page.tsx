'use client';

import { useTest } from '@/contexts/TestContext';
import breeds from '@/data/breeds.json';
import questions from '@/data/questions.json';
import { calculateMatch, getRankEmoji } from '@/utils/matching';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import {
  Share2,
  Download,
  Copy,
  Instagram,
  MessageCircle,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import AdSense from '@/components/AdSense';

export default function ResultPage() {
  const { answers, resetTest } = useTest();
  const [copied, setCopied] = useState(false);
  const [compareLink, setCompareLink] = useState('');
  const [friendLink, setFriendLink] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const results = calculateMatch(answers, breeds.breeds, questions.questions);
  const top3Results = results.slice(0, 3);
  const firstResult = top3Results[0];

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, []);

  useEffect(() => {
    const compareUrl = `${window.location.origin}/compare?breed1=${firstResult.breed.id}&score1=${firstResult.score}`;
    setCompareLink(compareUrl);
  }, [firstResult.breed.id, firstResult.score]);

  const handleShareKakao = () => {
    const url = window.location.href;
    const text = `나와 가장 잘 맞는 냥이는 "${firstResult.breed.name}"! 🐾\n매칭 점수: ${firstResult.score}%`;

    if (typeof window !== 'undefined' && (window as any).Kakao) {
      (window as any).Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '냥이 매치',
          description: text,
          imageUrl: `${window.location.origin}/og-images/${firstResult.breed.id}.jpg`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: '테스트받기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
    } else {
      alert('카카오톡 앱이 필요합니다.');
    }
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `나와 가장 잘 맞는 냥이는 "${firstResult.breed.name}"! 🐾\n매칭 점수: ${firstResult.score}%\n\n너랑 딱 맞는 냥이는? 냥이 매치 테스트 받아보기! 🐱`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCompareWithFriend = () => {
    if (friendLink.trim()) {
      const url = new URL(friendLink.trim());
      const breed2Id = url.searchParams.get('breed2');
      const score2 = url.searchParams.get('score2');

      if (breed2Id && score2) {
        window.location.href = `/compare?breed1=${firstResult.breed.id}&score1=${firstResult.score}&breed2=${breed2Id}&score2=${score2}`;
      } else {
        alert('올바른 결과 링크를 입력해주세요.');
      }
    }
  };

  const handleDownloadImage = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#faf5ff',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `냥이매치_${firstResult.breed.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
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
    const score = firstResult.score;
    let copy = '';

    if (score >= 90) {
      copy = '인생냥이 확정! 92% 매칭이라니... 이건 운명이지 않나?';
    } else if (score >= 80) {
      copy = '88% 나왔는데, 꽤 잘 맞는 것 같아! 얼른 입양하고 싶어 ㅠㅠ';
    } else if (score >= 70) {
      copy = '75% 나왔는데... 애매하다 ㅋㅋ 뭐 나쁘지 않은 품종이긴 해';
    } else {
      copy = '60% 나왔는데... 이거 내가 냥이랑 안 맞는 건가? ㅠㅠ';
    }

    return `내 냥이 품종은 ${firstResult.breed.name}! 🐾 ${copy}`;
  };

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
            다시 테스트
          </button>
         </div>

        <AdSense adSlot="result-top" />

        <div ref={resultRef} className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 나와 가장 잘 맞는 냥이는!
            </h1>

            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 mb-8">
              <div className="text-8xl mb-4">{firstResult.breed.emoji}</div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl">{getRankEmoji(1)}</span>
                <h2 className="text-4xl font-bold text-gray-800">
                  {firstResult.breed.name}
                </h2>
              </div>
              <p className="text-xl text-pink-600 font-semibold">
                매칭 점수: {firstResult.score}%
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
                <div
                  key={result.breed.id}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    index === 0
                      ? 'bg-gradient-to-r from-pink-100 to-purple-100'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="text-3xl">{getRankEmoji(index + 1)}</div>
                  <div className="text-4xl">{result.breed.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{result.breed.name}</h4>
                    <p className="text-sm text-gray-600">{result.breed.nameEn}</p>
                  </div>
                  <div className="text-2xl font-bold text-pink-600">
                    {result.score}%
                  </div>
                </div>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={handleDownloadImage}
              className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white hover:shadow-lg transition-all active:scale-95 min-h-[80px] md:min-h-auto"
            >
              <Download size={20} />
              <span className="text-xs md:text-sm font-semibold">이미지 저장</span>
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
              className="flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-gray-100 text-gray-800 hover:shadow-lg transition-all active:scale-95 min-h-[80px] md:min-h-auto"
            >
              <Share2 size={20} />
              <span className="text-xs md:text-sm font-semibold">스레드</span>
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
                placeholder="https://nyongmatch.com/result?..."
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
              링크를 입력하고 비교하기 버튼을 누르면 두 분의 냥이 품종을 나란히 볼 수 있어요!
            </p>
          </div>
        </div>

        <AdSense adSlot="result-bottom" />

        <div className="text-center text-gray-500 text-sm">
          <p>&copy; 2026 냥이 매치. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}

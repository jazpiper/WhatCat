'use client';

import { Breed, MatchReason } from '@/types';
import { Heart, Home, Scissors, Sparkles, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useMatchExplanation } from '@/hooks/useAnalytics';

interface MatchExplanationProps {
  breed: Breed;
  reasons: MatchReason[];
}

export default function MatchExplanation({ breed, reasons }: MatchExplanationProps) {
  const [visibleReasons, setVisibleReasons] = useState(3);
  const [timeSpent, setTimeSpent] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const { trackView } = useMatchExplanation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track engagement
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeSpent(Date.now() - startTime);
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        const depth = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
        setScrollDepth(depth);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      clearInterval(interval);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      // Track final engagement when component unmounts
      trackView(breed.id, timeSpent, scrollDepth);
    };
  }, [breed.id, trackView]);

  if (!reasons || reasons.length === 0) {
    return null;
  }

  const getCategoryIcon = (category: MatchReason['category']) => {
    switch (category) {
      case 'personality':
        return <Heart className="text-pink-500" size={20} />;
      case 'lifestyle':
        return <Home className="text-blue-500" size={20} />;
      case 'appearance':
        return <Sparkles className="text-purple-500" size={20} />;
      case 'maintenance':
        return <Scissors className="text-green-500" size={20} />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: MatchReason['category']) => {
    switch (category) {
      case 'personality':
        return 'bg-pink-50 border-pink-200';
      case 'lifestyle':
        return 'bg-blue-50 border-blue-200';
      case 'appearance':
        return 'bg-purple-50 border-purple-200';
      case 'maintenance':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-pink-500" size={24} />
        <h3 className="text-xl font-bold text-gray-800">
          왜 {breed.name}인가요?
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        당신의 성향과 {breed.name}의 특징을 분석한 결과예요!
      </p>

      <div className="space-y-3">
        {reasons.slice(0, visibleReasons).map((reason, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-4 border ${getCategoryColor(reason.category)} transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getCategoryIcon(reason.category)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">
                  {reason.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reasons.length > 3 && visibleReasons < reasons.length && (
        <button
          onClick={() => setVisibleReasons(reasons.length)}
          className="mt-4 w-full py-3 text-pink-600 font-medium flex items-center justify-center gap-2 hover:bg-pink-50 rounded-xl transition-colors"
        >
          더보기
          <ChevronRight size={18} />
        </button>
      )}

      <div className="mt-6 p-4 bg-white/60 rounded-xl border border-purple-200">
        <p className="text-sm text-gray-700 text-center leading-relaxed">
          <span className="font-semibold text-purple-600">매칭 알고리즘</span>은 성격(30%), 관리 난이도(25%),
          라이프스타일(20%), 외형(15%), 비용(10%)을 종합적으로 분석해요.
        </p>
      </div>
    </div>
  );
}

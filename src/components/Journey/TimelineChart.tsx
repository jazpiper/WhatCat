/**
 * Timeline Chart Component
 * Displays user's test history as a visual timeline
 */

import React from 'react';
import { ChartErrorBoundary } from '@/components/ChartErrorBoundary';

interface TimelineItem {
  id: string;
  timestamp: string;
  breedName: string;
  breedEmoji: string;
  matchScore: number;
}

interface TimelineChartProps {
  items: TimelineItem[];
  onItemClick?: (id: string) => void;
}

export function TimelineChart({ items, onItemClick }: TimelineChartProps) {
  return (
    <ChartErrorBoundary chartName="Timeline">
      <TimelineChartInner items={items} onItemClick={onItemClick} />
    </ChartErrorBoundary>
  );
}

function TimelineChartInner({ items, onItemClick }: TimelineChartProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[var(--text-secondary)]">
        <div className="text-5xl mb-4">📊</div>
        <p className="text-lg">아직 테스트 기록이 없어요</p>
        <p className="text-sm mt-2">테스트를 완료하면 여기에 표시됩니다!</p>
      </div>
    );
  }

  // Format date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300" />

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className="relative pl-16 group cursor-pointer"
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-4 w-5 h-5 rounded-full border-2 border-white shadow-md transition-all duration-300 group-hover:scale-125 ${
                index === 0
                  ? 'bg-gradient-to-br from-pink-400 to-purple-500'
                  : index === 1
                  ? 'bg-gradient-to-br from-purple-400 to-blue-500'
                  : 'bg-gradient-to-br from-blue-400 to-cyan-500'
              }`}
            />

            {/* Card */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-[var(--border-default)] group-hover:border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{item.breedEmoji}</div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-pink-600 transition-colors">
                      {item.breedName}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">{formatDate(item.timestamp)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                    {item.matchScore}%
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">매칭 점수</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

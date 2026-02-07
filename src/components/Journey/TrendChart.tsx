/**
 * Trend Chart Component
 * Displays personality trait changes over time using simple CSS-based visualization
 */

import React from 'react';
import { ChartErrorBoundary } from '@/components/ChartErrorBoundary';

interface PersonalityScores {
  activity: number;
  affection: number;
  social: number;
  quiet: number;
  loyalty: number;
}

interface TrendData {
  timestamp: string;
  personality: PersonalityScores;
}

interface TrendChartProps {
  data: TrendData[];
}

const TRAIT_LABELS: Record<keyof PersonalityScores, { label: string; emoji: string; color: string }> = {
  activity: { label: '활동성', emoji: '🏃', color: 'from-orange-400 to-red-500' },
  affection: { label: '애정', emoji: '💕', color: 'from-pink-400 to-rose-500' },
  social: { label: '사교성', emoji: '👥', color: 'from-purple-400 to-indigo-500' },
  quiet: { label: '조용함', emoji: '🤫', color: 'from-blue-400 to-cyan-500' },
  loyalty: { label: '충성심', emoji: '🐕', color: 'from-green-400 to-emerald-500' },
};

export function TrendChart({ data }: TrendChartProps) {
  return (
    <ChartErrorBoundary chartName="Personality Trend">
      <TrendChartInner data={data} />
    </ChartErrorBoundary>
  );
}

function TrendChartInner({ data }: TrendChartProps) {
  if (data.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <div className="text-5xl mb-4">📈</div>
        <p className="text-lg">트렌드를 보려면 최소 2번 이상 테스트를 완료해주세요</p>
        <p className="text-sm mt-2">성격 변화를 시각적으로 볼 수 있어요!</p>
      </div>
    );
  }

  // Calculate averages for each trait
  const traitKeys = Object.keys(TRAIT_LABELS) as Array<keyof PersonalityScores>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <span>📈</span>
        <span>성격 트렌드</span>
      </h3>

      {traitKeys.map((trait) => {
        const traitInfo = TRAIT_LABELS[trait];
        const values = data.map((d) => d.personality[trait]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

        return (
          <div key={trait} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{traitInfo.emoji}</span>
                <span className="font-medium text-gray-700">{traitInfo.label}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-400">최소 {min}</span>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  평균 {avg}
                </span>
                <span className="text-gray-400">최대 {max}</span>
              </div>
            </div>

            {/* Mini trend visualization */}
            <div className="flex items-end gap-1 h-12 mt-3">
              {values.map((value, idx) => {
                const height = ((value - 1) / 4) * 100; // Normalize to 0-100% (scale is 1-5)
                return (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-pink-400 to-purple-400 rounded-t-sm transition-all duration-300 hover:from-pink-500 hover:to-purple-500"
                    style={{ height: `${Math.max(height, 10)}%` }}
                    title={`${value}점`}
                  />
                );
              })}
            </div>

            {/* Trend indicator */}
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>과거</span>
              <span>최근</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

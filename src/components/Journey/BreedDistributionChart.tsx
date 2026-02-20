/**
 * Breed Distribution Chart Component
 * Displays pie chart of breed distribution using pure CSS
 */

import React from 'react';
import { ChartErrorBoundary } from '@/components/ChartErrorBoundary';

interface BreedDistributionItem {
  breedId: string;
  breedName: string;
  count: number;
  percentage: number;
}

interface BreedDistributionChartProps {
  data: BreedDistributionItem[];
}

interface PieChartSegment extends BreedDistributionItem {
  startAngle: number;
  angle: number;
  endAngle: number;
  color: {
    bg: string;
    text: string;
    light: string;
  };
}

const COLORS = [
  { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-100' },
  { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-100' },
  { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-100' },
  { bg: 'bg-cyan-500', text: 'text-cyan-600', light: 'bg-cyan-100' },
  { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-100' },
  { bg: 'bg-rose-500', text: 'text-rose-600', light: 'bg-rose-100' },
  { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-100' },
  { bg: 'bg-amber-500', text: 'text-amber-600', light: 'bg-amber-100' },
];

export function BreedDistributionChart({ data }: BreedDistributionChartProps) {
  return (
    <ChartErrorBoundary chartName="Breed Distribution">
      <BreedDistributionChartInner data={data} />
    </ChartErrorBoundary>
  );
}

function BreedDistributionChartInner({ data }: BreedDistributionChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-[var(--text-secondary)]">
        <div className="text-5xl mb-4">🥧</div>
        <p className="text-lg">아직 데이터가 없어요</p>
      </div>
    );
  }

  const segments: PieChartSegment[] = data.reduce<PieChartSegment[]>(
    (acc, item, index) => {
      const previousAngle = acc[acc.length - 1]?.endAngle ?? 0;
      const angle = (item.percentage / 100) * 360;

      return [
        ...acc,
        {
          ...item,
          startAngle: previousAngle,
          angle,
          endAngle: previousAngle + angle,
          color: COLORS[index % COLORS.length],
        },
      ];
    },
    []
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2">
        <span>🥧</span>
        <span>품종 분포</span>
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Pie Chart - Using conic-gradient */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <div
            className="w-full h-full rounded-full shadow-lg"
            style={{
              background: segments
                .map((s) => {
                  const endAngle = s.startAngle + s.angle;
                  return `${s.color.bg} ${s.startAngle}deg ${endAngle}deg`;
                })
                .join(', '),
            }}
          >
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--text-primary)]">{data.length}</div>
                <div className="text-xs text-[var(--text-secondary)]">품종</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {segments.map((segment) => (
            <div
              key={segment.breedId}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-page)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded ${segment.color.bg}`}
                  style={{ minWidth: '16px' }}
                />
                <span className="text-sm text-[var(--text-primary)] truncate max-w-[120px]">
                  {segment.breedName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${segment.color.text}`}>
                  {segment.percentage}%
                </span>
                <span className="text-xs text-[var(--text-secondary)]">({segment.count}회)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <div className="text-5xl mb-4">🥧</div>
        <p className="text-lg">아직 데이터가 없어요</p>
      </div>
    );
  }

  // Calculate pie chart segments
  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const angle = (item.percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return {
      ...item,
      startAngle,
      angle,
      color: COLORS[index % COLORS.length],
    };
  });

  // Calculate dash array for CSS pie chart
  const total = 100;
  const accumulated: number[] = [];
  let acc = 0;
  for (const item of data) {
    accumulated.push(acc);
    acc += item.percentage;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
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
                .map((s, i) => {
                  const endAngle = s.startAngle + s.angle;
                  return `${s.color.bg} ${s.startAngle}deg ${endAngle}deg`;
                })
                .join(', '),
            }}
          >
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{data.length}</div>
                <div className="text-xs text-gray-500">품종</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {segments.map((segment) => (
            <div
              key={segment.breedId}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded ${segment.color.bg}`}
                  style={{ minWidth: '16px' }}
                />
                <span className="text-sm text-gray-700 truncate max-w-[120px]">
                  {segment.breedName}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-semibold ${segment.color.text}`}>
                  {segment.percentage}%
                </span>
                <span className="text-xs text-gray-400">({segment.count}회)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

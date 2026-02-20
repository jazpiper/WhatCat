'use client';

import { Skeleton } from './Skeleton';

interface ChartSkeletonProps {
  type?: 'bar' | 'pie' | 'line';
  height?: string;
}

const LINE_CHART_BAR_HEIGHTS = ['32%', '58%', '45%', '71%', '49%', '64%', '53%', '36%'];
const BAR_CHART_BAR_HEIGHTS = ['54%', '76%', '68%', '47%', '83%'];

export default function ChartSkeleton({ type = 'bar', height = 'h-48' }: ChartSkeletonProps) {
  return (
    <div className={`w-full ${height} flex items-center justify-center`}>
      {type === 'pie' ? (
        <div className="relative">
          <Skeleton variant="circular" className="w-40 h-40" />
          <Skeleton variant="circular" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20" />
        </div>
      ) : type === 'line' ? (
        <div className="w-full h-full flex flex-col justify-end gap-1 p-4">
          <div className="flex items-end justify-between gap-1 h-full">
            {LINE_CHART_BAR_HEIGHTS.map((heightPercent, i) => (
              <Skeleton
                key={i}
                className="flex-1"
                style={{ height: heightPercent }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-end justify-center gap-3 p-4">
          {BAR_CHART_BAR_HEIGHTS.map((heightPercent, i) => (
            <Skeleton
              key={i}
              className="w-12"
              style={{ height: heightPercent }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { Skeleton } from './Skeleton';

interface ChartSkeletonProps {
  type?: 'bar' | 'pie' | 'line';
  height?: string;
}

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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton
                key={i}
                className="flex-1"
                style={{ height: `${30 + Math.random() * 70}%` }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-end justify-center gap-3 p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              className="w-12"
              style={{ height: `${40 + Math.random() * 60}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { Skeleton } from './Skeleton';

interface BreedCardSkeletonProps {
  count?: number;
}

export default function BreedCardSkeleton({ count = 1 }: BreedCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-[var(--bg-surface)] dark:to-[var(--bg-surface)] rounded-2xl p-6 border-2 border-pink-100 dark:border-[var(--border-default)]"
        >
          <div className="flex items-start justify-between mb-3">
            <Skeleton variant="circular" className="w-16 h-16" />
            <div className="flex-1 ml-4">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton variant="circular" className="w-8 h-8" />
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-18 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}

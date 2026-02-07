'use client';

import { Skeleton } from './Skeleton';

interface BreedsGridSkeletonProps {
  count?: number;
}

export default function BreedsGridSkeleton({ count = 6 }: BreedsGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <Skeleton variant="circular" className="w-16 h-16 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-6 w-28 mb-1" />
              <Skeleton className="h-4 w-20 mb-2" />
              <div className="flex gap-1">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

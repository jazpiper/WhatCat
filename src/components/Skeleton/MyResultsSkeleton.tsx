'use client';

import { Skeleton } from './Skeleton';

export default function MyResultsSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-6 w-20 mb-4" />
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg ml-auto" />
        </div>

        {/* Personality Trends */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <Skeleton className="h-7 w-40 mb-4" />
          <Skeleton className="h-5 w-32 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-2 w-16" />
                <Skeleton className="h-2 flex-1" />
                <Skeleton className="h-2 w-8" />
              </div>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" className="w-16 h-16" />
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-8 w-12" />
                  <Skeleton variant="circular" className="w-8 h-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

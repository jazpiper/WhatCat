'use client';

import { Skeleton } from './Skeleton';

export default function DailyQuizSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-6 w-20 mb-4" />
          <Skeleton className="h-10 w-56 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>

        {/* Streak Card */}
        <div className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Skeleton className="h-5 w-24 mb-1 bg-white/30" />
              <Skeleton className="h-10 w-20 bg-white/30" />
            </div>
            <div className="text-right">
              <Skeleton className="h-5 w-16 mb-1 bg-white/30" />
              <Skeleton className="h-8 w-16 bg-white/30" />
            </div>
          </div>
          <Skeleton className="h-8 w-full bg-white/20 rounded-full" />
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <Skeleton className="h-7 w-24 rounded-full mb-4" />
          <Skeleton className="h-7 w-full mb-6" />
          <Skeleton className="h-7 w-4/5 mb-6" />

          {/* Options */}
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full p-4 rounded-xl border-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" className="w-8 h-8" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-8 bg-white/50 rounded-2xl p-6 border border-gray-100">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center p-3 rounded-xl">
                <Skeleton className="h-8 w-8 mx-auto mb-1" />
                <Skeleton className="h-5 w-12 mx-auto" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

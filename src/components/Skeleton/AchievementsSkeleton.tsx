'use client';

import { Skeleton } from './Skeleton';

export default function AchievementsSkeleton() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Skeleton variant="circular" className="w-16 h-16 mx-auto mb-4" />
            <Skeleton className="h-12 w-40 mx-auto mb-2" />
            <Skeleton className="h-5 w-72 mx-auto" />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton variant="circular" className="w-10 h-10" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>

          {/* Achievement Gallery */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton variant="circular" className="w-16 h-16 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* How to Earn Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <Skeleton className="h-7 w-48 mb-4" />
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

'use client';

import { Skeleton } from './Skeleton';

export default function ResultSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-64 mx-auto" />
        </div>

        {/* Main Result Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8">
          {/* Breed Image and Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Skeleton variant="circular" className="w-32 h-32 flex-shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="flex gap-2 justify-center md:justify-start">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>

          {/* Match Score */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 mb-8">
            <div className="text-center">
              <Skeleton className="h-8 w-40 mx-auto mb-2" />
              <Skeleton className="h-16 w-32 mx-auto" />
            </div>
          </div>

          {/* Personality Stats */}
          <div className="mb-8">
            <Skeleton className="h-7 w-36 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-5 w-20 flex-shrink-0" />
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <Skeleton className="h-full w-3/4 rounded-none" />
                  </div>
                  <Skeleton className="h-5 w-8 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Info */}
          <div className="mb-8">
            <Skeleton className="h-7 w-36 mb-4" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-5 w-16 mx-auto" />
                  <Skeleton className="h-4 w-20 mx-auto mt-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>

        {/* Other Breeds */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <Skeleton className="h-7 w-48 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <Skeleton variant="circular" className="w-16 h-16 mx-auto mb-2" />
                <Skeleton className="h-5 w-20 mx-auto" />
                <Skeleton className="h-4 w-16 mx-auto mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import { Skeleton } from './Skeleton';

export default function BreedDetailSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-6 w-24 mb-4" />
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Skeleton variant="circular" className="w-32 h-32" />
              <div className="flex-1 text-center md:text-left">
                <Skeleton className="h-10 w-48 mb-2" />
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="flex gap-2 justify-center md:justify-start flex-wrap">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-18 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-2" />
                  <Skeleton className="h-5 w-20 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto mt-1" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            </div>

            {/* Personality Section */}
            <div className="mb-8">
              <Skeleton className="h-7 w-36 mb-4" />
              <div className="space-y-4">
                {['activity', 'affection', 'social', 'quiet', 'loyalty'].map((stat) => (
                  <div key={stat} className="flex items-center gap-4">
                    <Skeleton className="h-5 w-24 flex-shrink-0" />
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <Skeleton className="h-full w-3/4 rounded-none" />
                    </div>
                    <Skeleton className="h-5 w-8 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Section */}
            <div className="mb-8">
              <Skeleton className="h-7 w-36 mb-4" />
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Skeleton className="h-10 w-10 mx-auto mb-2" />
                    <Skeleton className="h-5 w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <Skeleton className="h-7 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Skeleton className="h-8 w-8 flex-shrink-0" />
                    <Skeleton className="h-5 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Health Issues */}
            <div className="mb-8">
              <Skeleton className="h-7 w-36 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>

            {/* Traits */}
            <div>
              <Skeleton className="h-7 w-24 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </main>
  );
}

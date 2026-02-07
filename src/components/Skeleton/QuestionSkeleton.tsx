'use client';

import { Skeleton } from './Skeleton';

export default function QuestionSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-12" />
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <Skeleton className="h-full w-1/3 rounded-none" />
              </div>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: 14 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="circular"
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                ))}
              </div>
            </div>

            {/* Cat Tip */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-4 mb-6">
              <Skeleton className="h-5 w-3/4 mx-auto" />
            </div>

            {/* Question Area */}
            <div className="min-h-[400px]">
              <div className="text-center mb-8">
                <Skeleton className="h-24 w-24 mx-auto mb-6 rounded-full" />
                <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-full p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <Skeleton variant="circular" className="w-6 h-6" />
                      <Skeleton className="h-6 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Skeleton className="h-12 w-24 rounded-full" />
              <Skeleton className="h-12 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

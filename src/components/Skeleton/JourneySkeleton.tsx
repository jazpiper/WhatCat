'use client';

import { Skeleton } from './Skeleton';

export default function JourneySkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-6 w-20" />
          <div className="flex gap-2">
            <Skeleton variant="circular" className="w-10 h-10" />
            <Skeleton variant="circular" className="w-10 h-10" />
            <Skeleton variant="circular" className="w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-64 mx-auto mb-3" />
          <Skeleton className="h-5 w-48 mx-auto" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm text-center">
              <Skeleton className="h-12 w-12 mx-auto mb-2" />
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <Skeleton className="h-7 w-36 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-16">
                <Skeleton variant="circular" className="absolute left-4 w-5 h-5" />
                <Skeleton className="h-20 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <Skeleton className="h-7 w-36 mb-4" />
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <Skeleton className="h-7 w-36 mb-4" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}

import BreedsGridSkeleton from '@/components/Skeleton/BreedsGridSkeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="h-8 w-56 bg-white/70 rounded-xl mx-auto mb-3 animate-pulse" />
          <div className="h-5 w-80 bg-white/60 rounded-xl mx-auto animate-pulse" />
        </div>
        <BreedsGridSkeleton count={12} />
      </div>
    </main>
  );
}

'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

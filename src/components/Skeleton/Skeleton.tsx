'use client';

import { cn } from '@/utils/skeletonUtils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rounded';
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  const variantClasses = {
    default: 'rounded-md',
    text: 'rounded-sm h-4',
    circular: 'rounded-full',
    rounded: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%]',
        variantClasses[variant],
        className
      )}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
      {...props}
    />
  );
}


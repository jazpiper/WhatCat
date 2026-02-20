import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * PageContainer - Unified page layout wrapper with gradient background
 *
 * Design tokens:
 * - Background: Gradient from pink-50 via purple-50 to blue-50 (dark: surface tokens applied)
 * - Layout: min-h-screen, container mx-auto px-4 py-8 max-w-4xl
 * - Use `contentClassName` to override container constraints (max-w, padding, alignment).
 */
export function PageContainer({ children, className, contentClassName }: PageContainerProps) {
  return (
    <div
      className={cn(
        'min-h-screen',
        'bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50',
        'dark:from-[var(--bg-surface)] dark:via-purple-950 dark:to-[var(--bg-surface)]',
        className
      )}
    >
      <div className={cn('container mx-auto px-4 py-8 max-w-4xl', contentClassName)}>
        {children}
      </div>
    </div>
  );
}

export default PageContainer;

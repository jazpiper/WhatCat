import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  emoji?: string;
  className?: string;
}

/**
 * PageTitle - Unified page title component with optional subtitle and emoji
 *
 * Design tokens:
 * - Title: text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4
 * - Subtitle: text-gray-600 dark:text-gray-300 text-center
 */
export function PageTitle({
  children,
  subtitle,
  emoji,
  className,
}: PageTitleProps) {
  return (
    <div className={cn('text-center mb-4', className)}>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
        {emoji && <span className="mr-2">{emoji}</span>}
        {children}
      </h1>
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
    </div>
  );
}

export default PageTitle;

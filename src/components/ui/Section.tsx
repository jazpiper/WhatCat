import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  title: string;
  emoji?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'pink' | 'purple' | 'blue' | 'amber' | 'green';
}

const variantStyles = {
  default: 'bg-white dark:bg-gray-800',
  pink: 'bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50',
  purple:
    'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50',
  blue: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50',
  amber:
    'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50',
  green:
    'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50',
};

const titleVariantStyles = {
  default: 'text-gray-800 dark:text-gray-100',
  pink: 'text-pink-700 dark:text-pink-300',
  purple: 'text-purple-700 dark:text-purple-300',
  blue: 'text-blue-700 dark:text-blue-300',
  amber: 'text-amber-700 dark:text-amber-300',
  green: 'text-green-700 dark:text-green-300',
};

/**
 * Section - Unified section component with colored variants
 *
 * Variants:
 * - default: White/gray background
 * - pink: Pink gradient background
 * - purple: Purple gradient background
 * - blue: Blue gradient background
 * - amber: Amber gradient background
 * - green: Green gradient background
 */
export function Section({
  title,
  emoji,
  children,
  className,
  variant = 'default',
}: SectionProps) {
  return (
    <section className={cn('rounded-2xl p-6 mb-6', variantStyles[variant], className)}>
      <h2
        className={cn(
          'text-xl md:text-2xl font-semibold mb-4',
          titleVariantStyles[variant]
        )}
      >
        {emoji && <span className="mr-2">{emoji}</span>}
        {title}
      </h2>
      <div className="text-gray-600 dark:text-gray-300">{children}</div>
    </section>
  );
}

export default Section;

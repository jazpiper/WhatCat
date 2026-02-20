import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

const variantStyles = {
  default: 'bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-3xl shadow-xl p-6',
  elevated:
    'bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-3xl shadow-2xl p-6 shadow-purple-200/50 dark:shadow-purple-900/30',
  outlined:
    'bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-3xl p-6 border border-[var(--border-default)]',
};

/**
 * Card - Unified card component with multiple variants
 *
 * Variants:
 * - default: White background with shadow-xl
 * - elevated: Enhanced shadow with purple tint
 * - outlined: Border-based styling without heavy shadow
 */
export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div className={cn(variantStyles[variant], className)}>{children}</div>
  );
}

export default Card;

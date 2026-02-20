'use client';

import { useTheme } from 'next-themes';
import { Laptop, Moon, Sun } from 'lucide-react';

const THEME_OPTIONS = [
  { value: 'light', label: '라이트', icon: Sun },
  { value: 'dark', label: '다크', icon: Moon },
  { value: 'system', label: '시스템', icon: Laptop },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const currentTheme = theme ?? 'system';

  return (
    <div
      className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 p-1 backdrop-blur-md"
      role="radiogroup"
      aria-label="테마 선택"
    >
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = currentTheme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={[
              'inline-flex h-7 w-9 items-center justify-center rounded-lg transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
              isActive ? 'bg-white/30 text-white shadow-sm' : 'text-white/80 hover:bg-white/15 hover:text-white',
            ].join(' ')}
            role="radio"
            aria-checked={isActive}
            aria-label={`${option.label} 모드`}
            title={`${option.label} 모드`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

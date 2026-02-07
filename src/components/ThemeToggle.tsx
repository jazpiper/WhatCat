'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-white/10 animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50"
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
    >
      <motion.IconWrapper isDark={isDark}>
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-300" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Moon className="w-5 h-5 text-white" strokeWidth={2} aria-hidden="true" />
        )}
      </motion.IconWrapper>
    </button>
  );
}

// Simple motion wrapper for smooth icon transitions
namespace motion {
  export interface IconWrapperProps {
    children: React.ReactNode;
    isDark: boolean;
  }

  export function IconWrapper({ children, isDark }: IconWrapperProps) {
    return (
      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      >
        {children}
      </div>
    );
  }
}

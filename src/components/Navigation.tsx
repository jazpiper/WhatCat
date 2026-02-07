'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navigation = [
  { name: '홈', href: '/' },
  { name: '냥이매칭', href: '/nyongmatch' },
  { name: '품종 찾기', href: '/breeds' },
  { name: '데일리 퀴즈', href: '/daily-quiz' },
  { name: '내 결과', href: '/my-results' },
  { name: '도전 과제', href: '/achievements' },
  { name: '가이드', href: '/guides' },
  { name: 'FAQ', href: '/faq' },
  { name: '소개', href: '/about' },
];

const footerLinks = [
  { name: '문의하기', href: '/contact' },
  { name: '개인정보처리방침', href: '/privacy' },
  { name: '이용약관', href: '/terms' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-white font-bold text-xl hover:text-pink-200 transition-colors flex items-center gap-2"
              aria-label="냥이 매칭 홈으로 이동"
            >
              <span className="text-2xl" aria-hidden="true">🐱</span>
              <span className="tracking-tighter">NYONGMATCH</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname === item.href
                    ? 'bg-white/20 text-white shadow-md'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }
                `}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isOpen}
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-4 space-y-1 bg-gradient-to-b from-purple-500/30 to-pink-500/30 backdrop-blur-lg">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
                ${pathname === item.href
                  ? 'bg-white/30 text-white shadow-md translate-x-1'
                  : 'text-white/90 hover:bg-white/10 hover:translate-x-1'
                }
              `}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 px-2">
            {footerLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xs text-white/70 hover:text-white transition-colors"
                aria-label={`${item.name} 페이지로 이동`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links - Desktop */}
      <div className="hidden md:block bg-black/5 px-4 py-1.5 text-[10px] uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex justify-end space-x-6">
          {footerLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/60 hover:text-white transition-colors"
              aria-label={`${item.name} 페이지로 이동`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

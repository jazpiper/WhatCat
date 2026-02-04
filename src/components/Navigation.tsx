'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: '홈', href: '/' },
  { name: '냥이매칭', href: '/nyongmatch' },
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
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl hover:text-pink-200 transition-colors">
              HOME
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
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
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
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
      <div className={`${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="px-4 pb-4 space-y-1 bg-gradient-to-b from-purple-500/20 to-pink-500/20">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${pathname === item.href
                  ? 'bg-white/20 text-white shadow-md'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="px-4 pb-4 space-y-2 bg-purple-600/30 border-t border-white/10">
          {footerLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-xs text-white/70 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Links - Desktop */}
      <div className="hidden md:block bg-purple-600/30 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex justify-end space-x-4">
          {footerLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/70 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

import Link from 'next/link';
import NavLink from './NavLink';
import ThemeToggle from './ThemeToggle';

const navigation = [
  { name: '홈', href: '/' },
  { name: '냥이매칭', href: '/nyongmatch' },
  { name: '품종 찾기', href: '/breeds' },
  { name: '데일리 퀴즈', href: '/daily-quiz' },
  { name: '내 결과', href: '/my-results' },
  { name: '내 여정', href: '/my-journey' },
  { name: '비교', href: '/compare' },
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
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[var(--nav-bg-start)] via-[var(--nav-bg-mid)] to-[var(--nav-bg-end)] backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-[var(--nav-text)] transition-colors hover:text-white"
              aria-label="냥이 매칭 홈으로 이동"
            >
              <span className="text-2xl" aria-hidden="true">
                🐱
              </span>
              <span className="tracking-tighter">NYONGMATCH</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                activeClassName="bg-white/20 text-[var(--nav-text)] shadow-md"
                inactiveClassName="text-[var(--nav-muted)] hover:bg-white/10 hover:text-[var(--nav-text)]"
              >
                {item.name}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu (no React state; <details> controls open/close) */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <details id="mobile-nav" className="relative">
              <summary
                className="list-none p-2 rounded-lg text-[var(--nav-text)] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                aria-label="메뉴"
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
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>

              <div className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[var(--nav-bg-mid)] to-[var(--nav-bg-end)] backdrop-blur-lg shadow-2xl">
                <div className="px-3 py-3 space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      href={item.href}
                      closeMobileMenu
                      className="block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200"
                      activeClassName="bg-white/30 text-[var(--nav-text)] shadow-md"
                      inactiveClassName="text-[var(--nav-muted)] hover:bg-white/10 hover:text-[var(--nav-text)]"
                    >
                      {item.name}
                    </NavLink>
                  ))}

                  <div className="pt-3 mt-3 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2 px-2">
                    {footerLinks.map((item) => (
                      <NavLink
                        key={item.name}
                        href={item.href}
                        closeMobileMenu
                        className="text-xs text-[var(--nav-muted)] hover:text-[var(--nav-text)] transition-colors"
                        activeClassName="text-[var(--nav-text)]"
                        inactiveClassName=""
                        aria-label={`${item.name} 페이지로 이동`}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Footer Links - Desktop */}
      <div className="hidden md:block bg-black/5 px-4 py-1.5 text-[10px] uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex justify-end space-x-6">
          {footerLinks.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              className="text-[var(--nav-muted)] hover:text-[var(--nav-text)] transition-colors"
              activeClassName="text-[var(--nav-text)]"
              inactiveClassName=""
              aria-label={`${item.name} 페이지로 이동`}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

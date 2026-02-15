'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  href,
  children,
  className,
  activeClassName,
  inactiveClassName,
  closeMobileMenu,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName: string;
  inactiveClassName: string;
  closeMobileMenu?: boolean;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'children' | 'className'>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[className, isActive ? activeClassName : inactiveClassName].filter(Boolean).join(' ')}
      aria-current={isActive ? 'page' : undefined}
      onClick={(e) => {
        rest.onClick?.(e);
        if (closeMobileMenu) {
          const el = document.getElementById('mobile-nav') as HTMLDetailsElement | null;
          el?.removeAttribute('open');
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

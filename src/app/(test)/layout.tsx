'use client';

import { NyongmatchProvider } from '@/contexts/NyongmatchContext';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NyongmatchProvider>{children}</NyongmatchProvider>;
}

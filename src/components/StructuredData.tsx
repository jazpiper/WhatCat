'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'WebSite' | 'BreadcrumbList' | 'Organization' | 'FAQPage';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // 기존 스크립트 제거
    const existingScript = document.getElementById(`structured-data-${type}`);
    if (existingScript) {
      existingScript.remove();
    }

    // 새 스크립트 추가
    const script = document.createElement('script');
    script.id = `structured-data-${type}`;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      ...data,
    });
    document.head.appendChild(script);

    // 컴포넌트 언마운트 시 제거
    return () => {
      const scriptToRemove = document.getElementById(`structured-data-${type}`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
}

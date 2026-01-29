'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

export default function AdSense({ adSlot }: { adSlot: string }) {
  const adElement = useRef<HTMLModElement>(null);

  useEffect(() => {
    const loadAd = () => {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle && !adElement.current?.getAttribute('data-ad-status')) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
          console.error('AdSense push error:', error);
        }
      }
    };

    const timer = setTimeout(loadAd, 100);

    return () => clearTimeout(timer);
  }, [adSlot]);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4896634202351610"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className="w-full flex justify-center my-6">
        <ins
          ref={adElement}
          className="adsbygoogle"
          data-ad-client="ca-pub-4896634202351610"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          style={{ display: 'block' }}
        />
      </div>
    </>
  );
}

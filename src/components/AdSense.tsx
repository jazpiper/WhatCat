'use client';

import { useEffect, useRef } from 'react';

export default function AdSense({ adSlot }: { adSlot: string }) {
  const adElement = useRef<HTMLModElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || loadedRef.current) {
      return;
    }

    const element = adElement.current;
    if (!element) return;

    const loadAd = () => {
      if (loadedRef.current || !element) return;

      const width = element.offsetWidth;
      if (width > 0 && (window as any).adsbygoogle) {
        loadedRef.current = true;
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
          console.error('AdSense push error:', error);
        }
      }
    };

    loadAd();

    observerRef.current = new ResizeObserver(() => {
      loadAd();
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [adSlot]);

  return (
    <div className="w-full flex justify-center my-6">
      <ins
        ref={adElement}
        className="adsbygoogle"
        data-ad-client="ca-pub-4896634202351610"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        style={{ display: 'block', minHeight: '50px' }}
      />
    </div>
  );
}

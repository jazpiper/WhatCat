'use client';

import { useEffect, useRef, useState } from 'react';
import { logError } from '@/utils/errorHandler';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSense({ adSlot, className = '' }: { adSlot: string; className?: string }) {
  const adElement = useRef<HTMLModElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration 방지
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // AdSense 스크립트 로드 확인
  useEffect(() => {
    if (!isMounted) return;

    const checkScriptReady = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        setIsScriptReady(true);
        return true;
      }
      return false;
    };

    let attempts = 0;
    const maxAttempts = 30; // 최대 3초까지 체크

    const interval = setInterval(() => {
      attempts++;
      if (checkScriptReady() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isMounted]);

  // 광고 로드 로직
  useEffect(() => {
    if (typeof window === 'undefined' || isLoaded || !isScriptReady || !isMounted) {
      return;
    }

    const element = adElement.current;
    if (!element) return;

    const loadAd = () => {
      if (isLoaded || !element || !isScriptReady) return;

      const width = element.offsetWidth;
      const height = element.offsetHeight;

      // 최소 크기 확인
      if (width >= 300 && height >= 100) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setIsLoaded(true);
          console.log(`AdSense ad loaded: slot=${adSlot}, size=${width}x${height}`);
        } catch (error) {
          logError(error, 'AdSense.loadAd');
        }
      }
    };

    const timer = setTimeout(loadAd, 200);

    // IntersectionObserver로 가시성 감지
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            loadAd();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [adSlot, isLoaded, isScriptReady, isMounted]);

  if (!isMounted) {
    return <div className="w-full h-[100px] my-6" />;
  }

  return (
    <div className={`w-full flex justify-center my-6 overflow-hidden ${className}`}>
      <ins
        ref={adElement}
        className="adsbygoogle"
        data-ad-client="ca-pub-4896634202351610"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        style={{
          display: 'block',
          minHeight: '100px',
          minWidth: '300px',
          maxWidth: '100%',
          width: '100%',
          margin: '0 auto'
        }}
      />
    </div>
  );
}

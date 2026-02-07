'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || typeof window === 'undefined') {
      return;
    }

    const handleLoad = () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('[SW] 등록 성공:', registration.scope);
        })
        .catch((error) => {
          console.error('[SW] 등록 실패:', error);
        });
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Cleanup: remove event listener if component unmounts before load
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
}

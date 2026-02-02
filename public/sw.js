const CACHE_NAME = 'whatcat-v1';
const OFFLINE_URL = '/';

// 캐싱할 리소스 목록
const urlsToCache = [
  '/',
  '/nyongmatch',
  '/about',
  '/faq',
  '/privacy',
  '/terms',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] 캐시 열기');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] 오래된 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 네트워크 요청 처리 (Cache First 전략)
self.addEventListener('fetch', (event) => {
  // API 요청은 캐싱하지 않음
  if (event.request.url.includes('/api/')) {
    return;
  }

  // 정적 리소스는 Cache First
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('[SW] 캐시 히트:', event.request.url);
        return response;
      }

      return fetch(event.request).then((response) => {
        // 정상 응답이고 GET 요청인 경우만 캐싱
        if (!response || response.status !== 200 || response.type !== 'basic' || event.request.method !== 'GET') {
          return response;
        }

        // 응답 복제 후 캐싱
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }).catch(() => {
      // 오프라인인 경우
      if (event.request.mode === 'navigate') {
        return caches.match(OFFLINE_URL);
      }
    })
  );
});

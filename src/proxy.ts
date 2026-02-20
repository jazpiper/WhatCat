import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  void request;
  const response = NextResponse.next();

  // 보안 헤더 추가
  // Content-Security-Policy (CSP): 스크립트, 스타일, 이미지 등의 출처 제한
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pagead2.googlesyndication.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https:",
      "frame-src 'self' https://tpc.googlesyndication.com",
      "media-src 'self' https:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "report-uri /api/csp-violation",
    ].join('; ')
  );

  // X-Frame-Options: 클릭재킹 방지
  response.headers.set('X-Frame-Options', 'DENY');

  // X-Content-Type-Options: MIME 스니핑 방지
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // X-XSS-Protection: 브라우저 XSS 필터 활성화
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer-Policy: 리퍼러 정보 제한
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions-Policy: 기능 제한 (지문 추적 방지)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // X-Powered-By 헤더 제거 (이미 next.config.ts에서 설정했지만 추가 보안)
  response.headers.delete('X-Powered-By');

  // Strict-Transport-Security (HTTPS) - 프로덕션에서만
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    );
  }

  return response;
}

// 모든 경로에 미들웨어 적용
export const config = {
  matcher: [
    /*
     * 모든 경로에 매칭:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (static file)
     * - api/csp-violation (CSP 위반 보고)
     */
    {
      source: '/((?!api/csp-violation|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
      ],
    },
  ],
};

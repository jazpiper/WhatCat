import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 설정
  images: {
    unoptimized: false, // Vercel Image Optimization 활성화
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF 우선순위
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // 60일 캐싱
  },

  // 보안 및 성능 최적화
  compress: true, // gzip 압축
  poweredByHeader: false, // X-Powered-By 헤더 제거
  productionBrowserSourceMaps: false, // Source Map 제거 (production)
  reactStrictMode: true, // React 엄격 모드

  // Turbopack 설정 (Next.js 16 기본값)
  turbopack: {},

  // 캐싱 헤더 설정
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

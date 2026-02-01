import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 설정
  images: {
    unoptimized: false, // Vercel Image Optimization 활성화
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // 보안 및 성능 최적화
  compress: true, // gzip 압축
  poweredByHeader: false, // X-Powered-By 헤더 제거
  productionBrowserSourceMaps: false, // Source Map 제거 (production)
  reactStrictMode: true, // React 엄격 모드

  // Turbopack 설정 (Next.js 16 기본값)
  turbopack: {},
};

export default nextConfig;

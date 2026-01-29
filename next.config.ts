import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixnio.com',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'www.dreamstime.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pikbest.com',
      },
    ],
  },
};

export default nextConfig;

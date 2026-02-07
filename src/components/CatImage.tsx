'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Cat as CatIcon } from 'lucide-react';

interface CatImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function CatImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = undefined,
}: CatImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (imageError) {
    // Placeholder when image fails to load
    return (
      <div
        className={`
          bg-gradient-to-br from-pink-100 to-purple-100
          flex items-center justify-center
          ${className}
        `}
        style={{ width, height }}
      >
        <div className="text-center">
          <CatIcon className="w-12 h-12 text-pink-400 mx-auto mb-2" />
          <p className="text-pink-400 text-xs">이미지 준비 중 🐱</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className={`
            bg-gradient-to-br from-pink-100 to-purple-100
            flex items-center justify-center animate-pulse
            ${className}
          `}
          style={{ width, height }}
        >
          <CatIcon className="w-8 h-8 text-pink-300" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`
          ${isLoading ? 'absolute opacity-0' : 'opacity-100'}
          transition-opacity duration-300
          ${className}
        `}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setImageError(true);
        }}
      />
    </>
  );
}

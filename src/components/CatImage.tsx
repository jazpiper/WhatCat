'use client';

import { memo, useState } from 'react';
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
  showCredit?: boolean;
  credit?: string;
}

// Extract object-fit class from className for the Image component
function getImageClassNames(className: string): { wrapper: string; image: string } {
  const classes = className.split(' ').filter(Boolean);
  const imageOnly: string[] = [];
  const wrapper: string[] = [];

  for (const cls of classes) {
    if (cls.startsWith('object-')) {
      imageOnly.push(cls);
    } else {
      wrapper.push(cls);
    }
  }

  return {
    wrapper: wrapper.join(' '),
    image: imageOnly.join(' '),
  };
}

function CatImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = undefined,
  showCredit = false,
  credit = 'Photo by Pexels',
}: CatImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { wrapper: wrapperClasses, image: imageClasses } = getImageClassNames(className);

  if (imageError) {
    // Placeholder when image fails to load
    return (
      <div
        className={`
          bg-gradient-to-br from-pink-100 to-purple-100
          flex items-center justify-center
          ${wrapperClasses}
        `}
      >
        <div className="text-center">
          <CatIcon className="w-12 h-12 text-pink-400 mx-auto mb-2" />
          <p className="text-pink-400 text-xs">이미지 준비 중 🐱</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${wrapperClasses}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center animate-pulse rounded-inherit">
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
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-300
          w-full h-full rounded-inherit
          ${imageClasses || 'object-cover'}
        `}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setImageError(true);
        }}
      />
      {showCredit && !isLoading && (
        <div className="absolute bottom-1 right-1 text-[8px] text-white/70 bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {credit}
        </div>
      )}
    </div>
  );
}

export default memo(CatImage);

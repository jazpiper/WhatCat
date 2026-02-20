'use client';

import CatImage from '@/components/CatImage';
import { getRankEmoji } from '@/utils/matching';
import { Breed } from '@/types';

interface ResultHeaderProps {
    breed: Breed;
    animatedScore: number;
}

export default function ResultHeader({ breed, animatedScore }: ResultHeaderProps) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-4">
                🎉 나와 가장 잘 맞는 냥이는!
            </h1>

            <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-8 mb-8 shadow-inner">
                {breed.image && (
                    <CatImage
                        src={breed.image}
                        alt={breed.name}
                        width={192}
                        height={192}
                        sizes="(max-width: 640px) 192px, 192px"
                        priority
                        className="w-48 h-48 mx-auto rounded-2xl object-cover mb-4 shadow-lg border-4 border-white"
                    />
                )}
                <div className="text-6xl mb-2">{breed.emoji}</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl">{getRankEmoji(1)}</span>
                    <h2 className="text-4xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                        {breed.name}
                    </h2>
                </div>
                <p className="text-xl text-pink-600 font-semibold transition-all duration-300">
                    매칭 점수: {animatedScore}%
                </p>
            </div>
        </div>
    );
}

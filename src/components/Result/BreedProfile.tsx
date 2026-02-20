'use client';

import { memo } from 'react';
import { Breed } from '@/types';
import { getMaintenanceStars } from '@/utils/breedHelpers';
import { calculateCatMBTI } from '@/utils/catMBTI';
import MBTIBadge from './MBTIBadge';

interface BreedProfileProps {
    breed: Breed;
}

// Memoized star display component
const MaintenanceStars = memo(function MaintenanceStars({ level }: { level: number }) {
    return <span>{getMaintenanceStars(level)}</span>;
});

export default function BreedProfile({ breed }: BreedProfileProps) {
    const mbti = calculateCatMBTI(breed);

    return (
        <div className="space-y-6">
            {/* MBTI 뱃지 섹션 */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 text-left border border-purple-100 dark:border-purple-800/40">
                <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-4 flex items-center gap-2">
                    <span className="text-purple-500" aria-hidden="true">🌟</span> 고양이 MBTI
                </h3>
                <div className="flex items-center gap-4 mb-4">
                    <MBTIBadge mbti={mbti} size="lg" showEmoji={true} showNickname={true} />
                </div>
                <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] text-sm leading-relaxed">{mbti.description}</p>
            </div>

            <div className="bg-[var(--bg-page)] dark:bg-[var(--bg-surface)] rounded-2xl p-6 text-left border border-[var(--border-default)] dark:border-[var(--border-default)]">
                <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-4 flex items-center gap-2">
                    <span className="text-pink-500" aria-hidden="true">📋</span> 품종 프로필
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-[var(--border-default)] dark:border-[var(--border-default)] pb-2">
                        <span className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">성격:</span>
                        <span className="font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                            {breed.traits.join(', ')}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[var(--border-default)] dark:border-[var(--border-default)] pb-2">
                        <span className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">관리 난이도:</span>
                        <span className="font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                            <MaintenanceStars level={breed.maintenance.grooming} />
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[var(--border-default)] dark:border-[var(--border-default)] pb-2">
                        <span className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">크기:</span>
                        <span className="font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                            {breed.size}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[var(--border-default)] dark:border-[var(--border-default)] pb-2">
                        <span className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">털 길이:</span>
                        <span className="font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                            {breed.coat}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-left border border-blue-100 dark:border-blue-800/50">
                <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-2 flex items-center gap-2">
                    <span className="text-blue-500" aria-hidden="true">💡</span> 적합 환경
                </h3>
                <p className="text-[var(--text-primary)] dark:text-[var(--text-secondary)] leading-relaxed">{breed.description}</p>
            </div>
        </div>
    );
}

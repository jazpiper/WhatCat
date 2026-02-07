'use client';

import { Breed } from '@/types';

interface BreedProfileProps {
    breed: Breed;
}

export default function BreedProfile({ breed }: BreedProfileProps) {
    const getMaintenanceStars = (level: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(i < level ? '⭐' : '☆');
        }
        return stars.join('');
    };

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-pink-500">📋</span> 품종 프로필
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600">성격:</span>
                        <span className="font-semibold text-gray-800">
                            {breed.traits.join(', ')}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600">관리 난이도:</span>
                        <span className="font-semibold text-gray-800">
                            {getMaintenanceStars(breed.maintenance.grooming)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600">크기:</span>
                        <span className="font-semibold text-gray-800">
                            {breed.size}
                        </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <span className="text-gray-600">털 길이:</span>
                        <span className="font-semibold text-gray-800">
                            {breed.coat}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-left border border-blue-100">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-blue-500">💡</span> 적합 환경
                </h3>
                <p className="text-gray-700 leading-relaxed">{breed.description}</p>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFormValidation, ValidationSchemas } from '@/utils/formValidation';

interface FriendCompareProps {
    friendLink: string;
    setFriendLink: (value: string) => void;
    onCompare: () => void;
}

export default function FriendCompare({
    friendLink,
    setFriendLink,
    onCompare,
}: FriendCompareProps) {
    const { errors, validate, validateField, clearFieldError, hasErrors } = useFormValidation(
        ValidationSchemas.friendLink
    );
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Real-time validation when link changes
    useEffect(() => {
        if (hasSubmitted && friendLink) {
            validateField('friendLink', friendLink);
        }
    }, [friendLink, hasSubmitted, validateField]);

    const handleCompare = useCallback(() => {
        setHasSubmitted(true);

        const isValid = validate({ friendLink });
        if (!isValid) {
            return; // Don't proceed if validation fails
        }

        onCompare();
    }, [friendLink, validate, onCompare]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFriendLink(e.target.value);
        if (hasSubmitted) {
            validateField('friendLink', e.target.value);
        }
    }, [setFriendLink, hasSubmitted, validateField]);

    return (
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-pink-500">🤝</span> 친구 결과랑 비교하기
            </h3>

            <div className="space-y-4">
                <div>
                    <label htmlFor="friend-link" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                        친구의 결과 링크를 입력해주세요
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                            <input
                                id="friend-link"
                                type="text"
                                value={friendLink}
                                onChange={handleInputChange}
                                onFocus={() => {
                                    if (hasSubmitted && !errors.friendLink) {
                                        clearFieldError('friendLink');
                                    }
                                }}
                                placeholder="https://what-cat-psi.vercel.app/result?..."
                                className={`w-full px-4 py-3 rounded-xl border-2 focus:ring-2 focus:outline-none text-gray-800 transition-all ${
                                    errors.friendLink
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-pink-500 focus:ring-pink-200'
                                }`}
                                aria-label="친구 결과 링크 입력"
                                aria-invalid={!!errors.friendLink}
                                aria-describedby={errors.friendLink ? 'friend-link-error' : undefined}
                            />
                            {errors.friendLink && (
                                <p id="friend-link-error" className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <span>⚠️</span>
                                    <span>{errors.friendLink}</span>
                                </p>
                            )}
                        </div>
                        <button
                            onClick={handleCompare}
                            disabled={!friendLink.trim() || hasErrors}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
                        >
                            비교하기
                        </button>
                    </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                    <div className="flex gap-3">
                        <span className="text-xl mt-0.5">💡</span>
                        <div className="text-sm text-gray-700 leading-relaxed">
                            <p className="font-bold text-purple-900 mb-1">어떻게 비교하나요?</p>
                            <p>친구가 보내준 결과 링크를 위 칸에 넣고 버튼을 누르면, 두 분의 고양이 품종을 나란히 비교해볼 수 있어요!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

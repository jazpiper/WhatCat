'use client';

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
                        <input
                            id="friend-link"
                            type="text"
                            value={friendLink}
                            onChange={(e) => setFriendLink(e.target.value)}
                            placeholder="https://what-cat-psi.vercel.app/result?..."
                            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none text-gray-800 transition-all"
                            aria-label="친구 결과 링크 입력"
                        />
                        <button
                            onClick={onCompare}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95"
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

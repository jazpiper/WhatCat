'use client';

import {
    Download,
    MessageCircle,
    Share2,
    AtSign,
    Instagram,
    Copy,
    Star
} from 'lucide-react';

interface SocialShareProps {
    onDownload: () => void;
    onShareKakao: () => void;
    onShareX: () => void;
    onShareThreads: () => void;
    onShareInstagram?: () => void;
    onShareInstagramStory: () => void;
    onShareCelebrityStory?: () => void;
    onCopyLink: () => void;
    isDownloading: boolean;
    isGeneratingStory: boolean;
    isGeneratingCelebrityStory?: boolean;
    copied: boolean;
    shareCopy: string;
    hasCelebrityMatch?: boolean;
}

export default function SocialShare({
    onDownload,
    onShareKakao,
    onShareX,
    onShareThreads,
    onShareInstagramStory,
    onShareCelebrityStory,
    onCopyLink,
    isDownloading,
    isGeneratingStory,
    isGeneratingCelebrityStory,
    copied,
    shareCopy,
    hasCelebrityMatch = true,
}: SocialShareProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center flex items-center justify-center gap-2">
                <span className="text-pink-500">✨</span> 결과 공유하기
            </h3>

            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-4 mb-6 border border-pink-100 dark:border-pink-800/50">
                <p className="text-gray-800 dark:text-gray-100 text-sm leading-relaxed">{shareCopy}</p>
            </div>

            <div className={`grid gap-3 ${hasCelebrityMatch && onShareCelebrityStory ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-7' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
                <button
                    onClick={onDownload}
                    disabled={isDownloading}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 ${isDownloading
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-br from-pink-500 to-purple-600 text-white hover:shadow-lg'
                        }`}
                    aria-label="결과 이미지를 갤러리에 저장"
                >
                    {isDownloading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    ) : (
                        <Download size={24} aria-hidden="true" />
                    )}
                    <span className="text-xs font-bold">이미지 저장</span>
                </button>

                <button
                    onClick={onShareKakao}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-[#FEE500] text-[#3C1E1E] hover:shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                    aria-label="카카오톡으로 결과 공유"
                >
                    <MessageCircle size={24} fill="#3C1E1E" aria-hidden="true" />
                    <span className="text-xs font-bold">카카오톡</span>
                </button>

                <button
                    onClick={onShareX}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-black text-white hover:shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    aria-label="X(트위터)로 결과 공유"
                >
                    <Share2 size={24} aria-hidden="true" />
                    <span className="text-xs font-bold">X</span>
                </button>

                <button
                    onClick={onShareThreads}
                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-900 text-white hover:shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                    aria-label="스레드로 결과 공유"
                >
                    <AtSign size={24} aria-hidden="true" />
                    <span className="text-xs font-bold">스레드</span>
                </button>

                <button
                    onClick={onShareInstagramStory}
                    disabled={isGeneratingStory}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 ${isGeneratingStory
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white hover:shadow-lg'
                        }`}
                    aria-label="인스타그램 스토리용 이미지 저장"
                >
                    {isGeneratingStory ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    ) : (
                        <Instagram size={24} aria-hidden="true" />
                    )}
                    <span className="text-xs font-bold">{isGeneratingStory ? '생성 중...' : '스토리'}</span>
                </button>

                {hasCelebrityMatch && onShareCelebrityStory && (
                    <button
                        onClick={onShareCelebrityStory}
                        disabled={isGeneratingCelebrityStory}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 ${isGeneratingCelebrityStory
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white hover:shadow-lg'
                            }`}
                        aria-label="유명인 매칭 스토리 이미지 저장"
                    >
                        {isGeneratingCelebrityStory ? (
                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        ) : (
                            <Star size={24} aria-hidden="true" />
                        )}
                        <span className="text-xs font-bold">{isGeneratingCelebrityStory ? '생성 중...' : '유명인 스토리'}</span>
                    </button>
                )}

                <button
                    onClick={onCopyLink}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 ${copied
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    aria-live="polite"
                    aria-label={copied ? "링크가 복사되었습니다" : "결과 페이지 링크 복사"}
                >
                    <Copy size={24} aria-hidden="true" />
                    <span className="text-xs font-bold">
                        {copied ? '복사 완료!' : '링크 복사'}
                    </span>
                </button>
            </div>
        </div>
    );
}

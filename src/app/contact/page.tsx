'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-6">
                    <Link href="/" className="text-pink-500 hover:underline flex items-center gap-2">
                        <ArrowLeft size={20} />
                        처음으로
                    </Link>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6 text-center">
                        문의하기
                    </h1>

                    <div className="text-center mb-10 text-[var(--text-secondary)]">
                        <p className="mb-2">냥이 매칭 서비스 이용 중 궁금한 점이나 제안하고 싶은 내용이 있으신가요?</p>
                        <p>아래 채널을 통해 문의해 주시면 정성껏 답변해 드리겠습니다.</p>
                    </div>

                    <div className="flex justify-center">
                        {/* Email Contact */}
                        <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 flex flex-col items-center text-center group hover:shadow-md transition-all max-w-sm w-full">
                            <div className="bg-pink-500 text-white p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                <Mail size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">이메일 문의</h2>
                            <p className="text-[var(--text-secondary)] mb-4 sm:text-sm">일반 문의 및 제휴 제안</p>
                            <a
                                href="mailto:slots_just.6q@icloud.com"
                                className="text-pink-600 font-semibold hover:underline"
                            >
                                slots_just.6q@icloud.com
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-[var(--bg-page)] rounded-2xl">
                        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                            <MessageSquare className="text-pink-500" size={20} />
                            자주 묻는 질문(FAQ) 안내
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-4">
                            문의하시기 전에 FAQ 페이지를 먼저 확인해 보세요. 대부분의 궁금증을 빠르게 해결하실 수 있습니다.
                        </p>
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                        >
                            FAQ 바로가기
                        </Link>
                    </div>

                    <div className="mt-10 text-center text-sm text-[var(--text-secondary)]">
                        <p>보통 평일 기준 24시간 이내에 답변을 드리고자 노력하고 있습니다.</p>
                        <p className="mt-1">감사합니다. 🐱</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

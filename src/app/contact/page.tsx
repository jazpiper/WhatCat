'use client';

import { ArrowLeft, Mail, Github, ChevronDown, Bug, Star, GitFork, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center gap-2 mb-6 inline-block"
        >
          <ArrowLeft size={20} />
          처음으로
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            문의하기
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-center mb-8">
            문의사항이 있으시면 아래 방법으로 연락해주세요
          </p>

          {/* Contact Sections */}
          <div className="space-y-6">
            {/* FAQ Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">❓</span>
                자주 묻는 질문
              </h2>

              {/* FAQ Accordion */}
              <div className="space-y-3">
                {/* Question 1 */}
                <details className="group bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer p-4 font-semibold text-gray-800 hover:bg-pink-100 transition-colors flex items-center justify-between">
                    <span>테스트 결과가 맞지 않아요</span>
                    <span className="transform group-open:rotate-180 transition-transform">
                      <ChevronDown size={20} />
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    테스트는 사용자의 답변을 기반으로 알고리즘에 의해 계산됩니다.
                    완벽한 정확도를 보장할 수 없지만, 대다분의 경우 유사한 품종을 추천합니다.
                    다양한 품종 정보를 참고하여 결정해주세요.
                  </div>
                </details>

                {/* Question 2 */}
                <details className="group bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer p-4 font-semibold text-gray-800 hover:bg-purple-100 transition-colors flex items-center justify-between">
                    <span>고양이 입양은 어떻게 하나요?</span>
                    <span className="transform group-open:rotate-180 transition-transform">
                      <ChevronDown size={20} />
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    <p className="mb-3">지역 내 동물 보호소, 고양이 카페, 전문 브리더 등에서 입양이 가능합니다.</p>
                    <Link
                      href="/guides/adoption"
                      className="text-pink-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      입양 가이드 보기
                    </Link>
                  </div>
                </details>

                {/* Question 3 */}
                <details className="group bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl overflow-hidden">
                  <summary className="cursor-pointer p-4 font-semibold text-gray-800 hover:bg-blue-100 transition-colors flex items-center justify-between">
                    <span>서비스에 버그가 있어요</span>
                    <span className="transform group-open:rotate-180 transition-transform">
                      <ChevronDown size={20} />
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-700">
                    버그를 발견하셨다면 GitHub Issues에 제보해주세요.
                    자세한 정보(스크린샷, 재현 방법 등)를 함께 제출해주시면 빠르게 수정하겠습니다.
                  </div>
                </details>
              </div>
            </section>

            {/* Email Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📧</span>
                이메일 문의
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {/* General Inquiry */}
                <a
                  href="mailto:contact@what-cat-psi.vercel.app?subject=[일반문의]"
                  className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">일반 문의</h3>
                    <p className="text-sm text-pink-100">서비스, 제휴, 기타 문의</p>
                  </div>
                </a>

                {/* Bug Report */}
                <a
                  href="mailto:bug@what-cat-psi.vercel.app?subject=[버그제보]"
                  className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <div className="bg-white/20 rounded-full p-3 group-hover:bg-white/30 transition-colors">
                    <Bug size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">버그 제보</h3>
                    <p className="text-sm text-purple-100">오류, 장애 신고</p>
                  </div>
                </a>
              </div>
            </section>

            {/* Social Media Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📱</span>
                소셜 미디어
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com/whatcat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 text-center group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">Instagram</h3>
                  <p className="text-sm text-gray-600">@whatcat</p>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@whatcat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 text-center group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🎬</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">YouTube</h3>
                  <p className="text-sm text-gray-600">@whatcat</p>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@whatcat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-black to-gray-800 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 text-center group focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🎵</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">TikTok</h3>
                  <p className="text-sm text-gray-600">@whatcat</p>
                </a>
              </div>
            </section>

            {/* GitHub Section */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                GitHub (개발자)
              </h2>

              <a
                href="https://github.com/jazpiper/WhatCat"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 rounded-full p-3">
                    <Github size={40} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-1">jazpiper/WhatCat</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      오픈소스 프로젝트 - 코드, 이슈, 토론 참여
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star size={14} />
                        ⭐ Star
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={14} />
                        🍴 Fork
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        💬 Discuss
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </section>

            {/* Contact Info Summary */}
            <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-xl p-6 mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                📋 연락처 요약
              </h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                  <Mail className="text-pink-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">이메일</p>
                    <p className="font-semibold text-gray-800">contact@what-cat-psi.vercel.app</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                  <Github className="text-purple-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">GitHub</p>
                    <p className="font-semibold text-gray-800">github.com/jazpiper/WhatCat</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-lg p-4">
                  <Clock className="text-blue-500" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">응답 시간</p>
                    <p className="font-semibold text-gray-800">평일 1~2일 내</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

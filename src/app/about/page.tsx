'use client';

import Link from 'next/link';
import { ArrowLeft, Github, Mail } from 'lucide-react';

export default function AboutPage() {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            냥이 매치 소개
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                🐱 서비스 개요
              </h2>
              <p>
                냥이 매치는 사용자의 라이프스타일, 성향, 환경을 분석하여
                가장 잘 어울리는 고양이 품종을 추천하는 MBTI 스타일 테스트 서비스입니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                🎯 주요 기능
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-gray-800">14개 질문</strong> - 다양한 라이프스타일과 성향 분석</li>
                <li><strong className="text-gray-800">20종 품종 데이터</strong> - 한국 인기 품종 포함</li>
                <li><strong className="text-gray-800">매칭 알고리즘</strong> - 5대 카테고리 가중치 기반 점수 계산</li>
                <li><strong className="text-gray-800">결과 공유</strong> - 카카오톡, 스레드, 링크 복사</li>
                <li><strong className="text-gray-800">친구 비교</strong> - 두 결과를 나란히 비교</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                🤖 기술 스택
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">프레임워크</h3>
                  <p>Next.js 16 (App Router)</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">언어</h3>
                  <p>TypeScript</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">스타일링</h3>
                  <p>Tailwind CSS</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2">배포</h3>
                  <p>Vercel</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                📊 평가 카테고리
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-gray-800">라이프스타일 (30%)</strong> - 외출 빈도, 주거 공간, 혼사 유무</li>
                <li><strong className="text-gray-800">성격 (25%)</strong> - 활동성, 애정 표현, 사교성</li>
                <li><strong className="text-gray-800">관리 용이성 (20%)</strong> - 그루밍, 훈련 난이도</li>
                <li><strong className="text-gray-800">외형 선호 (15%)</strong> - 크기, 털 길이</li>
                <li><strong className="text-gray-800">비용 (10%)</strong> - 초기 비용, 월 비용</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                💡 사용 팁
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>답변을 신중하게 선택하여 정확한 결과를 얻으세요.</li>
                <li>결과를 친구와 공유하고 품종을 비교해보세요!</li>
                <li>추천 품종에 대한 추가 정보는 동물 병원이나 전문가와 상담하세요.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                📝 저작권
              </h2>
              <p>
                © 2026 냥이 매치. All rights reserved.
              </p>
              <p className="text-sm mt-2 text-gray-600">
                본 서비스의 모든 콘텐츠는 냥이 매치에 저작권이 있습니다.
                상업적 이용 시 별도의 허락이 필요합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                📧 문의 및 연락처
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://github.com/jazpiper/WhatCat/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-3"
                >
                  <Github size={32} />
                  <div>
                    <h3 className="font-bold text-lg">GitHub Issues</h3>
                    <p className="text-sm text-gray-300">버그 제보, 기능 요청</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@what-cat-psi.vercel.app"
                  className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-3"
                >
                  <Mail size={32} />
                  <div>
                    <h3 className="font-bold text-lg">이메일</h3>
                    <p className="text-sm text-pink-100">문의 및 제휴 문의</p>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

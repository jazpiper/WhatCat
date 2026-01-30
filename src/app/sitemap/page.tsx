'use client';

import Link from 'next/link';
import { Home, TestTube, Compare, BookOpen, Paw, Info, HelpCircle, Shield } from 'lucide-react';

const sitemapData = {
  main: {
    title: '메인',
    icon: Home,
    pages: [
      { path: '/', label: '홈', description: 'WhatCat 메인 페이지' },
      { path: '/test', label: '테스트', description: '고양이 품종 테스트 시작하기' },
      { path: '/compare', label: '결과 비교', description: '테스트 결과 비교 및 공유' },
    ],
  },
  guides: {
    title: '가이드',
    icon: BookOpen,
    pages: [
      { path: '/guides/adoption', label: '입양 가이드', description: '고양이 입양 전 알아두기', comingSoon: true },
      { path: '/guides/beginner', label: '초보자 가이드', description: '고양이 키우는 법 기초', comingSoon: true },
    ],
  },
  breeds: {
    title: '품종',
    icon: Paw,
    pages: [
      { path: '/breed/american-shorthair', label: '아메리칸 숏헤어', description: '친근하고 적응력이 좋은 품종' },
      { path: '/breed/scottish-fold', label: '스코티시 폴드', description: '접힌 귀가 특징인 애교 만점 품종' },
      { path: '/breed/russian-blue', label: '러시안 블루', description: '우아한 은빛 털과 조용한 성격' },
      { path: '/breed/maine-coon', label: '메인 쿤', description: '거대한 체구와 온순한 성격' },
      { path: '/breed/british-shorthair', label: '브리티시 숏헤어', description: '둥근 얼굴과 차분한 성격' },
      { path: '/breed/ragdoll', label: '래그돌', description: '처진 자세로 안기는 것을 좋아하는 품종' },
    ],
  },
  etc: {
    title: '기타',
    icon: Info,
    pages: [
      { path: '/about', label: '소개', description: 'WhatCat 서비스 소개' },
      { path: '/faq', label: 'FAQ', description: '자주 묻는 질문' },
      { path: '/privacy', label: '개인정보처리방침', description: '개인정보 보호 정책' },
    ],
  },
};

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            사이트맵
          </h1>
          <p className="text-gray-600 text-lg">WhatCat의 모든 페이지를 한눈에 확인하세요</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {Object.entries(sitemapData).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <div
                key={key}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100"
              >
                <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">{category.title}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {category.pages.map((page) => (
                      <li key={page.path}>
                        <Link
                          href={page.path}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-200"
                        >
                          <div className="mt-0.5">
                            {page.comingSoon ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                곧 옵니다
                              </span>
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mt-2 group-hover:scale-125 transition-transform" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold text-gray-800 group-hover:text-purple-600 transition-colors ${page.comingSoon ? 'text-gray-400' : ''}`}>
                                {page.label}
                              </span>
                              <span className="text-xs text-gray-400 font-mono">{page.path}</span>
                            </div>
                            <p className={`text-sm mt-1 ${page.comingSoon ? 'text-gray-400' : 'text-gray-500'}`}>
                              {page.description}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}

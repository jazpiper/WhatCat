'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Cat, Heart, BookOpen } from 'lucide-react';
import { trackGuideViewed } from '@/utils/achievements';
import { PageContainer, Card, Section } from '@/components/ui';

const guides = [
  {
    id: 'adoption',
    name: '입양 가이드',
    nameEn: 'Adoption Guide',
    icon: Heart,
    description: '고양이 입양 전 고려사항, 입양 장소 비교, 준비 체크리스트',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'beginner',
    name: '초보자 가이드',
    nameEn: 'Beginner Guide',
    icon: BookOpen,
    description: '고양이 기본 행동, 식사/화장실 관리, 필수 용품, 건강 관리',
    color: 'from-purple-500 to-indigo-500',
  },
];

export default function GuidesPage() {
  // Track guide page visit for achievement
  useEffect(() => {
    trackGuideViewed();
  }, []);

  return (
    <PageContainer className="pt-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 py-16 -mx-4 -mt-8 px-4 mb-8 dark:from-pink-600 dark:via-purple-600 dark:to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Cat className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            냥이 가이드
          </h1>
          <p className="text-white/90 text-lg">
            고양이 입양부터 초보자까지 필요한 모든 정보를 한 곳에서!
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="group"
            >
              <Card
                variant="elevated"
                className="overflow-hidden transform transition-all duration-300 hover:scale-[1.02] p-0"
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${guide.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 rounded-full p-3">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <h2 className="text-2xl font-bold text-white">
                        {guide.name}
                      </h2>
                      <p className="text-white/80 text-sm">
                        {guide.nameEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {guide.description}
                  </p>
                  <div
                    className={`
                      inline-flex items-center gap-2
                      bg-gradient-to-r ${guide.color}
                      text-white px-4 py-2 rounded-full text-sm font-medium
                      group-hover:opacity-90 transition-opacity
                    `}
                  >
                    가이드 보기
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Tips Section */}
      <Section title="가이드 활용 팁" emoji="💡" className="mt-12">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-pink-500 font-bold">•</span>
            <span>
              <strong className="text-gray-800 dark:text-gray-100">입양 전:</strong> 입양 가이드를 통해 환경과 준비물을 미리 확인하세요
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 font-bold">•</span>
            <span>
              <strong className="text-gray-800 dark:text-gray-100">초보자:</strong> 초보자 가이드로 기본 지식부터 천천히 배워보세요
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-pink-500 font-bold">•</span>
            <span>
              <strong className="text-gray-800 dark:text-gray-100">매칭 전:</strong> 냥이매칭 테스트로 나의 인생냥이를 찾아보세요
            </span>
          </li>
        </ul>
      </Section>
    </PageContainer>
  );
}

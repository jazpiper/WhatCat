'use client';

import { useState, Suspense } from 'react';
import BadgeGallery from '@/components/Achievement/BadgeGallery';
import { achievements } from '@/data/achievements';
import { useAchievements, useAchievementsPageViewed } from '@/hooks/useAchievements';
import { Trophy, Target, Share2, Info } from 'lucide-react';
import type { Achievement } from '@/types';
import AchievementsSkeleton from '@/components/Skeleton/AchievementsSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PageContainer, Card, PageTitle, Section } from '@/components/ui';

export default function AchievementsPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<AchievementsSkeleton />}>
        <AchievementsPageContent />
      </Suspense>
    </ErrorBoundary>
  );
}

function AchievementsPageContent() {
  const { unlockedAchievements, userAchievements } = useAchievements();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  useAchievementsPageViewed();

  const handleAchievementClick = (achievementId: string) => {
    const achievement = achievements.find((a) => a.id === achievementId);
    if (achievement) {
      setSelectedAchievement(achievement);
    }
  };

  const isUnlocked = (achievementId: string) => {
    return userAchievements.unlocked.includes(achievementId);
  };

  return (
    <>
      <PageContainer>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
            <Trophy className="text-white" size={32} fill="currentColor" />
          </div>
          <PageTitle subtitle="다양한 도전 과제를 완료하고 뱃지를 수집하세요!">
            도전 과제
          </PageTitle>
        </div>

        {/* Cache Notice */}
        <Card variant="outlined" className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                데이터 저장 안내
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                도전 과제와 테스트 결과는 브라우저에 저장됩니다.
                브라우저 캐시를 삭제하거나 다른 기기에서 접속하면 데이터가 초기화될 수 있습니다.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Trophy className="text-yellow-500" />}
            label="달성한 과제"
            value={`${unlockedAchievements.length}/${achievements.length}`}
          />
          <StatCard
            icon={<Target className="text-pink-500" />}
            label="진행률"
            value={`${Math.round((unlockedAchievements.length / achievements.length) * 100)}%`}
          />
          <StatCard
            icon={<Share2 className="text-blue-500" />}
            label="완료한 테스트"
            value={userAchievements.state.testsCompleted.toString()}
          />
          <StatCard
            icon={<Info className="text-purple-500" />}
            label="최고 점수"
            value={`${userAchievements.state.highestScore}%`}
          />
        </div>

        {/* Achievement Gallery */}
        <Card className="mb-8">
          <BadgeGallery onAchievementClick={handleAchievementClick} />
        </Card>

        {/* How to Earn Section */}
        <Section title="도전 과제 달성 방법" emoji="🎯" className="mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isUnlocked(achievement.id)
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                    : 'bg-[var(--bg-page)] dark:bg-[var(--bg-surface)] border-[var(--border-default)] dark:border-[var(--border-default)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">{achievement.nameKo}</h3>
                      {isUnlocked(achievement.id) && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                          달성 완료
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-2">{achievement.description}</p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        achievement.rarity === 'legendary'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                          : achievement.rarity === 'epic'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                          : achievement.rarity === 'rare'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                          : 'bg-[var(--bg-page)] text-[var(--text-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-secondary)]'
                      }`}
                    >
                      {
                        {
                          common: '일반',
                          rare: '희귀',
                          epic: '에픽',
                          legendary: '전설',
                        }[achievement.rarity]
                      }
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Achievement Detail Modal */}
        {selectedAchievement && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedAchievement(null)}
          >
            <div
              className="max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Card variant="elevated">
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedAchievement.icon}</div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] mb-1">
                  {selectedAchievement.nameKo}
                </h3>
                <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mb-2">{selectedAchievement.name}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedAchievement.rarity === 'legendary'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                      : selectedAchievement.rarity === 'epic'
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                      : selectedAchievement.rarity === 'rare'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'bg-[var(--bg-page)] text-[var(--text-primary)] dark:bg-[var(--bg-surface)] dark:text-[var(--text-secondary)]'
                  }`}
                >
                  {
                    {
                      common: '일반',
                      rare: '희귀',
                      epic: '에픽',
                      legendary: '전설',
                    }[selectedAchievement.rarity]
                  }{' '}
                  랭크
                </span>
              </div>

              <div className="mt-4 p-4 bg-[var(--bg-page)] dark:bg-[var(--bg-surface)] rounded-xl">
                <p className="text-[var(--text-primary)] dark:text-[var(--text-secondary)] text-center">{selectedAchievement.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">상태:</span>
                <span
                  className={`font-bold ${
                    isUnlocked(selectedAchievement.id)
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {isUnlocked(selectedAchievement.id) ? '달성 완료! 🎉' : '미달성'}
                </span>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                닫기
              </button>
              </Card>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-[var(--text-secondary)] dark:text-[var(--text-secondary)] text-sm">
          <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
        </footer>
      </PageContainer>
    </>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card variant="default" className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[var(--bg-page)] dark:bg-[var(--bg-surface)] rounded-lg">{icon}</div>
        <span className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">{value}</p>
    </Card>
  );
}

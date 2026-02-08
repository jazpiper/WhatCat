'use client';

import { useState, Suspense } from 'react';
import BadgeGallery from '@/components/Achievement/BadgeGallery';
import { achievements } from '@/data/achievements';
import { useAchievements, useAchievementsPageViewed } from '@/hooks/useAchievements';
import { Trophy, Target, Share2, Info } from 'lucide-react';
import type { Achievement } from '@/types';
import AchievementsSkeleton from '@/components/Skeleton/AchievementsSkeleton';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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
      <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <Trophy className="text-white" size={32} fill="currentColor" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              도전 과제
            </h1>
            <p className="text-gray-600">
              다양한 도전 과제를 완료하고 뱃지를 수집하세요!
            </p>
          </div>

          {/* Cache Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-8">
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
          </div>

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
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <BadgeGallery onAchievementClick={handleAchievementClick} />
          </div>

          {/* How to Earn Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="text-pink-500" />
              도전 과제 달성 방법
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isUnlocked(achievement.id)
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-800">{achievement.nameKo}</h3>
                        {isUnlocked(achievement.id) && (
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                            달성 완료
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          achievement.rarity === 'legendary'
                            ? 'bg-yellow-100 text-yellow-700'
                            : achievement.rarity === 'epic'
                            ? 'bg-purple-100 text-purple-700'
                            : achievement.rarity === 'rare'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
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
          </div>

          {/* Achievement Detail Modal */}
          {selectedAchievement && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setSelectedAchievement(null)}
            >
              <div
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{selectedAchievement.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {selectedAchievement.nameKo}
                  </h3>
                  <p className="text-gray-500 mb-2">{selectedAchievement.name}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedAchievement.rarity === 'legendary'
                        ? 'bg-yellow-100 text-yellow-700'
                        : selectedAchievement.rarity === 'epic'
                        ? 'bg-purple-100 text-purple-700'
                        : selectedAchievement.rarity === 'rare'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
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

                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 text-center">{selectedAchievement.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">상태:</span>
                  <span
                    className={`font-bold ${
                      isUnlocked(selectedAchievement.id)
                        ? 'text-green-600'
                        : 'text-gray-400'
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
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm">
            <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
          </footer>
        </div>
      </main>
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
    <div className="bg-white rounded-2xl shadow-md p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

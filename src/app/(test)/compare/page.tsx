'use client';

import breeds from '@/data/breeds.json';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Suspense } from 'react';
import { useEffect } from 'react';
import { useFriendComparison } from '@/hooks/useAnalytics';
import { trackFriendComparison } from '@/utils/achievements';
import { calculateCompatibility, CompatibilityResult } from '@/utils/compatibility';
import { isValidMBTI, getMBTIByCode } from '@/utils/catMBTI';
import { Breed } from '@/types';
import CompatibilityCard from '@/components/Compatibility/CompatibilityCard';
import { PageContainer, Card } from '@/components/ui';

function CompareContent() {
  const searchParams = useSearchParams();
  const { trackComparison } = useFriendComparison();

  const breed1Id = searchParams.get('breed1');
  const score1 = searchParams.get('score1');
  const breed2Id = searchParams.get('breed2');
  const score2 = searchParams.get('score2');
  const mbti1Param = searchParams.get('mbti1');
  const mbti2Param = searchParams.get('mbti2');

  const breed1 = breeds.breeds.find((b) => b.id === breed1Id) as Breed | undefined;
  const breed2 = breeds.breeds.find((b) => b.id === breed2Id) as Breed | undefined;

  const numScore1 = score1 ? parseInt(score1) : 0;
  const numScore2 = score2 ? parseInt(score2) : 0;

  // 궁합 계산
  let compatibilityResult: CompatibilityResult | null = null;

  if (breed1 && breed2) {
    const baseResult = calculateCompatibility(breed1, breed2);

    // URL 파라미터로 MBTI가 지정된 경우 해당 MBTI로 덮어쓰기
    const mbti1 = (mbti1Param && isValidMBTI(mbti1Param))
      ? getMBTIByCode(mbti1Param)
      : baseResult.mbti1;
    const mbti2 = (mbti2Param && isValidMBTI(mbti2Param))
      ? getMBTIByCode(mbti2Param)
      : baseResult.mbti2;

    compatibilityResult = {
      ...baseResult,
      mbti1,
      mbti2,
    };
  }

  // Track comparison view event
  useEffect(() => {
    if (breed1 && breed2) {
      trackComparison(breed1.id, breed2.id);
      // Track achievement progress
      trackFriendComparison();
    }
  }, [breed1, breed2, trackComparison]);

  if (!breed1 || !breed2) {
    return (
      <PageContainer contentClassName="max-w-3xl">
        <Card className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            비교할 결과를 찾을 수 없습니다
          </h1>
          <p className="text-[var(--text-secondary)] mb-6">
            결과 URL이 올바르지 않습니다.
          </p>
          <Link
            href="/nyongmatch"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            냥이매칭 다시하기
          </Link>
        </Card>
      </PageContainer>
    );
  }

  const personalityDiff = {
    activity: Math.abs(breed1.personality.activity - breed2.personality.activity),
    quiet: Math.abs(breed1.personality.quiet - breed2.personality.quiet),
    social: Math.abs(breed1.personality.social - breed2.personality.social),
  };

  const personalityGroupDiff =
    (personalityDiff.activity + personalityDiff.quiet + personalityDiff.social) / 3;

  const maintenanceDiff = Math.abs(
    breed1.maintenance.grooming - breed2.maintenance.grooming
  );

  const diffCandidates = [
    { label: '성격 전반', diff: personalityGroupDiff },
    { label: '활동성', diff: personalityDiff.activity },
    { label: '조용함', diff: personalityDiff.quiet },
    { label: '사교성', diff: personalityDiff.social },
    { label: '관리 난이도', diff: maintenanceDiff },
  ];

  const maxDiff = Math.max(...diffCandidates.map((item) => item.diff));
  const topDiffs = diffCandidates.filter((item) => item.diff === maxDiff);

  const insight =
    maxDiff === 0
      ? '두 분의 성향이 꽤 비슷해서 비교 포인트가 작아요!'
      : topDiffs.length > 1
        ? `${topDiffs.map((item) => item.label).join(', ')} 항목이 비슷한 정도로 가장 크게 다릅니다!`
        : `${topDiffs[0].label}에서 가장 차이가 커요!`;
  const activityDiff = personalityDiff.activity;
  const quietDiff = personalityDiff.quiet;
  const socialDiff = personalityDiff.social;

  return (
    <PageContainer contentClassName="max-w-5xl">
      <div className="mb-6">
        <Link href="/" className="text-pink-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} />
          처음으로
        </Link>
      </div>

      {/* MBTI 궁합 카드 */}
      {compatibilityResult && (
        <div className="mb-6">
          <CompatibilityCard
            result={compatibilityResult}
            breed1Emoji={breed1.emoji}
            breed2Emoji={breed2.emoji}
            breed1Name={breed1.name}
            breed2Name={breed2.name}
          />
        </div>
      )}

      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-2">
          🤝 결과 비교
        </h1>
        <p className="text-center text-[var(--text-secondary)] mb-8">
          두 분의 테스트 결과를 비교해봤어요!
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">🙋</div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">나의 결과</p>
              <div className="text-4xl mb-2">{breed1.emoji}</div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                {breed1.name}
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">{breed1.nameEn}</p>
              <div className="mt-4 text-3xl font-bold text-pink-600">
                {numScore1}%
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">조용함:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed1.personality.quiet}/5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">활동성:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed1.personality.activity}/5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">사교성:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed1.personality.social}/5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">관리 난이도:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed1.maintenance.grooming}/5
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2">🧑‍🤝‍🧑</div>
              <p className="text-sm text-[var(--text-secondary)] mb-2">친구 결과</p>
              <div className="text-4xl mb-2">{breed2.emoji}</div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                {breed2.name}
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">{breed2.nameEn}</p>
              <div className="mt-4 text-3xl font-bold text-purple-600">
                {numScore2}%
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">조용함:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed2.personality.quiet}/5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">활동성:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed2.personality.activity}/5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">사교성:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed2.personality.social}/5
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">관리 난이도:</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {breed2.maintenance.grooming}/5
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">📊</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">
              비교 인사이트
            </h3>
          </div>
          <p className="text-[var(--text-secondary)] text-center text-lg mb-4">{insight}</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[var(--bg-surface)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activityDiff < 2 ? 'bg-green-100' : 'bg-orange-100'
                  }`}
                >
                  {activityDiff < 2 ? (
                    <Minus size={16} className="text-green-600" />
                  ) : activityDiff > 2 ? (
                    <TrendingUp size={16} className="text-orange-600" />
                  ) : (
                    <Minus size={16} className="text-[var(--text-secondary)]" />
                  )}
                </div>
                <span className="font-semibold text-[var(--text-primary)]">활동성</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                {breed1.personality.activity > breed2.personality.activity
                  ? '나의 냥이가 더 활동적이에요'
                  : '친구 냥이가 더 활동적이에요'}
              </p>
            </div>

            <div className="bg-[var(--bg-surface)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    quietDiff < 2 ? 'bg-green-100' : 'bg-orange-100'
                  }`}
                >
                  {quietDiff < 2 ? (
                    <Minus size={16} className="text-green-600" />
                  ) : quietDiff > 2 ? (
                    <TrendingDown size={16} className="text-orange-600" />
                  ) : (
                    <Minus size={16} className="text-[var(--text-secondary)]" />
                  )}
                </div>
                <span className="font-semibold text-[var(--text-primary)]">조용함</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                {breed1.personality.quiet > breed2.personality.quiet
                  ? '나의 냥이가 더 조용해요'
                  : '친구 냥이가 더 조용해요'}
              </p>
            </div>

            <div className="bg-[var(--bg-surface)] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    socialDiff < 2 ? 'bg-green-100' : 'bg-orange-100'
                  }`}
                >
                  {socialDiff < 2 ? (
                    <Minus size={16} className="text-green-600" />
                  ) : socialDiff > 2 ? (
                    <TrendingUp size={16} className="text-orange-600" />
                  ) : (
                    <Minus size={16} className="text-[var(--text-secondary)]" />
                  )}
                </div>
                <span className="font-semibold text-[var(--text-primary)]">사교성</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                {breed1.personality.social > breed2.personality.social
                  ? '나의 냥이가 더 사교적이에요'
                  : '친구 냥이가 더 사교적이에요'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/nyongmatch"
          className="flex items-center justify-center gap-2 bg-[var(--bg-surface)] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
        >
          <span className="text-4xl">🧪</span>
          <div className="text-left">
            <h3 className="font-bold text-[var(--text-primary)]">다시 냥이매칭하기</h3>
            <p className="text-sm text-[var(--text-secondary)]">새로운 품종 찾기</p>
          </div>
        </Link>

        <Link
          href="/result"
          className="flex items-center justify-center gap-2 bg-[var(--bg-surface)] rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
        >
          <span className="text-4xl">🏠</span>
          <div className="text-left">
            <h3 className="font-bold text-[var(--text-primary)]">내 결과 보기</h3>
            <p className="text-sm text-[var(--text-secondary)]">나의 품종 상세보기</p>
          </div>
        </Link>
      </div>

      <footer className="text-center mt-8 text-[var(--text-secondary)] text-sm">
        <p>&copy; 2026 냥이 매칭. All rights reserved.</p>
      </footer>
    </PageContainer>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <PageContainer>
        <div className="flex items-center justify-center min-h-[60vh]">로딩 중...</div>
      </PageContainer>
    }>
      <CompareContent />
    </Suspense>
  );
}

'use client';

import Link from 'next/link';
import type { MatchResult } from '@/utils/matching';
import { buildMatchingExplanation } from '@/utils/matchingExplanation';
import { getRankEmoji } from '@/utils/matching';
import CatImage from '@/components/CatImage';

interface RecommendationReasonCardsProps {
  results: MatchResult[];
}

export default function RecommendationReasonCards({ results }: RecommendationReasonCardsProps) {
  if (!results || results.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">💌 TOP 3 추천 이유</h3>
        <p className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mt-1">점수만 보지 말고, 나에게 맞는 포인트를 같이 확인해봐요.</p>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => {
          const exp = buildMatchingExplanation(result);

          return (
            <div
              key={result.breed.id}
              className="bg-white dark:bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-default)] dark:border-[var(--border-default)] shadow-sm p-5"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0" aria-hidden="true">
                  {getRankEmoji(index + 1)}
                </div>

                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-3xl" aria-hidden="true">{result.breed.emoji}</div>
                  {result.breed.image && (
                    <CatImage
                      src={result.breed.image}
                      alt={result.breed.name}
                      width={44}
                      height={44}
                      sizes="44px"
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-[var(--text-primary)] dark:text-[var(--text-secondary)] truncate">{result.breed.name}</h4>
                      <span className="text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">{result.breed.nameEn}</span>
                      <span className="text-sm font-semibold text-pink-600">{result.score}%</span>
                    </div>
                    {exp.badges && exp.badges.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {exp.badges.map((b) => (
                          <span
                            key={b}
                            className="text-xs px-2 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/breed/${result.breed.id}`}
                  className="text-sm text-purple-600 dark:text-purple-300 hover:underline flex-shrink-0"
                >
                  상세보기
                </Link>
              </div>

              <div className="mt-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/50">
                <p className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)] leading-relaxed">{exp.summary}</p>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="bg-white/70 dark:bg-[var(--bg-surface)] rounded-xl p-3 border border-white dark:border-[var(--border-default)]">
                    <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">좋은 점</p>
                    <ul className="mt-2 space-y-1.5">
                      {exp.pros.map((line, i) => (
                        <li key={i} className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)] leading-relaxed">
                          • {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/70 dark:bg-[var(--bg-surface)] rounded-xl p-3 border border-white dark:border-[var(--border-default)]">
                    <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">조금만 주의해요</p>
                    <ul className="mt-2 space-y-1.5">
                      {exp.cons.map((line, i) => (
                        <li key={i} className="text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)] leading-relaxed">
                          • {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

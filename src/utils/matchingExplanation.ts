import type { MatchResult } from '@/utils/matching';

export interface MatchingExplanation {
  /** 1~2줄 요약 (감성 톤) */
  summary: string;
  /** 장점 2~3개 */
  pros: string[];
  /** 주의 1~2개 */
  cons: string[];
  /** 선택: 짧은 배지(칩) */
  badges?: string[];
}

type Category = keyof MatchResult['breakdown'];

const CATEGORY_LABEL: Record<Category, string> = {
  personality: '성격',
  maintenance: '관리',
  lifestyle: '라이프',
  appearance: '취향',
  cost: '비용',
};

const CATEGORY_BADGE: Record<Category, { good: string; caution: string }> = {
  personality: { good: '궁합 찰떡', caution: '성격 포인트 체크' },
  maintenance: { good: '손이 덜 가요', caution: '케어 난이도 주의' },
  lifestyle: { good: '일상에 잘 맞아요', caution: '생활패턴 점검' },
  appearance: { good: '취향 저격', caution: '외형 취향 확인' },
  cost: { good: '부담이 적어요', caution: '예산 여유 필요' },
};

function isMeaningfulBreakdown(breakdown: MatchResult['breakdown']): boolean {
  // URL 공유로 들어온 경우 0으로 채워지는 케이스가 있음
  const sum =
    breakdown.personality +
    breakdown.maintenance +
    breakdown.lifestyle +
    breakdown.appearance +
    breakdown.cost;
  return sum > 0;
}

function clampList<T>(items: T[], min: number, max: number, filler: () => T): T[] {
  const out = [...items];
  while (out.length < min) out.push(filler());
  return out.slice(0, max);
}

function pickTopCategories(breakdown: MatchResult['breakdown']): Category[] {
  const entries = Object.entries(breakdown) as Array<[Category, number]>;
  return entries.sort((a, b) => b[1] - a[1]).map(([k]) => k);
}

function pickLowCategories(breakdown: MatchResult['breakdown']): Category[] {
  const entries = Object.entries(breakdown) as Array<[Category, number]>;
  return entries.sort((a, b) => a[1] - b[1]).map(([k]) => k);
}

function makeProLine(breedName: string, category: Category, score: number): string {
  switch (category) {
    case 'personality':
      return score >= 85
        ? `성격 결이 비슷해서, ${breedName}와 지내는 시간이 편안하게 이어져요.`
        : `성격 쪽에서 무난하게 잘 맞는 편이라, 같이 있으면 마음이 놓여요.`;
    case 'maintenance':
      return score >= 85
        ? `관리 포인트가 잘 맞아서, 일상 케어가 생각보다 수월할 수 있어요.`
        : `케어 루틴이 크게 부담되지 않는 쪽이라, 꾸준히 챙기기 좋아요.`;
    case 'lifestyle':
      return score >= 85
        ? `생활 리듬이 잘 맞아, 함께 사는 그림이 자연스럽게 그려져요.`
        : `라이프스타일 궁합이 좋아서, 서로의 템포를 존중하기 쉬워요.`;
    case 'appearance':
      return score >= 85
        ? `외형 취향을 제대로 저격하는 타입이라, 볼수록 더 애정이 쌓여요.`
        : `취향 쪽에서 만족도가 높아, 첫인상부터 호감이 오래 가요.`;
    case 'cost':
      return score >= 85
        ? `예산 감각이 잘 맞아, 현실적인 계획을 세우기 좋아요.`
        : `비용 부담이 비교적 합리적인 편이라, 마음의 여유가 생겨요.`;
    default:
      return `${CATEGORY_LABEL[category]} 쪽이 잘 맞아요.`;
  }
}

function makeConLine(category: Category): string {
  switch (category) {
    case 'personality':
      return '성격 포인트는 상황에 따라 체감이 달라요. 실제로 함께 지낼 환경을 한번 상상해봐요.';
    case 'maintenance':
      return '관리/케어는 작은 습관 차이에서 부담이 생길 수 있어요. 루틴을 미리 정해두면 좋아요.';
    case 'lifestyle':
      return '생활패턴이 어긋나면 스트레스가 쌓일 수 있어요. 집에 있는 시간과 활동량을 점검해봐요.';
    case 'appearance':
      return '외형 취향은 시간이 지나며 기준이 바뀌기도 해요. 털 길이/크기 선호를 다시 확인해봐요.';
    case 'cost':
      return '비용은 예상보다 변동이 커요(병원/용품). 비상금까지 포함해 여유 있게 잡아두면 안전해요.';
    default:
      return `${CATEGORY_LABEL[category]} 부분은 한 번 더 체크해봐요.`;
  }
}

function defaultProsFiller(): string {
  return '전체적으로 균형이 좋아, 무리 없이 친해질 가능성이 커요.';
}

function defaultConsFiller(): string {
  return '어떤 냥이든 처음 적응 기간은 필요해요. 천천히, 차분하게 맞춰가면 돼요.';
}

/**
 * 매칭 결과를 기반으로 감성 톤(B) 추천 이유를 생성합니다.
 */
export function buildMatchingExplanation(result: MatchResult): MatchingExplanation {
  const { breed, score, breakdown } = result;

  if (!isMeaningfulBreakdown(breakdown)) {
    return {
      summary: `"${breed.name}"와의 궁합 점수는 ${score}%예요. 공유 링크로 들어온 결과라 상세 항목 분석은 간단히 보여드릴게요.`,
      pros: [
        '상위 추천에 들 만큼 기본 궁합이 좋아요.',
        '첫인상만 믿기보다, 생활 루틴과 케어 가능 범위를 같이 체크해보면 더 정확해요.',
      ],
      cons: ['세부 성향 점수(성격/관리/라이프 등)는 테스트 데이터가 있어야 더 정확해져요.'],
      badges: ['TOP 추천'],
    };
  }

  const topCats = pickTopCategories(breakdown);
  const lowCats = pickLowCategories(breakdown);

  const strong = topCats.filter((c) => breakdown[c] >= 75).slice(0, 3);
  const weak = lowCats.filter((c) => breakdown[c] <= 55).slice(0, 2);

  const pros = clampList(
    strong.map((c) => makeProLine(breed.name, c, breakdown[c])),
    2,
    3,
    defaultProsFiller
  );

  const cons = clampList(
    weak.map((c) => makeConLine(c)),
    1,
    2,
    defaultConsFiller
  );

  const best = topCats[0];
  const bestLabel = CATEGORY_LABEL[best];

  const badges: string[] = [];
  badges.push('TOP 3');
  if (score >= 85) badges.push('찰떡궁합');
  if (breakdown[best] >= 80) badges.push(CATEGORY_BADGE[best].good);
  if (weak[0]) badges.push(CATEGORY_BADGE[weak[0]].caution);

  const summary =
    score >= 85
      ? `"${breed.name}"는 지금의 당신과 정말 잘 맞는 편이에요. 특히 ${bestLabel} 궁합이 단단해서, 함께하는 시간이 따뜻하게 쌓일 거예요.`
      : `"${breed.name}"는 꽤 잘 맞는 선택이에요. 특히 ${bestLabel} 쪽에서 자연스러운 시너지가 기대돼요.`;

  return {
    summary,
    pros,
    cons,
    badges: Array.from(new Set(badges)).slice(0, 4),
  };
}

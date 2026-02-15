import { Breed, Question } from '@/types';

export interface VectorWeights {
  personality: number;
  maintenance: number;
  lifestyle: number;
  size: number;
  coat: number;
  cost: number;
}

export interface VectorMatchResult {
  breed: Breed;
  score: number;
  cosineSimilarity: number;
  euclideanDistance: number;
  breakdown: {
    personality: number;
    maintenance: number;
    lifestyle: number;
    appearance: number;
    cost: number;
  };
}

export interface UserProfileVector {
  // Personality (0-5)
  activity: number;
  affection: number;
  social: number;
  quiet: number;
  loyalty: number;

  // Maintenance (0-5)
  grooming: number;
  training: number;
  health: number;

  // Lifestyle (0-5)
  lifestyle: number;

  // Size (one-hot encoded)
  size_small: number;
  size_medium: number;
  size_large: number;
  size_xlarge: number;
  size_any: number;

  // Coat (one-hot encoded)
  coat_short: number;
  coat_medium: number;
  coat_long: number;
  coat_hairless: number;
  coat_any: number;

  // Cost (1-4, normalized to 0-1)
  cost_initial: number;
}

const DEFAULT_WEIGHTS: VectorWeights = {
  personality: 0.35,
  maintenance: 0.25,
  lifestyle: 0.15,
  size: 0.1,
  coat: 0.1,
  cost: 0.05,
};

const VECTOR_DIMENSIONS = 20;

/**
 * 사용자 답변을 20차원 벡터로 변환
 */
export function createUserVector(
  userAnswers: { questionId: string; answerId: string }[],
  questions: Question[]
): UserProfileVector {
  const userVector: UserProfileVector = {
    // Personality (0-5)
    activity: 2.5,
    affection: 3,
    social: 3.5,
    quiet: 3,
    loyalty: 3,

    // Maintenance (0-5)
    grooming: 3,
    training: 3,
    health: 3,

    // Lifestyle (0-5)
    lifestyle: 3.5,

    // Size (one-hot, 기본값: 상관없음)
    size_small: 0,
    size_medium: 0,
    size_large: 0,
    size_xlarge: 0,
    size_any: 1,

    // Coat (one-hot, 기본값: 상관없음)
    coat_short: 0,
    coat_medium: 0,
    coat_long: 0,
    coat_hairless: 0,
    coat_any: 1,

    // Cost (normalized 0-1)
    cost_initial: 0.5,
  };

  // 답변 집계용 카운터
  let personalityCount = 0;
  let maintenanceCount = 0;
  let lifestyleCount = 0;

  // 사용자 답변으로 벡터 구성
  for (const answer of userAnswers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const selectedOption = question.options.find((o) => o.id === answer.answerId);
    if (!selectedOption) continue;

    // Personality scores
    if (selectedOption.scores.personality) {
      const p = selectedOption.scores.personality;
      if (p.activity !== undefined) {
        userVector.activity = p.activity;
        personalityCount++;
      }
      if (p.affection !== undefined) {
        userVector.affection = p.affection;
        personalityCount++;
      }
      if (p.social !== undefined) {
        userVector.social = p.social;
        personalityCount++;
      }
      if (p.quiet !== undefined) {
        userVector.quiet = p.quiet;
        personalityCount++;
      }
      if (p.loyalty !== undefined) {
        userVector.loyalty = p.loyalty;
        personalityCount++;
      }
    }

    // Maintenance scores
    if (selectedOption.scores.maintenance) {
      const m = selectedOption.scores.maintenance;
      if (m.grooming !== undefined) {
        userVector.grooming = m.grooming;
        maintenanceCount++;
      }
      if (m.training !== undefined) {
        userVector.training = m.training;
        maintenanceCount++;
      }
      if (m.health !== undefined) {
        userVector.health = m.health;
        maintenanceCount++;
      }
    }

    // Lifestyle scores
    if (selectedOption.scores.lifestyle !== undefined) {
      userVector.lifestyle = selectedOption.scores.lifestyle;
      lifestyleCount++;
    }

    // Appearance (size & coat)
    if (selectedOption.scores.appearance) {
      const a = selectedOption.scores.appearance;
      if (a.size) {
        // Reset size one-hot
        userVector.size_small = 0;
        userVector.size_medium = 0;
        userVector.size_large = 0;
        userVector.size_xlarge = 0;
        userVector.size_any = 0;

        // Set corresponding size
        switch (a.size) {
          case 'small':
          case '소형':
            userVector.size_small = 1;
            break;
          case 'medium':
          case '중형':
            userVector.size_medium = 1;
            break;
          case 'large':
          case '대형':
            userVector.size_large = 1;
            break;
          case 'xlarge':
          case '초대형':
            userVector.size_xlarge = 1;
            break;
          default:
            userVector.size_any = 1;
        }
      }

      if (a.coat) {
        // Reset coat one-hot
        userVector.coat_short = 0;
        userVector.coat_medium = 0;
        userVector.coat_long = 0;
        userVector.coat_hairless = 0;
        userVector.coat_any = 0;

        // Set corresponding coat
        switch (a.coat) {
          case 'short':
          case '단모':
            userVector.coat_short = 1;
            break;
          case 'medium':
          case '중장모':
            userVector.coat_medium = 1;
            break;
          case 'long':
          case '장모':
            userVector.coat_long = 1;
            break;
          case 'hairless':
          case '무모':
            userVector.coat_hairless = 1;
            break;
          default:
            userVector.coat_any = 1;
        }
      }
    }

    // Cost
    if (selectedOption.scores.cost?.initial) {
      const costMap: Record<string, number> = {
        low: 0.25,
        medium: 0.5,
        high: 0.75,
        veryhigh: 1,
      };
      userVector.cost_initial = costMap[selectedOption.scores.cost.initial] ?? 0.5;
    }
  }

  // Lifestyle 점수 정규화 (0-5)
  if (lifestyleCount > 0) {
    userVector.lifestyle = Math.min(5, userVector.lifestyle / lifestyleCount * 5);
  }

  return userVector;
}

/**
 * 품종을 20차원 벡터로 변환
 */
export function createBreedVector(breed: Breed): UserProfileVector {
  // Size 매핑
  const sizeMap: Record<string, keyof UserProfileVector> = {
    'small': 'size_small',
    '소형': 'size_small',
    'medium': 'size_medium',
    '중형': 'size_medium',
    'large': 'size_large',
    '대형': 'size_large',
    'xlarge': 'size_xlarge',
    '초대형': 'size_xlarge',
  };

  const sizeKey = sizeMap[breed.size] || 'size_medium';

  // Coat 매핑
  const coatMap: Record<string, keyof UserProfileVector> = {
    'short': 'coat_short',
    '단모': 'coat_short',
    'medium': 'coat_medium',
    '중장모': 'coat_medium',
    'long': 'coat_long',
    '장모': 'coat_long',
    'hairless': 'coat_hairless',
    '무모': 'coat_hairless',
  };

  const coatKey = coatMap[breed.coat] || 'coat_short';

  // Cost 매핑
  const costMap: Record<string, number> = {
    low: 0.25,
    medium: 0.5,
    high: 0.75,
    veryhigh: 1,
  };

  return {
    // Personality (0-5)
    activity: breed.personality.activity,
    affection: breed.personality.affection,
    social: breed.personality.social,
    quiet: breed.personality.quiet,
    loyalty: breed.personality.loyalty,

    // Maintenance (0-5)
    grooming: breed.maintenance.grooming,
    training: breed.maintenance.training,
    health: breed.maintenance.health,

    // Lifestyle (0-5) - 품종은 항상 최적
    lifestyle: 5,

    // Size (one-hot)
    size_small: sizeKey === 'size_small' ? 1 : 0,
    size_medium: sizeKey === 'size_medium' ? 1 : 0,
    size_large: sizeKey === 'size_large' ? 1 : 0,
    size_xlarge: sizeKey === 'size_xlarge' ? 1 : 0,
    size_any: 0,

    // Coat (one-hot)
    coat_short: coatKey === 'coat_short' ? 1 : 0,
    coat_medium: coatKey === 'coat_medium' ? 1 : 0,
    coat_long: coatKey === 'coat_long' ? 1 : 0,
    coat_hairless: coatKey === 'coat_hairless' ? 1 : 0,
    coat_any: 0,

    // Cost (normalized 0-1)
    cost_initial: costMap[breed.cost.initial] ?? 0.5,
  };
}

/**
 * UserProfileVector를 20차원 배열로 변환
 */
export function vectorToArray(vector: UserProfileVector): number[] {
  return [
    // Personality (5)
    vector.activity,
    vector.affection,
    vector.social,
    vector.quiet,
    vector.loyalty,
    // Maintenance (3)
    vector.grooming,
    vector.training,
    vector.health,
    // Lifestyle (1)
    vector.lifestyle,
    // Size (5)
    vector.size_small,
    vector.size_medium,
    vector.size_large,
    vector.size_xlarge,
    vector.size_any,
    // Coat (5)
    vector.coat_short,
    vector.coat_medium,
    vector.coat_long,
    vector.coat_hairless,
    vector.coat_any,
    // Cost (1)
    vector.cost_initial,
  ];
}

/**
 * 가중치 배열 생성 (20차원)
 */
export function createWeightArray(weights: VectorWeights = DEFAULT_WEIGHTS): number[] {
  return [
    // Personality (5)
    weights.personality,
    weights.personality,
    weights.personality,
    weights.personality,
    weights.personality,
    // Maintenance (3)
    weights.maintenance,
    weights.maintenance,
    weights.maintenance,
    // Lifestyle (1)
    weights.lifestyle,
    // Size (5)
    weights.size,
    weights.size,
    weights.size,
    weights.size,
    weights.size,
    // Coat (5)
    weights.coat,
    weights.coat,
    weights.coat,
    weights.coat,
    weights.coat,
    // Cost (1)
    weights.cost,
  ];
}

/**
 * 가중치가 적용된 코사인 유사도 계산
 */
export function weightedCosineSimilarity(
  vecA: number[],
  vecB: number[],
  weights: number[]
): number {
  if (vecA.length !== vecB.length || vecA.length !== weights.length) {
    throw new Error('Vector dimensions must match');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    const weight = weights[i];
    // Weighted cosine similarity: apply weight consistently.
    // Using dot = Σ(w * a * b), norms = sqrt(Σ(w * a^2)) * sqrt(Σ(w * b^2))
    // keeps the result in [-1, 1] for non-negative weights.
    dotProduct += weight * vecA[i] * vecB[i];
    normA += weight * Math.pow(vecA[i], 2);
    normB += weight * Math.pow(vecB[i], 2);
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);

  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

/**
 * 일반 코사인 유사도 계산
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vector dimensions must match');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += Math.pow(vecA[i], 2);
    normB += Math.pow(vecB[i], 2);
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);

  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

/**
 * 유클리드 거리 계산
 */
export function euclideanDistance(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vector dimensions must match');
  }

  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    sum += Math.pow(vecA[i] - vecB[i], 2);
  }

  return Math.sqrt(sum);
}

/**
 * 벡터 기반 매칭 계산
 */
export function calculateVectorMatch(
  userAnswers: { questionId: string; answerId: string }[],
  breeds: Breed[],
  questions: Question[],
  weights?: Partial<VectorWeights>
): VectorMatchResult[] {
  // 가중치 병합
  const finalWeights: VectorWeights = {
    ...DEFAULT_WEIGHTS,
    ...weights,
  };

  // 사용자 벡터 생성
  const userVector = createUserVector(userAnswers, questions);
  const userVecArray = vectorToArray(userVector);
  const weightArray = createWeightArray(finalWeights);

  // 1) 각 품종별 raw similarity/distance 계산
  const raw = breeds.map((breed) => {
    const breedVector = createBreedVector(breed);
    const breedVecArray = vectorToArray(breedVector);

    const cosineSim = weightedCosineSimilarity(userVecArray, breedVecArray, weightArray);
    const euclideanDist = euclideanDistance(userVecArray, breedVecArray);

    const breakdown = {
      personality: calculatePersonalityMatch(userVector, breedVector),
      maintenance: calculateMaintenanceMatch(userVector, breedVector),
      lifestyle: calculateLifestyleMatch(userVector, breedVector),
      appearance: calculateAppearanceMatch(userVector, breedVector),
      cost: calculateCostMatch(userVector, breedVector),
    };

    return { breed, breedVector, cosineSim, euclideanDist, breakdown };
  });

  // 2) 사용자 세션 기준으로 min/max로 정규화해서 점수 분포를 만들기
  const cosVals = raw.map((r) => r.cosineSim);
  const distVals = raw.map((r) => r.euclideanDist);

  const minCos = Math.min(...cosVals);
  const maxCos = Math.max(...cosVals);
  const minDist = Math.min(...distVals);
  const maxDist = Math.max(...distVals);

  const safeDiv = (num: number, den: number) => (den === 0 ? 0 : num / den);

  const results: VectorMatchResult[] = raw.map((r) => {
    // cosine: 높을수록 좋음
    const normCos = maxCos === minCos ? 1 : safeDiv(r.cosineSim - minCos, maxCos - minCos);
    // distance: 낮을수록 좋음
    const normDist = maxDist === minDist ? 0 : safeDiv(r.euclideanDist - minDist, maxDist - minDist);

    // 최종 점수: cosine 70% + distance 30%
    const combined = 0.7 * normCos + 0.3 * (1 - normDist);
    const score = Math.round(Math.max(0, Math.min(100, combined * 100)));

    return {
      breed: r.breed,
      score,
      cosineSimilarity: r.cosineSim,
      euclideanDistance: r.euclideanDist,
      breakdown: r.breakdown,
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

/**
 * 성격 매칭 점수 계산
 */
function calculatePersonalityMatch(
  userVec: UserProfileVector,
  breedVec: UserProfileVector
): number {
  const diff =
    Math.abs(userVec.activity - breedVec.activity) +
    Math.abs(userVec.affection - breedVec.affection) +
    Math.abs(userVec.social - breedVec.social) +
    Math.abs(userVec.quiet - breedVec.quiet) +
    Math.abs(userVec.loyalty - breedVec.loyalty);

  const maxDiff = 20; // (5-1) * 5
  return Math.max(0, 100 - (diff / maxDiff) * 100);
}

/**
 * 관리 용이성 매칭 점수 계산
 */
function calculateMaintenanceMatch(
  userVec: UserProfileVector,
  breedVec: UserProfileVector
): number {
  const diff =
    Math.abs(userVec.grooming - breedVec.grooming) +
    Math.abs(userVec.training - breedVec.training) +
    Math.abs(userVec.health - breedVec.health);

  const maxDiff = 12; // (5-1) * 3
  return Math.max(0, 100 - (diff / maxDiff) * 100);
}

/**
 * 라이프스타일 매칭 점수 계산
 */
function calculateLifestyleMatch(
  userVec: UserProfileVector,
  breedVec: UserProfileVector
): number {
  return (userVec.lifestyle / 5) * 100;
}

/**
 * 외형 매칭 점수 계산
 */
function calculateAppearanceMatch(
  userVec: UserProfileVector,
  breedVec: UserProfileVector
): number {
  let score = 50;

  // Size 매칭
  if (userVec.size_any === 1) {
    score += 25;
  } else {
    if (userVec.size_small === 1 && breedVec.size_small === 1) score += 25;
    else if (userVec.size_small === 1 && breedVec.size_medium === 1) score += 10;
    else if (userVec.size_medium === 1 && (breedVec.size_small === 1 || breedVec.size_medium === 1 || breedVec.size_large === 1)) score += 25;
    else if (userVec.size_medium === 1 && breedVec.size_xlarge === 1) score += 10;
    else if (userVec.size_large === 1 && (breedVec.size_medium === 1 || breedVec.size_large === 1)) score += 25;
    else if (userVec.size_large === 1 && breedVec.size_xlarge === 1) score += 10;
    else if (userVec.size_xlarge === 1 && breedVec.size_large === 1) score += 10;
    else if (userVec.size_xlarge === 1 && breedVec.size_xlarge === 1) score += 25;
  }

  // Coat 매칭
  if (userVec.coat_any === 1) {
    score += 25;
  } else {
    if (userVec.coat_short === 1 && breedVec.coat_short === 1) score += 25;
    else if (userVec.coat_short === 1 && breedVec.coat_medium === 1) score += 10;
    else if (userVec.coat_medium === 1 && (breedVec.coat_short === 1 || breedVec.coat_medium === 1 || breedVec.coat_long === 1)) score += 25;
    else if (userVec.coat_long === 1 && (breedVec.coat_medium === 1 || breedVec.coat_long === 1)) score += 25;
    else if (userVec.coat_long === 1 && breedVec.coat_short === 1) score += 10;
    else if (userVec.coat_hairless === 1 && breedVec.coat_hairless === 1) score += 25;
  }

  return Math.min(100, score);
}

/**
 * 비용 매칭 점수 계산
 */
function calculateCostMatch(
  userVec: UserProfileVector,
  breedVec: UserProfileVector
): number {
  let score = 50;

  const userCost = userVec.cost_initial;
  const breedCost = breedVec.cost_initial;

  if (userCost >= breedCost) {
    score += 50;
  } else if (userCost + 0.25 >= breedCost) {
    score += 30;
  }

  return Math.min(100, score);
}

/**
 * 두 매칭 결과 비교 분석
 */
type ComparableMatchResult = {
  breed: { id: string; name: string };
  score: number;
};

type MatchComparisonDetail = {
  breedId: string;
  breedName: string;
  originalRank: number;
  vectorRank: number;
  rankChange: number;
  originalScore: number;
  vectorScore: number;
  cosineSimilarity: number;
  euclideanDistance: number;
};

export function compareMatchResults(
  originalResults: ComparableMatchResult[],
  vectorResults: VectorMatchResult[]
): {
  topMatchesChanged: boolean;
  top3Overlap: number;
  averageRankChange: number;
  detailedComparison: MatchComparisonDetail[];
} {
  const top3Original = new Set(
    originalResults.slice(0, 3).map((r) => r.breed.id)
  );
  const top3Vector = new Set(
    vectorResults.slice(0, 3).map((r) => r.breed.id)
  );

  const topMatchesChanged = !Array.from(top3Original).every((id) => top3Vector.has(id));
  const top3Overlap = Array.from(top3Original).filter((id) => top3Vector.has(id)).length;

  // 순위 변화 계산
  const originalRankMap = new Map(
    originalResults.map((r, i) => [r.breed.id, i])
  );
  const vectorRankMap = new Map(
    vectorResults.map((r, i) => [r.breed.id, i])
  );

  const rankChanges: number[] = [];
  const detailedComparison: MatchComparisonDetail[] = [];

  for (const [breedId, originalRank] of originalRankMap) {
    const vectorRank = vectorRankMap.get(breedId) ?? originalRank;
    rankChanges.push(Math.abs(originalRank - vectorRank));

    const originalResult = originalResults[originalRank];
    const vectorResult = vectorResults[vectorRank];

    detailedComparison.push({
      breedId,
      breedName: originalResult.breed.name,
      originalRank,
      vectorRank,
      rankChange: vectorRank - originalRank,
      originalScore: originalResult.score,
      vectorScore: vectorResult.score,
      cosineSimilarity: vectorResult.cosineSimilarity,
      euclideanDistance: vectorResult.euclideanDistance,
    });
  }

  const averageRankChange =
    rankChanges.reduce((sum, change) => sum + change, 0) / rankChanges.length;

  return {
    topMatchesChanged,
    top3Overlap,
    averageRankChange,
    detailedComparison,
  };
}

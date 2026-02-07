import { Breed, Question } from '@/types';

export interface UserScore {
  personality: {
    activity: number;
    affection: number;
    social: number;
    quiet: number;
    loyalty: number;
  };
  maintenance: {
    grooming: number;
    training: number;
    health: number;
  };
  lifestyle: number;
  appearance: {
    size: string; // small, medium, large, xlarge, any, 소형, 중형, 대형, 초대형, 상관없음
    coat: string; // short, medium, long, hairless, any, 단모, 중장모, 장모, 무모, 상관없음
  };
  cost: {
    initial: 'low' | 'medium' | 'high' | 'veryhigh';
    monthly: 'low' | 'medium' | 'high';
  };
}

export interface MatchResult {
  breed: Breed;
  score: number;
  breakdown: {
    personality: number;
    maintenance: number;
    lifestyle: number;
    appearance: number;
    cost: number;
  };
}

export function calculateMatch(
  userAnswers: { questionId: string; answerId: string }[],
  breeds: Breed[],
  questions: Question[]
): MatchResult[] {
  // 사용자 점수 집계
  const userScore = calculateUserScore(userAnswers, questions);

  // 각 품종별 매칭 점수 계산
  const results: MatchResult[] = breeds.map((breed) => {
    const breakdown = calculateBreedScore(userScore, breed);
    const totalScore = calculateTotalScore(breakdown);

    return {
      breed,
      score: Math.round(totalScore),
      breakdown,
    };
  });

  // 점수 순으로 정렬
  return results.sort((a, b) => b.score - a.score);
}

function calculateUserScore(
  userAnswers: { questionId: string; answerId: string }[],
  questions: Question[]
): UserScore {
  const userScore: UserScore = {
    personality: {
      activity: 0,
      affection: 0,
      social: 0,
      quiet: 0,
      loyalty: 0,
    },
    maintenance: {
      grooming: 0,
      training: 0,
      health: 0,
    },
    lifestyle: 0,
    appearance: {
      size: 'any',
      coat: 'any',
    },
    cost: {
      initial: 'low',
      monthly: 'low',
    },
  };

  let personalityCount = 0;
  let maintenanceCount = 0;
  let lifestyleCount = 0;

  for (const answer of userAnswers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const selectedOption = question.options.find((o) => o.id === answer.answerId);
    if (!selectedOption) continue;

    if (selectedOption.scores.personality) {
      const p = selectedOption.scores.personality;
      if (p.activity) {
        userScore.personality.activity += p.activity;
        personalityCount++;
      }
      if (p.affection) {
        userScore.personality.affection += p.affection;
        personalityCount++;
      }
      if (p.social) {
        userScore.personality.social += p.social;
        personalityCount++;
      }
      if (p.quiet) {
        userScore.personality.quiet += p.quiet;
        personalityCount++;
      }
      if (p.loyalty) {
        userScore.personality.loyalty += p.loyalty;
        personalityCount++;
      }
    }

    if (selectedOption.scores.maintenance) {
      const m = selectedOption.scores.maintenance;
      if (m.grooming) {
        userScore.maintenance.grooming += m.grooming;
        maintenanceCount++;
      }
      if (m.training) {
        userScore.maintenance.training += m.training;
        maintenanceCount++;
      }
      if (m.health) {
        userScore.maintenance.health += m.health;
        maintenanceCount++;
      }
    }

    if (selectedOption.scores.lifestyle !== undefined) {
      userScore.lifestyle += selectedOption.scores.lifestyle;
      lifestyleCount++;
    }

    if (selectedOption.scores.appearance) {
      const a = selectedOption.scores.appearance;
      if (a.size) {
        userScore.appearance.size = a.size;
      }
      if (a.coat) {
        userScore.appearance.coat = a.coat;
      }
    }

    if (selectedOption.scores.cost) {
      const c = selectedOption.scores.cost;
      if (c.initial) {
        userScore.cost.initial = c.initial;
      }
      if (c.monthly) {
        userScore.cost.monthly = c.monthly;
      }
    }
  }

  // 평균화 (0-5 사이로 정규화)
  if (personalityCount > 0) {
    const multiplier = 5 / personalityCount;
    userScore.personality.activity = Math.round(userScore.personality.activity * multiplier);
    userScore.personality.affection = Math.round(userScore.personality.affection * multiplier);
    userScore.personality.social = Math.round(userScore.personality.social * multiplier);
    userScore.personality.quiet = Math.round(userScore.personality.quiet * multiplier);
    userScore.personality.loyalty = Math.round(userScore.personality.loyalty * multiplier);
  }

  if (maintenanceCount > 0) {
    const multiplier = 5 / maintenanceCount;
    userScore.maintenance.grooming = Math.round(userScore.maintenance.grooming * multiplier);
    userScore.maintenance.training = Math.round(userScore.maintenance.training * multiplier);
    userScore.maintenance.health = Math.round(userScore.maintenance.health * multiplier);
  }

  if (lifestyleCount > 0) {
    userScore.lifestyle = Math.round((userScore.lifestyle / lifestyleCount) * 5);
  }

  return userScore;
}

function calculateBreedScore(userScore: UserScore, breed: Breed): MatchResult['breakdown'] {
  // 성격 매칭 (가중치 30%)
  // 최대 차이: (5-1) * 5 = 20
  const personalityDiff =
    Math.abs(userScore.personality.activity - breed.personality.activity) +
    Math.abs(userScore.personality.affection - breed.personality.affection) +
    Math.abs(userScore.personality.social - breed.personality.social) +
    Math.abs(userScore.personality.quiet - breed.personality.quiet) +
    Math.abs(userScore.personality.loyalty - breed.personality.loyalty);
  const maxPersonalityDiff = 20;
  const personalityScore = Math.max(0, 100 - (personalityDiff / maxPersonalityDiff) * 100);

  // 관리 용이성 매칭 (가중치 25%)
  // 최대 차이: (5-1) * 3 = 12
  const maintenanceDiff =
    Math.abs(userScore.maintenance.grooming - breed.maintenance.grooming) +
    Math.abs(userScore.maintenance.training - breed.maintenance.training) +
    Math.abs(userScore.maintenance.health - breed.maintenance.health);
  const maxMaintenanceDiff = 12;
  const maintenanceScore = Math.max(0, 100 - (maintenanceDiff / maxMaintenanceDiff) * 100);

  // 라이프스타일 매칭 (가중치 20%)
  // 사용자 라이프스타일 점수 (0-5)를 100점으로 환산
  // 환경 적합성 보너스 점수 (최대 10% 추가)
  let environmentBonus = 0;
  if (breed.environment.includes('apt') && userScore.lifestyle >= 4) {
    environmentBonus += 5; // 아파트 적합 + 높은 라이프스타일 점수
  }
  if (breed.environment.includes('quiet') && userScore.personality.quiet >= 4) {
    environmentBonus += 5; // 조용한 환경 선호 + 품종도 조용함
  }
  const lifestyleScore = Math.min(100, (userScore.lifestyle / 5) * 100 + environmentBonus);

  // 외형 선호 매칭 (가중치 15%)
  let appearanceScore = 50; // 기본 점수
  if (userScore.appearance.size !== 'any' && userScore.appearance.size !== '상관없음') {
    if (userScore.appearance.size === breed.size) {
      appearanceScore += 25;
    } else if (
      (userScore.appearance.size === 'medium' || userScore.appearance.size === '중형') && 
      (breed.size === 'small' || breed.size === '소형' || breed.size === 'large' || breed.size === '대형')
    ) {
      appearanceScore += 10;
    } else if (
      (userScore.appearance.size === 'large' || userScore.appearance.size === '대형') && 
      (breed.size === 'xlarge' || breed.size === '초대형')
    ) {
      appearanceScore += 10;
    }
  }
  if (userScore.appearance.coat !== 'any' && userScore.appearance.coat !== '상관없음') {
    if (userScore.appearance.coat === breed.coat) {
      appearanceScore += 25;
    } else if (
      (userScore.appearance.coat === 'short' || userScore.appearance.coat === '단모') && 
      (breed.coat === 'medium' || breed.coat === '중장모')
    ) {
      appearanceScore += 10;
    } else if (
      (userScore.appearance.coat === 'medium' || userScore.appearance.coat === '중장모') && 
      (breed.coat === 'short' || breed.coat === '단모' || breed.coat === 'long' || breed.coat === '장모')
    ) {
      appearanceScore += 10;
    }
  }

  // 비용 매칭 (가중치 10%)
  let costScore = 50; // 기본 점수
  const costOrder = { low: 1, medium: 2, high: 3, veryhigh: 4 };
  const userInitial = costOrder[userScore.cost.initial as keyof typeof costOrder];
  const breedInitial = costOrder[breed.cost.initial as keyof typeof costOrder];
  const userMonthly = costOrder[userScore.cost.monthly as keyof typeof costOrder];
  const breedMonthly = costOrder[breed.cost.monthly as keyof typeof costOrder];

  if (userInitial >= breedInitial) {
    costScore += 25;
  } else if (userInitial + 1 >= breedInitial) {
    costScore += 15;
  }

  if (userMonthly >= breedMonthly) {
    costScore += 25;
  } else if (userMonthly + 1 >= breedMonthly) {
    costScore += 15;
  }

  return {
    personality: personalityScore,
    maintenance: maintenanceScore,
    lifestyle: lifestyleScore,
    appearance: appearanceScore,
    cost: costScore,
  };
}

function calculateTotalScore(breakdown: MatchResult['breakdown']): number {
  return (
    breakdown.personality * 0.3 +
    breakdown.maintenance * 0.25 +
    breakdown.lifestyle * 0.2 +
    breakdown.appearance * 0.15 +
    breakdown.cost * 0.1
  );
}

export function getRankEmoji(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '🐱';
  }
}

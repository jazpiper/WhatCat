import { Breed } from '@/types';
import { MBTICode, CatMBTI, calculateCatMBTI } from './catMBTI';

export interface CompatibilityResult {
  score: number;
  grade: '천생연분' | '찰떡궁합' | '좋은 친구' | '배울 점 있음' | '야옹야옹';
  emoji: string;
  message: string;
  mbti1: CatMBTI;
  mbti2: CatMBTI;
}

/**
 * MBTI 간 기본 궁합 점수 (0-100)
 * 같은 그룹일수록 높은 점수, 보완적 관계도 높은 점수
 */
const MBTI_COMPATIBILITY_MATRIX: Record<MBTICode, Record<MBTICode, number>> = {
  // 분석가 그룹 (INTJ, INTP, ENTJ, ENTP)
  INTJ: {
    INTJ: 75, INTP: 85, ENTJ: 80, ENTP: 82,
    INFJ: 92, INFP: 78, ENFJ: 75, ENFP: 88,
    ISTJ: 80, ISFJ: 72, ESTJ: 78, ESFJ: 65,
    ISTP: 82, ISFP: 68, ESTP: 70, ESFP: 62,
  },
  INTP: {
    INTJ: 85, INTP: 70, ENTJ: 78, ENTP: 75,
    INFJ: 90, INFP: 82, ENFJ: 76, ENFP: 88,
    ISTJ: 75, ISFJ: 68, ESTJ: 72, ESFJ: 60,
    ISTP: 88, ISFP: 72, ESTP: 78, ESFP: 65,
  },
  ENTJ: {
    INTJ: 80, INTP: 78, ENTJ: 72, ENTP: 85,
    INFJ: 85, INFP: 72, ENFJ: 88, ENFP: 82,
    ISTJ: 82, ISFJ: 75, ESTJ: 85, ESFJ: 78,
    ISTP: 75, ISFP: 68, ESTP: 82, ESFP: 70,
  },
  ENTP: {
    INTJ: 82, INTP: 75, ENTJ: 85, ENTP: 70,
    INFJ: 95, INFP: 80, ENFJ: 85, ENFP: 88,
    ISTJ: 72, ISFJ: 68, ESTJ: 75, ESFJ: 72,
    ISTP: 85, ISFP: 75, ESTP: 88, ESFP: 80,
  },
  // 외교관 그룹 (INFJ, INFP, ENFJ, ENFP)
  INFJ: {
    INTJ: 92, INTP: 90, ENTJ: 85, ENTP: 95,
    INFJ: 72, INFP: 85, ENFJ: 82, ENFP: 92,
    ISTJ: 78, ISFJ: 85, ESTJ: 70, ESFJ: 75,
    ISTP: 80, ISFP: 88, ESTP: 72, ESFP: 75,
  },
  INFP: {
    INTJ: 78, INTP: 82, ENTJ: 72, ENTP: 80,
    INFJ: 85, INFP: 68, ENFJ: 88, ENFP: 85,
    ISTJ: 65, ISFJ: 82, ESTJ: 58, ESFJ: 78,
    ISTP: 72, ISFP: 90, ESTP: 68, ESFP: 82,
  },
  ENFJ: {
    INTJ: 75, INTP: 76, ENTJ: 88, ENTP: 85,
    INFJ: 82, INFP: 88, ENFJ: 70, ENFP: 90,
    ISTJ: 80, ISFJ: 88, ESTJ: 82, ESFJ: 92,
    ISTP: 72, ISFP: 78, ESTP: 80, ESFP: 88,
  },
  ENFP: {
    INTJ: 88, INTP: 88, ENTJ: 82, ENTP: 88,
    INFJ: 92, INFP: 85, ENFJ: 90, ENFP: 68,
    ISTJ: 70, ISFJ: 75, ESTJ: 72, ESFJ: 82,
    ISTP: 82, ISFP: 85, ESTP: 88, ESFP: 92,
  },
  // 관리자 그룹 (ISTJ, ISFJ, ESTJ, ESFJ)
  ISTJ: {
    INTJ: 80, INTP: 75, ENTJ: 82, ENTP: 72,
    INFJ: 78, INFP: 65, ENFJ: 80, ENFP: 70,
    ISTJ: 72, ISFJ: 85, ESTJ: 90, ESFJ: 82,
    ISTP: 82, ISFP: 72, ESTP: 78, ESFP: 68,
  },
  ISFJ: {
    INTJ: 72, INTP: 68, ENTJ: 75, ENTP: 68,
    INFJ: 85, INFP: 82, ENFJ: 88, ENFP: 75,
    ISTJ: 85, ISFJ: 70, ESTJ: 80, ESFJ: 92,
    ISTP: 75, ISFP: 88, ESTP: 72, ESFP: 85,
  },
  ESTJ: {
    INTJ: 78, INTP: 72, ENTJ: 85, ENTP: 75,
    INFJ: 70, INFP: 58, ENFJ: 82, ENFP: 72,
    ISTJ: 90, ISFJ: 80, ESTJ: 72, ESFJ: 85,
    ISTP: 78, ISFP: 65, ESTP: 85, ESFP: 75,
  },
  ESFJ: {
    INTJ: 65, INTP: 60, ENTJ: 78, ENTP: 72,
    INFJ: 75, INFP: 78, ENFJ: 92, ENFP: 82,
    ISTJ: 82, ISFJ: 92, ESTJ: 85, ESFJ: 70,
    ISTP: 68, ISFP: 80, ESTP: 78, ESFP: 90,
  },
  // 탐험가 그룹 (ISTP, ISFP, ESTP, ESFP)
  ISTP: {
    INTJ: 82, INTP: 88, ENTJ: 75, ENTP: 85,
    INFJ: 80, INFP: 72, ENFJ: 72, ENFP: 82,
    ISTJ: 82, ISFJ: 75, ESTJ: 78, ESFJ: 68,
    ISTP: 68, ISFP: 85, ESTP: 90, ESFP: 80,
  },
  ISFP: {
    INTJ: 68, INTP: 72, ENTJ: 68, ENTP: 75,
    INFJ: 88, INFP: 90, ENFJ: 78, ENFP: 85,
    ISTJ: 72, ISFJ: 88, ESTJ: 65, ESFJ: 80,
    ISTP: 85, ISFP: 65, ESTP: 82, ESFP: 92,
  },
  ESTP: {
    INTJ: 70, INTP: 78, ENTJ: 82, ENTP: 88,
    INFJ: 72, INFP: 68, ENFJ: 80, ENFP: 88,
    ISTJ: 78, ISFJ: 72, ESTJ: 85, ESFJ: 78,
    ISTP: 90, ISFP: 82, ESTP: 68, ESFP: 92,
  },
  ESFP: {
    INTJ: 62, INTP: 65, ENTJ: 70, ENTP: 80,
    INFJ: 75, INFP: 82, ENFJ: 88, ENFP: 92,
    ISTJ: 68, ISFJ: 85, ESTJ: 75, ESFJ: 90,
    ISTP: 80, ISFP: 92, ESTP: 92, ESFP: 72,
  },
};

/**
 * 궁합 등급 결정
 */
function getCompatibilityGrade(score: number): { grade: CompatibilityResult['grade']; emoji: string; message: string } {
  if (score >= 90) {
    return {
      grade: '천생연분',
      emoji: '💕',
      message: '이 두 냥이는 서로를 완벽하게 이해하는 천생연분이에요! 함께라면 뭐든 할 수 있어요.',
    };
  } else if (score >= 80) {
    return {
      grade: '찰떡궁합',
      emoji: '💗',
      message: '정말 찰떡궁합인 두 냥이! 서로의 장점을 더 빛나게 해주는 환상의 짝꿍이에요.',
    };
  } else if (score >= 70) {
    return {
      grade: '좋은 친구',
      emoji: '😊',
      message: '좋은 친구가 될 수 있는 조합이에요. 함께 놀면 즐거운 시간을 보낼 수 있어요.',
    };
  } else if (score >= 60) {
    return {
      grade: '배울 점 있음',
      emoji: '🤝',
      message: '서로 다른 점이 많지만, 그 차이에서 배울 점이 많은 조합이에요.',
    };
  } else {
    return {
      grade: '야옹야옹',
      emoji: '😸',
      message: '서로 스타일이 달라도 괜찮아요! 다름을 인정하며 천천히 친해져보세요.',
    };
  }
}

/**
 * 궁합 점수 계산
 * - 기본 MBTI 호환성: 60%
 * - 성격 보완성: 25%
 * - 환경 적합성: 15%
 */
export function calculateCompatibility(breed1: Breed, breed2: Breed): CompatibilityResult {
  const mbti1 = calculateCatMBTI(breed1);
  const mbti2 = calculateCatMBTI(breed2);

  // 1. 기본 MBTI 호환성 (60%)
  const mbtiBaseScore = MBTI_COMPATIBILITY_MATRIX[mbti1.code][mbti2.code];
  const mbtiContribution = mbtiBaseScore * 0.6;

  // 2. 성격 보완성 계산 (25%)
  // 유사할수록 높은 점수, 적당히 다르면 보완적 점수
  const personalitySimilarity = calculatePersonalitySimilarity(breed1, breed2);
  const complementarityScore = 100 - Math.abs(personalitySimilarity - 70) * 0.8;
  const complementarityContribution = complementarityScore * 0.25;

  // 3. 환경 적합성 (15%)
  const environmentScore = calculateEnvironmentFit(breed1, breed2);
  const environmentContribution = environmentScore * 0.15;

  // 총 점수 계산
  const totalScore = Math.round(mbtiContribution + complementarityContribution + environmentContribution);
  const clampedScore = Math.max(0, Math.min(100, totalScore));

  const { grade, emoji, message } = getCompatibilityGrade(clampedScore);

  return {
    score: clampedScore,
    grade,
    emoji,
    message,
    mbti1,
    mbti2,
  };
}

/**
 * 성격 유사도 계산 (0-100)
 */
function calculatePersonalitySimilarity(breed1: Breed, breed2: Breed): number {
  const p1 = breed1.personality;
  const p2 = breed2.personality;
  const m1 = breed1.maintenance;
  const m2 = breed2.maintenance;

  const differences = [
    Math.abs(p1.activity - p2.activity),
    Math.abs(p1.affection - p2.affection),
    Math.abs(p1.social - p2.social),
    Math.abs(p1.quiet - p2.quiet),
    Math.abs(p1.loyalty - p2.loyalty),
    Math.abs(m1.grooming - m2.grooming),
    Math.abs(m1.training - m2.training),
  ];

  const avgDifference = differences.reduce((a, b) => a + b, 0) / differences.length;
  const similarity = 100 - avgDifference * 20;

  return Math.max(0, Math.min(100, similarity));
}

/**
 * 환경 적합성 계산 (0-100)
 * 공통 환경 요소가 많을수록 높은 점수
 */
function calculateEnvironmentFit(breed1: Breed, breed2: Breed): number {
  const env1 = new Set(breed1.environment);
  const env2 = new Set(breed2.environment);

  const commonEnvironments = [...env1].filter(e => env2.has(e)).length;
  const totalUniqueEnvironments = new Set([...env1, ...env2]).size;

  if (totalUniqueEnvironments === 0) return 70;

  const fitScore = (commonEnvironments / totalUniqueEnvironments) * 100;
  return Math.max(50, fitScore);
}

/**
 * MBTI 코드로만 궁합 계산
 */
export function calculateCompatibilityByMBTI(mbti1: MBTICode, mbti2: MBTICode): number {
  return MBTI_COMPATIBILITY_MATRIX[mbti1][mbti2];
}

/**
 * 궁합 결과 요약 텍스트
 */
export function getCompatibilitySummary(result: CompatibilityResult): string {
  return `${result.mbti1.nickname}와 ${result.mbti2.nickname}의 궁합은 ${result.grade}! ${result.score}점으로 ${
    result.score >= 80 ? '아주 잘 맞는' : result.score >= 60 ? '꽤 괜찮은' : '서로 다른 매력이 있는'
  } 조합이에요.`;
}

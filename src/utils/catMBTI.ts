import { Breed } from '@/types';
import { mbtiDescriptions } from '@/data/mbtiDescriptions';

export type MBTICode =
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP';

export interface CatMBTI {
  code: MBTICode;
  nickname: string;
  description: string;
  emoji: string;
}

/**
 * MBTI 매핑 규칙:
 * - E/I: (활동성 + 사교성) / 2 >= 3.5 -> E, 아니면 I
 * - S/N: 조용함 >= 3 -> S, 아니면 N
 * - T/F: 애정도 >= 3 -> F, 아니면 T
 * - J/P: (충성심 + 훈련) / 2 >= 3 -> J, 아니면 P
 */
export function calculateCatMBTI(breed: Breed): CatMBTI {
  const { personality, maintenance } = breed;

  // E/I: (활동성 + 사교성) / 2 >= 3.5 -> E
  const eiScore = (personality.activity + personality.social) / 2;
  const ei = eiScore >= 3.5 ? 'E' : 'I';

  // S/N: 조용함 >= 3 -> S
  const sn = personality.quiet >= 3 ? 'S' : 'N';

  // T/F: 애정도 >= 3 -> F
  const tf = personality.affection >= 3 ? 'F' : 'T';

  // J/P: (충성심 + 훈련) / 2 >= 3 -> J
  const jpScore = (personality.loyalty + maintenance.training) / 2;
  const jp = jpScore >= 3 ? 'J' : 'P';

  const code = `${ei}${sn}${tf}${jp}` as MBTICode;
  return mbtiDescriptions[code];
}

/**
 * MBTI 코드만 반환 (설명 없이)
 */
export function getMBTICode(breed: Breed): MBTICode {
  return calculateCatMBTI(breed).code;
}

/**
 * MBTI 코드로 설명 반환
 */
export function getMBTIByCode(code: MBTICode): CatMBTI {
  return mbtiDescriptions[code];
}

/**
 * MBTI가 유효한지 확인
 */
export function isValidMBTI(code: string): code is MBTICode {
  const validCodes: MBTICode[] = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
  ];
  return validCodes.includes(code as MBTICode);
}

/**
 * MBTI 차원별 점수 계산 (디버깅/표시용)
 */
export function getMBTIDimensions(breed: Breed) {
  const { personality, maintenance } = breed;

  return {
    EI: {
      score: (personality.activity + personality.social) / 2,
      result: (personality.activity + personality.social) / 2 >= 3.5 ? 'E' : 'I',
      label: (personality.activity + personality.social) / 2 >= 3.5 ? '외향' : '내향',
    },
    SN: {
      score: personality.quiet,
      result: personality.quiet >= 3 ? 'S' : 'N',
      label: personality.quiet >= 3 ? '감각' : '직관',
    },
    TF: {
      score: personality.affection,
      result: personality.affection >= 3 ? 'F' : 'T',
      label: personality.affection >= 3 ? '감정' : '사고',
    },
    JP: {
      score: (personality.loyalty + maintenance.training) / 2,
      result: (personality.loyalty + maintenance.training) / 2 >= 3 ? 'J' : 'P',
      label: (personality.loyalty + maintenance.training) / 2 >= 3 ? '판단' : '인식',
    },
  };
}

export interface Breed {
  id: string;
  name: string;
  nameEn: string;
  emoji: string;
  image?: string;
  rank: number;
  personality: {
    activity: number; // 1-5
    affection: number; // 1-5
    social: number; // 1-5
    quiet: number; // 1-5
    loyalty: number; // 1-5
  };
  maintenance: {
    grooming: number; // 1-5
    training: number; // 1-5
    health: number; // 1-5
  };
  cost: {
    initial: 'low' | 'medium' | 'high' | 'veryhigh';
    monthly: 'low' | 'medium' | 'high';
  };
  environment: string[];
  traits: string[];
  size: string; // small, medium, large, xlarge, 소형, 중형, 대형, 초대형
  coat: string; // short, medium, long, hairless, 단모, 중장모, 장모, 무모
  colors: string[];
  description: string;
  korea_popularity: number; // 0-100
  origin?: string; // 품종 기원/역사
  features?: Array<{ // 품종 특징
    icon: string;
    text: string;
  }>;
  health_issues?: string[]; // 일반적인 건강 문제
  lifespan?: string; // 수명
  weight?: string; // 체중
  famous_matches?: FamousMatch[];
  result_percentage?: number; // 사용자 중 이 품종을 결과로 받은 비율
  fun_facts?: string[]; // 재미있는 사실
}

export interface Question {
  id: string;
  category: string;
  subCategory: string;
  question: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  scores: {
    personality?: {
      activity?: number;
      affection?: number;
      social?: number;
      quiet?: number;
      loyalty?: number;
    };
    maintenance?: {
      grooming?: number;
      training?: number;
      health?: number;
    };
    lifestyle?: number;
    appearance?: {
      size?:
        | 'small'
        | 'medium'
        | 'large'
        | 'xlarge'
        | 'any'
        | '소형'
        | '중형'
        | '대형'
        | '초대형'
        | '상관없음';
      coat?:
        | 'short'
        | 'medium'
        | 'long'
        | 'hairless'
        | 'any'
        | '단모'
        | '중장모'
        | '장모'
        | '무모'
        | '상관없음';
    };
    cost?: {
      initial?: 'low' | 'medium' | 'high' | 'veryhigh';
      monthly?: 'low' | 'medium' | 'high';
    };
  };
}

export interface AnswerScore {
  questionId: string;
  answerId: string;
}

export interface ShareResult {
  breedId: string;
  score: number;
  breedName?: string;
  emoji?: string;
}

export interface SavedResult {
  id: string;
  breedId: string;
  breedName: string;
  breedNameEn: string;
  emoji: string;
  score: number;
  date: string;
  personality?: {
    activity: number;
    affection: number;
    social: number;
    quiet: number;
    loyalty: number;
  };
}

export interface ResultStorageState {
  results: SavedResult[];
  lastUpdated: string;
}

export interface FamousMatch {
  name: string;
  type: 'celebrity' | 'character' | 'historical';
  description?: string;
}

export interface MatchReason {
  category: 'personality' | 'lifestyle' | 'appearance' | 'maintenance';
  title: string;
  description: string;
  icon: string;
}

export interface SimilarBreed {
  breed: Breed;
  similarity: number;
  keyDifference?: string;
}

// Achievement Types
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  icon: string;
  rarity: AchievementRarity;
  condition: (state: UserAchievementState) => boolean;
}

export interface UserAchievementState {
  testsCompleted: number;
  breedsMatched: string[];
  platformsShared: number;
  breedsViewed: number;
  guidesViewed: number;
  friendsCompared: number;
  highestScore: number;
}

export interface UserAchievements {
  unlocked: string[];
  state: UserAchievementState;
  lastUpdated: string;
}

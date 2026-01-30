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
      size?: 'small' | 'medium' | 'large' | 'xlarge' | 'any';
      coat?: 'short' | 'medium' | 'long' | 'hairless' | 'any';
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

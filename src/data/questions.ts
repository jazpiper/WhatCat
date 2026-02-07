import type { Question } from '@/types';
import questionsData from './questions.json';

// 타입 캐스팅 중앙화
export const questions: Question[] = questionsData.questions as Question[];

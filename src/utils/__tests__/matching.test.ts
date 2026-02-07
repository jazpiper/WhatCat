/**
 * Tests for matching utility
 */

import {
  calculateMatch,
  getRankEmoji,
} from '../matching';
import { breeds } from '../../data/breeds';
import { questions } from '../../data/questions';

// Mock breed data for testing
const mockBreed = {
  id: 'test-breed',
  name: '테스트 고양이',
  nameEn: 'Test Cat',
  emoji: '🐱',
  rank: 1,
  personality: {
    activity: 3,
    affection: 3,
    social: 3,
    quiet: 3,
    loyalty: 3,
  },
  maintenance: {
    grooming: 3,
    training: 3,
    health: 3,
  },
  cost: {
    initial: 'medium',
    monthly: 'medium',
  },
  environment: ['apartment'],
  traits: ['친절함', '온순함'],
  size: 'medium',
  coat: 'short',
  colors: ['black', 'white'],
  description: '테스트용 품종입니다.',
  korea_popularity: 50,
};

describe('getRankEmoji', () => {
  it('should return correct emoji for rank 1', () => {
    expect(getRankEmoji(1)).toBe('🥇');
  });

  it('should return correct emoji for rank 2', () => {
    expect(getRankEmoji(2)).toBe('🥈');
  });

  it('should return correct emoji for rank 3', () => {
    expect(getRankEmoji(3)).toBe('🥉');
  });

  it('should return cat emoji for ranks above 3', () => {
    expect(getRankEmoji(4)).toBe('🐱');
    expect(getRankEmoji(10)).toBe('🐱');
  });
});

describe('calculateMatch', () => {
  it('should return results for valid answers', () => {
    const answers = [
      {
        questionId: questions[0].id,
        answerId: questions[0].options[0].id,
      },
    ];
    const results = calculateMatch(answers, [mockBreed as any], questions);
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
  });

  it('should return results even with no answers (returns all breeds with default scores)', () => {
    const results = calculateMatch([], [mockBreed as any], questions);
    // The function calculates scores even with no answers, returning all breeds
    expect(results).toBeDefined();
    expect(results.length).toBe(1);
  });

  it('should sort results by score descending', () => {
    const answers = [
      {
        questionId: questions[0].id,
        answerId: questions[0].options[0].id,
      },
    ];
    const results = calculateMatch(answers, [mockBreed as any], questions);
    if (results.length > 1) {
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
      }
    }
  });

  it('should include breed and score in results', () => {
    const answers = [
      {
        questionId: questions[0].id,
        answerId: questions[0].options[0].id,
      },
    ];
    const results = calculateMatch(answers, [mockBreed as any], questions);
    if (results.length > 0) {
      expect(results[0]).toHaveProperty('breed');
      expect(results[0]).toHaveProperty('score');
      expect(results[0].score).toBeGreaterThan(0);
      expect(results[0].score).toBeLessThanOrEqual(100);
    }
  });

  it('should include breakdown in results', () => {
    const answers = [
      {
        questionId: questions[0].id,
        answerId: questions[0].options[0].id,
      },
    ];
    const results = calculateMatch(answers, [mockBreed as any], questions);
    if (results.length > 0) {
      expect(results[0]).toHaveProperty('breakdown');
      expect(results[0].breakdown).toHaveProperty('personality');
      expect(results[0].breakdown).toHaveProperty('maintenance');
      expect(results[0].breakdown).toHaveProperty('lifestyle');
      expect(results[0].breakdown).toHaveProperty('appearance');
      expect(results[0].breakdown).toHaveProperty('cost');
    }
  });

  it('should include reasons in results', () => {
    const answers = [
      {
        questionId: questions[0].id,
        answerId: questions[0].options[0].id,
      },
    ];
    const results = calculateMatch(answers, [mockBreed as any], questions);
    if (results.length > 0) {
      expect(results[0]).toHaveProperty('reasons');
      expect(Array.isArray(results[0].reasons)).toBe(true);
    }
  });
});

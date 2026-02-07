/**
 * Breed of the Day Utility
 * Selects a featured breed based on the current date
 */

import { breeds } from '@/data/breeds';
import type { Breed } from '@/types';

export interface BreedOfTheDay {
  breed: Breed;
  dayOfYear: number;
  funFact: string;
}

/**
 * Get the breed of the day based on the current date
 * Uses the day of the year to select a consistent breed for each day
 */
export function getBreedOfTheDay(date: Date = new Date()): BreedOfTheDay {
  // Calculate day of the year (1-366)
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Use modulo to cycle through breeds
  const breedIndex = dayOfYear % breeds.length;
  const breed = breeds[breedIndex];

  // Get a random fun fact
  const funFact = getFunFact(breed);

  return {
    breed,
    dayOfYear,
    funFact,
  };
}

/**
 * Get a fun fact about a breed
 */
function getFunFact(breed: Breed): string {
  const defaultFacts = [
    `"${breed.name}"는(은) 충성심이 높고 가족과 잘 지냅니다.`,
    `"${breed.name}"는(은) 한국에서 인기 있는 품종 중 하나입니다.`,
    `"${breed.name}"는(은) 독특한 성격으로 사랑받고 있습니다.`,
    `"${breed.name}"와(과) 함께라면 외롭지 않은 하루가 될 거예요!`,
  ];

  // If breed has fun_facts, use them
  if (breed.fun_facts && breed.fun_facts.length > 0) {
    const facts = breed.fun_facts;
    const dayOfMonth = new Date().getDate();
    return facts[dayOfMonth % facts.length];
  }

  // Use fact from features or description
  if (breed.features && breed.features.length > 0) {
    const feature = breed.features[Math.floor(Math.random() * breed.features.length)];
    return `"${breed.name}"의 특징: ${feature.text}`;
  }

  if (breed.description) {
    return breed.description;
  }

  // Fallback to default facts
  return defaultFacts[Math.floor(Math.random() * defaultFacts.length)];
}

/**
 * Get all fun facts for a breed
 */
export function getAllFunFacts(breed: Breed): string[] {
  const facts: string[] = [];

  if (breed.fun_facts) {
    facts.push(...breed.fun_facts);
  }

  if (breed.features) {
    breed.features.forEach((f) => {
      facts.push(`${f.icon} ${f.text}`);
    });
  }

  if (breed.description) {
    facts.push(breed.description);
  }

  if (breed.origin) {
    facts.push(`📜 ${breed.origin}`);
  }

  if (breed.health_issues && breed.health_issues.length > 0) {
    facts.push(`⚕️ 주의 질병: ${breed.health_issues.join(', ')}`);
  }

  return facts;
}

/**
 * Check if a breed is today's featured breed
 */
export function isBreedOfTheDay(breedId: string): boolean {
  const { breed } = getBreedOfTheDay();
  return breed.id === breedId;
}

/**
 * Get the countdown to next breed of the day (in hours)
 */
export function getNextBreedOfTheDayCountdown(): number {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const diff = tomorrow.getTime() - now.getTime();
  return Math.floor(diff / (1000 * 60 * 60)); // hours
}

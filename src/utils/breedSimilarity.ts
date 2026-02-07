import { Breed, SimilarBreed } from '@/types';

/**
 * Calculate Euclidean distance between two breeds based on personality traits
 */
function calculatePersonalityDistance(breed1: Breed, breed2: Breed): number {
  const traits = ['activity', 'affection', 'social', 'quiet', 'loyalty'] as const;

  let sumOfSquares = 0;
  for (const trait of traits) {
    const diff = breed1.personality[trait] - breed2.personality[trait];
    sumOfSquares += diff * diff;
  }

  return Math.sqrt(sumOfSquares);
}

/**
 * Calculate similarity score (0-100) between two breeds
 * Higher score means more similar
 */
function calculateSimilarityScore(breed1: Breed, breed2: Breed): number {
  const distance = calculatePersonalityDistance(breed1, breed2);

  // Maximum possible distance is sqrt(5 * (5-1)^2) = sqrt(80) ≈ 8.94
  const maxDistance = Math.sqrt(80);

  // Convert distance to similarity score (0-100)
  const similarity = Math.max(0, 100 - (distance / maxDistance) * 100);

  return Math.round(similarity);
}

/**
 * Get the key difference between two breeds
 */
function getKeyDifference(mainBreed: Breed, relatedBreed: Breed): string {
  const traitNames: { key: keyof typeof mainBreed.personality; name: string }[] = [
    { key: 'activity', name: '활동성' },
    { key: 'affection', name: '애정도' },
    { key: 'social', name: '사교성' },
    { key: 'quiet', name: '조용함' },
    { key: 'loyalty', name: '충성심' },
  ];

  // Find the trait with the largest difference
  let maxDiff = 0;
  let maxTrait = traitNames[0];

  for (const trait of traitNames) {
    const diff = Math.abs(mainBreed.personality[trait.key] - relatedBreed.personality[trait.key]);
    if (diff > maxDiff) {
      maxDiff = diff;
      maxTrait = trait;
    }
  }

  if (maxDiff < 1) {
    return '성격이 아주 비슷해요!';
  }

  const direction = relatedBreed.personality[maxTrait.key] > mainBreed.personality[maxTrait.key]
    ? '더 높아요'
    : '더 낮아요';

  return `${maxTrait.name}이 ${direction}`;
}

/**
 * Get related breeds for a given breed
 * @param mainBreed The breed to find similar breeds for
 * @param allBreeds All available breeds
 * @param count Number of related breeds to return (default: 3)
 * @returns Array of similar breeds sorted by similarity
 */
export function getRelatedBreeds(
  mainBreed: Breed,
  allBreeds: Breed[],
  count: number = 3
): SimilarBreed[] {
  const similarities: SimilarBreed[] = allBreeds
    .filter(breed => breed.id !== mainBreed.id) // Exclude the main breed
    .map(breed => ({
      breed,
      similarity: calculateSimilarityScore(mainBreed, breed),
      keyDifference: getKeyDifference(mainBreed, breed),
    }))
    .sort((a, b) => b.similarity - a.similarity) // Sort by similarity (highest first)
    .slice(0, count);

  return similarities;
}

/**
 * Get all breeds sorted by similarity to a given breed
 */
export function getBreedsBySimilarity(
  mainBreed: Breed,
  allBreeds: Breed[]
): SimilarBreed[] {
  return allBreeds
    .filter(breed => breed.id !== mainBreed.id)
    .map(breed => ({
      breed,
      similarity: calculateSimilarityScore(mainBreed, breed),
      keyDifference: getKeyDifference(mainBreed, breed),
    }))
    .sort((a, b) => b.similarity - a.similarity);
}

/**
 * Breed Helper Utilities
 * Shared utility functions for breed-related data transformations
 */

/**
 * Get maintenance level as star emojis (1-5)
 * @param level - Maintenance level from 1 to 5
 * @returns String of star and empty star emojis
 */
export function getMaintenanceStars(level: number): string {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < level ? '' : '');
  }
  return stars.join('');
}

/**
 * Get size emoji for breed size
 * @param size - Size category (small, medium, large, xlarge, 소형, 중형, 대형, 초대형)
 * @returns Emoji representing the size
 */
export function getSizeEmoji(size: string): string {
  const sizeMap: Record<string, string> = {
    small: '',
    medium: '',
    large: '',
    xlarge: '',
    소형: '',
    중형: '',
    대형: '',
    초대형: '',
  };
  return sizeMap[size] || '';
}

/**
 * Get coat emoji for coat type
 * @param coat - Coat type (short, medium, long, hairless, 단모, 중장모, 장모, 무모)
 * @returns Emoji representing the coat type
 */
export function getCoatEmoji(coat: string): string {
  const coatMap: Record<string, string> = {
    short: '',
    medium: '',
    long: '',
    hairless: '',
    단모: '',
    중장모: '',
    장모: '',
    무모: '',
  };
  return coatMap[coat] || '';
}

/**
 * Get Korean text for cost level
 * @param cost - Cost level (low, medium, high, veryhigh)
 * @returns Korean text description of cost
 */
export function getCostText(cost: string): string {
  const costMap: Record<string, string> = {
    low: '낮음 (20만원 이하)',
    medium: '중간 (20-50만원)',
    high: '높음 (50만원 이상)',
    veryhigh: '매우 높음 (100만원 이상)',
  };
  return costMap[cost] || cost;
}

/**
 * Get Korean text for environment type
 * @param env - Environment type key
 * @returns Korean text description of environment
 */
export function getEnvironmentText(env: string): string {
  const envMap: Record<string, string> = {
    apt: '아파트',
    family: '가족과 함께',
    quiet: '조용한 환경',
    children: '아이가 있는 집',
    pets: '다른 동물과 공존',
    outdoor: '외부 활동',
    indoor: '실내 사육',
  };
  return envMap[env] || env;
}

/**
 * Calculate personality percentage for progress bars
 * @param value - Personality value (1-5)
 * @returns Percentage (0-100)
 */
export function getPersonalityPercentage(value: number): number {
  return Math.min(Math.max((value / 5) * 100, 0), 100);
}

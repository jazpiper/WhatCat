import { Breed } from '@/types';

export interface ShareResult {
  breedId: string;
  score: number;
  breedName?: string;
  emoji?: string;
}

/**
 * 점수별로 다른 공유 문구를 반환합니다.
 */
export function getShareTextByScore(score: number, breedName: string, emoji: string): string {
  if (score >= 90) {
    // 90-100%: 완벽한 매칭
    const messages = [
      `나와 찰떡궁합 인생냥이는 "${breedName}"! ${emoji}\n매칭 점수: ${score}% 🎉\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `"${breedName}"이(가) 나랑 완벽히 맞아! ${emoji}\n매칭 점수: ${score}% ✨\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}%라니! "${breedName}" 진짜 내 냥이야! ${emoji} 😍\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (score >= 80) {
    // 80-89%: 아주 잘 맞는 매칭
    const messages = [
      `나와 아주 잘 맞는 냥이는 "${breedName}"! ${emoji}\n매칭 점수: ${score}% 😻\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `인생냥이 후보: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 💕\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}% 높은 점수! "${breedName}" 나랑 잘 맞아! ${emoji} 😺\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (score >= 70) {
    // 70-79%: 꽤 잘 맞는 매칭
    const messages = [
      `나와 꽤 잘 맞는 냥이는 "${breedName}"! ${emoji}\n매칭 점수: ${score}% 😸\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `인생냥이 탐험: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 🌟\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}% 나쁘지 않아! "${breedName}" 나랑 잘 맞을지도? ${emoji} 😊\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (score >= 60) {
    // 60-69%: 나쁘지 않은 매칭
    const messages = [
      `나랑 나쁘지 않은 매칭: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 🐱\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `냥이 탐구: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 🔍\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}% 나쁘지 않아! "${breedName}" 나랑 잘 맞을지도? ${emoji} 😶\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (score >= 50) {
    // 50-59%: 평범한 매칭
    const messages = [
      `냥이 매칭 결과: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 😶\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `"${breedName}"은(는) 어떨까? ${emoji}\n매칭 점수: ${score}% 🤔\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}% 평범한 매칭! "${breedName}" 나랑 잘 맞을지? ${emoji} 😐\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (score >= 40) {
    // 40-49%: 약간 안 맞을 수도
    const messages = [
      `"${breedName}"은(는) 나랑 약간 안 맞을 수도? ${emoji}\n매칭 점수: ${score}% 🤔\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `냥이 탐색: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 🔍\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}%라... "${breedName}"은(는) 나랑 다른 스타일? ${emoji} 😅\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else if (score >= 30) {
    // 30-39%: 냥이랑 안 맞을 수도
    const messages = [
      `"${breedName}"은(는) 나랑 안 맞을 수도... ${emoji}\n매칭 점수: ${score}% 😅\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `냥이 탐구: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 🔍\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}%라... "${breedName}"은(는) 나랑 다른 스타일! ${emoji} 😂\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  } else {
    // 0-29%: 완전 다른 스타일
    const messages = [
      `"${breedName}"은(는) 나랑 완전 다른 스타일! ${emoji}\n매칭 점수: ${score}% 😂\n\n너랑 딱 맞는 냥이는? 냥이 매칭 테스트 받아보기! 🐱`,
      `냥이 탐험: "${breedName}"! ${emoji}\n매칭 점수: ${score}% 🔍\n\n나의 인생냥이 찾기! 냥이 매칭 🐱`,
      `${score}%라니! "${breedName}"은(는) 나랑 다른 스타일! ${emoji} 🤣\n\n너도 나의 인생냥이 찾아보세요! 냥이 매칭 테스트`,
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }
}

/**
 * URL 파라미터 결과의 유효성을 검증합니다.
 */
export function validateShareResult(result: ShareResult): boolean {
  return (
    typeof result.breedId === 'string' &&
    typeof result.score === 'number' &&
    result.score >= 0 &&
    result.score <= 100
  );
}

/**
 * URL 파라미터에서 결과 데이터를 읽어옵니다.
 */
export function getResultsFromUrl(): ShareResult[] | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const results: ShareResult[] = [];

  // 최대 3개까지 지원
  for (let i = 1; i <= 3; i++) {
    const breedId = params.get(`breed${i}`);
    const score = params.get(`score${i}`);

    if (breedId && score) {
      const parsedScore = parseInt(score, 10);

      // 검증
      const isValid = typeof breedId === 'string' &&
                      !isNaN(parsedScore) &&
                      parsedScore >= 0 &&
                      parsedScore <= 100;

      if (isValid) {
        results.push({
          breedId,
          score: parsedScore,
        });
      }
    }
  }

  return results.length > 0 ? results : null;
}

/**
 * 결과 데이터를 URL 파라미터로 변환합니다.
 */
export function createShareUrl(results: ShareResult[]): string {
  const params = new URLSearchParams();

  results.forEach((result, index) => {
    params.set(`breed${index + 1}`, result.breedId);
    params.set(`score${index + 1}`, result.score.toString());
  });

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin + window.location.pathname
    : '/result';

  return `${baseUrl}?${params.toString()}`;
}

/**
 * 카카오톡 공유 URL을 생성합니다.
 */
export function createKakaoShareUrl(result: ShareResult, breedName: string, emoji: string): string {
  const shareUrl = createShareUrl([result]);
  return encodeURIComponent(shareUrl);
}

/**
 * 트위터/X 공유 URL을 생성합니다.
 */
export function createTwitterShareUrl(result: ShareResult, breedName: string, emoji: string): string {
  const shareUrl = createShareUrl([result]);
  const text = encodeURIComponent(getShareTextByScore(result.score, breedName, emoji));
  const url = encodeURIComponent(shareUrl);

  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}

/**
 * 인스타그램 공용 URL을 생성합니다 (인스타그램은 URL 공유 기능이 없으므로 사진 다운로드 유도).
 */
export function createInstagramShareUrl(): string {
  // 인스타그램은 웹에서 직접 공유할 수 없으므로 앱 링크
  return 'instagram://camera';
}

/**
 * 스레드 공유 URL을 생성합니다.
 */
export function createThreadsShareUrl(result: ShareResult, breedName: string, emoji: string): string {
  const shareUrl = createShareUrl([result]);
  const text = encodeURIComponent(getShareTextByScore(result.score, breedName, emoji) + `\n\n${shareUrl}`);

  return `https://www.threads.net/intent/post?text=${text}`;
}

/**
 * X (Twitter) 공유 URL을 생성합니다.
 */
export function createXShareUrl(result: ShareResult, breedName: string, emoji: string): string {
  return createTwitterShareUrl(result, breedName, emoji);
}

/**
 * 친구와 비교 URL을 생성합니다.
 */
export function createCompareUrl(myResult: ShareResult, friendResult: ShareResult): string {
  const params = new URLSearchParams();
  params.set('breed1', myResult.breedId);
  params.set('score1', myResult.score.toString());
  params.set('breed2', friendResult.breedId);
  params.set('score2', friendResult.score.toString());

  return `${typeof window !== 'undefined' ? window.location.origin : ''}/compare?${params.toString()}`;
}

import { Breed } from '@/types';

export interface ShareResult {
  breedId: string;
  score: number;
  breedName?: string;
  emoji?: string;
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
  const text = encodeURIComponent(
    `나와 가장 잘 맞는 냥이는 "${breedName}"! ${emoji}\n매칭 점수: ${result.score}%\n\n너랑 딱 맞는 냥이는? 냥이 매칭 냥이매칭 받아보기! 🐱`
  );
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
  const text = encodeURIComponent(
    `나와 가장 잘 맞는 냥이는 "${breedName}"! ${emoji}\n매칭 점수: ${result.score}%\n\n너랑 딱 맞는 냥이는? 냥이 매칭 냥이매칭 받아보기! 🐱\n\n${shareUrl}`
  );

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

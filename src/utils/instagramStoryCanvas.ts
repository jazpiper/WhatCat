import html2canvas from 'html2canvas';

export interface GenerateInstagramStoryImageOptions {
  element: HTMLElement;
  breedName: string;
  score: number;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (error: Error) => void;
}

/**
 * Instagram Story용 이미지를 생성하고 다운로드합니다.
 *
 * @param options - 생성 옵션
 * @param options.element - 캡처할 DOM 요소
 * @param options.breedName - 고양이 품종 이름
 * @param options.score - 매칭 점수
 * @param options.onLoadingChange - 로딩 상태 변경 콜백
 * @param options.onError - 에러 발생 콜백
 *
 * @returns Promise<void>
 *
 * @example
 * ```tsx
 * const handleDownload = async () => {
 *   const cardRef = useRef<HTMLDivElement>(null);
 *   if (cardRef.current) {
 *     await generateInstagramStoryImage({
 *       element: cardRef.current,
 *       breedName: '래그돌',
 *       score: 95,
 *       onLoadingChange: setLoading,
 *     });
 *   }
 * };
 * ```
 */
export async function generateInstagramStoryImage({
  element,
  breedName,
  score,
  onLoadingChange,
  onError,
}: GenerateInstagramStoryImageOptions): Promise<void> {
  try {
    onLoadingChange?.(true);

    // 이미지 로딩 상태 확인 (img 태그가 완전히 로드되었는지)
    const images = element.querySelectorAll('img');
    const allImagesLoaded = Array.from(images).every(
      (img) => img.complete && img.naturalHeight !== 0
    );

    if (!allImagesLoaded) {
      alert('이미지가 아직 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      onLoadingChange?.(false);
      return;
    }

    // html2canvas로 캡처
    const canvas = await html2canvas(element, {
      background: '#ffffff',
      scale: 3, // Instagram Story용 고해상도
      useCORS: true, // 외부 이미지 로드
      allowTaint: true,
      logging: false,
    } as Record<string, unknown>);

    // 다운로드 파일명 생성
    const sanitizedBreedName = breedName.replace(/\s+/g, '_');
    const filename = `냥이매치_스토리_${sanitizedBreedName}_${score}점.png`;

    // 다운로드 링크 생성 및 클릭
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    onError?.(err);

    console.error('Instagram Story 이미지 생성 실패:', error);
    alert(
      '이미지 저장에 실패했습니다.\n' +
        '화면을 직접 캡처하거나 다시 시도해주세요.'
    );
  } finally {
    onLoadingChange?.(false);
  }
}

/**
 * Instagram Story용 이미지를 Blob으로 생성합니다.
 * 서버 업로드나 미리보기 등 다운로드 외의 용도로 사용합니다.
 *
 * @param element - 캡처할 DOM 요소
 * @returns PNG Blob 객체
 *
 * @example
 * ```tsx
 * const blob = await generateInstagramStoryBlob(cardRef.current);
 * const formData = new FormData();
 * formData.append('image', blob, 'story.png');
 * ```
 */
export async function generateInstagramStoryBlob(
  element: HTMLElement
): Promise<Blob> {
  const canvas = await html2canvas(element, {
    background: '#ffffff',
    scale: 3,
    useCORS: true,
    allowTaint: true,
    logging: false,
  } as Record<string, unknown>);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Blob 생성 실패'));
        }
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Instagram Story용 이미지를 Data URL로 생성합니다.
 * 미리보기 등에 사용합니다.
 *
 * @param element - 캡처할 DOM 요소
 * @returns PNG Data URL 문자열
 */
export async function generateInstagramStoryDataUrl(
  element: HTMLElement
): Promise<string> {
  const canvas = await html2canvas(element, {
    background: '#ffffff',
    scale: 3,
    useCORS: true,
    allowTaint: true,
    logging: false,
  } as Record<string, unknown>);

  return canvas.toDataURL('image/png', 1.0);
}

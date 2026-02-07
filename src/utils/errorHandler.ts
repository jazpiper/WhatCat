/**
 * Error Handler Utilities
 * Centralized error handling for the application
 */

/**
 * Standard error types for the application
 */
export enum ErrorType {
  LOCAL_STORAGE = 'localStorage',
  QUIZ_DATA = 'quizData',
  STREAK_CALC = 'streakCalc',
  SHARE = 'share',
  NETWORK = 'network',
  VALIDATION = 'validation',
  UNKNOWN = 'unknown',
}

/**
 * Standard error structure
 */
export interface AppError {
  type: ErrorType;
  message: string;
  originalError?: unknown;
  timestamp: string;
}

/**
 * Create a standardized error object
 */
export function createError(type: ErrorType, message: string, originalError?: unknown): AppError {
  return {
    type,
    message,
    originalError,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Safely execute a function with error handling
 * @param fn - Function to execute
 * @param errorType - Type of error if it fails
 * @param fallback - Fallback value to return on error
 * @returns Result of the function or fallback value
 */
export function safeExecute<T>(
  fn: () => T,
  errorType: ErrorType = ErrorType.UNKNOWN,
  fallback: T
): { success: true; data: T } | { success: false; error: AppError } {
  try {
    const data = fn();
    return { success: true, data };
  } catch (error) {
    const appError = createError(
      errorType,
      `Failed to execute ${fn.name || 'anonymous function'}`,
      error
    );
    logError(appError);
    return { success: false, error: appError };
  }
}

/**
 * Safely execute an async function with error handling
 * @param fn - Async function to execute
 * @param errorType - Type of error if it fails
 * @returns Promise with result or error
 */
export async function safeExecuteAsync<T>(
  fn: () => Promise<T>,
  errorType: ErrorType = ErrorType.UNKNOWN
): Promise<{ success: true; data: T } | { success: false; error: AppError }> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    const appError = createError(
      errorType,
      `Failed to execute async ${fn.name || 'function'}`,
      error
    );
    logError(appError);
    return { success: false, error: appError };
  }
}

/**
 * Safely access localStorage with error handling
 * @param key - Storage key
 * @param defaultValue - Default value if access fails
 * @returns Stored value or default
 */
export function safeGetStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    logError(createError(ErrorType.LOCAL_STORAGE, `Failed to get storage key: ${key}`, error));
    return defaultValue;
  }
}

/**
 * Safely set localStorage with error handling
 * @param key - Storage key
 * @param value - Value to store
 * @returns Success status
 */
export function safeSetStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    logError(createError(ErrorType.LOCAL_STORAGE, `Failed to set storage key: ${key}`, error));
    return false;
  }
}

/**
 * Safely remove localStorage item with error handling
 * @param key - Storage key
 * @returns Success status
 */
export function safeRemoveStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logError(createError(ErrorType.LOCAL_STORAGE, `Failed to remove storage key: ${key}`, error));
    return false;
  }
}

/**
 * Check if localStorage is available and working
 */
export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Log error to console and optionally to analytics
 * @param error - Error to log
 * @param context - Additional context about where the error occurred
 */
export function logError(error: AppError | Error | unknown, context?: string): void {
  const contextPrefix = context ? `[${context}] ` : '';

  if (error instanceof Error) {
    console.error(`${contextPrefix}Error:`, error.message, error);
  } else if (isAppError(error)) {
    console.error(`${contextPrefix}Error [${error.type}]:`, error.message, error.originalError);
  } else {
    console.error(`${contextPrefix}Unknown error:`, error);
  }

  // TODO: Send to analytics service if configured
  // trackError(error, context);
}

/**
 * Type guard for AppError
 */
function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'message' in error &&
    'timestamp' in error
  );
}

/**
 * Get user-friendly error message based on error type
 * @param error - Error to get message for
 * @returns User-friendly error message
 */
export function getUserErrorMessage(error: AppError | Error | unknown): string {
  if (isAppError(error)) {
    switch (error.type) {
      case ErrorType.LOCAL_STORAGE:
        return '저장 공간을 확인할 수 없습니다. 브라우저 설정에서 저장소 사용을 허용해주세요.';
      case ErrorType.QUIZ_DATA:
        return '퀴즈 데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.';
      case ErrorType.STREAK_CALC:
        return '연속 기록을 계산하는 중 문제가 발생했습니다.';
      case ErrorType.SHARE:
        return '공유 기능을 사용하는 중 문제가 발생했습니다.';
      case ErrorType.NETWORK:
        return '네트워크 연결을 확인해주세요.';
      case ErrorType.VALIDATION:
        return '입력값을 확인해주세요.';
      default:
        return '문제가 발생했습니다. 다시 시도해주세요.';
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
}

/**
 * Simulates a localStorage quota exceeded error (for testing)
 */
export function simulateLocalStorageQuotaError(): void {
  if (typeof window === 'undefined') return;

  try {
    // Fill up localStorage to trigger quota error
    const data = new Array(1024 * 1024 * 5).join('x'); // ~5MB per item
    let key = 0;
    while (true) {
      localStorage.setItem(`test_${key}`, data);
      key++;
    }
  } catch (error) {
    // Expected to fail with QuotaExceededError
    console.log('[ErrorHandler] localStorage quota filled for testing');
  }
}

/**
 * Simulates corrupted localStorage data (for testing)
 */
export function simulateCorruptedData(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, '{invalid json data');
}

/**
 * Clears all quiz-related test data (for testing)
 */
export function clearQuizTestData(): void {
  if (typeof window === 'undefined') return;

  // Clear the quiz storage key
  localStorage.removeItem('nyongmatch_daily_quiz');

  // Clear any test data we added
  Object.keys(localStorage)
    .filter((key) => key.startsWith('test_'))
    .forEach((key) => localStorage.removeItem(key));
}

/**
 * Gets the estimated localStorage usage
 */
export function getLocalStorageUsage(): { used: number; total: number } | null {
  if (typeof window === 'undefined' || !isLocalStorageAvailable()) {
    return null;
  }

  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }

  // Most browsers have 5-10MB limit
  return {
    used: total,
    total: 5 * 1024 * 1024, // 5MB estimate
  };
}

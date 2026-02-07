import DOMPurify from 'dompurify';

/**
 * Sanitizes user input to prevent XSS attacks.
 * This should be used for any user-generated content that will be displayed.
 *
 * @param input - The raw user input
 * @param options - DOMPurify configuration options
 * @returns Sanitized HTML string
 */
export function sanitizeHtml(
  input: string,
  options?: Record<string, unknown>
): string {
  if (!input) return '';
  const config: Record<string, unknown> = {
    ALLOWED_TAGS: [], // No HTML tags allowed by default for user input
    ALLOWED_ATTR: [],
    ...options,
  };
  return DOMPurify.sanitize(input, config);
}

/**
 * Escapes HTML special characters in text.
 * This is a safer alternative that uses React's default escaping.
 *
 * @param text - The text to escape
 * @returns Escaped text safe for rendering
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitizes and escapes search query text.
 *
 * @param query - The search query to sanitize
 * @returns Sanitized query safe for display
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  // For search queries, we just want to escape HTML entities
  // React automatically escapes strings in JSX, but this provides
  // an extra layer of protection for edge cases
  return escapeHtml(query.trim());
}

/**
 * Validates that a string doesn't contain potentially dangerous content.
 *
 * @param input - The input to validate
 * @returns true if input is safe, false otherwise
 */
export function isSafeInput(input: string): boolean {
  if (!input) return true;

  // Check for common XSS patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i,
    /<style/i,
    /expression\s*\(/i, // CSS expression
  ];

  return !dangerousPatterns.some((pattern) => pattern.test(input));
}

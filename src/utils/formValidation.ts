/**
 * Form Validation Utilities
 * Provides reusable validation functions and hooks for form inputs
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: string) => string | null;
}

export interface ValidationSchema {
  [fieldName: string]: ValidationRule;
}

/**
 * Validate a single field value against a rule
 */
export function validateField(value: string, rule: ValidationRule): string | null {
  // Required check
  if (rule.required && (!value || value.trim() === '')) {
    return '이 필드는 필수입니다.';
  }

  // Skip other validations if value is empty and not required
  if (!value || value.trim() === '') {
    return null;
  }

  // Min length check
  if (rule.minLength && value.length < rule.minLength) {
    return `최소 ${rule.minLength}자 이상 입력해주세요.`;
  }

  // Max length check
  if (rule.maxLength && value.length > rule.maxLength) {
    return `최대 ${rule.maxLength}자 이하로 입력해주세요.`;
  }

  // Pattern check
  if (rule.pattern && !rule.pattern.test(value)) {
    return '올바른 형식으로 입력해주세요.';
  }

  // Min/Max for numeric values
  const numValue = parseFloat(value);
  if (!isNaN(numValue)) {
    if (rule.min !== undefined && numValue < rule.min) {
      return `최소 ${rule.min} 이상이어야 합니다.`;
    }
    if (rule.max !== undefined && numValue > rule.max) {
      return `최대 ${rule.max} 이하여야 합니다.`;
    }
  }

  // Custom validation
  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
}

/**
 * Validate form data against a schema
 */
export function validateForm(data: Record<string, string>, schema: ValidationSchema): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [field, rule] of Object.entries(schema)) {
    const value = data[field] || '';
    const error = validateField(value, rule);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * URL validation pattern
 */
export const URL_PATTERN = /^https?:\/\/.+/;

/**
 * Email validation pattern (basic)
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate a URL string
 */
export function isValidUrl(url: string): boolean {
  if (!url || url.trim() === '') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validation schemas for common forms
 */
export const ValidationSchemas = {
  friendLink: {
    friendLink: {
      required: true,
      pattern: URL_PATTERN,
      custom: (value: string) => {
        if (!isValidUrl(value)) {
          return '올바른 URL 형식이 아닙니다.';
        }
        try {
          const url = new URL(value);
          if (!url.searchParams.has('breed1') || !url.searchParams.has('score1')) {
            return '올바른 결과 링크가 아닙니다.';
          }
          return null;
        } catch {
          return '올바른 URL 형식이 아닙니다.';
        }
      },
    },
  },

  searchQuery: {
    query: {
      minLength: 1,
      maxLength: 50,
    },
  },
};

/**
 * Hook for form validation
 */
import { useState, useCallback } from 'react';

export function useFormValidation(schema: ValidationSchema) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = useCallback(
    (data: Record<string, string>): boolean => {
      const newErrors = validateForm(data, schema);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [schema]
  );

  const validateFieldInHook = useCallback(
    (field: string, value: string): string | null => {
      const rule = schema[field];
      if (!rule) return null;

      const error = validateField(value, rule);
      setErrors((prev) => ({
        ...prev,
        [field]: error || '',
      }));
      setTouched((prev) => ({ ...prev, [field]: true }));
      return error;
    },
    [schema]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    touched,
    validate,
    validateField: validateFieldInHook,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
}

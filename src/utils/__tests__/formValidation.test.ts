/**
 * Tests for form validation utility
 */

import {
  validateField,
  validateForm,
  isValidUrl,
  ValidationSchemas,
  useFormValidation,
} from '../formValidation';
import { renderHook, act } from '@testing-library/react';

describe('validateField', () => {
  it('should return error for required empty field', () => {
    const rule = { required: true };
    const result = validateField('', rule);
    expect(result).toBe('이 필드는 필수입니다.');
  });

  it('should return null for valid required field', () => {
    const rule = { required: true };
    const result = validateField('test', rule);
    expect(result).toBeNull();
  });

  it('should validate min length', () => {
    const rule = { minLength: 5 };
    expect(validateField('abc', rule)).toBe('최소 5자 이상 입력해주세요.');
    expect(validateField('abcdef', rule)).toBeNull();
  });

  it('should validate max length', () => {
    const rule = { maxLength: 5 };
    expect(validateField('abcdef', rule)).toBe('최대 5자 이하로 입력해주세요.');
    expect(validateField('abc', rule)).toBeNull();
  });

  it('should validate pattern', () => {
    const rule = { pattern: /^[0-9]+$/ };
    expect(validateField('abc', rule)).toBe('올바른 형식으로 입력해주세요.');
    expect(validateField('123', rule)).toBeNull();
  });

  it('should use custom validation', () => {
    const rule = {
      custom: (value: string) => {
        if (value === 'forbidden') return '이 값은 사용할 수 없습니다.';
        return null;
      },
    };
    expect(validateField('forbidden', rule)).toBe('이 값은 사용할 수 없습니다.');
    expect(validateField('allowed', rule)).toBeNull();
  });
});

describe('validateForm', () => {
  it('should validate multiple fields', () => {
    const schema = {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    };
    const data = {
      name: 'a',
      email: 'invalid',
    };
    const errors = validateForm(data, schema);
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it('should return no errors for valid data', () => {
    const schema = {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    };
    const data = {
      name: 'John Doe',
      email: 'test@example.com',
    };
    const errors = validateForm(data, schema);
    expect(Object.keys(errors)).toHaveLength(0);
  });
});

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path?query=value')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('example.com')).toBe(false);
  });
});

describe('ValidationSchemas', () => {
  it('should have friendLink schema', () => {
    expect(ValidationSchemas.friendLink).toBeDefined();
    expect(ValidationSchemas.friendLink.friendLink).toBeDefined();
  });

  it('should have searchQuery schema', () => {
    expect(ValidationSchemas.searchQuery).toBeDefined();
    expect(ValidationSchemas.searchQuery.query).toBeDefined();
  });
});

describe('useFormValidation hook', () => {
  it('should initialize with no errors', () => {
    const schema = {
      name: { required: true },
    };
    const { result } = renderHook(() => useFormValidation(schema));
    expect(result.current.errors).toEqual({});
    expect(result.current.hasErrors).toBe(false);
  });

  it('should validate field and set error', () => {
    const schema = {
      name: { required: true, minLength: 3 },
    };
    const { result } = renderHook(() => useFormValidation(schema));

    act(() => {
      const error = result.current.validateField('name', 'ab');
      expect(error).toBe('최소 3자 이상 입력해주세요.');
    });

    expect(result.current.errors.name).toBe('최소 3자 이상 입력해주세요.');
    expect(result.current.hasErrors).toBe(true);
  });

  it('should clear all errors', () => {
    const schema = {
      name: { required: true },
    };
    const { result } = renderHook(() => useFormValidation(schema));

    act(() => {
      result.current.validateField('name', '');
    });

    expect(result.current.hasErrors).toBe(true);

    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
    expect(result.current.hasErrors).toBe(false);
  });

  it('should validate entire form', () => {
    const schema = {
      name: { required: true },
      email: { required: true },
    };
    const { result } = renderHook(() => useFormValidation(schema));

    let isValid = false;
    act(() => {
      isValid = result.current.validate({ name: 'John', email: 'test@example.com' });
    });

    expect(isValid).toBe(true);
    expect(result.current.hasErrors).toBe(false);
  });
});

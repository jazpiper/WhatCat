'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { logEvent } from '@/lib/google-analytics';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 * Catches JavaScript errors in its child component tree, logs those errors,
 * and displays a fallback UI instead of the crashed component tree.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to console
    console.error('[ErrorBoundary] Error caught:', error);
    console.error('[ErrorBoundary] Error info:', errorInfo);

    // Log to analytics if available
    logEvent({
      name: 'exception',
      params: {
        description: error.message,
        fatal: false,
        error_stack: errorInfo.componentStack,
      },
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border border-[var(--border-default)]">
            {/* Error Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <AlertTriangle className="text-red-500" size={40} />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              오류가 발생했습니다
            </h1>
            <p className="text-[var(--text-secondary)] mb-6">
              죄송합니다. 페이지를 표시하는 중 문제가 발생했습니다.
              다시 시도하거나 홈으로 이동해주세요.
            </p>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  오류 상세정보
                </summary>
                <pre className="mt-2 p-4 bg-[var(--bg-page)] rounded-lg text-xs overflow-auto max-h-40 text-red-600">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <RefreshCw size={20} />
                다시 시도
              </button>
              <Link
                href="/"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-page)] text-[var(--text-primary)] rounded-xl font-semibold hover:bg-[var(--bg-page)] transition-all"
              >
                <Home size={20} />
                홈으로
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional wrapper for easier use with hooks
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
): React.ComponentType<P> {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback} onError={onError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

/**
 * Hook for handling errors in async operations
 */
export function useErrorHandler() {
  return React.useCallback((error: Error) => {
    throw error;
  }, []);
}

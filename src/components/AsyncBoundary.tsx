'use client';

import React, { ReactNode, ComponentType } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface AsyncBoundaryProps {
  children: ReactNode;
  loading?: ReactNode;
  error?: ReactNode;
  ErrorFallback?: ComponentType<{ error: Error; retry: () => void }>;
}

interface AsyncBoundaryState {
  isLoading: boolean;
  error: Error | null;
}

/**
 * AsyncBoundary Component
 * Handles loading, error, and success states for async operations.
 * Use this for components that fetch data or perform async operations.
 */
export function AsyncBoundary({
  children,
  loading,
  error: errorProp,
  ErrorFallback,
}: AsyncBoundaryProps) {
  const [state, setState] = React.useState<AsyncBoundaryState>({
    isLoading: false,
    error: null,
  });

  // If loading, show loading state
  if (state.isLoading && loading) {
    return <>{loading}</>;
  }

  // If error, show error state
  if (state.error) {
    if (ErrorFallback) {
      return (
        <ErrorFallback
          error={state.error}
          retry={() => setState({ isLoading: false, error: null })}
        />
      );
    }
    if (errorProp) {
      return <>{errorProp}</>;
    }
  }

  return (
    <ErrorBoundary
      onError={(error) => setState((prev) => ({ ...prev, error }))}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Hook for using AsyncBoundary state
 */
export function useAsyncBoundary() {
  const context = React.useContext(AsyncBoundaryContext);

  if (!context) {
    throw new Error('useAsyncBoundary must be used within AsyncBoundaryProvider');
  }

  return context;
}

const AsyncBoundaryContext = React.createContext<{
  isLoading: boolean;
  error: Error | null;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearError: () => void;
} | null>(null);

export function AsyncBoundaryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const value = React.useMemo(
    () => ({
      isLoading,
      error,
      setLoading: setIsLoading,
      setError,
      clearError: () => setError(null),
    }),
    [isLoading, error]
  );

  return (
    <AsyncBoundaryContext.Provider value={value}>
      <ErrorBoundary
        onError={(boundaryError) => setError(boundaryError)}
      >
        {children}
      </ErrorBoundary>
    </AsyncBoundaryContext.Provider>
  );
}

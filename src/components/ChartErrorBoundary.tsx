'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, BarChart3 } from 'lucide-react';
import { logEvent } from '@/lib/google-analytics';

interface ChartErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  chartName?: string;
}

interface ChartErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary specifically for chart components
 * Provides a more specialized error message for visualization failures
 */
export class ChartErrorBoundary extends Component<ChartErrorBoundaryProps, ChartErrorBoundaryState> {
  constructor(props: ChartErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ChartErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(`[ChartErrorBoundary] Error in ${this.props.chartName || 'chart'}:`, error);
    console.error('[ChartErrorBoundary] Component stack:', errorInfo.componentStack);

    // Log to analytics
    logEvent({
      name: 'chart_error',
      params: {
        chart_name: this.props.chartName || 'unknown',
        error_message: error.message,
      },
    });
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-200">
          <BarChart3 className="text-gray-400 mb-3" size={32} />
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <AlertTriangle size={18} className="text-amber-500" />
            <span className="font-medium">차트를 표시할 수 없습니다</span>
          </div>
          <p className="text-sm text-gray-500 mb-4 text-center">
            {this.props.chartName ? `${this.props.chartName} 차트` : '차트'}를 불러오는 중 오류가 발생했습니다.
          </p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to wrap any chart component with error boundary
 */
export function withChartErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  chartName?: string
): React.ComponentType<P> {
  return function WrappedChart(props: P) {
    return (
      <ChartErrorBoundary chartName={chartName}>
        <Component {...props} />
      </ChartErrorBoundary>
    );
  };
}

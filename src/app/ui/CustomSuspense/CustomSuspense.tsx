"use client";

import { Suspense, Component, ReactNode } from "react";
import { ICustomSuspense } from "@/types/suspense";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class SuspenseErrorBoundary extends Component<
  { children: ReactNode; errorFallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; errorFallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorFallback || <div>Что-то пошло не по плану</div>;
    }

    return this.props.children;
  }
}

export default function CustomSuspense({ fallback, children, errorFallback }: ICustomSuspense) {
  return (
    <SuspenseErrorBoundary errorFallback={errorFallback}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </SuspenseErrorBoundary>
  );
}
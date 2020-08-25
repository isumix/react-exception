import React from 'react';

export interface ExceptionReset {
  (): unknown;
}

export interface ExceptionFallbackProps {
  error?: unknown;
  reset?: ExceptionReset;
}

export interface ExceptionErrorHandler {
  (error: unknown, errorInfo: React.ErrorInfo): unknown;
}

export interface ExceptionProps {
  onError?: ExceptionErrorHandler;
  fallback?: React.ReactNode;
}

interface ExceptionState {
  hasError: boolean;
  error: unknown | null;
}

const initialState = { hasError: false, error: null };

export class Exception extends React.Component<ExceptionProps, ExceptionState> {
  state: ExceptionState = initialState;

  reset = () => {
    this.setState(initialState)
  };

  static getDerivedStateFromError (error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch (error: unknown, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render () {
    const {
      props: { fallback, children },
      state: { hasError, error },
    } = this;

    if (hasError) {
      if (! fallback) {
        throw error;
      }

      if (typeof fallback === 'function') {
        return React.createElement(
          fallback as React.FC<ExceptionFallbackProps>,
          { error, reset: this.reset }
        );
      }

      return fallback;
    }

    return children;
  }
}

export default Exception;

const eventThrowReducer = (state: ExceptionState, error: unknown) => ({ hasError: true, error });

export const useEventThrow = () => {
  const [state, dispatch] = React.useReducer(eventThrowReducer, initialState);
  const { hasError, error } = state;
  if (hasError) throw error;
  return dispatch;
}

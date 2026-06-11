import { IxButton, IxTypography } from '@siemens/ix-react';
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.container} role="alert" aria-live="assertive">
          <IxTypography format="h1" className={styles.title}>
            Something went wrong
          </IxTypography>
          <IxTypography format="body" className={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </IxTypography>
          <IxButton
            variant="primary"
            aria-label="Reload page"
            onClick={() => {
              globalThis.location.reload();
            }}
            className={styles.reloadButton}
          >
            Reload Page
          </IxButton>
        </div>
      );
    }

    return this.props.children;
  }
}

import { Component, PropsWithChildren } from 'react';
import styles from 'src/components/errorBoundary/ErrorBoundary.module.scss';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h1 className={styles.header}>Something went wrong</h1>
          <p className={styles.text}>{this.state.error?.toString()}</p>
          <button onClick={this.resetError} className={styles.button}>
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

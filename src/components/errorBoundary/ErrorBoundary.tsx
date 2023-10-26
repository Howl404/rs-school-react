import { Component, PropsWithChildren } from 'react';
import styles from 'components/errorBoundary/ErrorBoundary.module.scss';

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  resetError = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className={styles.container}>
          <h1 className={styles.header}>Something went wrong</h1>
          <p className={styles.text}>{this.state.error.toString()}</p>
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

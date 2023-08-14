/* eslint-disable react/destructuring-assignment */
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error or perform any necessary actions here
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Something went wrong. <p>{this.state.error?.toString()}</p>
          <p>{JSON.stringify(this.state.errorInfo)}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

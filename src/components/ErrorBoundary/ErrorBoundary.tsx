import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
import Button from "../Button/Button";
import "./ErrorBoundary.css";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <div className="error-boundary__icon">💥</div>
            <h1 className="error-boundary__title">앗! 문제가 발생했습니다</h1>
            <p className="error-boundary__message">
              예상치 못한 오류가 발생했습니다.
              <br />
              잠시 후 다시 시도해주세요.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  textAlign: "left",
                  marginBottom: "1.5rem",
                  fontSize: "0.875rem",
                  color: "#dc3545",
                }}>
                <summary style={{ cursor: "pointer", marginBottom: "0.5rem" }}>
                  에러 상세 보기
                </summary>
                <pre
                  style={{
                    background: "#f8f9fa",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    overflow: "auto",
                    maxHeight: "12.5rem",
                  }}>
                  {this.state.error.toString()}
                  {"\n\n"}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="error-boundary__actions">
              <Button onClick={this.handleReset}>홈으로 돌아가기</Button>
              <Button
                variant="primary"
                onClick={() => window.location.reload()}>
                새로고침
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

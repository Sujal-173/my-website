import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || "Unknown error" };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // In development only — helps debugging without leaking to production logs
    if (import.meta.env.DEV) {
      console.error("[ErrorBoundary]", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            background: "#0A0A0F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: 480,
              textAlign: "center",
              padding: "48px 40px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>⚠️</div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#F0EDE8",
                marginBottom: 12,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#8C8984",
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              The page encountered an unexpected error. Please refresh and try
              again.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 28px",
                borderRadius: 8,
                border: "none",
                background: "#E8C547",
                color: "#0C0C0A",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

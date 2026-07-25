import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Clinical System Intercepted Runtime Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-white border border-slate-100 shadow-md">
            <h2 className="text-xl font-bold text-slate-900 font-display">Something went wrong</h2>
            <p className="text-xs text-slate-500 mt-2">
              The recovery companion encountered an unexpected condition. Please refresh the page to restart the companion safely.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs"
            >
              Restart Companion
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

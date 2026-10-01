import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("The Watch UI recovered from a rendering error.", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="fatal-error" role="alert">
          <h1>The Watch</h1>
          <p>Something went wrong while rendering this page.</p>
          <button onClick={() => window.location.reload()}>RELOAD</button>
        </main>
      );
    }

    return this.props.children;
  }
}

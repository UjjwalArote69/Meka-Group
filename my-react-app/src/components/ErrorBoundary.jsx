import React from "react";
import { Link } from "react-router-dom";
import i18n from "../i18n/i18n";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center px-6 text-center">
          <span className="text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
            {i18n.t("errorBoundary.label")}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-tighter text-[#050505] mb-6">
            {i18n.t("errorBoundary.title")}
          </h1>
          <p className="text-gray-600 text-base font-sans max-w-md mb-12">
            {i18n.t("errorBoundary.description")}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-10 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold rounded-sm"
            >
              {i18n.t("errorBoundary.refresh")}
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false })}
              className="px-10 py-4 border border-black/15 text-[#050505] text-[10px] tracking-[0.3em] uppercase font-bold rounded-sm"
            >
              {i18n.t("errorBoundary.goHome")}
            </Link>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

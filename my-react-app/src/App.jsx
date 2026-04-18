// src/App.jsx
import React, { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Landing/Home";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import MekaAssistant from "./components/MekaAssistant";

// Route code-splitting — each non-home route ships its own chunk so the
// initial landing bundle doesn't carry Leaflet, the calculator, etc.
const Contact              = lazy(() => import("./pages/Contact"));
const AboutPage            = lazy(() => import("./pages/About/AboutPage"));
const ProjectsPage         = lazy(() => import("./pages/ProjectsPage"));
const ExpertisePage        = lazy(() => import("./pages/Business/Businesses"));
const Companies            = lazy(() => import("./pages/Companies/Companies"));
const CareersPage          = lazy(() => import("./pages/Careers"));
const NotFound             = lazy(() => import("./pages/NotFound"));
const CapabilityCalculator = lazy(() => import("./components/CapabilityCalculator"));

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadStartTime] = useState(() => Date.now());
  const location = useLocation();
  const MIN_LOADER_TIME = 2000;

  const finishLoading = useCallback(() => {
    const elapsed = Date.now() - loadStartTime;
    const remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);

    setProgress(100);

    setTimeout(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, remaining);
  }, [loadStartTime]);

  const handleProgress = useCallback((p) => {
    setProgress(p);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      // Skip the landing-page loader when the user lands on any other route.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      finishLoading();
    }
  }, [location.pathname, finishLoading]);

  return (
    <ErrorBoundary>
      <div className="w-full">
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-[#0ea5a4] focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:rounded-sm"
        >
          Skip to main content
        </a>

        <Navbar />
        <Loader visible={loading} progress={progress} brandLogo="/logo.png" />

        <div id="main-content" className={loading ? "pointer-events-none" : "pointer-events-auto"}>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route
                path="/"
                element={<Home onLoadProgress={handleProgress} onReady={finishLoading} />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/business" element={<ExpertisePage />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/scope" element={<CapabilityCalculator />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        {!loading && <MekaAssistant />}
      </div>
    </ErrorBoundary>
  );
}

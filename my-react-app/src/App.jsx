/* eslint-disable react-hooks/purity */
// src/App.jsx
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Landing/Home";
import Contact from "./pages/Contact";
import AboutPage from "./pages/About/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExpertisePage from "./pages/Business/Businesses";
import ScrollToTop from "./components/ScrollToTop";
// import CustomCursor from "./components/layout/CustomCursor";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const loadStartTime = useRef(Date.now());
  const MIN_LOADER_TIME = 2000;

  const finishLoading = useCallback(() => {
    const elapsed = Date.now() - loadStartTime.current;
    const remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);

    setProgress(100);

    setTimeout(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, remaining);
  }, []);

  const handleProgress = useCallback((p) => {
    setProgress(p);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      finishLoading();
    }
  }, [location.pathname, finishLoading]);

  return (
    <div className="w-full">
      {/* <CustomCursor /> */}
      <Navbar />
      <Loader visible={loading} progress={progress} brandLogo="/logo.png" />

      <div className={loading ? "pointer-events-none" : "pointer-events-auto"}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<Home onLoadProgress={handleProgress} onReady={finishLoading} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/business" element={<ExpertisePage />} />
        </Routes>
      </div>
    </div>
  );
}
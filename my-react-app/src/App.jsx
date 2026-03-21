import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Route,
  useLocation,
  Router,
  Routes,
} from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Home from "./pages/Landing/Home";
import Contact from "./pages/Contact";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExpertisePage from "./pages/Expertise";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [loading, setLoading] =
    useState(true);
  const [progress, setProgress] =
    useState(0);
  const location = useLocation(); 
  const loadStartTime = useRef(
    // eslint-disable-next-line react-hooks/purity
    Date.now(),
  );
  const MIN_LOADER_TIME = 2000;

  // Function to finish loading
  const finishLoading =
    useCallback(() => {
      const elapsed =
        Date.now() -
        loadStartTime.current;
      const remaining = Math.max(
        MIN_LOADER_TIME - elapsed,
        0,
      );

      setProgress(100);

      setTimeout(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, remaining);
    }, []);

  const handleProgress = useCallback(
    (p) => {
      setProgress(p);
    },
    [],
  );

  // Handle route-specific loading
  useEffect(() => {
    // If we are NOT on the home page, we don't wait for the Hero frames.
    if (location.pathname !== "/") {
      finishLoading();
    }
  }, [
    location.pathname,
    finishLoading,
  ]);

  return (
    <div className="w-full">
      <Navbar />
      <Loader
        visible={loading}
        progress={progress}
        brandLogo="/logo.png"
      />

      <div
        className={
          loading
            ? "pointer-events-none"
            : "pointer-events-auto"
        }
      >
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onLoadProgress={
                  handleProgress
                }
                onReady={finishLoading}
              />
            }
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/about"
            element={<AboutPage />}
          />
          <Route
            path="/projects"
            element={<ProjectsPage />}
          />
          <Route
            path="/expertise"
            element={<ExpertisePage />}
          />
        </Routes>
      </div>
    </div>
  );
}

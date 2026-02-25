/* eslint-disable react-hooks/purity */
// src/App.jsx
import React, { useState, useCallback, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Global Components
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Contact from "./pages/Contact"; // Example of adding more pages later

export default function App() {
  // Global loader state
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadStartTime = useRef(Date.now());
  const MIN_LOADER_TIME = 3000; // 3 seconds for premium UX

  // Progress callback (from Hero canvas)
  const handleProgress = useCallback((p) => {
    setProgress(p);
  }, []);

  // When hero sequence is ready
  const handleHeroReady = useCallback(() => {
    const elapsed = Date.now() - loadStartTime.current;
    const remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);

    setProgress(100);

    setTimeout(() => {
      setTimeout(() => {
        setLoading(false);
      }, 500); 
    }, remaining);
  }, []);

  // Safety fallback
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      setLoading(false);
    }, 8000); 

    return () => clearTimeout(safetyTimeout);
  }, []);

  return (
    <Router>
      <div className="w-full">
        {/* Global Loader Layer */}
        <Navbar/>
        <Loader
          visible={loading}
          progress={progress}
          brandLogo="/logo.png" 
        />

        {/* Prevent interaction while the curtain is down */}
        <div className={loading ? "pointer-events-none" : "pointer-events-auto"}>
          
          {/* Production-Ready Routing */}
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  onLoadProgress={handleProgress} 
                  onReady={handleHeroReady} 
                />
              } 
            />
            
            {/* Example of how you will add your other pages: */}
            {/* <Route path="/about-us" element={<AboutPage />} /> */}
            {/* <Route path="/contact" element={<ContactPage />} /> */}
            
            {/* Catch-all 404 Route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}
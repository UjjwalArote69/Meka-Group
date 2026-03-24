// src/pages/Landing/Home.jsx
import React, { useRef, useEffect, lazy, Suspense } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// 1. MUST IMPORT SYNCHRONOUSLY. Never lazy-load the above-the-fold Hero section!
import NewHero from "./components/NewHero"; 

// The rest can remain lazy loaded
const About = lazy(() => import("../../components/About"));
const Fleet = lazy(() => import("../../components/Fleet"));
const Projects = lazy(() => import("../../components/Projects"));
const MoreProjects = lazy(() => import("../../components/MoreProjects"));
const Testimonials = lazy(() => import("../../components/Testimonials"));
const Footer = lazy(() => import("../../components/Footer"));

gsap.registerPlugin(ScrollTrigger);

const Home = ({
  onLoadProgress = () => {},
  onReady = () => {},
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 2. ROBUST GSAP REFRESH: 
    // This watches the container. When lazy components (like About, Fleet) 
    // finally load and expand the DOM, this forces GSAP to recalculate all positions.
    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Fallback delayed refresh
    const id = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      observer.disconnect();
      clearTimeout(id);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative z-0">
      
      {/* Hero renders immediately, taking up 100vh and fixing the GSAP offset */}
      <div id="hero">
        <NewHero onLoadProgress={onLoadProgress} onReady={onReady} />
      </div>

      <Suspense fallback={<div className="h-screen bg-[#0a0a0a]" />}>
        <div id="about"><About /></div>
        <div id="fleet"><Fleet /></div>
        <div id="projects"><Projects /></div>
        <div id="archive"><MoreProjects /></div>
        <div id="testimonials"><Testimonials /></div>
        <div id="footer"><Footer /></div>
      </Suspense>
    </div>
  );
};

export default Home;
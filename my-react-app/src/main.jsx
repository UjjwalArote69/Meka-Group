// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import "./i18n/i18n";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { detectIsMobile } from "./hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

// NOTE: We do NOT globally honour prefers-reduced-motion here.
// Windows 11 defaults "Animation effects" off, which flips the OS flag for
// many users who don't realise it — globally collapsing GSAP to 0.001s made
// the whole site feel sudden. Individual components (see NewHero) can still
// opt into reduced-motion handling when it genuinely improves UX.

// ── LENIS SETUP ──
// Imported statically so ScrollTrigger has a smooth-scroll source from the
// first frame (dynamic-importing caused desktop smoothness regressions).
// Instantiation is still gated on mobile — the rAF loop + scroll listener
// add overhead with no benefit since smoothTouch is off anyway.
let lenisInstance = null;
if (!detectIsMobile()) {
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    infinite: false,
  });
  lenisInstance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenisInstance.raf(time * 1000));
}

export const lenis = () => lenisInstance;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
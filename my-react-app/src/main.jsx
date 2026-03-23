// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── LENIS SETUP (modern package — passive wheel events by default) ──
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,       // CRITICAL — touch scroll must stay native
  wheelMultiplier: 1,
  touchMultiplier: 1,
  infinite: false,
});

// Sync Lenis → ScrollTrigger on every scroll event
lenis.on("scroll", ScrollTrigger.update);

// Drive Lenis from GSAP's ticker (single rAF loop, no double-raf conflict)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Prevent GSAP from throttling frames when tab is backgrounded
gsap.ticker.lagSmoothing(0);

// Export for use in components (e.g., scroll-to, pause during modals)
export { lenis };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
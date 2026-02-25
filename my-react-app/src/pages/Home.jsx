// src/pages/Home.jsx
import React, { useState, useRef, useCallback } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import MoreProjects from '../components/MoreProjects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ onLoadProgress = () => {}, onReady = () => {} }) => {
  const containerRef = useRef(null);

  const [navData, setNavData] = useState({
    text: "Scroll to explore", 
    target: "#about",
    isUp: false,
  });

  const updateNav = useCallback((text, target, isUp) => {
    setNavData((prev) => {
      if (prev.text !== text || prev.target !== target || prev.isUp !== isUp) {
        return { text, target, isUp };
      }
      return prev;
    });
  }, []);

  useGSAP(() => {
    // 1. BUTTON CONTAINER ANIMATION
    // Start perfectly centered
    gsap.set("#global-scroll-btn", {
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });

    // Move to bottom right (100% left/top pushes the top-left corner to the very edge, 
    // -100 x/yPercent pulls it exactly inside the screen, and x/y adds the margin padding)
    gsap.to("#global-scroll-btn", {
      top: "100%",
      left: "100%",
      xPercent: -100,
      yPercent: -100,
      x: () => window.innerWidth >= 768 ? -48 : -32, // 48px margin desktop, 32px mobile
      y: () => window.innerWidth >= 768 ? -48 : -32,
      scale: 0.85,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=800",
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates screen width perfectly on resize
      },
    });

    // 2. TEXT ALIGNMENT ANIMATION
    // Text starts centered on the button
    gsap.set("#scroll-btn-text", {
      left: "50%",
      xPercent: -50,
    });

    // Text slides to become perfectly flush with the right edge of the button
    gsap.to("#scroll-btn-text", {
      left: "100%",
      xPercent: -100,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=800",
        scrub: 1,
      },
    });

    // 3. DIRECTIONAL TRACKING
    const sections = [
      { id: "#hero", next: "#about", nextText: "Scroll to About", prev: "#hero", prevText: "Scroll to explore" },
      { id: "#about", next: "#projects", nextText: "Scroll to Projects", prev: "#hero", prevText: "Scroll to Hero" },
      { id: "#projects", next: "#archive", nextText: "Scroll to Archive", prev: "#about", prevText: "Scroll to About" },
      { id: "#archive", next: "#hero", nextText: "Back to Top", prev: "#projects", prevText: "Scroll to Projects" }
    ];

    sections.forEach((sec, index) => {
      ScrollTrigger.create({
        trigger: sec.id,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          if (self.direction === 1) { 
            if (index === sections.length - 1) {
              updateNav(sec.nextText, sec.next, true); 
            } else {
              updateNav(sec.nextText, sec.next, false); 
            }
          } else if (self.direction === -1) { 
            if (index === 0) {
              updateNav(sec.prevText, sec.next, false); 
            } else {
              updateNav(sec.prevText, sec.prev, true); 
            }
          }
        }
      });
    });

  }, { scope: containerRef });

  const handleScrollClick = () => {
    const targetEl = document.querySelector(navData.target);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="w-full relative z-0">
        
        <div id="hero"><Hero onLoadProgress={onLoadProgress} onReady={onReady} /></div>
        <div id="about"><About /></div>
        <div id="projects"><Projects/></div>
        <div id="archive"><MoreProjects/></div>

        {/* --- GLOBAL FLOATING SCROLL BUTTON --- */}
        <div 
          id="global-scroll-btn"
          // FIX APPLIED: We removed all widths/flex columns so the box wraps TIGHTLY around the circular button
          className="fixed z-150 pointer-events-none"
        >
          
          {/* FIX APPLIED: Text is absolutely positioned.
            Because it is 'absolute', it breaks out of the container's physical width flow.
            Changing text length now has ZERO effect on the button's layout.
          */}
          <span 
            id="scroll-btn-text"
            className="absolute bottom-[calc(100%+16px)] whitespace-nowrap text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-white mix-blend-difference transition-opacity duration-300"
          >
            {navData.text}
          </span>
          
          <button
            onClick={handleScrollClick}
            className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur-md hover:bg-white hover:text-black transition-all duration-500 text-white cursor-pointer pointer-events-auto group shadow-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-5 h-5 md:w-6 md:h-6 transform transition-all duration-500 ${
                navData.isUp ? "rotate-180 group-hover:-translate-y-2" : "group-hover:translate-y-2"
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </button>

        </div>
    </div>
  );
}

export default Home;
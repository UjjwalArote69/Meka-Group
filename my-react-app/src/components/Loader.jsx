// src/components/Loader.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loader({ visible = true, progress = 0, brandLogo }) {
  const containerRef = useRef(null);
  const progressObj = useRef({ val: 0 });
  const progressTextRef = useRef(null);
  const progressBarRef = useRef(null);

  // 1. Progress Bar & Text Update Logic
  useGSAP(() => {
    let target = visible ? Math.min(progress, 95) : 100;

    gsap.to(progressObj.current, {
      val: target,
      duration: visible ? 1.2 : 0.8,
      ease: visible ? "power2.out" : "power3.inOut",
      onUpdate: () => {
        const currentVal = Math.round(progressObj.current.val);
        
        if (progressTextRef.current) {
          progressTextRef.current.innerText = `${currentVal}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${currentVal}%`;
        }
      },
    });
  }, [progress, visible]);

  // 2. Ultra-Premium Entrance & Exit Animations
  useGSAP(() => {
    if (visible) {
      // Reset curtain state
      gsap.set(containerRef.current, { 
        yPercent: 0, 
        borderBottomLeftRadius: "0%", 
        borderBottomRightRadius: "0%" 
      });
      
      const tl = gsap.timeline();

      // Step 1: Masked reveal for the Logo/Company Name
      tl.fromTo(
        ".brand-reveal",
        { yPercent: 120, rotation: 3 }, // Starts pushed down below the hidden wrapper with a slight angle
        { yPercent: 0, rotation: 0, duration: 1.4, ease: "expo.out" }
      )
      // Step 2: Cinematic Blur & Letter Spacing for the Tagline
      .fromTo(
        ".tagline-reveal",
        { opacity: 0, filter: "blur(10px)", letterSpacing: "0.3em" },
        { opacity: 1, filter: "blur(0px)", letterSpacing: "0.05em", duration: 1.2, ease: "power3.out" },
        "-=1.0" // Overlap the animations
      )
      // Step 3: The empty progress track grows out from the center
      .fromTo(
        ".progress-track",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1, ease: "expo.out", transformOrigin: "center" },
        "-=0.8"
      )
      // Step 4: Percentage text drops in slightly
      .fromTo(
        ".progress-number",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

    } else {
      // The "Agency Curtain" Exit Timeline
      const tl = gsap.timeline();

      // Reverse stagger the text out
      tl.to([".progress-number", ".progress-track", ".tagline-reveal", ".brand-reveal"], {
        opacity: 0,
        y: -30,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.in",
      })
      // Sweep the white background UP
      .to(containerRef.current, {
        yPercent: -100, 
        borderBottomLeftRadius: "30%",  
        borderBottomRightRadius: "30%",
        duration: 1.2,
        ease: "expo.inOut",
      });
    }
  }, { scope: containerRef, dependencies: [visible] });

  return (
    <div
      ref={containerRef}
      aria-hidden={!visible}
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-white ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="flex flex-col font-sans items-center justify-center text-center px-6 w-full">
        
        {/* BIG LOGO - Wrapped in overflow-hidden for the mask effect */}
        <div className="mb-8 overflow-hidden py-2 px-4">
          <div className="brand-reveal transform-gpu origin-bottom-left">
            {brandLogo ? (
              <img
                src={brandLogo}
                alt="brand logo"
                className="w-40 md:w-56 h-auto object-contain block"
              />
            ) : (
              <h1 className="text-black text-6xl md:text-8xl font-bold tracking-tighter">
                Company
              </h1>
            )}
          </div>
        </div>

        {/* Subtle Tagline */}
        <p className="tagline-reveal text-black/50 text-xs md:text-sm uppercase font-medium mb-12">
          Preparing your experience
        </p>

        {/* Minimal Progress Bar Track */}
        <div className="progress-track w-64 md:w-80 h-0.5 bg-black/10 overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-black w-0"
          />
        </div>

        {/* Clean Percentage */}
        <div 
          ref={progressTextRef}
          className="progress-number mt-6 text-black text-xs md:text-sm tracking-[0.2em] tabular-nums font-semibold"
        >
          0%
        </div>
        
      </div>
    </div>
  );
}
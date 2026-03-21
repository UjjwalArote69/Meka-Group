// src/components/Hero.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onLoadProgress = () => {}, onReady = () => {} }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const hasCalledReady = useRef(false);

  // Signal the loader that this hero is ready (no heavy preloading needed)
  useEffect(() => {
    if (hasCalledReady.current) return;

    const bgImage = new Image();
    bgImage.src = "/frames/frame_0001.webp";

    bgImage.onload = () => {
      onLoadProgress(100);
      onReady();
      hasCalledReady.current = true;
    };

    bgImage.onerror = () => {
      // Even if the image fails, unblock the loader
      onLoadProgress(100);
      onReady();
      hasCalledReady.current = true;
    };

    // Safety timeout — never block the loader for more than 3s
    const timeout = setTimeout(() => {
      if (!hasCalledReady.current) {
        onLoadProgress(100);
        onReady();
        hasCalledReady.current = true;
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onLoadProgress, onReady]);

  useGSAP(
    () => {
      // ── 1. HERO BACKGROUND PARALLAX ──
      gsap.to(".hero-bg", {
        yPercent: 25,
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ── 2. ENTRANCE TIMELINE ──
      const tl = gsap.timeline({ delay: 0.3 });

      // Background fade in & subtle zoom
      tl.fromTo(
        ".hero-bg",
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      )
        // Top label
        .fromTo(
          ".hero-label",
          { opacity: 0, y: 20, letterSpacing: "0.8em" },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.4em",
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1.4"
        )
        // Main heading — word by word reveal
        .fromTo(
          ".hero-heading-word",
          { y: "110%", rotateX: -15 },
          {
            y: "0%",
            rotateX: 0,
            duration: 1.4,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.9"
        )
        // Subtitle
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        // Divider line grows from center
        .fromTo(
          ".hero-divider",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "expo.out" },
          "-=0.6"
        )
        // Video block rises into view
        .fromTo(
          ".hero-video-block",
          { opacity: 0, y: 80, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "power3.out" },
          "-=0.5"
        )
        // Quote text fades
        .fromTo(
          ".hero-quote",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=0.6"
        )
        // Attribution
        .fromTo(
          ".hero-attribution",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );

      // ── 3. SCROLL-DRIVEN TEXT FADE OUT ──
      gsap.to(".hero-content-overlay", {
        yPercent: -15,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "40% top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  // Video play/pause toggle
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div ref={containerRef} className="w-full relative z-0">
      {/* ═══════════════════════════════════════════════
          SECTION 1: FULL-VIEWPORT HERO
          ═══════════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen overflow-hidden bg-[#06181f]">
        {/* Background Image Layer */}
        <div className="hero-bg absolute inset-0 w-full h-full">
          <img
            src="/frames/frame_0001.webp"
            alt="Marine construction at sea"
            className="w-full h-full object-cover"
          />
          {/* Color overlay to deepen the marine feel */}
          <div className="absolute inset-0 bg-[#06181f]/60 mix-blend-multiply" />
          {/* Gradient: darken bottom for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#06181f]/30 via-transparent to-[#06181f]/90" />
        </div>

        {/* ── TEXT OVERLAY ── */}
        <div className="hero-content-overlay relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24">
          {/* Top Label */}
          <p className="hero-label font-sans text-[#0ea5a4] text-[9px] md:text-[11px] font-semibold tracking-[0.4em] uppercase mb-8 md:mb-10">
            40+ Years of Marine Excellence
          </p>

          {/* Main Heading — masked word reveals */}
          <h1 className="flex flex-col items-center gap-1 md:gap-2 select-none mb-6 md:mb-8">
            {/* Line 1 */}
            <span className="overflow-hidden py-2 -my-1" style={{ perspective: "600px" }}>
              <span className="hero-heading-word block font-sans font-black text-5xl md:text-[7rem] lg:text-[8.5rem] uppercase tracking-tighter text-white leading-[0.9]">
                Marine
              </span>
            </span>
            {/* Line 2 */}
            <span className="overflow-hidden py-2 -my-1" style={{ perspective: "600px" }}>
              <span className="hero-heading-word block font-serif italic text-5xl md:text-[7rem] lg:text-[8.5rem] tracking-tight text-white/80 lowercase leading-[0.9]">
                construction
              </span>
            </span>
            {/* Line 3 */}
            <span className="overflow-hidden py-2 -my-1" style={{ perspective: "600px" }}>
              <span className="hero-heading-word block font-sans font-black text-5xl md:text-[7rem] lg:text-[8.5rem] uppercase tracking-tighter text-white leading-[0.9]">
                Leaders<span className="text-[#0ea5a4]">.</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle font-sans text-white/40 text-sm md:text-lg font-light tracking-wide max-w-xl leading-relaxed">
            Engineering resilient ports, coastlines & offshore infrastructure
            across <span className="text-white/70 font-medium">110+ countries</span>.
          </p>

          {/* Divider */}
          <div className="hero-divider w-16 md:w-24 h-px bg-white/20 mt-10 md:mt-14 origin-center" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: VIDEO FEATURE + QUOTE
          ═══════════════════════════════════════════════ */}
      <section className="relative z-10 bg-[#06181f] pb-24 md:pb-32">
        {/* Video Block — pulled up to overlap the hero */}
        <div className="hero-video-block relative -mt-24 md:-mt-32 mx-auto w-[90%] md:w-[75%] lg:w-[65%] max-w-[1100px]">
          {/* The Video Container */}
          <div
            onClick={handleVideoClick}
            className="relative aspect-video overflow-hidden cursor-pointer group bg-black shadow-2xl"
            style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)" }}
          >
            {/* 
              Dummy video — replace src with your real video URL.
              Using a poster frame from your existing assets.
            */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/frames/frame_0100.webp"
              muted
              loop
              playsInline
              preload="metadata"
            >
              {/* Replace this with your actual video source */}
              <source src="/videos/hero-reel.mp4" type="video/mp4" />
            </video>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-500">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:border-white transition-all duration-500 backdrop-blur-sm bg-white/5">
                <svg
                  className="w-6 h-6 md:w-7 md:h-7 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Bottom gradient bar */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Video caption */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between pointer-events-none">
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium">
                Project Reel 2024
              </span>
              <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40">
                02:34
              </span>
            </div>
          </div>
        </div>

        {/* ── QUOTE SECTION ── */}
        <div className="hero-quote max-w-4xl mx-auto px-6 md:px-12 mt-16 md:mt-24 text-center">
          <blockquote className="font-serif italic text-xl md:text-3xl lg:text-4xl text-white/80 leading-relaxed md:leading-[1.4] tracking-wide">
            "We do not just build infrastructure — we engineer resilience into
            the coastlines and ports that power global trade."
          </blockquote>

          {/* Dot navigation (decorative, matching the OCEARCH style) */}
          <div className="flex items-center justify-center gap-2 mt-8 md:mt-10">
            <span className="w-2 h-2 rounded-full bg-[#0ea5a4]" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Attribution */}
          <div className="hero-attribution mt-6 md:mt-8 flex flex-col items-center gap-1">
            <p className="font-sans text-white text-sm md:text-base font-semibold tracking-wide">
              Dr. Meka Vijay Papa Rao
            </p>
            <p className="font-sans text-[#0ea5a4] text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">
              Founder & Chairman, Meka Group
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
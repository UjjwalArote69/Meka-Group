// src/pages/Landing/components/NewHero.jsx
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Companies from "../../../components/Companies";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "45",
    label: "Years Experience",
    suffix: "+",
  },
  {
    value: "50",
    label: "Marine Projects",
    suffix: "+",
  },
  {
    value: "25",
    label: "Specialized Vessels",
    suffix: "+",
  },
  {
    value: "10",
    label: "Global Reach",
    suffix: "",
  },
];

const CLIENTS = [
  "Reliance Industries",
  "L&T",
  "ONGC",
  "Hyundai Heavy",
  "Mitsui & Co.",
  "McDermott",
  "Vatech Wabag",
  "Indian Navy",
];

// Detect touch device once — avoids repeated checks
const IS_TOUCH =
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0);

const NewHero = ({
  onLoadProgress = () => {},
  onReady = () => {},
}) => {
  const containerRef = useRef(null);
  const videoContainerRef =
    useRef(null);
  const videoRef = useRef(null);
  const ctaRef = useRef(null);
  const hasCalledReady = useRef(false);
  const [isPlaying, setIsPlaying] =
    useState(false);

  // ── LOADER HANDOFF ──
  useEffect(() => {
    if (hasCalledReady.current) return;
    const bgImage = new Image();
    bgImage.src =
      "/frames/frame_0001.webp";
    const handleLoad = () => {
      if (hasCalledReady.current)
        return;
      onLoadProgress(100);
      onReady();
      hasCalledReady.current = true;
    };
    bgImage.onload = handleLoad;
    bgImage.onerror = handleLoad;
    const timeout = setTimeout(() => {
      if (!hasCalledReady.current)
        handleLoad();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [onLoadProgress, onReady]);

  // ── GSAP ──
  useGSAP(
    () => {
      // 1. ENTRANCE — simple opacity + transform only
      const tl = gsap.timeline({
        delay: 0.1,
      });

      tl.fromTo(
        ".hero-bg-img",
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
      )
        .fromTo(
          ".edge-text",
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=1.5",
        )
        .fromTo(
          ".reveal-text",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "expo.out",
          },
          "-=1.4",
        )
        .fromTo(
          ".reveal-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "expo.out",
          },
          "-=1.2",
        )
        .fromTo(
          ".reveal-desc",
          { opacity: 0, x: 15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=1.0",
        )
        .fromTo(
          ".hero-cta-circle",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "elastic.out(1, 0.7)",
          },
          "-=0.8",
        );

      // 2. PARALLAX — DISABLED on touch devices (major mobile perf killer)
      if (!IS_TOUCH) {
        gsap.to(".hero-bg-img", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-viewport",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-content-layer", {
          y: -60,
          opacity: 0,
          scrollTrigger: {
            trigger: ".hero-viewport",
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });
      }

      // 3. STATS COUNT-UP
      const statNums =
        gsap.utils.toArray(".stat-val");
      statNums.forEach((el) => {
        const target = parseInt(
          el.getAttribute(
            "data-target",
          ),
          10,
        );
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: ".stats-section",
              start: "top 85%",
            },
            onUpdate: function () {
              el.innerText = Math.ceil(
                this.targets()[0]
                  .innerText,
              );
            },
          },
        );
      });

      // 4. VIDEO REVEAL
      //    Mobile: simple opacity + y (no clipPath — expensive on mobile GPUs)
      //    Desktop: full clipPath + scale effect
      if (IS_TOUCH) {
        gsap.fromTo(
          ".video-wrapper",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger:
                videoContainerRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          },
        );
      } else {
        gsap.fromTo(
          ".video-wrapper",
          {
            scale: 0.7,
            opacity: 0,
            y: 80,
            clipPath:
              "inset(2% round 50px)",
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            clipPath:
              "inset(0% round 0px)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger:
                videoContainerRef.current,
              start: "top 90%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      }

      // 5. MARQUEE
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });
    },
    { scope: containerRef },
  );

  // ── MAGNETIC BUTTON (desktop only) ──
  const handleMouseMove = useCallback(
    (e) => {
      if (IS_TOUCH || !ctaRef.current)
        return;
      const {
        left,
        top,
        width,
        height,
      } =
        ctaRef.current.getBoundingClientRect();
      const x =
        (e.clientX - left - width / 2) *
        0.4;
      const y =
        (e.clientY - top - height / 2) *
        0.4;
      gsap.to(ctaRef.current, {
        x,
        y,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    [],
  );

  const handleMouseLeave =
    useCallback(() => {
      if (IS_TOUCH || !ctaRef.current)
        return;
      gsap.to(ctaRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    }, []);

  // ── VIDEO TOGGLE ──
  const handleVideoToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative z-0"
    >
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — DARK HERO
          ══════════════════════════════════════════════════════ */}
      <section className="hero-viewport relative w-full h-screen overflow-hidden bg-[#040e12]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#040e12]/60 via-[#040e12]/30 to-[#040e12]/80 z-10" />
          <img
            src="/new_hero_image.jpg"
            alt="Marine construction site"
            className="hero-bg-img w-full h-full object-cover origin-center"
          />
        </div>

        <div className="hero-content-layer relative z-20 flex flex-col justify-between h-full w-full px-6 md:px-12 py-8 md:py-12 pointer-events-none">
          <div className="w-full max-w-7xl mx-auto flex flex-col justify-center flex-grow mt-10 md:mt-30">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-0">
              <div className="relative z-10 flex flex-col">
                <div className="overflow-hidden py-5 -my-5">
                  <h1 className="reveal-text font-sans font-medium text-[15vw] md:text-[8rem] lg:text-[9.5rem] leading-[0.85] tracking-[-0.03em] uppercase text-white">
                    Marine
                  </h1>
                </div>
                <div className="overflow-hidden py-5 -my-5 flex items-center gap-4 md:gap-6 mt-0 md:mt-2">
                  <div className="reveal-line hidden md:block w-12 lg:w-24 h-[3px] bg-[#0ea5a4] origin-left" />
                  <h1 className="reveal-text font-serif italic text-[15vw] md:text-[8.5rem] lg:text-[10rem] leading-[0.85] tracking-tight lowercase text-[#0ea5a4]">
                    engineering.
                  </h1>
                </div>
              </div>

              <div className="reveal-desc flex flex-col gap-3 md:gap-4 max-w-[280px] lg:mb-6 ml-1 md:ml-0">
                <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#0ea5a4] font-bold">
                  The Meka Standard
                </p>
                <p className="font-sans text-xs md:text-sm leading-relaxed text-white/50 font-medium">
                  Four decades of
                  specialized expertise
                  delivering complex
                  coastal infrastructure
                  and marine
                  construction globally.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end w-full">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="edge-text w-12 md:w-20 h-px bg-white/30 origin-left" />
              <span className="edge-text font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40">
                Scroll to explore
              </span>
            </div>

            {/* CTA — NO backdrop-blur (kills mobile GPU) */}
            <div className="hero-cta-circle pointer-events-auto">
              <a
                href="#projects"
                ref={ctaRef}
                onMouseMove={
                  handleMouseMove
                }
                onMouseLeave={
                  handleMouseLeave
                }
                className="group relative flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border border-white/20 bg-white/5 hover:border-transparent transition-colors duration-500 overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 font-sans text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-white font-bold text-center leading-relaxed">
                  View <br /> Projects
                </span>
                <div className="absolute inset-0 bg-[#0ea5a4] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out origin-center" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — STATS (dark, below viewport)
          ══════════════════════════════════════════════════════ */}
      <section className="stats-section relative z-10 bg-[#040e12] py-16 md:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-0 divide-x-0 md:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-start md:items-center px-4 md:px-8"
            >
              <div className="flex items-baseline mb-2">
                <span
                  className="stat-val font-sans font-medium text-4xl md:text-6xl text-white tracking-tighter"
                  data-target={parseInt(
                    stat.value,
                    10,
                  )}
                >
                  0
                </span>
                <span className="text-[#0ea5a4] font-sans font-light text-3xl md:text-5xl ml-1">
                  {stat.suffix}
                </span>
              </div>
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
          
      </section>

      {/* ══════════════════════════════════════════════════════
          CURVE — dark into white
          ══════════════════════════════════════════════════════ */}
      <div className="relative -top-0 z-10 w-full bg-[#040e12]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block -mb-px"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,40 Q720,120 0,40 Z"
            fill="#040e12"
          />
          <path
            d="M0,40 Q720,120 1440,40 L1440,120 L0,120 Z"
            fill="#f5f5f0"
          />
        </svg>
      </div>

      <Companies />

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — VIDEO (white)
          ══════════════════════════════════════════════════════ */}
      <section
        ref={videoContainerRef}
        className="relative z-10 bg-[#f5f5f0] py-12 md:py-24 flex flex-col items-center overflow-hidden"
      >
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#0a0a0a]/40 mb-8 md:mb-12 font-medium">
          Showreel 2024
        </p>

        {/* Video — NO backdrop-blur on play button */}
        <div
          onClick={handleVideoToggle}
          className="video-wrapper relative aspect-video w-[92%] md:w-[85%] max-w-[1100px] cursor-pointer group bg-[#0a0a0a] shadow-2xl overflow-hidden mx-auto rounded-lg"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            poster="/frames/frame_0100.webp"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source
              src="/videos/hero-reel.mp4"
              type="video/mp4"
            />
          </video>

          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isPlaying
                ? "bg-black/0"
                : "bg-black/30"
            }`}
          >
            <div
              className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-white/40 flex items-center justify-center bg-black/40 group-hover:scale-110 group-hover:bg-white group-hover:text-[#0a0a0a] transition-all duration-500 ease-out text-white ${
                isPlaying
                  ? "opacity-0 scale-50"
                  : "opacity-100 scale-100"
              }`}
            >
              <span className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-bold ml-1">
                Play
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — MARQUEE (white)
          ══════════════════════════════════════════════════════ */}
      <section className="relative z-10 bg-[#f5f5f0] py-12 md:py-20 overflow-hidden">
        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#0a0a0a]/30 text-center mb-12 font-medium">
          Trusted globally by industry
          leaders
        </p>
        <div className="flex overflow-hidden whitespace-nowrap relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#f5f5f0] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#f5f5f0] to-transparent z-10" />
          <div className="marquee-track flex items-center gap-12 md:gap-32 px-8 md:px-12 w-max">
            {[
              ...CLIENTS,
              ...CLIENTS,
            ].map((client, index) => (
              <span
                key={index}
                className="font-sans text-xs md:text-xl font-bold uppercase tracking-[0.15em] text-[#0a0a0a]/40"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BOTTOM CURVE — white into dark About
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-[#f5f5f0]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block -mb-px"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1440,0 L1440,40 Q720,120 0,40 Z"
            fill="#f5f5f0"
          />
          <path
            d="M0,40 Q720,120 1440,40 L1440,120 L0,120 Z"
            fill="#0a0a0a"
          />
        </svg>
      </div>
    </div>
  );
};

export default NewHero;

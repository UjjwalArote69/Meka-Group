// src/pages/Landing/components/NewHero.jsx
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import Companies from "../../../components/Companies";
import useIsMobile from "../../../hooks/useIsMobile";
import { useHero } from "../../../hooks/useHero";
import { loc } from "../../../lib/locale";

gsap.registerPlugin(ScrollTrigger);

// ──────────────────────────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────────────────────────
const NewHero = ({ onLoadProgress = () => {}, onReady = () => {} }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const hero = useHero();
  const STATS = useMemo(
    () => hero.stats.map((s) => ({ ...s, label: loc(s.label, lang) })),
    [lang, hero.stats]
  );
  const CLIENTS = hero.clients;
  const DEPLOYMENTS = useMemo(
    () =>
      hero.deployments.map((d) => ({
        code: d.code,
        site: loc(d.site, lang),
        coord: loc(d.coord, lang),
      })),
    [lang, hero.deployments]
  );
  
  const containerRef      = useRef(null);
  const heroVideoRef      = useRef(null);
  const hasCalledReady    = useRef(false);

  const [deployIndex, setDeployIndex] = useState(0);
  const [isTouch] = useState(() =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  const isMobile = useIsMobile();
  const prefersReducedMotion = false;

  // ── LOADER HANDOFF ──
  useEffect(() => {
    if (hasCalledReady.current) return;
    const markReady = () => {
      if (hasCalledReady.current) return;
      hasCalledReady.current = true;
      onLoadProgress(100);
      onReady();
    };
    const timeout = setTimeout(markReady, 2500);
    if (heroVideoRef.current && heroVideoRef.current.readyState >= 3) {
      markReady();
    }
    return () => clearTimeout(timeout);
  }, [onLoadProgress, onReady]);

  // ── LIVE DEPLOYMENT TICKER ──
  useEffect(() => {
    if (isMobile) return;
    let id;
    const start = () => {
      id = setInterval(
        () => setDeployIndex((i) => (i + 1) % DEPLOYMENTS.length),
        4000
      );
    };
    const stop = () => {
      if (id) clearInterval(id);
      id = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [DEPLOYMENTS.length, isMobile]);

  // ── GSAP ANIMATIONS ──
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          [".hero-bg-media", ".reveal-text", ".hero-fade-in", ".hero-stack-card", ".hero-stack-bg-1", ".hero-stack-bg-2"],
          { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1, yPercent: 0 }
        );
        return;
      }

      const tl = gsap.timeline({ delay: 0.1 });
      
      // Cinematic Entrance sequence
      tl.fromTo(".hero-stack-bg-1",
          { y: 60, opacity: 0 },
          { y: isMobile ? 24 : 32, opacity: 1, duration: 1.8, ease: "expo.out" }, 0)
        .fromTo(".hero-stack-bg-2",
          { y: 40, opacity: 0 },
          { y: isMobile ? 12 : 16, opacity: 1, duration: 1.8, ease: "expo.out" }, 0.1)
        .fromTo(".hero-stack-card",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, ease: "expo.out" }, 0.2)
        .fromTo(".hero-bg-media",
          { scale: 1.1 },
          { scale: 1, duration: 2.5, ease: "power3.out" }, 0)
        .fromTo(".reveal-text",
          { yPercent: 120, rotate: 2, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: "expo.out" }, 0.6)
        .fromTo(".hero-fade-in",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }, 0.8);

      // Scroll Interactions
      if (!isTouch) {
        gsap.to(".hero-stack-bg-1", {
          y: 0, scale: 0.96, opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".hero-viewport", start: "top top", end: "50% top", scrub: true },
        });
        gsap.to(".hero-stack-bg-2", {
          y: 0, scale: 0.98, opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".hero-viewport", start: "top top", end: "50% top", scrub: true },
        });

        gsap.to(".hero-content-layer", {
          y: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ".hero-viewport", start: "top top", end: "70% top", scrub: true },
        });
        
        gsap.to(".hero-bg-media", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: { trigger: ".hero-viewport", start: "top top", end: "bottom top", scrub: true },
        });
      }

      // Stats counters
      gsap.utils.toArray(".stat-val").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: "expo.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: ".stats-section", start: "top 85%" },
            onUpdate() {
              el.innerText = Math.ceil(this.targets()[0].innerText);
            },
          }
        );
      });

      // Marquee — pause when off-screen
      const marqueeTween = gsap.to(".marquee-track", {
        xPercent: -50, ease: "none", duration: 40, repeat: -1, paused: true,
      });
      ScrollTrigger.create({
        trigger: ".marquee-track",
        start: "top bottom",
        end: "bottom top",
        onEnter: () => marqueeTween.play(),
        onEnterBack: () => marqueeTween.play(),
        onLeave: () => marqueeTween.pause(),
        onLeaveBack: () => marqueeTween.pause(),
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, isTouch, isMobile] }
  );

  return (
    <div ref={containerRef} className="w-full relative z-0">
      
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO 
          ══════════════════════════════════════════════════════ */}
      <section className="hero-viewport relative w-full h-screen h-[100svh] max-h-screen overflow-hidden bg-[#f5f5f0] flex flex-col pt-24 md:pt-28 lg:pt-28 pb-4 md:pb-6 px-4 md:px-6 lg:px-8">
        <style>{`
          @keyframes scrollCue {
            0% { transform: translateY(-100%); }
            50% { transform: translateY(0%); }
            100% { transform: translateY(100%); }
          }
        `}</style>

        {/* RELATIVE WRAPPER FOR PERFECT STACKING */}
        <div className="relative flex-1 w-full max-w-[1800px] mx-auto flex flex-col">
          
          <div className="hero-stack-bg-1 absolute inset-0 bg-black/[0.04] rounded-2xl lg:rounded-3xl scale-[0.93] z-0 origin-bottom" />
          <div className="hero-stack-bg-2 absolute inset-0 bg-black/[0.06] rounded-2xl lg:rounded-3xl scale-[0.96] z-0 origin-bottom" />

          {/* MAIN VIDEO CARD */}
          <div className="hero-stack-card relative z-10 flex-1 w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden bg-[#050505] flex flex-col ring-1 ring-white/10">
            
            {/* BACKGROUND VIDEO LAYER */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {isMobile ? (
                <img
                  src="/new_hero_image.jpg"
                  alt={loc(hero.videoAlt, lang)}
                  className="hero-bg-media absolute inset-0 w-full h-full object-cover origin-center"
                />
              ) : (
                <video
                  ref={heroVideoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  fetchPriority="high"
                  poster="/new_hero_image.jpg"
                  src="/videos/hero.mp4"
                  className="hero-bg-media absolute inset-0 w-full h-full object-cover origin-center scale-105"
                />
              )}
              <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/50 z-10 pointer-events-none mix-blend-multiply" />
              <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />
              <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
            </div>

            {/* CINEMATIC CORNER BRACKETS */}
            <div className="hero-fade-in pointer-events-none absolute top-5 left-5 md:top-7 md:left-7 w-6 h-6 md:w-8 md:h-8 border-l border-t border-white/40 z-30" />
            <div className="hero-fade-in pointer-events-none absolute top-5 right-5 md:top-7 md:right-7 w-6 h-6 md:w-8 md:h-8 border-r border-t border-white/40 z-30" />
            <div className="hero-fade-in pointer-events-none absolute bottom-5 left-5 md:bottom-7 md:left-7 w-6 h-6 md:w-8 md:h-8 border-l border-b border-white/40 z-30" />
            <div className="hero-fade-in pointer-events-none absolute bottom-5 right-5 md:bottom-7 md:right-7 w-6 h-6 md:w-8 md:h-8 border-r border-b border-white/40 z-30" />

            {/* ──────────────────────────────────────────────────────────────
                INTERNAL LAYOUT
                ────────────────────────────────────────────────────────────── */}
            <div className="hero-content-layer relative z-20 flex-1 w-full h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-8 md:pt-12 pb-8 md:pb-12 pointer-events-none">

              {/* TOP ROW */}
              <div className="w-full flex justify-between items-start">
                
                {/* TOP LEFT: Main Typography */}
                <div className="flex flex-col mt-2 md:mt-4">
                  <div className="hero-fade-in flex items-center gap-3 mb-4 md:mb-6">
                    <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/60 font-bold">
                      01 / {String(DEPLOYMENTS.length).padStart(2, "0")}
                    </span>
                    <span className="w-8 h-px bg-white/30" />
                    <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold">
                      {loc(hero.liveLabel, lang)} REEL
                    </span>
                  </div>

                  <h1 className="m-0 drop-shadow-2xl flex flex-col">
                    <div className="overflow-hidden pb-2">
                      <span className="reveal-text block font-sans font-medium text-[13vw] md:text-[7rem] lg:text-[7.5rem] 2xl:text-[9rem] leading-[0.85] tracking-[-0.03em] uppercase text-white">
                        {loc(hero.titleLine1, lang)}
                      </span>
                    </div>
                    <div className="overflow-hidden flex items-center gap-4 md:gap-6 lg:gap-8 mt-1 lg:mt-3 pb-2">
                      <span className="reveal-text block font-serif italic text-[11.5vw] md:text-[6rem] lg:text-[6.5rem] 2xl:text-[8rem] leading-[0.85] tracking-tight lowercase text-[#0ea5a4]">
                        {loc(hero.titleLine2, lang)}
                      </span>
                      <span className="hidden lg:block w-16 xl:w-32 h-[2px] bg-[#0ea5a4] shrink-0 hero-fade-in rounded-full" />
                    </div>
                  </h1>
                </div>

                {/* TOP RIGHT: Live Status Indicator */}
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-full shadow-2xl hero-fade-in mt-2 md:mt-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ea5a4] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ea5a4]" />
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white font-bold">
                    {loc(hero.liveLabel, lang)}
                  </span>
                  <span className="hidden md:inline-block w-px h-3 bg-white/20" />
                  <span className="hidden md:inline-block font-sans text-[9px] uppercase tracking-[0.2em] text-white/60 font-semibold tabular-nums">
                    EST. {hero.establishedYear}
                  </span>
                </div>
              </div>

              {/* BOTTOM ROW */}
              <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-8 mt-auto pb-1 lg:pb-4">
                
                {/* BOTTOM LEFT: Deployment Ticker */}
                <div className="hidden md:flex items-center gap-4 hero-fade-in w-full lg:w-auto">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#0ea5a4] shadow-[0_0_12px_rgba(14,165,164,0.8)]" />
                  <div className="relative w-[300px] h-12 overflow-hidden">
                    {DEPLOYMENTS.map((d, i) => (
                      <div
                        key={d.code}
                        className="absolute inset-0 flex flex-col justify-start lg:items-start transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                        style={{
                          opacity: i === deployIndex ? 1 : 0,
                          transform: i === deployIndex ? "translateY(0)" : i < deployIndex ? "translateY(-100%)" : "translateY(100%)",
                        }}
                      >
                        <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/50 font-bold mb-1.5 flex items-center gap-2">
                          <span>{loc(hero.activeDeploymentLabel, lang)}</span>
                          <span className="text-white/30">// {d.coord}</span>
                        </span>
                        <p className="font-sans text-sm text-white font-medium tracking-wide">
                          {d.code} <span className="text-[#0ea5a4] mx-2 opacity-50">|</span> {d.site}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM RIGHT: Description */}
                <div className="flex flex-col lg:items-end text-left lg:text-right max-w-sm lg:max-w-md">
                  <p className="hero-fade-in font-sans text-sm md:text-base leading-relaxed text-white/75 font-medium drop-shadow-md">
                    {loc(hero.description, lang)}
                  </p>
                </div>

              </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div className="hero-fade-in pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2">
              <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold">
                {loc(hero.scrollLabel, lang)}
              </span>
              <span className="relative w-px h-10 bg-white/20 overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-[scrollCue_2s_ease-in-out_infinite]" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — STATS 
          ══════════════════════════════════════════════════════ */}
      <section className="stats-section relative z-10 bg-[#f5f5f0] py-16 md:py-24 border-t border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-0 divide-x-0 md:divide-x divide-black/[0.06]">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-start md:items-center px-4 md:px-8">
              <div className="flex items-baseline mb-2">
                <span className="stat-val font-serif text-5xl md:text-7xl text-[#050505] tracking-tighter" data-target={stat.value}>0</span>
                {stat.suffix && <span className="text-[#0ea5a4] font-serif text-4xl md:text-6xl ml-1">{stat.suffix}</span>}
              </div>
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Companies />

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — MARQUEE 
          ══════════════════════════════════════════════════════ */}
      <section aria-label="Trusted by" className="relative z-10 bg-[#f5f5f0] py-12 md:py-20 overflow-hidden border-t border-black/[0.05]">
        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-black/40 text-center mb-12 font-bold">
          {loc(hero.trustedLabel, lang)}
        </p>
        <div className="flex overflow-hidden whitespace-nowrap relative">
          <div aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#f5f5f0] to-transparent z-10" />
          <div aria-hidden="true" className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#f5f5f0] to-transparent z-10" />
          <div className="marquee-track flex items-center gap-12 md:gap-32 px-8 md:px-12 w-max">
            {[...CLIENTS, ...CLIENTS].map((client, index) => (
              <span key={index} aria-hidden={index >= CLIENTS.length} className="font-sans text-xs md:text-xl font-bold uppercase tracking-[0.15em] text-black/30">
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CURVE 
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full bg-[#f5f5f0]">
        <svg aria-hidden="true" viewBox="0 0 1440 120" className="w-full block -mb-px" preserveAspectRatio="none">
          <path d="M0,40 Q720,120 1440,40 L1440,120 L0,120 Z" fill="#0a0a0a" />
        </svg>
      </div>

    </div>
  );
};

export default NewHero;
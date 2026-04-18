// src/pages/Landing/components/NewHero.jsx
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import Companies from "../../../components/Companies";
import useIsMobile from "../../../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

// ──────────────────────────────────────────────────────────────
//  STRUCTURAL DATA — label/copy resolved via t() inside the component
// ──────────────────────────────────────────────────────────────
const STAT_IDS = [
  { value: 45, key: "stats.yearsExperience",     suffix: "+" },
  { value: 50, key: "stats.marineProjects",       suffix: "+" },
  { value: 25, key: "stats.specializedVessels",   suffix: "+" },
  { value: 10, key: "stats.globalReach",          suffix: "" },
];

// Client list is proper-noun brand marks — kept as Latin script across locales.
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

const DEPLOYMENT_IDS = [
  { code: "QA-04", key: "nfxp" },
  { code: "IN-12", key: "kochi" },
  { code: "IN-07", key: "hazira" },
  { code: "IN-03", key: "rewas" },
];

// ──────────────────────────────────────────────────────────────
//  COMPONENT
// ──────────────────────────────────────────────────────────────
const NewHero = ({ onLoadProgress = () => {}, onReady = () => {} }) => {
  const { t } = useTranslation();
  const STATS = useMemo(
    () => STAT_IDS.map((s) => ({ ...s, label: t(s.key) })),
    [t]
  );
  const DEPLOYMENTS = useMemo(
    () =>
      DEPLOYMENT_IDS.map((d) => ({
        code: d.code,
        site: t(`hero.deployments.${d.key}.site`),
        coord: t(`hero.deployments.${d.key}.coord`),
      })),
    [t]
  );
  const containerRef      = useRef(null);
  const videoContainerRef = useRef(null);
  const heroVideoRef      = useRef(null);
  const ctaRef            = useRef(null);
  const hasCalledReady    = useRef(false);

  const [deployIndex, setDeployIndex] = useState(0);

  // SSR-safe environment detection
  const [isTouch] = useState(() =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  // Pointer-coarse devices only (phones/tablets) — used to skip the 41MB hero
  // video. Distinct from isTouch, which also matches desktops with a touchscreen.
  const isMobile = useIsMobile();
  
  // Reduced-motion is intentionally NOT honoured here — Windows 11 defaults
  // "Animation effects" off, which previously made the hero reveal snap to
  // final state for those users. The animation is core to the brand feel,
  // so we always play it.
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
    
    // Check if the hero video is ready
    if (heroVideoRef.current && heroVideoRef.current.readyState >= 3) {
      markReady();
    }

    return () => clearTimeout(timeout);
  }, [onLoadProgress, onReady]);

  // ── LIVE DEPLOYMENT TICKER ──
  useEffect(() => {
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
  }, []);

  // ── GSAP ANIMATIONS ──
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-bg-media",
            ".hero-eyebrow",
            ".reveal-line-1",
            ".reveal-line-2",
            ".accent-line",
            ".hero-right-col > *",
            ".hero-bottom-bar > *",
            ".hero-cta",
            ".video-wrapper",
          ],
          { clearProps: "all", opacity: 1, x: 0, y: 0, scale: 1, yPercent: 0, scaleX: 1 }
        );
        gsap.utils.toArray(".stat-val").forEach((el) => {
          el.innerText = el.getAttribute("data-target");
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(".hero-bg-media",
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.2, ease: "power3.out" })
        .fromTo(".hero-eyebrow",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=1.6")
        .fromTo(".reveal-line-1",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, ease: "expo.out" }, "-=0.9")
        .fromTo(".reveal-line-2",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, ease: "expo.out" }, "-=1.0")
        .fromTo(".accent-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "expo.out" }, "-=1.0")
        .fromTo(".hero-right-col > *",
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }, "-=1.0")
        .fromTo(".hero-bottom-bar > *",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, "-=0.9")
        .fromTo(".hero-cta",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.7)" }, "-=0.7");

      if (!isTouch) {
        gsap.to(".hero-bg-media", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-viewport",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-content-layer", {
          y: -40,
          opacity: 0.1,
          scrollTrigger: {
            trigger: ".hero-viewport",
            start: "top top",
            end: "75% top",
            scrub: true,
          },
        });
      }

      gsap.utils.toArray(".stat-val").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: ".stats-section", start: "top 85%" },
            onUpdate() {
              el.innerText = Math.ceil(this.targets()[0].innerText);
            },
          }
        );
      });

      if (isTouch) {
        gsap.fromTo(".video-wrapper",
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, ease: "power2.out",
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: "top 85%", end: "top 50%", scrub: true,
            },
          });
      } else {
        gsap.fromTo(".video-wrapper",
          { scale: 0.8, opacity: 0, y: 50, clipPath: "inset(4% round 32px)" },
          {
            scale: 1, opacity: 1, y: 0, clipPath: "inset(0% round 0px)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: videoContainerRef.current,
              start: "top 90%", end: "top 30%", scrub: true,
            },
          });
      }

      gsap.to(".marquee-track", {
        xPercent: -50, ease: "none", duration: 40, repeat: -1,
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, isTouch] }
  );

  // ── MAGNETIC CTA ──
  const handleMouseMove = useCallback((e) => {
    if (isTouch || prefersReducedMotion || !ctaRef.current) return;
    const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.35;
    const y = (e.clientY - top - height / 2) * 0.35;
    gsap.to(ctaRef.current, { x, y, duration: 0.5, ease: "power3.out" });
  }, [isTouch, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch || prefersReducedMotion || !ctaRef.current) return;
    gsap.to(ctaRef.current, {
      x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)",
    });
  }, [isTouch, prefersReducedMotion]);



  return (
    <div ref={containerRef} className="w-full relative z-0">
      {/* ══════════════════════════════════════════════════════
          SECTION 1 — EDITORIAL HERO
          ══════════════════════════════════════════════════════ */}
      <section className="hero-viewport relative w-full min-h-screen min-h-[100svh] overflow-hidden bg-[#f5f5f0] flex flex-col justify-between">

        {/* Blueprint grid with radial fade mask */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            WebkitMaskImage: "radial-gradient(ellipse at center 40%, black 25%, transparent 75%)",
            maskImage: "radial-gradient(ellipse at center 40%, black 25%, transparent 75%)",
          }}
        />

        {/* ── CONTENT LAYER ── */}
        <div className="hero-content-layer relative z-30 flex-1 w-full flex flex-col px-6 md:px-20 pt-24 md:pt-28 pb-8 md:pb-12 pointer-events-none">


          {/* ═══ MAIN SPREAD ═══ */}
          <div className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT — Typography */}
            <div className="lg:col-span-7 flex flex-col relative z-10 order-2 lg:order-1 lg:pr-10">
              <h1 className="mix-blend-multiply m-0">
                {/* Wrapper padding is em-based so it scales with font-size; this
                    gives Devanagari matras and Arabic diacritics enough room
                    inside the overflow-hidden reveal mask. */}
                <span className="block overflow-hidden py-[0.18em] -my-[0.18em]">
                  <span className="reveal-line-1 block font-sans font-medium text-[16vw] md:text-[8.5rem] lg:text-[10rem] 2xl:text-[11rem] leading-[0.9] tracking-[-0.04em] uppercase text-[#050505]">
                    {t("hero.marine")}
                  </span>
                </span>
                <span className="flex items-end gap-3 md:gap-5 mt-2 lg:mt-4">
                  <span
                    aria-hidden="true"
                    className="accent-line hidden md:block w-12 lg:w-20 h-[3px] bg-[#0ea5a4] origin-left rtl:origin-right shrink-0 mb-4 lg:mb-6"
                  />
                  <span className="block overflow-hidden py-[0.18em] -my-[0.18em]">
                    <span className="reveal-line-2 block font-serif italic text-[13vw] md:text-[6.5rem] lg:text-[7.5rem] 2xl:text-[8rem] leading-[0.95] tracking-tight lowercase text-[#0ea5a4]">
                      {t("hero.engineering")}
                    </span>
                  </span>
                </span>
              </h1>

              <p className="mt-8 lg:mt-12 max-w-lg font-sans text-sm md:text-[15px] leading-relaxed text-black/60 font-medium">
                {t("hero.description")}
              </p>
            </div>

            {/* RIGHT — Unconditional Video Asset */}
            <div className="lg:col-span-5 relative order-1 lg:order-2 lg:pl-6 w-full max-w-[500px] mx-auto pointer-events-auto">
              <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-md bg-zinc-900 shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
                
                {/* On true mobile devices (pointer: coarse) we skip the 40MB
                    loop and serve a still image — saves data, CPU and battery
                    on phones/tablets. Desktops (including touchscreen laptops
                    with a mouse) get the full video with preload="auto". */}
                {isMobile ? (
                  <img
                    src="/new_hero_image.jpg"
                    alt={t("hero.videoAlt")}
                    loading="eager"
                    decoding="async"
                    className="hero-bg-media w-full h-full object-cover origin-center"
                  />
                ) : (
                  <video
                    ref={heroVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/new_hero_image.jpg"
                    aria-label={t("hero.videoAriaLabel")}
                    className="hero-bg-media w-full h-full object-cover origin-center"
                  >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                    <source src="/videos/hero-reel.mp4" type="video/mp4" />
                  </video>
                )}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                />

                {/* Live Indicator overlay on video */}
                <div
                  aria-hidden="true"
                  className="absolute top-5 right-5 flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ea5a4] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0ea5a4]" />
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white font-bold">
                    {t("hero.live")}
                  </span>
                </div>
              </div>

              {/* Offset Accent Frame */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-24 md:w-36 aspect-square border-2 border-[#0ea5a4]/30 -z-10 hidden md:block"
              />
            </div>
          </div>

          {/* ═══ BOTTOM BAR ═══ */}
          <div className="hero-bottom-bar w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 items-end gap-8 mt-16 lg:mt-auto pt-8 border-t border-black/[0.04]">

            {/* Live deployment ticker (Left aligned on desktop) */}
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="hidden md:flex flex-col items-start gap-2 text-left justify-end pb-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ea5a4] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0ea5a4]" />
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold">
                  {t("hero.activeDeployment")}
                </span>
              </div>
              <div className="relative h-10 overflow-hidden w-full max-w-[300px]">
                {DEPLOYMENTS.map((d, i) => (
                  <div
                    key={d.code}
                    aria-hidden={i !== deployIndex}
                    className="absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                    style={{
                      opacity: i === deployIndex ? 1 : 0,
                      transform:
                        i === deployIndex
                          ? "translateY(0)"
                          : i < deployIndex
                          ? "translateY(-120%)"
                          : "translateY(120%)",
                    }}
                  >
                    <p className="font-sans text-[13px] text-[#050505] font-semibold whitespace-nowrap">
                      {d.code} <span className="text-black/30 font-normal mx-2">/</span> {d.site}
                    </p>
                    <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#0ea5a4] font-bold mt-1">
                      {d.coord}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator (Centered on desktop) */}
            <div className="hidden md:flex flex-col items-center justify-end gap-4 pb-4" aria-hidden="true">
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-black/40 font-bold">
                {t("hero.scroll")}
              </span>
              <div className="relative w-px h-16 bg-black/10 overflow-hidden">
                <div className="absolute inset-0 bg-[#0ea5a4] animate-[slideDown_2s_ease-in-out_infinite]" />
              </div>
            </div>

            {/* CTA (Right aligned on desktop) */}
            <div className="pointer-events-auto flex justify-end">
              <a
                href="#projects"
                ref={ctaRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="hero-cta group relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#050505] hover:bg-[#0ea5a4] transition-colors duration-500 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f5f0]"
              >
                <span className="relative z-10 font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white font-bold text-center leading-relaxed">
                  {t("hero.viewProjects")}
                </span>
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] pointer-events-none motion-reduce:animate-none"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="cta-circle"
                      d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    />
                  </defs>
                  <text className="fill-white/40 text-[7px] tracking-[0.3em] font-bold uppercase">
                    <textPath href="#cta-circle">
                      {t("hero.ctaCircle")}
                    </textPath>
                  </text>
                </svg>
              </a>
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
                <span
                  className="stat-val font-serif text-5xl md:text-7xl text-[#050505] tracking-tighter"
                  data-target={stat.value}
                >
                  0
                </span>
                {stat.suffix && (
                  <span className="text-[#0ea5a4] font-serif text-4xl md:text-6xl ml-1">
                    {stat.suffix}
                  </span>
                )}
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
      <section
        aria-label="Trusted by"
        className="relative z-10 bg-[#f5f5f0] py-12 md:py-20 overflow-hidden border-t border-black/[0.05]"
      >
        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-black/40 text-center mb-12 font-bold">
          {t("trustedGlobally")}
        </p>
        <div className="flex overflow-hidden whitespace-nowrap relative">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#f5f5f0] to-transparent z-10"
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#f5f5f0] to-transparent z-10"
          />
          <div className="marquee-track flex items-center gap-12 md:gap-32 px-8 md:px-12 w-max">
            {[...CLIENTS, ...CLIENTS].map((client, index) => (
              <span
                key={index}
                aria-hidden={index >= CLIENTS.length}
                className="font-sans text-xs md:text-xl font-bold uppercase tracking-[0.15em] text-black/30"
              >
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
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          className="w-full block -mb-px"
          preserveAspectRatio="none"
        >
          <path d="M0,40 Q720,120 1440,40 L1440,120 L0,120 Z" fill="#0a0a0a" />
        </svg>
      </div>

      <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideDown_2s_ease-in-out_infinite\\],
          .animate-ping {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NewHero;
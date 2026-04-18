/* eslint-disable no-unused-vars */
// src/pages/Businesses.jsx
// ═══════════════════════════════════════════════════════════════
//  BUSINESSES PAGE — replaces Expertise
//  ─────────────────────────────────────
//  5 verticals matching meka.com/services:
//  Marine Construction, Dredging & Reclamation, Urban Infrastructure,
//  Port Development, Real Estate
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

// Structural data — stat values, images, company/brand names stay constant
// across locales. Title, description, services, taglines and stat labels are
// resolved via t() inside the component.
const BUSINESS_META = [
  { id: "01", slug: "marine",         image: "/projects/image2.png",           stat: "45+",    company: "Amma Lines Pvt. Ltd." },
  { id: "02", slug: "dredging",       image: "/business/dredging.jpg",         stat: "150+",   company: "Meka Dredging Company" },
  { id: "03", slug: "infrastructure", image: "/business/infra.jpg",            stat: "100",    company: "Meka Infrastructure Pvt. Ltd." },
  { id: "04", slug: "port",           image: "/more_projects/nhava_sheva.jpg", stat: "50yr",   company: "India Ports" },
  { id: "05", slug: "estate",         image: "/business/estate.jpg",           stat: "Mumbai", company: "Meka Realty" },
];

export default function BusinessesPage() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const location = useLocation();

  const BUSINESSES = useMemo(
    () =>
      BUSINESS_META.map((b) => ({
        ...b,
        title:       t(`business.verticals.${b.slug}.title`),
        tagline:     t(`business.taglines.${b.slug}`),
        description: t(`business.verticals.${b.slug}.description`),
        services:    t(`business.verticals.${b.slug}.services`, { returnObjects: true }),
        statLabel:   t(`business.verticals.${b.slug}.statLabel`),
      })),
    [t]
  );

  // ── Scroll to hash section (e.g. /business#marine) ──
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: "smooth" });
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useGSAP(
    () => {
      // ════════════════════════════════
      // HERO
      // ════════════════════════════════
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl
        .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
        .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, "-=1.0")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      // ════════════════════════════════
      // BUSINESS SECTIONS
      // ════════════════════════════════
      gsap.utils.toArray(".biz-section").forEach((section) => {
        const imgWrapper = section.querySelector(".biz-img-wrapper");
        const img = section.querySelector(".biz-img");
        const textBlock = section.querySelector(".biz-text");
        const services = section.querySelectorAll(".biz-service");
        const divider = section.querySelector(".biz-divider");

        // Image wipe-in
        gsap.fromTo(imgWrapper,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.4, ease: "power4.inOut",
            scrollTrigger: { trigger: section, start: "top 70%", toggleActions: "play none none reverse" },
          }
        );

        // Image parallax (10% of 116% height = ~11.6% of container)
        gsap.to(img, {
          yPercent: 10, ease: "none",
          scrollTrigger: { trigger: imgWrapper, start: "top bottom", end: "bottom top", scrub: true },
        });

        // Text entrance
        gsap.fromTo(textBlock,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 60%", toggleActions: "play none none reverse" },
          }
        );

        // Service rows stagger
        gsap.fromTo(services,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
            scrollTrigger: { trigger: services[0], start: "top 85%", toggleActions: "play none none reverse" },
          }
        );

        // Divider line
        if (divider) {
          gsap.fromTo(divider, { scaleX: 0 }, {
            scaleX: 1, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: divider, start: "top 90%" },
          });
        }
      });

      // ════════════════════════════════
      // CTA
      // ════════════════════════════════
      gsap.fromTo(".cta-text", { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 70%" },
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="bg-[#f5f5f0] text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden">
      <Helmet>
        <title>Our Businesses | Meka Group — Marine, Dredging, Ports & Infrastructure</title>
        <meta name="description" content="Explore Meka Group's five specialized business verticals: Marine Construction, Dredging & Reclamation, Port Development, Urban Infrastructure, and Real Estate." />
      </Helmet>

      {/* ═══════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════ */}
      <section className="hero-section relative w-full pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[60vh] md:min-h-[70vh]">

        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
            {t("business.ourBusinesses")}
          </span>

          <h1 className="text-[16vw] lg:text-[11vw] 2xl:text-[10rem] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-10">
            <span className="block overflow-hidden py-5 -my-5">
              <span className="hero-word block">{t("business.integrated")}</span>
            </span>
            <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
              <span className="hero-word block text-black/20">{t("business.solutions")}</span>
            </span>
          </h1>

          <div className="w-full max-w-xl lg:ml-[8vw]">
            <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-8 origin-left" />
            <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
              {t("business.heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. BUSINESS SECTIONS
          ═══════════════════════════════════════ */}
      <section className="relative z-10">
        {BUSINESSES.map((biz, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={biz.id} id={biz.slug} className="biz-section relative py-24 md:py-40 px-6 md:px-12 border-t border-black/[0.06]">
              <div className="max-w-[1600px] mx-auto">
                {/* Section bar */}
                <div className="flex items-center gap-6 mb-12 md:mb-20">
                  <span className="text-[#0ea5a4] text-sm md:text-base font-serif">{biz.id}</span>
                  <div className="biz-divider flex-1 h-px bg-black/10 origin-left" />
                  <span className="text-[10px] md:text-[11px] font-sans tracking-[0.3em] uppercase text-black/30 font-bold">
                    {biz.tagline}
                  </span>
                </div>

                {/* Alternating grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${isEven ? "" : "lg:[direction:rtl]"}`}>
                  
                  {/* Image */}
                  <div className={`lg:col-span-7 ${isEven ? "" : "lg:[direction:ltr]"}`}>
                    <div className="biz-img-wrapper relative aspect-[16/10] overflow-hidden rounded-sm bg-zinc-200 shadow-2xl">
                      {/* Removed grayscale and filter transition classes here */}
                      <img
                        src={biz.image}
                        alt={biz.title.replace("\n", " ")}
                        loading="lazy"
                        decoding="async"
                        className="biz-img absolute left-0 right-0 -top-[8%] w-full h-[116%] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                      {/* Stat badge */}
                      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white md:bg-white/95 md:backdrop-blur-sm px-5 py-4 md:px-6 md:py-5 rounded-sm shadow-lg">
                        <span className="block text-2xl md:text-3xl font-serif text-[#050505] leading-none mb-1">
                          {biz.stat}
                        </span>
                        <span className="block text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase text-gray-500 font-bold">
                          {biz.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`biz-text lg:col-span-5 flex flex-col justify-center ${isEven ? "" : "lg:[direction:ltr]"}`}>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tighter leading-[0.9] text-[#050505] mb-4 whitespace-pre-line">
                      {biz.title}
                    </h2>
                    
                    {/* Company tag */}
                    <span className="inline-block text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-[#0ea5a4] mb-8">
                      {biz.company}
                    </span>

                    <p className="text-gray-500 text-sm md:text-base font-sans leading-relaxed mb-12 max-w-md">
                      {biz.description}
                    </p>

                    {/* Services list */}
                    <div className="flex flex-col gap-0">
                      {biz.services.map((svc, i) => (
                        <div key={i}
                          className="biz-service group/svc flex items-center justify-between py-4 border-b border-black/[0.06] last:border-0 hover:border-[#0ea5a4]/30 transition-colors duration-400">
                          <div className="flex items-center gap-4">
                            <span className="text-[9px] font-sans font-bold tracking-[0.3em] text-[#0ea5a4]/50 group-hover/svc:text-[#0ea5a4] transition-colors w-6">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm md:text-base font-sans text-[#050505]/70 group-hover/svc:text-[#050505] group-hover/svc:translate-x-1 transition-all duration-300">
                              {svc}
                            </span>
                          </div>
                          <svg className="w-4 h-4 text-[#0ea5a4] opacity-0 -translate-x-2 group-hover/svc:opacity-100 group-hover/svc:translate-x-0 transition-all duration-300 shrink-0"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ═══════════════════════════════════════
          3. CTA
          ═══════════════════════════════════════ */}
      <section className="cta-section relative py-40 md:py-56 px-6 md:px-12 overflow-hidden bg-[#f5f5f0] border-t border-black/[0.06]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] 2xl:text-[28rem] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
          MEKA
        </div>

        <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-8 block">
            {t("business.getInTouch")}
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.9]">
            {t("business.letsBuild")}<br />
            <span className="text-black/15">{t("business.together")}</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-sans leading-relaxed max-w-xl mx-auto mb-14">
            {t("business.ctaDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/contact"
              className="group relative px-10 md:px-12 py-4 md:py-5 bg-[#050505] text-white text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm">
              <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              <span className="relative z-10">{t("business.contactUs")}</span>
            </Link>
            <Link to="/projects"
              className="px-10 md:px-12 py-4 md:py-5 border border-black/15 text-[#050505] text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold hover:border-[#0ea5a4] hover:text-[#0ea5a4] transition-all duration-500 rounded-sm">
              {t("business.viewProjects")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
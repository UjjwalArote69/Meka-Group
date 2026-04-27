// src/pages/CompaniesPage.jsx
// ═══════════════════════════════════════════════════════════════
//  COMPANIES PAGE — 9 Meka Group entities
//  ────────────────────────────────────────
//  Asymmetrical Editorial Theme (#f5f5f0), Masonry-style Grid,
//  Scrolling Marquees, Sticky Text, Parallax Image Reveals
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../components/layout/Footer";
import { useCompaniesPage } from "../../hooks/useCompaniesPage";
import { loc } from "../../lib/locale";

gsap.registerPlugin(ScrollTrigger);

// Logo paths stay in code, keyed by company slug. Adding a new company in
// Sanity requires a matching slug entry here + a file under /public/companies/.
const COMPANY_IMAGES = {
  ammalines:        "/companies/meka_amma_lines.webp",
  mekadredging:     "/companies/meka_dregding.webp",
  mekainfra:        "/companies/meka_infra.png",
  mekaheavy:        "/companies/meka_heavy_engineering.webp",
  indiaports:       "/companies/india_port.jpg",
  virajce:          "/companies/meka_viraj.webp",
  mekaconsultants:  "/companies/meka_consultants.jpg",
  "meka-realty":    "/companies/meka_realty.jpg",
  "meka-education": "/logo.png",
};

export default function CompaniesPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const data = useCompaniesPage();
  const containerRef = useRef(null);
  const location = useLocation();
  const navBarRef = useRef(null);

  const COMPANIES = useMemo(
    () =>
      data.companies.map((c) => ({
        slug: c.slug,
        name: c.name,
        founded: c.founded || "",
        website: c.website || "",
        layout: c.layout || "landscape",
        image: COMPANY_IMAGES[c.slug] || "",
        subtitle: loc(c.subtitle, lang),
        description: loc(c.description, lang),
        specialties: (c.specialties || []).map((s) => loc(s, lang)),
        statValue: c.statValue || "",
        statLabel: loc(c.statLabel, lang),
      })),
    [data.companies, lang]
  );

  // ── Scroll to hash ──
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        requestAnimationFrame(() => {
          const offset = navBarRef.current ? navBarRef.current.offsetHeight + 40 : 100;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useGSAP(
    () => {
      // HERO ANIMATIONS
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl
        .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");



      // Sticky Nav Shadow
      ScrollTrigger.create({
        trigger: navBarRef.current,
        start: "top top",
        toggleClass: { targets: navBarRef.current, className: "shadow-[0_10px_30px_rgba(0,0,0,0.04)]" }
      });

      // COMPANY CARDS
      gsap.utils.toArray(".company-block").forEach((block) => {
        const imgContainer = block.querySelector(".company-img-wrapper");
        const img = block.querySelector(".company-img");
        const textElements = block.querySelectorAll(".text-reveal");
        const specs = block.querySelectorAll(".company-spec");
        const badge = block.querySelector(".stat-badge");

        // Image Reveal
        gsap.fromTo(imgContainer,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.6, ease: "power4.inOut",
            scrollTrigger: { trigger: block, start: "top 75%", toggleActions: "play none none reverse" },
          }
        );

        // Image Inner Parallax
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: block, start: "top bottom", end: "bottom top", scrub: true },
          }
        );

        // Text stagger
        gsap.fromTo(textElements,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 65%", toggleActions: "play none none reverse" },
          }
        );

        // Specialty tags stagger
        gsap.fromTo(specs,
          { y: 15, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out",
            scrollTrigger: { trigger: specs[0] || block, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );

        if (badge) {
          gsap.fromTo(badge,
            { y: 40, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, ease: "back.out(1.2)",
              scrollTrigger: { trigger: block, start: "top 60%", toggleActions: "play none none reverse" },
            }
          );
        }
      });

      // CTA
      gsap.fromTo(".cta-text", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
      });
    },
    { scope: containerRef, dependencies: [data.companies] }
  );

  const visitLabel = loc(data.visitWebsiteLabel, lang);
  const estLabel = loc(data.estLabel, lang);

  return (
    <>
      <Helmet>
        <title>Our Companies | Meka Group — Nine Specialized Entities</title>
        <meta name="description" content="Discover the nine companies of Meka Group: Amma Lines, Meka Dredging, Meka Infrastructure, India Ports, Viraj Consulting, and more." />
      </Helmet>
      <main ref={containerRef} className="bg-[#f5f5f0] text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden relative">

        {/* ── Architectural Structural Line ── */}
        <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

        {/* ═══════════════════════════════════════
            1. HERO (Minimalist & Marquee)
            ═══════════════════════════════════════ */}
        <section className="hero-section relative w-full pt-28 sm:pt-36 md:pt-48 pb-12 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-between min-h-[70vh] md:min-h-[85vh]">

          <div className="relative z-10 w-full max-w-[1600px] mx-auto">
            <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
              {loc(data.heroEyebrow, lang)}
            </span>

            <h1 className="text-[16vw] lg:text-[11vw] 2xl:text-[10rem] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-12 lg:mb-16">
              <span className="block overflow-hidden py-5 -my-5">
                <span className="hero-word block">{loc(data.heroTitleLine1, lang)}</span>
              </span>
              <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
                <span className="hero-word block text-black/20">{loc(data.heroTitleLine2, lang)}</span>
              </span>
            </h1>

            <div className="w-full max-w-xl lg:ml-[8vw]">
              <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
                {loc(data.heroDescription, lang)}
              </p>
            </div>
          </div>

        </section>

        {/* ═══════════════════════════════════════
            2. QUICK NAV (Sticky jump links)
            ═══════════════════════════════════════ */}
        <div ref={navBarRef} className="sticky top-0 z-50 bg-[#f5f5f0] md:bg-[#f5f5f0]/90 md:backdrop-blur-xl transition-all duration-300">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 overflow-x-auto no-scrollbar border-b border-black/[0.05]">
            <div className="flex gap-3 md:gap-4 items-center min-w-max">
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-black/30 mr-2 md:mr-6">
                {loc(data.indexLabel, lang)}
              </span>
              {COMPANIES.map((co) => (
                <a
                  key={co.slug}
                  href={`#${co.slug}`}
                  className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-black/60 hover:text-white hover:bg-[#0ea5a4] transition-all duration-300 px-5 py-2.5 border border-black/[0.08] hover:border-[#0ea5a4] rounded-full"
                >
                  {co.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            3. COMPANY SECTIONS
            ═══════════════════════════════════════ */}
        <section className="relative z-10 py-12 md:py-20">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16">

            {COMPANIES.map((co, index) => {

              /* --- LANDSCAPE LAYOUT (Ultra-wide, sleek) --- */
              if (co.layout === "landscape") {
                return (
                  <div key={co.slug} id={co.slug} className="company-block relative pt-20 pb-24 md:pt-32 md:pb-32 scroll-mt-28 border-b border-black/[0.05]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                      <div className="lg:col-span-4 lg:sticky lg:top-36 flex flex-col pt-4">
                        <span className="text-[#0ea5a4] text-xl font-serif font-bold mb-4">
                          {String(index + 1).padStart(2, "0")} / <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-normal text-black/40">{estLabel} {co.founded}</span>
                        </span>

                        <h2 className="text-reveal text-5xl md:text-6xl font-serif uppercase tracking-tighter leading-[0.9] text-[#050505] mb-4">
                          {co.name}
                        </h2>
                        <span className="text-reveal inline-block text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[#0ea5a4] mb-6">
                          {co.subtitle}
                        </span>
                      </div>

                      <div className="lg:col-span-8">
                        {/* Shorter cinematic banner (aspect-[21/9]) */}
                        <div className="company-img-wrapper relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm bg-white shadow-xl group mb-10 border border-black/[0.06]">
                          <img src={co.image} alt={co.name} loading="lazy" decoding="async" className="company-img absolute -inset-[10%] w-[120%] h-[120%] object-contain p-12 md:p-20 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />

                          <div className="stat-badge absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-[#f5f5f0] md:bg-[#f5f5f0]/95 md:backdrop-blur-xl px-6 py-5 md:px-8 md:py-6 rounded-sm shadow-2xl border border-white/20">
                            <span className="block text-3xl md:text-5xl font-serif text-[#050505] leading-none mb-2 tracking-tight">{co.statValue}</span>
                            <span className="block text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-[#0ea5a4] font-bold">{co.statLabel}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <p className="text-reveal text-gray-600 text-sm md:text-base font-sans leading-relaxed">{co.description}</p>
                          <div>
                            <div className="flex flex-wrap gap-2 mb-8">
                              {co.specialties.map((spec, i) => (
                                <span key={i} className="company-spec text-[9px] md:text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-black/60 bg-white px-4 py-2 border border-black/[0.08] rounded-full shadow-sm">{spec}</span>
                              ))}
                            </div>
                            {co.website && (
                              <a href={co.website} target="_blank" rel="noopener noreferrer" className="text-reveal group/link inline-flex items-center gap-4 text-[10px] md:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[#050505] hover:text-[#0ea5a4] transition-colors duration-300">
                                {visitLabel}
                                <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-black/10 group-hover/link:border-[#0ea5a4] transition-colors duration-300">
                                  <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                                </span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              }

              /* --- COMPACT PORTRAIT LAYOUT --- */
              const isImageRight = co.layout === "portrait-right";

              return (
                <div key={co.slug} id={co.slug} className="company-block relative pt-20 pb-24 md:pt-32 md:pb-32 scroll-mt-28 border-b border-black/[0.05]">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center ${!isImageRight ? "lg:[direction:rtl]" : ""}`}>

                    {/* Compact Image (aspect-[4/3] instead of extremely tall) */}
                    <div className={`lg:col-span-5 ${!isImageRight ? "lg:[direction:ltr]" : ""}`}>
                      <div className="company-img-wrapper relative aspect-[4/3] overflow-hidden rounded-sm bg-white shadow-xl group border border-black/[0.06]">
                        <img src={co.image} alt={co.name} loading="lazy" decoding="async" className="company-img absolute -inset-[10%] w-[120%] h-[120%] object-contain p-12 md:p-20 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />

                        <div className="stat-badge absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-[#f5f5f0] md:bg-[#f5f5f0]/95 md:backdrop-blur-xl px-5 py-4 md:px-6 md:py-5 rounded-sm shadow-2xl border border-white/20 text-right">
                          <span className="block text-2xl md:text-4xl font-serif text-[#050505] leading-none mb-1 md:mb-2 tracking-tight">{co.statValue}</span>
                          <span className="block text-[8px] md:text-[9px] font-sans tracking-[0.25em] uppercase text-[#0ea5a4] font-bold">{co.statLabel}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`lg:col-span-7 flex flex-col justify-center ${!isImageRight ? "lg:[direction:ltr]" : ""}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[#0ea5a4] text-xl font-serif font-bold">{String(index + 1).padStart(2, "0")}</span>
                        <div className="w-10 h-px bg-black/20" />
                        <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-black/40 font-bold">{estLabel} {co.founded}</span>
                      </div>

                      <h2 className="text-reveal text-4xl md:text-6xl font-serif uppercase tracking-tighter leading-[0.9] text-[#050505] mb-4">
                        {co.name}
                      </h2>
                      <span className="text-reveal inline-block text-[10px] md:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[#0ea5a4] mb-6">
                        {co.subtitle}
                      </span>
                      <p className="text-reveal text-gray-600 text-sm md:text-base font-sans leading-relaxed mb-8 max-w-xl">
                        {co.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-10 max-w-xl">
                        {co.specialties.map((spec, i) => (
                          <span key={i} className="company-spec text-[9px] md:text-[10px] font-sans font-bold tracking-[0.1em] uppercase text-black/60 bg-white px-4 py-2 border border-black/[0.08] rounded-full shadow-sm">{spec}</span>
                        ))}
                      </div>

                      {co.website && (
                        <div className="text-reveal">
                          <a href={co.website} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-4 text-[10px] md:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[#050505] hover:text-[#0ea5a4] transition-colors duration-300">
                            {visitLabel}
                            <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-black/10 group-hover/link:border-[#0ea5a4] transition-colors duration-300">
                              <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                            </span>
                          </a>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );

            })}

          </div>
        </section>

        {/* ═══════════════════════════════════════
            4. CTA
            ═══════════════════════════════════════ */}
        <section className="cta-section relative py-32 md:py-48 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] border-t border-black/[0.06]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] 2xl:text-[30rem] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
            MEKA
          </div>

          <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
            <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
              {loc(data.ctaEyebrow, lang)}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.85]">
              {loc(data.ctaTitleLine1, lang)}<br />
              <span className="text-black/15">{loc(data.ctaTitleLine2, lang)}</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12">
              {loc(data.ctaDescription, lang)}
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/contact"
                className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow">
                <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <span className="relative z-10">{loc(data.ctaPrimaryLabel, lang)}</span>
              </Link>
              <Link to="/projects"
                className="px-10 md:px-12 py-4 border border-black/15 text-[#050505] text-[10px] tracking-[0.3em] uppercase font-bold hover:border-[#0ea5a4] hover:text-[#0ea5a4] transition-all duration-500 rounded-sm">
                {loc(data.ctaSecondaryLabel, lang)}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

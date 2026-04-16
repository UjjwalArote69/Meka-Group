/* eslint-disable no-unused-vars */
// src/pages/Businesses.jsx
// ═══════════════════════════════════════════════════════════════
//  BUSINESSES PAGE — replaces Expertise
//  ─────────────────────────────────────
//  5 verticals matching meka.com/services:
//  Marine Construction, Dredging & Reclamation, Urban Infrastructure,
//  Port Development, Real Estate
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const BUSINESSES = [
  {
    id: "01",
    slug: "marine",
    title: "Marine\nConstruction",
    tagline: "Foundation of the Group",
    description:
      "Based on principles of innovation and engineering, our marine construction projects form the foundation of the Meka Group. From coastal protection and breakwaters to port facilities and offshore structures, we build infrastructure that withstands the harshest marine environments.",
    services: [
      "Coastal Protection & Revetment",
      "Port & Harbor Development",
      "Offshore Platforms & Structures",
      "Underwater Construction & Maintenance",
      "Marina & Waterfront Development",
    ],
    image: "/projects/image2.png",
    stat: { value: "45+", label: "Years Experience" },
    company: "Amma Lines Pvt. Ltd.",
  },
  {
    id: "02",
    slug: "dredging",
    title: "Dredging &\nReclamation",
    tagline: "Reshaping Coastlines",
    description:
      "One of India's top capital dredging and reclamation companies, operating an advanced fleet of cutter suction and trailing suction hopper dredgers. We maintain vital waterways, create land from the sea, and execute deep-water channel projects with centimeter-level precision.",
    services: [
      "Capital & Maintenance Dredging",
      "Land Reclamation",
      "Beach Nourishment",
      "Underwater Rock Blasting",
      "Channel Deepening",
    ],
    image: "/companies/meka_dregding.webp",
    stat: { value: "150+", label: "Dredging Projects" },
    company: "Meka Dredging Company",
  },
  {
    id: "03",
    slug: "infrastructure",
    title: "Urban\nInfrastructure",
    tagline: "Building Livable Cities",
    description:
      "Taking up EPC work for the urban infrastructure segment — from intake and outfall pipelines to sheet piling, treatment plants, and ground improvement. We deliver the critical systems that cities depend on for water, sanitation, and resilience.",
    services: [
      "Intake & Outfall Pipelines",
      "Sheet Piling & Retaining Walls",
      "Water Treatment Plants",
      "Ground Improvement Works",
      "Subsea Utility Installations",
    ],
    image: "/companies/meka_infra.png",
    stat: { value: "100", label: "MLD Nemmelli Plant" },
    company: "Meka Infrastructure Pvt. Ltd.",
  },
  {
    id: "04",
    slug: "port",
    title: "Port\nDevelopment",
    tagline: "Gateways of Commerce",
    description:
      "Design and development of ports on Build-Own-Operate-Share-Transfer basis. Our landmark Rewas Port project — a 50-year concession from the Government of Maharashtra — exemplifies our vision for creating India's deepest and most modern port facilities.",
    services: [
      "Greenfield Port Development",
      "Terminal Design & Construction",
      "Navigation Channel Engineering",
      "Breakwater & Berth Construction",
      "Port Operations & Management",
    ],
    image: "/more_projects/nhava_sheva.jpg",
    stat: { value: "50yr", label: "Rewas Concession" },
    company: "India Ports",
  },
  {
    id: "05",
    slug: "estate",
    title: "Real\nEstate",
    tagline: "Premium Urban Living",
    description:
      "Developing quality residential and commercial spaces in India's largest real estate market. Meka Realty brings the same engineering rigor and commitment to excellence from our marine heritage into creating sustainable urban environments.",
    services: [
      "Premium Residential Development",
      "Commercial Complexes",
      "Sustainable Design & Construction",
      "Urban Regeneration Projects",
      "Mixed-use Developments",
    ],
    image: "/companies/meka_realty.jpg",
    stat: { value: "Mumbai", label: "Flagship Market" },
    company: "Meka Realty",
  },
];

export default function BusinessesPage() {
  const containerRef = useRef(null);
  const location = useLocation();

  // ── Scroll to hash section (e.g. /business#marine) ──
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
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
        .fromTo(".hero-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.4, stagger: 0.12, ease: "expo.out" }, "-=0.5")
        .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, "-=1.0")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
        .fromTo(".hero-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.4");

      // bg number parallax
      gsap.to(".hero-bg-number", {
        yPercent: -30, opacity: 0, ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true },
      });

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

      {/* ═══════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════ */}
      <section className="hero-section relative w-full min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
        {/* Blueprint grid */}
        <div className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "5rem 5rem" }} />

        {/* Giant bg number */}
        <div className="hero-bg-number absolute top-[10%] right-[-5%] md:right-[5%] text-[45vw] md:text-[35vw] font-serif text-black/[0.03] leading-none pointer-events-none select-none z-0">
          05
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <span className="hero-label block text-[#0ea5a4] text-[11px] md:text-xs font-sans tracking-[0.5em] uppercase font-bold mb-8 md:mb-12">
            Our Businesses
          </span>

          <h1 className="mb-12 md:mb-16">
            <span className="block overflow-hidden py-5 -my-5">
              <span className="hero-word block text-[14vw] md:text-[10vw] lg:text-[8.5vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505]">
                Integrated
              </span>
            </span>
            <span className="block overflow-hidden py-5 -my-5 md:ml-[12vw]">
              <span className="hero-word block text-[14vw] md:text-[10vw] lg:text-[8.5vw] font-serif uppercase tracking-tighter leading-[0.85] text-black/10">
                Solutions
              </span>
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16">
            <div className="max-w-lg">
              <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-6 origin-left" />
              <p className="hero-desc text-base md:text-lg text-gray-600 font-sans leading-relaxed">
                From marine construction and dredging to port development and urban infrastructure — five specialized verticals delivering end-to-end engineering solutions across India and the Middle East.
              </p>
            </div>

            <div className="hero-scroll-cue flex items-center gap-4 opacity-0">
              <div className="w-12 h-px bg-black/20" />
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-black/30 font-bold">
                Scroll to explore
              </span>
            </div>
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
                      <img
                        src={biz.image}
                        alt={biz.title.replace("\n", " ")}
                        className="biz-img absolute left-0 right-0 -top-[8%] w-full h-[116%] object-cover transition-[filter] duration-1000 grayscale hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                      {/* Stat badge */}
                      <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-sm px-5 py-4 md:px-6 md:py-5 rounded-sm shadow-lg">
                        <span className="block text-2xl md:text-3xl font-serif text-[#050505] leading-none mb-1">
                          {biz.stat.value}
                        </span>
                        <span className="block text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase text-gray-500 font-bold">
                          {biz.stat.label}
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
          MEKA
        </div>

        <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
          <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-8 block">
            Get in Touch
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.9]">
            Let's Build<br />
            <span className="text-black/15">Together.</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-sans leading-relaxed max-w-xl mx-auto mb-14">
            Whether it's a new marine EPC project, port development, or urban infrastructure — we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link to="/contact"
              className="group relative px-10 md:px-12 py-4 md:py-5 bg-[#050505] text-white text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm">
              <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              <span className="relative z-10">Contact Us</span>
            </Link>
            <Link to="/projects"
              className="px-10 md:px-12 py-4 md:py-5 border border-black/15 text-[#050505] text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold hover:border-[#0ea5a4] hover:text-[#0ea5a4] transition-all duration-500 rounded-sm">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
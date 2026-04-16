// src/pages/CompaniesPage.jsx
// ═══════════════════════════════════════════════════════════════
//  COMPANIES PAGE — 9 Meka Group entities
//  ────────────────────────────────────────
//  Asymmetrical Editorial Theme (#f5f5f0), Masonry-style Grid, 
//  Scrolling Marquees, Sticky Text, Parallax Image Reveals
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const COMPANIES = [
  {
    slug: "ammalines",
    name: "Amma Lines",
    subtitle: "Marine & Coastal Construction",
    founded: "1982",
    description:
      "The flagship marine construction arm of the Meka Group. With a 40-year legacy, Amma Lines has built most of India's major breakwaters — including the longest at Tuticorin Port — along with jetties, cofferdams, caissons, and coastal protection infrastructure.",
    specialties: ["Breakwater Construction", "Pile & Block Jetties", "Sheet Piling", "Cofferdam & Caisson Works", "Soil Improvement"],
    image: "/companies/meka_amma_lines.webp",
    stat: { value: "70%", label: "Of Maharashtra's Jetties" },
    website: "http://www.ammalines.com/",
    layout: "landscape" // Ultra-wide cinematic image
  },
  {
    slug: "mekadredging",
    name: "Meka Dredging",
    subtitle: "Capital Dredging & Reclamation",
    founded: "1990",
    description:
      "One of India's leading capital dredging companies, operating an advanced fleet of cutter suction and trailing suction hopper dredgers. From deep-water channel maintenance to large-scale land reclamation, we reshape India's coastline.",
    specialties: ["CSD & TSHD Operations", "Land Reclamation", "Rock Dredging", "Channel Deepening", "Beach Nourishment"],
    image: "/companies/meka_dregding.webp",
    stat: { value: "150+", label: "Dredging Projects" },
    layout: "portrait-right" // Compact image right
  },
  {
    slug: "mekainfra",
    name: "Meka Infrastructure",
    subtitle: "Subsea Pipelines & Outfalls",
    founded: "1995",
    description:
      "A leader in subsea intake and outfall pipeline engineering. Meka Infrastructure provides critical infrastructure for desalination plants and industrial cooling systems — including the landmark 100 MLD Nemmelli Desalination Plant.",
    specialties: ["Subsea Intake Pipelines", "Outfall Systems", "Desalination Infrastructure", "Trenching & Backfilling", "Pipeline Installation"],
    image: "/companies/meka_infra.png",
    stat: { value: "100 MLD", label: "Nemmelli Plant" },
    layout: "portrait-left" // Compact image left
  },
  {
    slug: "mekaheavy",
    name: "Meka Heavy Engineering",
    subtitle: "Offshore Fabrication & Shipbuilding",
    founded: "2005",
    description:
      "A strategic arm dedicated to high-capacity fabrication, shipbuilding, and structural solutions for the offshore and energy sectors. Delivering heavy-lift platforms and marine structures built to the most demanding specifications.",
    specialties: ["Heavy Fabrication", "Shipbuilding", "Offshore Structures", "Structural Steel Works", "Marine Equipment"],
    image: "/companies/meka_heavy_engineering.webp",
    stat: { value: "Heavy", label: "Lift Specialists" },
    layout: "landscape"
  },
  {
    slug: "indiaports",
    name: "India Ports",
    subtitle: "Port Development & Operations",
    founded: "2002",
    description:
      "The port development division managing the landmark Rewas Port — a 50-year concession from the Government of Maharashtra. India Ports is creating one of India's deepest and most modern port facilities through a partnership with Reliance.",
    specialties: ["Greenfield Port Development", "BOOST Model", "Terminal Operations", "Navigation Engineering", "Port Infrastructure"],
    image: "/companies/india_port.jpg",
    stat: { value: "50yr", label: "Rewas Concession" },
    layout: "portrait-right"
  },
  {
    slug: "virajce",
    name: "Viraj Consulting Engineers",
    subtitle: "Marine & Geotechnical Consulting",
    founded: "1998",
    description:
      "End-to-end project management, hydrographic surveys, and technical consultancy for coastal and marine infrastructure. Viraj provides the engineering intelligence that underpins complex offshore and harbor projects.",
    specialties: ["Hydrographic Surveys", "Geotechnical Investigations", "Project Management", "Marine Design Consulting", "Environmental Assessments"],
    image: "/companies/meka_viraj.webp",
    stat: { value: "PMC", label: "Marine Specialists" },
    layout: "portrait-left"
  },
  {
    slug: "mekaconsultants",
    name: "Meka Consultants",
    subtitle: "Strategic & Management Advisory",
    founded: "2000",
    description:
      "A multidisciplinary consultancy offering strategic management, human capital services, and technical advisory. From IT solutions and manpower to financial consulting, Meka Consultants supports the group's diverse operations.",
    specialties: ["Strategic Advisory", "Human Capital Services", "IT Solutions", "Financial Consulting", "Project Advisory"],
    image: "/companies/meka_consultants.jpg",
    stat: { value: "Multi", label: "Disciplinary" },
    layout: "landscape"
  },
  {
    slug: "meka-realty",
    name: "Meka Realty",
    subtitle: "Premium Urban Development",
    founded: "2015",
    description:
      "Entering the real estate space with a vision to create sustainable, functional urban environments. Meka Realty brings the same engineering rigor from our marine heritage into premium residential and commercial developments in Mumbai.",
    specialties: ["Residential Development", "Commercial Properties", "Sustainable Design", "Urban Regeneration", "Mixed-use Projects"],
    image: "/companies/meka_realty.jpg",
    stat: { value: "Mumbai", label: "Flagship Market" },
    layout: "portrait-right"
  },
  {
    slug: "meka-education",
    name: "Meka Education",
    subtitle: "Knowledge & Skill Development",
    founded: "2022",
    description:
      "Foraying into the education sector with a commitment to building the next generation of engineering talent. Meka Education focuses on maritime studies, vocational training, and technical skill development programs.",
    specialties: ["Maritime Studies", "Vocational Training", "Technical Education", "Skill Development", "Industry Partnerships"],
    image: "/frames/frame_0050.webp",
    stat: { value: "Next", label: "Generation" },
    layout: "portrait-left"
  },
];

export default function CompaniesPage() {
  const containerRef = useRef(null);
  const location = useLocation();
  const navBarRef = useRef(null);

  // ── Scroll to hash ──
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const offset = navBarRef.current ? navBarRef.current.offsetHeight + 40 : 100;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
        }, 100);
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

        // Image Inner Parallax (subtle for contained logos)
        gsap.fromTo(img,
          { yPercent: -3 },
          {
            yPercent: 3,
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
    { scope: containerRef }
  );

  return (
    <>
      <main ref={containerRef} className="bg-[#f5f5f0] text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden relative">

        {/* ── Architectural Structural Line ── */}
        <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

        {/* ═══════════════════════════════════════
            1. HERO (Minimalist & Marquee)
            ═══════════════════════════════════════ */}
        <section className="hero-section relative w-full pt-48 pb-12 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-between min-h-[85vh]">
          
          <div className="relative z-10 w-full max-w-[1600px] mx-auto">
            <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
              The Ecosystem
            </span>

            <h1 className="text-[16vw] lg:text-[11vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-12 lg:mb-16">
              <span className="block overflow-hidden py-5 -my-5">
                <span className="hero-word block">Nine</span>
              </span>
              <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
                <span className="hero-word block text-black/20">Strengths</span>
              </span>
            </h1>

            <div className="w-full max-w-xl lg:ml-[8vw]">
              <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
                A unified force of specialized entities operating across marine construction, dredging, port development, infrastructure, and consulting since 1978.
              </p>
            </div>
          </div>

        </section>

        {/* ═══════════════════════════════════════
            2. QUICK NAV (Sticky jump links)
            ═══════════════════════════════════════ */}
        <div ref={navBarRef} className="sticky top-0 z-50 bg-[#f5f5f0]/90 backdrop-blur-xl transition-all duration-300">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 overflow-x-auto no-scrollbar border-b border-black/[0.05]">
            <div className="flex gap-3 md:gap-4 items-center min-w-max">
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-black/30 mr-2 md:mr-6">
                Index
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
                          {String(index + 1).padStart(2, "0")} / <span className="text-[11px] font-sans uppercase tracking-[0.2em] font-normal text-black/40">Est. {co.founded}</span>
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
                        <div className="company-img-wrapper relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm bg-zinc-200 shadow-xl group mb-10">
                          <img src={co.image} alt={co.name} className="company-img absolute inset-0 w-full h-full object-contain p-6 md:p-10 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s]" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                          
                          <div className="stat-badge absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-[#f5f5f0]/95 backdrop-blur-xl px-6 py-5 md:px-8 md:py-6 rounded-sm shadow-2xl border border-white/20">
                            <span className="block text-3xl md:text-5xl font-serif text-[#050505] leading-none mb-2 tracking-tight">{co.stat.value}</span>
                            <span className="block text-[9px] md:text-[10px] font-sans tracking-[0.25em] uppercase text-[#0ea5a4] font-bold">{co.stat.label}</span>
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
                                Visit Website
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
                      <div className="company-img-wrapper relative aspect-[4/3] overflow-hidden rounded-sm bg-zinc-200 shadow-xl group">
                        <img src={co.image} alt={co.name} className="company-img absolute inset-0 w-full h-full object-contain p-6 md:p-10 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1.5s]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                        
                        <div className="stat-badge absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-[#f5f5f0]/95 backdrop-blur-xl px-5 py-4 md:px-6 md:py-5 rounded-sm shadow-2xl border border-white/20 text-right">
                          <span className="block text-2xl md:text-4xl font-serif text-[#050505] leading-none mb-1 md:mb-2 tracking-tight">{co.stat.value}</span>
                          <span className="block text-[8px] md:text-[9px] font-sans tracking-[0.25em] uppercase text-[#0ea5a4] font-bold">{co.stat.label}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`lg:col-span-7 flex flex-col justify-center ${!isImageRight ? "lg:[direction:ltr]" : ""}`}>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[#0ea5a4] text-xl font-serif font-bold">{String(index + 1).padStart(2, "0")}</span>
                        <div className="w-10 h-px bg-black/20" />
                        <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-black/40 font-bold">Est. {co.founded}</span>
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
                            Visit Website
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
            MEKA
          </div>

          <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
            <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
              Work With Us
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.85]">
              One Group,<br />
              <span className="text-black/15">Nine Strengths.</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12">
              Each company brings specialized expertise. Together, they deliver integrated solutions for the world's most demanding maritime and infrastructure projects.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/contact"
                className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow">
                <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <span className="relative z-10">Get in Touch</span>
              </Link>
              <Link to="/projects"
                className="px-10 md:px-12 py-4 border border-black/15 text-[#050505] text-[10px] tracking-[0.3em] uppercase font-bold hover:border-[#0ea5a4] hover:text-[#0ea5a4] transition-all duration-500 rounded-sm">
                View Projects
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
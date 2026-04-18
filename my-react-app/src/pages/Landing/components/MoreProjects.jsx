// src/components/MoreProjects.jsx
import React, { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

// Client names stay Latin across locales. Category + location are resolved
// via t() using the shared archive.categories / archive.locations dictionaries.
const ARCHIVE_META = [
  { year: "1988", name: "Vallsons Nhava Sheva Port",        category: "port",     location: "mumbai",    img: "/more_projects/nhava_sheva.jpg" },
  { year: "1977", name: "Government of Gujarat Port",        category: "port",     location: "gujarat",   img: "/more_projects/government_of_gujrat.jpg" },
  { year: "2023", name: "Marg Limited",                      category: "port",     location: "chennai",   img: "/more_projects/marg_limited.jpg" },
  { year: "1984", name: "Krishak Bharathi Co-operative Ltd.", category: "marine",   location: "mumbai",    img: "/more_projects/krishak.jpg" },
  { year: "1986", name: "Madras Port",                       category: "marine",   location: "madras",    img: "/more_projects/madras_port.jpg" },
  { year: "1992", name: "Vikram Ispat Ltd.",                 category: "marine",   location: "tamilnadu", img: "/more_projects/vikram_ispat.jpg" },
  { year: "1990", name: "Jawaharlal Nehru Port Trust JNPT.", category: "dredging", location: "odisha",    img: "/more_projects/jnpt.jpg" },
  { year: "2010", name: "Larsen & Toubro Ltd.",              category: "dredging", location: "odisha",    img: "/more_projects/landt.jpg" },
  { year: "1996", name: "B.M.C",                             category: "urban",    location: "varanasi",  img: "/more_projects/bmc.jpg" },
  { year: "1987", name: "Urmila & Company, Mumbai",          category: "urban",    location: "mumbai",    img: "/more_projects/urmila.jpg" },
];

const MoreProjects = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const archiveProjects = useMemo(
    () =>
      ARCHIVE_META.map((p) => ({
        ...p,
        category: t(`archive.categories.${p.category}`),
        location: t(`archive.locations.${p.location}`),
      })),
    [t]
  );

  useGSAP(() => {
    // 1. HEADER ENTRANCE
    gsap.fromTo(
      ".archive-header",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // 2. STAGGERED ROW REVEALS (Masked Text & Drawing Borders)
    const rows = gsap.utils.toArray(".archive-row");
    
    rows.forEach((row) => {
      const textWrap = row.querySelector(".row-text");
      const borderLine = row.querySelector(".row-border");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 95%",
          toggleActions: "play none none reverse",
        }
      });

      // Draw the border line
      tl.fromTo(
        borderLine, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 0.8, ease: "power3.inOut", transformOrigin: "left" }
      )
      // Mask reveal the text upwards
      .fromTo(
        textWrap,
        { yPercent: 100, rotationZ: 3, opacity: 0 },
        { yPercent: 0, rotationZ: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
    });

    // 3. CURSOR FOLLOWER LOGIC (desktop only — pure waste on touch devices)
    if (isMobile || !previewRef.current) return;

    const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      // Offset by half the width/height of the preview box to center it on the cursor
      xTo(e.clientX - 150);
      yTo(e.clientY - 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: containerRef, dependencies: [isMobile] });

  // Handle Hover States for the Image Preview — desktop only
  const handleMouseEnter = (index) => {
    if (isMobile) return;
    setHoveredIndex(index);
    gsap.to(previewRef.current, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(1.5)" });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHoveredIndex(null);
    gsap.to(previewRef.current, { scale: 0.8, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
  };

  return (
    <section ref={containerRef} className="w-full bg-[#f5f5f0] text-[#0a0a0a] py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10 relative overflow-hidden">
      
      {/* --- THE FLOATING IMAGE PREVIEW (desktop only — skips 10 image loads on mobile) --- */}
      {!isMobile && (
        <div
          ref={previewRef}
          className="fixed top-0 left-0 w-75 h-50 pointer-events-none z-100 overflow-hidden opacity-0 invisible shadow-2xl scale-75"
        >
          <div className="w-full h-full bg-[#0a0a0a]/50 relative">
            {archiveProjects.map((project, i) => (
              <img
                key={i}
                src={project.img}
                alt={project.name}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="archive-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0a0a0a]/15 pb-10">
          <div>
            <h2 className="text-sm md:text-base uppercase tracking-[0.4em] text-[#0ea5a4] mb-4 font-medium">
              {t("archive.sectionLabel")}
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t("archive.sectionTitle")}
            </h3>
          </div>
          <button className="text-sm tracking-[0.2em] uppercase font-light text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors flex items-center gap-2 group">
            {t("archive.viewFullArchive")}
            <span className="transform transition-transform group-hover:translate-x-2">→</span>
          </button>
        </div>

        {/* Project List */}
        <div className="flex flex-col relative z-10">
          {archiveProjects.map((project, index) => (
            <div 
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="archive-row group relative flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 transition-colors cursor-pointer"
            >
              
              {/* Animated Border Line */}
              <div className="row-border absolute bottom-0 left-0 w-full h-px bg-[#0a0a0a]/10 group-hover:bg-[#0a0a0a]/30 transition-colors duration-500" />

              {/* Left Side: Year & Title (Wrapped for Masking) */}
              <div className="flex items-center gap-6 md:gap-12 md:w-1/2 overflow-hidden py-2">
                <div className="row-text flex items-center gap-6 md:gap-12 w-full transform-gpu origin-bottom-left">
                  <span className="text-sm md:text-lg text-[#0a0a0a]/30 font-mono tracking-widest group-hover:text-[#0ea5a4] transition-colors duration-300">
                    {project.year}
                  </span>
                  
                  <h4 className="text-2xl md:text-4xl font-serif tracking-tight text-[#0a0a0a]/70 group-hover:text-[#0a0a0a] transform transition-all duration-500 group-hover:translate-x-4">
                    {project.name}
                  </h4>
                </div>
              </div>

              {/* Right Side: Category, Location & Arrow */}
              <div className="flex items-center justify-between md:w-1/2 mt-4 md:mt-0 pl-14 md:pl-0 overflow-hidden py-2">
                <div className="row-text flex flex-col md:flex-row md:items-center gap-2 md:gap-12 w-full transform-gpu origin-bottom-left">
                  <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#0a0a0a]/35 w-32 group-hover:text-[#0a0a0a]/70 transition-colors">
                    {project.category}
                  </span>
                  <span className="md:ps-20 text-sm md:text-base font-light text-[#0a0a0a]/50 group-hover:text-[#0a0a0a] transition-colors">
                    {project.location}
                  </span>
                </div>

                <div className="row-text overflow-hidden w-8 h-8 flex items-center justify-center opacity-0 -translate-x-4 rtl:translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#0ea5a4]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rtl:-scale-x-100">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MoreProjects;
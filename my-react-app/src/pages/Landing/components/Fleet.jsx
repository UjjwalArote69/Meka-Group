// src/components/Fleet.jsx
import React, { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../../hooks/useIsMobile";
import { useFleet } from "../../../hooks/useFleet";
import { loc } from "../../../lib/locale";
import { imgSrc, imgSrcSet } from "../../../lib/imageUrl";

gsap.registerPlugin(ScrollTrigger);

// Fallback image paths keyed by vessel id. The vessel's `photo` field in
// Sanity takes precedence; this map only kicks in when no asset is uploaded.
const FLEET_IMAGES = {
  "01": "/fleet/Aero Star.webp",
  "02": "/fleet/Amma Boat.webp",
  "03": "/fleet/Cb 04.webp",
  "04": "/fleet/Essar Dredge IV.webp",
  "05": "/fleet/FT3.webp",
  "06": "/fleet/Hansita III.webp",
  "07": "/fleet/Meka 2.webp",
  "08": "/fleet/Meka 3.webp",
};

const Fleet = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const fleet = useFleet();
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);

  const fleetData = useMemo(
    () =>
      fleet.vessels.map((v) => ({
        id: v.id,
        name: v.name,
        photo: v.photo,
        img: imgSrc(v.photo, FLEET_IMAGES[v.id] || "", { width: 1200 }),
        srcSet: imgSrcSet(v.photo, [600, 900, 1200, 1800]),
        type: loc(v.type, lang),
        function: loc(v.function, lang),
      })),
    [fleet.vessels, lang]
  );

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useGSAP(() => {
    gsap.fromTo(
      ".fleet-header",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".fleet-gallery-item",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 85%",
        },
      }
    );

    // Cursor-follower is desktop-only — mobile has no pointer to track and
    // the mousemove listener wastes CPU on touch devices.
    if (isMobile || !cursorRef.current) return;

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, { scope: containerRef, dependencies: [isMobile, fleet.vessels] });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    gsap.to(cursorRef.current, { scale: 0.8, duration: 0.2 });
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    gsap.to(cursorRef.current, { scale: 0, autoAlpha: 0, duration: 0.3 });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2.5;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTrackEnter = () => {
    gsap.to(cursorRef.current, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(1.5)" });
  };

  return (
    <section ref={containerRef} className="w-full bg-[#f5f5f0] text-[#0a0a0a] py-24 md:py-32 relative z-10 overflow-hidden">

      {/* CUSTOM CURSOR — dark on light */}


      {/* HEADER */}
      <div className="fleet-header max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-4">
            {loc(fleet.sectionLabel, lang)}
          </p>
          <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-7xl 2xl:text-8xl uppercase tracking-tighter leading-none text-[#0a0a0a]">
            {loc(fleet.ourLabel, lang)}{" "}
            <span className="font-serif italic text-[#0a0a0a]/50 font-light lowercase tracking-tight">
              {loc(fleet.fleetLabel, lang)}
            </span>
          </h2>
        </div>
        <div className="md:max-w-sm">
          <p className="font-sans font-light text-[#0a0a0a]/50 text-sm md:text-base leading-relaxed">
            {loc(fleet.description, lang)}
          </p>
        </div>
      </div>

      {/* HORIZONTAL DRAG GALLERY */}
      <div
        ref={trackRef}
        onMouseEnter={handleTrackEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-4 sm:gap-6 md:gap-8 px-6 md:px-12 lg:px-24 pb-12 hide-scrollbar transition-all duration-300 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-none"
        }`}
      >
        {fleetData.map((vessel, i) => (
          <div
            key={vessel.id}
            className="fleet-gallery-item flex flex-col w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0 group"
          >
            {/* Image */}
            <div className="w-full h-[50vh] md:h-[65vh] overflow-hidden rounded-xl bg-[#e8e8e3] relative">
              <img
                src={vessel.img}
                srcSet={vessel.srcSet || undefined}
                sizes="(min-width: 1024px) 45vw, (min-width: 768px) 60vw, 85vw"
                width="1200"
                height="800"
                alt={`${vessel.name} - ${vessel.type}`}
                draggable="false"
                loading={i > 1 ? "lazy" : "eager"}
                fetchpriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 pointer-events-none"
              />
            </div>

            {/* Meta */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-4 pointer-events-none">
              <div>
                <p className="font-sans text-[#0ea5a4] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2">
                  {vessel.type}
                </p>
                <h3 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#0a0a0a] leading-none">
                  {vessel.name}
                </h3>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                <span className="font-sans font-medium text-[#0a0a0a]/30 text-sm md:text-base">
                  No. {vessel.id}
                </span>
                <span className="bg-[#0a0a0a]/5 text-[#0a0a0a] font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm border border-[#0a0a0a]/10 whitespace-nowrap">
                  {vessel.function}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="w-2 shrink-0 pointer-events-none" />
      </div>
    </section>
  );
};

export default Fleet;

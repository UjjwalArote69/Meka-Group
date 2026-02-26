/* eslint-disable no-unused-vars */
// src/components/Fleet.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const fleetData = [
  { id: "01", name: "Aero Star", type: "Crew Boat", img: "/fleet/Aero Star.png", function: "High-Speed Transport" },
  { id: "02", name: "Amma Boat", type: "Support Vessel", img: "/fleet/Amma Boat.png", function: "Offshore Supply & Logistics" },
  { id: "03", name: "CB 04", type: "Crane Barge", img: "/fleet/Cb 04.png", function: "Heavy Lifting & Installation" },
  { id: "04", name: "Essar Dredge IV", type: "Heavy Dredger", img: "/fleet/Essar Dredge IV.jpeg", function: "Deep Channel Dredging" },
  { id: "05", name: "FT3", type: "Flat Top Barge", img: "/fleet/FT3.png", function: "Bulk Material Transport" },
  { id: "06", name: "Hansita III", type: "Piling Rig", img: "/fleet/Hansita III.png", function: "Marine Foundation & Drilling" },
  { id: "07", name: "Meka 2", type: "Cutter Suction Dredger", img: "/fleet/Meka 2.png", function: "Land Reclamation Services" },
  { id: "08", name: "Meka 3", type: "Cutter Suction Dredger", img: "/fleet/Meka 3.png", function: "Land Reclamation Services" },
];

const Fleet = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);

  // Drag-to-Scroll State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useGSAP(() => {
    // Section Header Entrance
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
        }
      }
    );

    // Staggered Entrance for the Gallery Items
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
        }
      }
    );

    // Custom Cursor Tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, { scope: containerRef });

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    // Shrink cursor slightly while dragging for tactical feel
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
    const walk = (x - startX) * 2.5; // Multiplier for swipe speed
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  // Cursor Hover States for the track
  const handleTrackEnter = () => {
    gsap.to(cursorRef.current, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(1.5)" });
  };

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-24 md:py-32 relative z-10 overflow-hidden">
      
      {/* THE CUSTOM CURSOR */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-24 h-24 rounded-full bg-white text-black font-sans font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center z-[150] pointer-events-none opacity-0 invisible scale-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        Drag
      </div>
      
      {/* Section Header */}
      <div className="fleet-header max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-4">
            Advanced Machinery
          </p>
          <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
            Our <span className="font-serif italic text-white/70 font-light lowercase tracking-tight">Fleet.</span>
          </h2>
        </div>
        <div className="md:max-w-sm">
          <p className="font-sans font-light text-white/50 text-sm md:text-base leading-relaxed">
            Equipped with a state-of-the-art maritime fleet, we execute the most complex coastal and deep-water engineering projects worldwide. Explore our vessels below.
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
        // Tailwind 'hide-scrollbar' comes from your index.css
        className={`flex overflow-x-auto gap-8 px-6 md:px-12 lg:px-24 pb-12 hide-scrollbar transition-all duration-300 select-none ${isDragging ? "cursor-grabbing" : "cursor-none"}`}
      >
        {fleetData.map((vessel, i) => (
          <div 
            key={vessel.id} 
            className="fleet-gallery-item flex flex-col w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 group"
          >
            
            {/* 1. Unobstructed Image Container */}
            <div className="w-full h-[50vh] md:h-[65vh] overflow-hidden rounded-xl bg-[#111] relative">
              <img 
                src={vessel.img} 
                alt={`${vessel.name} - ${vessel.type}`}
                draggable="false" // Prevents default browser ghost-image drag
                loading={i > 1 ? "lazy" : "eager"}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 pointer-events-none"
              />
            </div>

            {/* 2. Meta Information below the image */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-4 pointer-events-none">
              
              {/* Left Side: Type & Name */}
              <div>
                <p className="font-sans text-[#0ea5a4] text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-2">
                  {vessel.type}
                </p>
                <h3 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tighter text-white leading-none">
                  {vessel.name}
                </h3>
              </div>

              {/* Right Side: Number & Function */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                <span className="font-sans font-medium text-white/30 text-sm md:text-base">
                  No. {vessel.id}
                </span>
                <span className="bg-white/5 text-white font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-sm border border-white/10 whitespace-nowrap">
                  {vessel.function}
                </span>
              </div>

            </div>

          </div>
        ))}
        
        {/* Spacer to allow the last item to be dragged into the center */}
        <div className="w-[10vw] flex-shrink-0 pointer-events-none"></div>
      </div>

    </section>
  );
};

export default Fleet;
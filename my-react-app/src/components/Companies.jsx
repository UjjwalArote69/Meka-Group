// src/components/Companies.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const companyData = [
  {
    id: "01",
    name: "Meka Marine",
    subtitle: "Coastal Infrastructure",
    desc: "Delivering world-class port facilities, breakwaters, and advanced maritime structures across the globe.",
    img: "/projects/image2.png", 
  },
  {
    id: "02",
    name: "Meka Dredging",
    subtitle: "Reclamation Services",
    desc: "Operating an advanced dredging fleet for deep-water channels and massive land expansion projects.",
    img: "/projects/image1.png",
  },
  {
    id: "03",
    name: "Meka Heavy",
    subtitle: "Offshore Fabrication",
    desc: "In-house production and engineering of massive structural modules and offshore energy platforms.",
    img: "/projects/image3.png",
  },
  {
    id: "04",
    name: "Meka Subsea",
    subtitle: "Deepwater Solutions",
    desc: "Specialized underwater engineering, pipeline trenching, and complex subsea installations.",
    img: "/projects/image2.png", 
  },
  {
    id: "05",
    name: "Meka Terminals",
    subtitle: "Port Operations",
    desc: "Automated terminal management, bulk handling, and modern container facility development.",
    img: "/projects/image3.png",
  },
  {
    id: "06",
    name: "Meka Logistics",
    subtitle: "Maritime Supply Chain",
    desc: "End-to-end heavy lift transport, vessel chartering, and offshore supply base management.",
    img: "/projects/image1.png",
  },
  {
    id: "07",
    name: "Meka Energy",
    subtitle: "Oil & Gas Infrastructure",
    desc: "Executing critical EPC contracts for petrochemical refineries and offshore drilling rigs.",
    img: "/projects/image3.png",
  },
  {
    id: "08",
    name: "Meka Renewables",
    subtitle: "Offshore Wind",
    desc: "Pioneering the foundation installation and grid connection for deep-sea wind farms.",
    img: "/projects/image1.png",
  },
  {
    id: "09",
    name: "Meka Engineering",
    subtitle: "Design & Consulting",
    desc: "Advanced structural consulting, 3D simulation, and front-end engineering design (FEED).",
    img: "/projects/image2.png",
  },
];

const Companies = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Drag-to-Scroll State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate Header
    tl.fromTo(
      ".company-header",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    // Slide in the carousel track from the right
    .fromTo(
      ".company-track",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
      "-=0.6"
    );

  }, { scope: containerRef });

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-32 overflow-hidden relative z-10">
      
      {/* Inline styles for the premium custom scrollbar */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            margin: 0 24px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #0ea5a4;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #0c8a89;
          }
        `}
      </style>

      <div className="max-w-[1800px] mx-auto">
        
        {/* Section Header */}
        <div className="company-header mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 px-6 md:px-12 lg:px-24">
          <div>
            <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-6">
              Our Divisions
            </p>
            <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              The Meka <br />
              <span className="font-serif italic text-white/70 font-light lowercase tracking-tight">group.</span>
            </h2>
          </div>
          <div className="md:max-w-md pointer-events-none">
            <p className="font-sans font-light text-white/50 text-sm md:text-base leading-relaxed">
              Operating through nine highly specialized divisions, Meka Group delivers integrated, end-to-end engineering solutions for the world's most demanding environments.
            </p>
          </div>
        </div>

        {/* CLICK & DRAG HORIZONTAL CAROUSEL */}
        <div 
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`company-track flex overflow-x-auto gap-6 px-6 md:px-12 lg:px-24 pb-12 select-none custom-scrollbar transition-all ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}`}
        >
          
          {companyData.map((company) => (
            <div 
              key={company.id}
              className="company-card group relative h-[50vh] md:h-[65vh] w-[85vw] md:w-[45vw] lg:w-[28vw] shrink-0 snap-center overflow-hidden bg-[#111]"
            >
              {/* Background Image (Pointer events none prevents dragging bugs) */}
              <img 
                src={company.img} 
                alt={company.name}
                draggable="false"
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 pointer-events-none"
              />
              
              {/* Dynamic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-700 group-hover:from-[#0ea5a4]/90 group-hover:via-[#0ea5a4]/40 z-10 pointer-events-none" />

              {/* Number Indicator */}
              <div className="absolute top-6 right-8 z-20 overflow-hidden pointer-events-none">
                <span className="block font-sans font-medium text-white/30 text-lg transition-transform duration-500 group-hover:-translate-y-full">
                  No. {company.id}
                </span>
                <span className="absolute top-0 left-0 block font-sans font-medium text-white text-lg transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  No. {company.id}
                </span>
              </div>

              {/* Text Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pointer-events-none">
                <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                  
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 w-max mb-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 border border-white/20">
                    <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-white">
                      {company.subtitle}
                    </p>
                  </div>

                  <h3 className="font-sans font-black text-4xl uppercase tracking-tighter text-white mb-4 pr-4">
                    {company.name}
                  </h3>
                  
                  <div className="overflow-hidden">
                    <p className="font-serif italic text-white/90 text-base md:text-lg leading-snug opacity-0 transform translate-y-8 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                      {company.desc}
                    </p>
                  </div>

                </div>
              </div>

            </div>
          ))}

          {/* Blank invisible spacer at the end to allow the final card to snap to the center properly */}
          <div className="w-[4vw] shrink-0 pointer-events-none" />

        </div>

      </div>
    </section>
  );
};

export default Companies;
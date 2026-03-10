// src/components/Companies.jsx
import React, {
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const companyData = [
  {
    id: "01",
    name: "Meka Group",
    subtitle: "Marine & Infrastructure",
    desc: "A premier conglomerate with over 40 years of excellence in marine construction, port development, and large-scale infrastructure engineering.",
    img: "/logos/140_Meka_logo_PD-01.png",
  },
  {
    id: "02",
    name: "Amma Lines",
    subtitle: "Coastal Infrastructure",
    desc: "A leading marine construction specialist focused on the development of world-class port facilities, jetties, and protective breakwaters.",
    img: "/companies/meka_amma_lines.webp",
  },
  {
    id: "03", 
    name: "Meka Dredging",
    subtitle: "Reclamation Services",
    desc: "A premier dredging arm operating an advanced fleet for deep-water channel maintenance, land expansion, and complex rock dredging projects.",
    img: "/companies/meka_dregding.webp",
  },
  {
    id: "04",
    name: "Meka Heavy",
    subtitle: "Offshore Fabrication",
    desc: "Specialized engineering division delivering high-capacity fabrication, shipbuilding, and structural solutions for the offshore and energy sectors.",
    img: "/companies/meka_heavy_engineering.webp",
  },
  {
    id: "05",
    name: "Meka Infra",
    subtitle: "Infrastructure Development",
    desc: "Integrated infrastructure unit focused on the construction and maintenance of roads, specialized pipelines, and critical maritime terminals.",
    img: "/companies/meka_infra.png",
  },
  {
    id: "06",
    name: "Viraj",
    subtitle: "Engineering Consulting",
    desc: "Viraj Consulting Engineers provides end-to-end project management, hydrographic surveys, and technical consultancy for coastal infrastructure.",
    img: "/companies/meka_viraj.webp",
  },
  {
    id: "07",
    name: "Meka Consultants",
    subtitle: "Strategic Advisory",
    desc: "A multidisciplinary consultancy offering strategic management and technical advisory for marine, harbor, and energy infrastructure projects.",
    img: "/companies/meka_consultants.jpg",
  },
  {
    id: "08",
    name: "Meka Realty",
    subtitle: "Urban Development",
    desc: "The real estate arm of Meka Group, dedicated to creating sustainable urban environments through premium residential and commercial developments.",
    img: "/companies/meka_realty.jpg",
  },
  {
    id: "09",
    name: "India Ports",
    subtitle: "Port Development",
    desc: "Strategic division focused on the investment, development, and operational management of modern port terminals and maritime hubs.",
    img: "/companies/india_port.jpg",
  },
];

const Companies = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Drag-to-Scroll State
  const [isDragging, setIsDragging] =
    useState(false);
  const [startX, setStartX] =
    useState(0);
  const [scrollLeft, setScrollLeft] =
    useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions:
            "play none none reverse",
        },
      });

      // Animate Header
      tl.fromTo(
        ".company-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
      )
        // Slide in the carousel track from the right
        .fromTo(
          ".company-track",
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(
      e.pageX -
        trackRef.current.offsetLeft,
    );
    setScrollLeft(
      trackRef.current.scrollLeft,
    );
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
    const x =
      e.pageX -
      trackRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    trackRef.current.scrollLeft =
      scrollLeft - walk;
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#050505] text-white py-32 overflow-hidden relative z-10"
    >
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

      <div className="max-w-360 mx-auto">
        {/* Section Header */}
        <div className="company-header mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 px-6 md:px-12 lg:px-24">
          <div>
            <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-6">
              Our Divisions
            </p>
            <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              The Meka <br />
              <span className="font-serif italic text-white/70 font-light lowercase tracking-tight">
                group.
              </span>
            </h2>
          </div>
          <div className="md:max-w-md pointer-events-none">
            <p className="font-sans font-light text-white/50 text-sm md:text-base leading-relaxed">
              Operating through nine
              highly specialized
              divisions, Meka Group
              delivers integrated,
              end-to-end engineering
              solutions for the world's
              most demanding
              environments.
            </p>
          </div>
        </div>

        {/* CLICK & DRAG HORIZONTAL CAROUSEL */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={
            handleMouseLeave
          }
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`company-track flex overflow-x-auto gap-8 px-6 md:px-12 lg:px-24 pb-12 select-none custom-scrollbar transition-all ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}`}
        >
          {companyData.map(
            (company) => (
              <div
                key={company.id}
                className="company-card group relative h-[50vh] md:h-[60vh] w-[85vw] md:w-[45vw] lg:w-[26vw] shrink-0 snap-center flex flex-col bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all duration-500 rounded-sm overflow-hidden"
              >
                {/* Number Indicator - Top Right */}
                <div className="absolute top-6 right-6 z-20 pointer-events-none">
                  <span className="font-sans font-bold text-black/30 group-hover:text-[#0ea5a4] text-xs tracking-[0.2em] transition-colors duration-500">
                    NO. {company.id}
                  </span>
                </div>

                {/* 1. TOP HALF: Logo Showcase Area (Bright White for Dark Logos) */}
                {/* REMOVED group-hover:bg-gray-50 so the background stays solid white */}
                <div className="h-1/2 w-full flex items-center justify-center bg-white relative overflow-hidden transition-colors duration-500 p-8">
                  {/* Scalable Logo Image */}
                  {/* ADDED max-w and max-h so all logos size themselves optimally */}
                  {[
                    "01",
                    "04",
                    "05",
                    "08",
                  ].includes(
                    company.id,
                  ) ? (
                    <img
                      src={company.img}
                      alt={company.name}
                      draggable="false"
                      // Using object-contain and w-full so it spans the entire container cleanly
                      className="w-[160%] h-[160%] object-contain transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none relative z-10"
                    />
                  ) : (
                    <img
                      src={company.img}
                      alt={company.name}
                      draggable="false"
                      className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain transition-transform duration-500 ease-out group-hover:scale-110 pointer-events-none relative z-10"
                    />
                  )}
                </div>

                {/* 2. BOTTOM HALF: Information Area (Dark theme matches the site) */}
                <div className="h-1/2 w-full p-6 md:p-8 flex flex-col justify-end bg-[#0a0a0a] border-t border-white/5 relative z-10 pointer-events-none">
                  <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                    <p className="font-sans text-[#0ea5a4] text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                      {company.subtitle}
                    </p>

                    <h3 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tighter text-white mb-4">
                      {company.name}
                    </h3>

                    <p className="font-serif italic text-white/50 text-sm md:text-base leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors duration-500">
                      {company.desc}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}

          {/* Blank invisible spacer at the end to allow the final card to snap to the center properly */}
          <div className="w-[4vw] shrink-0 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Companies;

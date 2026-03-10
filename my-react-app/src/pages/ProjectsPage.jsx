import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    id: 1,
    title: "The Azure Deepening",
    company: "Amma Lines",
    location: "Port of Singapore",
    year: "2024",
    image: "/frames/frame_0010.webp",
    stats: { depth: "25m", scale: "Large" }
  },
  {
    id: 2,
    title: "Iron Wall Breakwater",
    company: "Meka Group",
    location: "Western Coast, India",
    year: "2023",
    image: "/frames/frame_0060.webp",
    stats: { length: "4.2km", concrete: "800k Tons" }
  },
  {
    id: 3,
    title: "Apex Logistics Hub",
    company: "Meka Dredging",
    location: "Dubai, UAE",
    year: "2024",
    image: "/frames/frame_0120.webp",
    stats: { capacity: "500 TEU/day", automation: "Tier 1" }
  },
  {
    id: 4,
    title: "Coral Restoration Dredge",
    company: "Meka Infra",
    location: "Maldives",
    year: "2022",
    image: "/frames/frame_0080.webp",
    stats: { accuracy: "99.8%", eco: "Certified" }
  },
  {
    id: 5,
    title: "Titan Shipyard Alpha",
    company: "Andhra Civil Construction",
    location: "Mumbai, India",
    year: "2023",
    image: "/frames/frame_0180.webp",
    stats: { docks: "4", crane_cap: "1200T" }
  },
];

const CATEGORIES = ["All", "Dredging", "Infrastructure", "Logistics"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  // Filter Logic: Filter projects based on state
  const filteredProjects = PROJECTS_DATA.filter(
    (p) => filter === "All" || p.company === filter
  );

  useGSAP(() => {
    // Hero Text Animation
    gsap.from(".projects-title span", {
      y: 150,
      skewY: 7,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.out",
    });

    // Initial Grid Animation
    gsap.from(".project-card", {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  // Handle smooth re-entry when filter changes
  useEffect(() => {
    gsap.fromTo(".project-card", 
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "expo.out" }
    );
  }, [filter]);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#0ea5a4]">
      
      {/* --- 1. MINIMALIST HERO --- */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="overflow-hidden">
            <h1 className="projects-title text-[15vw] md:text-[8vw] font-serif leading-[0.85] uppercase tracking-tighter pt-5">
              <span className="block">Global</span>
              <span className="block text-gray-700">Footprint</span>
            </h1>
          </div>
          <div className="max-w-xs mb-4">
            <p className="text-gray-400 text-sm leading-relaxed border-l border-[#0ea5a4] pl-4">
              A record of engineering defiance. From the depths of the ocean floor to the height of maritime logistics.
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. THE COMMAND BAR (FILTERING) --- */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-y border-white/5 px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-8 md:gap-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold">Filter By</span>
          <div className="flex gap-6 md:gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs md:text-sm uppercase tracking-widest transition-all duration-300 ${
                  filter === cat ? "text-white" : "text-gray-500 hover:text-gray-300"
                } relative group`}
              >
                {cat}
                {filter === cat && (
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-[#0ea5a4]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* --- 3. DYNAMIC PROJECT GRID --- */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
          {filteredProjects.map((project, idx) => {
            // Logic to create an asymmetrical "editorial" feel
            const isWide = idx % 3 === 0; 
            const colSpan = isWide ? "md:col-span-8" : "md:col-span-4";
            const marginTop = (!isWide && idx % 2 !== 0) ? "md:mt-32" : "mt-0";

            return (
              <div 
                key={project.id} 
                className={`project-card ${colSpan} ${marginTop} group cursor-pointer`}
              >
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden bg-zinc-900 mb-6">
                  <div className="absolute inset-0 bg-[#0ea5a4]/0 group-hover:bg-[#0ea5a4]/10 transition-colors duration-500 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  
                  {/* Overlay Tags */}
                  <div className="absolute top-4 right-4 z-20 overflow-hidden">
                    <span className="block px-3 py-1 bg-black/50 backdrop-blur-sm text-[10px] uppercase tracking-widest text-white border border-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4 text-[#0ea5a4] text-[10px] uppercase tracking-[0.2em]">
                    <span>{project.company}</span>
                    <span className="w-8 h-px bg-white/20"></span>
                    <span className="text-gray-500">{project.location}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif uppercase group-hover:text-[#0ea5a4] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Subtle Tech Specs */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {Object.entries(project.stats).map(([key, val]) => (
                      <div key={key}>
                        <p className="text-[10px] uppercase text-gray-600 tracking-tighter">{key.replace('_', ' ')}</p>
                        <p className="text-sm font-mono text-gray-300">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- 4. CTA SECTION --- */}
      <section className="py-40 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-serif uppercase mb-8">Have a project in mind?</h2>
          <button className="px-12 py-5 bg-[#0ea5a4] text-white uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded-full">
            Initiate Consultation
          </button>
        </div>
      </section>

    </main>
  );
}
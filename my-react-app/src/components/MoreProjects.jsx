// src/components/MoreProjects.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Added an "img" property to each project (cycling through your images)
const archiveProjects = [
  { year: "2023", name: "Nhava Sheva Deepening", category: "Dredging", location: "Mumbai, India", img: "/projects/image1.png" },
  { year: "2022", name: "Kochi LNG Terminal", category: "Marine EPC", location: "Kerala, India", img: "/projects/image2.png" },
  { year: "2021", name: "Jebel Ali Port Expansion", category: "Coastal Eng.", location: "Dubai, UAE", img: "/projects/image3.png" },
  { year: "2021", name: "Paradip Breakwater", category: "Stabilization", location: "Odisha, India", img: "/projects/image1.png" },
  { year: "2020", name: "Ganga Inland Waterway", category: "Infrastructure", location: "Varanasi, India", img: "/projects/image2.png" },
  { year: "2019", name: "Fujairah Oil Terminal", category: "Offshore", location: "Fujairah, UAE", img: "/projects/image3.png" },
  { year: "2018", name: "Mormugao Berth 11", category: "Marine EPC", location: "Goa, India", img: "/projects/image1.png" },
  { year: "2017", name: "Salalah Port Rehab", category: "Dredging", location: "Salalah, Oman", img: "/projects/image2.png" },
  { year: "2016", name: "Vizag Subsea Pipeline", category: "Subsea", location: "Andhra Pradesh, India", img: "/projects/image3.png" },
  { year: "2015", name: "Dahej Ro-Ro Terminal", category: "Coastal Eng.", location: "Gujarat, India", img: "/projects/image1.png" },
];

const MoreProjects = () => {
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

    // 3. CURSOR FOLLOWER LOGIC (Smooth quickTo setup)
    const xTo = gsap.quickTo(previewRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(previewRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      // Offset by half the width/height of the preview box to center it on the cursor
      xTo(e.clientX - 150); 
      yTo(e.clientY - 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: containerRef });

  // Handle Hover States for the Image Preview
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    gsap.to(previewRef.current, { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(1.5)" });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    gsap.to(previewRef.current, { scale: 0.8, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
  };

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10 relative overflow-hidden">
      
      {/* --- THE FLOATING IMAGE PREVIEW --- */}
      <div 
        ref={previewRef}
        className="fixed top-0 left-0 w-[300px] h-[200px] pointer-events-none z-[100] overflow-hidden opacity-0 invisible shadow-2xl scale-75"
      >
        <div className="w-full h-full bg-black/50 relative">
          {archiveProjects.map((project, i) => (
            <img 
              key={i}
              src={project.img} 
              alt={project.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="archive-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/20 pb-10">
          <div>
            <h2 className="text-sm md:text-base uppercase tracking-[0.4em] text-[#0ea5a4] mb-4 font-medium">
              Archive
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">
              More Projects
            </h3>
          </div>
          <button className="text-sm tracking-[0.2em] uppercase font-light text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
            View Full Archive
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
              <div className="row-border absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-white/40 transition-colors duration-500" />

              {/* Left Side: Year & Title (Wrapped for Masking) */}
              <div className="flex items-center gap-6 md:gap-12 md:w-1/2 overflow-hidden py-2">
                <div className="row-text flex items-center gap-6 md:gap-12 w-full transform-gpu origin-bottom-left">
                  <span className="text-sm md:text-lg text-white/30 font-mono tracking-widest group-hover:text-[#0ea5a4] transition-colors duration-300">
                    {project.year}
                  </span>
                  
                  <h4 className="text-2xl md:text-4xl font-serif tracking-tight text-white/80 group-hover:text-white transform transition-all duration-500 group-hover:translate-x-4">
                    {project.name}
                  </h4>
                </div>
              </div>

              {/* Right Side: Category, Location & Arrow */}
              <div className="flex items-center justify-between md:w-1/2 mt-4 md:mt-0 pl-14 md:pl-0 overflow-hidden py-2">
                <div className="row-text flex flex-col md:flex-row md:items-center gap-2 md:gap-12 w-full transform-gpu origin-bottom-left">
                  <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/40 w-32 group-hover:text-white/80 transition-colors">
                    {project.category}
                  </span>
                  <span className="text-sm md:text-base font-light text-white/60 group-hover:text-white transition-colors">
                    {project.location}
                  </span>
                </div>
                
                <div className="row-text overflow-hidden w-8 h-8 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#0ea5a4]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
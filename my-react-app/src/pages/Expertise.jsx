/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE_SECTIONS = [
  {
    id: "01",
    title: "Precision Dredging",
    tagline: "Sub-surface Engineering",
    description: "Utilizing advanced CSD and TSHD technology to maintain vital waterways and create land from the sea with centimeter-level precision.",
    capabilities: ["Capital & Maintenance Dredging", "Land Reclamation", "Beach Nourishment", "Underwater Rock Blasting"],
    image: "/frames/frame_0040.webp"
  },
  {
    id: "02",
    title: "Marine Infrastructure",
    tagline: "Forging Resilient Frontiers",
    description: "Designing and constructing heavy-duty breakwaters, quays, and jetties engineered to withstand seismic shifts and extreme tidal forces.",
    capabilities: ["Breakwater Construction", "Piling & Diaphragm Walls", "Port Terminal Development", "Coastal Protection"],
    image: "/frames/frame_0120.webp"
  },
  {
    id: "03",
    title: "Fleet Intelligence",
    tagline: "Autonomous Logistics",
    description: "A synchronized fleet management system powered by real-time telemetry, optimizing fuel efficiency and mission turnaround times.",
    capabilities: ["Real-time Vessel Tracking", "Predictive Maintenance", "Heavy Lift Operations", "Offshore Support Services"],
    image: "/frames/frame_0080.webp"
  }
];

export default function ExpertisePage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Reveal Hero Text
    gsap.from(".expertise-heading span", {
      y: "100%",
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out"
    });

    // 2. Parallax effect for the section images
    const images = gsap.utils.toArray(".expertise-image");
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // 3. Line draw animation for capabilities
    gsap.utils.toArray(".cap-line").forEach((line) => {
      gsap.from(line, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        scrollTrigger: {
          trigger: line,
          start: "top 90%"
        }
      });
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-[#050505] text-white selection:bg-[#0ea5a4]">
      
      {/* --- 1. MINIMALIST HERO --- */}
      <section className="h-[70vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <span className="text-[#0ea5a4] text-xs font-sans tracking-[0.5em] uppercase animate-pulse">
            Core Competencies
          </span>
          <h1 className="expertise-heading text-[12vw] md:text-[9vw] font-serif uppercase leading-[0.8] tracking-tighter">
            <span className="block overflow-hidden py-6 -my-2">Technical</span>
            <span className="block overflow-hidden py-6 -my-6 text-zinc-800">Mastery</span>
          </h1>
        </div>
      </section>

      {/* --- 2. EXPERTISE SECTIONS (Blueprints) --- */}
      <section className="pb-32">
        {EXPERTISE_SECTIONS.map((section, index) => (
          <div 
            key={section.id} 
            className="group relative border-t border-white/10 py-24 md:py-40 px-6 md:px-12"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
              
              {/* Left Column: The Sticky Index */}
              <div className="md:col-span-4 sticky top-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl font-serif text-[#0ea5a4]">{section.id}</span>
                  <div className="cap-line h-px w-12 bg-[#0ea5a4]"></div>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-tighter leading-none mb-6">
                  {section.title}
                </h2>
                <p className="text-zinc-500 text-sm md:text-base font-sans leading-relaxed max-w-xs">
                  {section.description}
                </p>
              </div>

              {/* Right Column: Imagery & Technical Specs */}
              <div className="md:col-span-8 flex flex-col gap-16">
                {/* Image Container with Parallax */}
                <div className="relative aspect-video overflow-hidden rounded-sm bg-zinc-900">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="expertise-image absolute inset-0 w-full h-full object-cover grayscale scale-110 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-[#050505]/60 to-transparent"></div>
                </div>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                  {section.capabilities.map((cap, i) => (
                    <div key={i} className="flex flex-col gap-2 group/cap">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#0ea5a4] mb-2 block">Capability</span>
                      <h4 className="text-lg md:text-xl font-sans font-light border-b border-white/5 pb-4 group-hover/cap:border-[#0ea5a4] transition-colors duration-500">
                        {cap}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </section>

      {/* --- 3. TECH STACK OVERVIEW --- */}
      <section className="bg-zinc-950 py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-20">
            <h3 className="text-3xl md:text-5xl font-serif uppercase mb-4">Innovation Engine</h3>
            <p className="text-zinc-500 tracking-widest uppercase text-xs">Proprietary Technology & Equipment</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Bathymetry", value: "Multi-beam" },
              { label: "Navigation", value: "RTK-GPS" },
              { label: "Monitoring", value: "SCADA Systems" },
              { label: "Compliance", value: "IMO Tier III" }
            ].map((tech, i) => (
              <div key={i} className="p-8 border border-white/5 hover:border-[#0ea5a4]/50 transition-colors duration-500">
                <p className="text-[#0ea5a4] text-[10px] uppercase tracking-widest mb-2">{tech.label}</p>
                <p className="text-xl md:text-2xl font-serif text-white">{tech.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. CALL TO ACTION --- */}
      <section className="h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-7xl font-serif uppercase tracking-tighter mb-12">
            Engineering the Impossible.
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-10 py-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#0ea5a4] hover:text-white transition-all duration-500">
              Download Credentials
            </button>
            <button className="px-10 py-4 border border-white/20 text-white text-[10px] tracking-[0.3em] uppercase hover:border-white transition-all duration-500">
              Technical Inquiry
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
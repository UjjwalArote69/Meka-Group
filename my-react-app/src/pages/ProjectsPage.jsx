import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Footer from '../components/layout/Footer'

gsap.registerPlugin(ScrollTrigger);

// Project Data
const PROJECTS_DATA = [
  // --- AMMA LINES PRIVATE LIMITED ---
  { id: 1, client: "Indian Railway", title: "13 K.M Long Rail-cum-Road Bridge across Godavari River, Rajahmundry, A.P", company: "Amma Lines" },
  { id: 2, client: "Tuticorin Port Trust", title: "Two Additional Berths; 2 Breakwaters 4 Nos. Alongside berths pier heads 3 Nos. Dredging and Reclamation", company: "Amma Lines" },
  { id: 3, client: "Government of Gujarat", title: "Breakwater & Deepwater Berth, Porbandar Gujarat; Fishery Harbour, Mangrol Gujarat; Veraval Fishing Harbour", company: "Amma Lines" },
  { id: 4, client: "Madras Port Trust, Tamilnadu", title: "Madras Harbour; Outer Protection Arm, Breakwater", company: "Amma Lines" },
  { id: 5, client: "Government of Indian Enterprises", title: "Krishak Bharathi Co-operative Ltd. (KRIBHCO) Wharf & Jetty in Surat, Gujarat", company: "Amma Lines" },
  { id: 6, client: "Government of Tamilnadu", title: "Fishery Harbour, Kanyakumari, Tamilnadu", company: "Amma Lines" },
  { id: 7, client: "Rashtriya Chemicals & Fertilizers", title: "Mandwa Jetty (Maharashtra)", company: "Amma Lines" },
  { id: 8, client: "Mumbai Port Trust", title: "Sassoon Fish Harbour, Mumbai", company: "Amma Lines" },
  { id: 9, client: "Mitsui & Co.", title: "Guide Bund (Breakwaters) Nehru Port Trust at Jawaharlal", company: "Amma Lines" },
  { id: 10, client: "Government of Maharashtra", title: "New Elephanta Jetty", company: "Amma Lines" },
  { id: 11, client: "Vikram Ispat", title: "Approach Bund, Caisson Bridge and Jetty, Revdanda; Twin Dolphins for Mooring Iron Ore Bridges; Additional Jetty", company: "Amma Lines" },
  { id: 12, client: "BSES", title: "Cooling Water Systems at BSES Dahanu", company: "Amma Lines" },
  { id: 13, client: "Bombay Suburban Elect. Supply Ltd.", title: "BSES Coal Unloading Jetty at Dahanu including literage of Coal", company: "Amma Lines" },
  { id: 14, client: "O.C.C. Ltd.", title: "Intake Channel at IB Thermal Power Station; Underwater excavation of CW intake channel", company: "Amma Lines" },
  { id: 15, client: "Ennore Coal Port Project", title: "Construction of work harbour and South and North breakwater", company: "Amma Lines" },
  { id: 16, client: "Municipal Corp. of Greater Mumbai", title: "Precast Roof Troughs for M/s. Orkay Silk Mills; Construction of Sassoon Fish Harbour Project, Colaba; Training of Dharavi Nala", company: "Amma Lines" },
  { id: 17, client: "Andhra Civil Construction Co. Chennai", title: "Construction of Mandwa Pipeline Trench Earthwork at JNPT, Nhava", company: "Amma Lines" },
  { id: 18, client: "Nhaval Vallsons, Sheva", title: "Construction of Guide Bund for JNPT at Nhava Sheva", company: "Amma Lines" },
  { id: 19, client: "Urmila & Company, Mumbai", title: "Earthwork for main canal for Sardar Sarovar Narmada Nigam", company: "Amma Lines" },
  { id: 20, client: "Jaiprakash Co.", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
  { id: 21, client: "Tourism Development Corp. Ltd", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
  { id: 22, client: "The Freyssinet Press Concrete Co.", title: "Restoration of Damaged North Dolphin at Sikka (Jamnagar)", company: "Amma Lines" },
  { id: 23, client: "Glencore India Pvt. Ltd", title: "Construction of Barge Terminal and Associated facilities; Transhipment of Coal", company: "Amma Lines" },
  { id: 24, client: "Brihanmumbai Mahanagar Palika", title: "Replacement/laying standard dia distributory water mains in City North Area Phase - II", company: "Amma Lines" },
  { id: 25, client: "Oil & Natural Gas Corp. Ltd., Uran", title: "Protection of Seashore along the road towards south gate at LPG/CSU Plant, ONGC, Uran", company: "Amma Lines" },
  { id: 26, client: "Reshamsingh & Co. Pvt. Ltd.", title: "Construction Jetty/Breakwater at NPCIL, Kundankulam Project, Kudankulam", company: "Amma Lines" },
  { id: 27, client: "Govt. of Karnataka", title: "Construction of Fisheries Harbour, Breakwater, piled Jetty construction", company: "Amma Lines" },
  { id: 28, client: "Hindustan Const. Co. Ltd.", title: "Construction of RCC Link Bridge at location R 16 to R29 in BCC's Bandra Worli Sea Link", company: "Amma Lines" },
  { id: 29, client: "Marg Limited, Chennai", title: "Construction of Breakwaters at Karaikal Port", company: "Amma Lines" },
  { id: 30, client: "Larsen Toubro & Limited", title: "Construction of wharf wall using plain concrete blocks for outfitting jetty No.2 at L&T plant", company: "Amma Lines" },
  { id: 31, client: "M/s. Alpine Services & Pipelines", title: "Trench Dredging for Colaba Marine Outfall", company: "Amma Lines" },
  { id: 32, client: "M/s. Andhra Civil Construction Co.", title: "Dredging soft and rock with hydraulic rock breaker at Bandra", company: "Amma Lines" },
  { id: 33, client: "M/s. Bholasingh Jayprakash & Co.", title: "Dredging for Sassoon Fish Harbour Project", company: "Amma Lines" },
  { id: 34, client: "Metropolitan Regional Dev Auth", title: "Dredging of Thermal Power Station, Bihar (Soft & Rock)", company: "Amma Lines" },
  { id: 35, client: "Mazagon Dock Ltd, Mumbai", title: "Dredging at Mazagon Dock, Mumbai; Maintenance Dredging in front of Alcock yard", company: "Amma Lines" },
  { id: 36, client: "M/s. Dodsal Ltd., Mumbai", title: "Dredging Trench in Thane Creek for Pipe Line", company: "Amma Lines" },
  { id: 37, client: "M/s. J.M. Baxi & Co. Mumbai", title: "Dredging KRIBHCO Jetty at Hazira", company: "Amma Lines" },
  { id: 38, client: "M. Pallonji & Co. Pvt. Ltd.", title: "Dredging at Tata Electric Jetty at Trombay", company: "Amma Lines" },
  { id: 39, client: "Larsen & Toubro Ltd.", title: "Dredging in river Tapti adjacent to Larsen & Toubro at Hazira", company: "Amma Lines" },
  { id: 40, client: "Vikram Ispat Ltd.", title: "Dredging and Construction of Jetty at Revdanda", company: "Amma Lines" },
  { id: 41, client: "Patel Engineering Co", title: "Dredging and Construction of Rock Bund for KHEP", company: "Amma Lines" },
  { id: 42, client: "Jawaharlal Nehru Port Trust", title: "Dredging in the Lagoon Nehru Administration behind Bulk Berth at JNPT", company: "Amma Lines" },
  { id: 43, client: "Hyundai Heavy Industries", title: "Trench Filling for ONGC", company: "Amma Lines" },
  { id: 44, client: "Tamilnadu Electricity Board", title: "Dredging at Ennore for Tamilnadu Electricity Board", company: "Amma Lines" },
  { id: 45, client: "BSES Ltd.", title: "Dredging in Dock basin and entrance channel for BSES Jetty at Dahanu", company: "Amma Lines" },
  { id: 46, client: "Hindustan Petroleum Corp. Ltd", title: "Dredging for HPCL", company: "Amma Lines" },
  { id: 47, client: "Dronagiri Prakalpagrast", title: "Dredging in soft strata for construction of wharf wall-I, II, III and channel", company: "Amma Lines" },
  { id: 48, client: "Kirloskar Brothers Ltd.", title: "Underwater and open A/c.NPCIL excavation RAPP Kota, Rajasthan", company: "Amma Lines" },
  { id: 49, client: "Maharashtra Maritime Board", title: "Dredging in the port of Dabhol, Varsova and Gorai", company: "Amma Lines" },

  // --- CURRENT WORKS IN HAND (MEKA GROUP) ---
  { id: 50, client: "Reliance Industries Limited.", title: "Installation of New Offshore (EDPL) HDPE Pipeline LSTK Contract at RIL - DMD, Dahej", company: "Meka Group" },
  { id: 51, client: "Wabag Va Tech Ltd.", title: "Concrete anchor block fixing, launching offshore and sinking of Intake, Outfall for 400 MLD SWRO", company: "Meka Group" },
  { id: 52, client: "McDermott Middle East Inc.", title: "North Field Expansion (NFXP) Project - Trenching and Backfilling Works - Qatar", company: "Meka Group" },

  // --- MEKA DREDGING COMPANY PVT. LTD. ---
  { id: 53, client: "M/s. Larsen & Toubro Ltd.", title: "Dredging & Reclamation in L&T West plot at Hazira, Surat-Phase-I, II, and III", company: "Meka Dredging" },
  { id: 54, client: "M/s. Marg Limited", title: "Dredging and Reclamation works at Karaikal Port", company: "Meka Dredging" },
  { id: 55, client: "Reliance Industries Ltd.", title: "Dredging and Reclamation works for Site development of PTA-10 at RIL, Hazira", company: "Meka Dredging" },
  { id: 56, client: "M/s. Nagarjuna Oil Corp Ltd.", title: "Rental for Dredging, Clean up Operation, Maintainance of Ro-Ro jetty Cuddalore", company: "Meka Dredging" },
  { id: 57, client: "Marshal Marine International", title: "Hire of Cutter Suction Dredger for Dredging & Reclamation at Cochin Naval Dock", company: "Meka Dredging" },
  { id: 58, client: "Petronet LNG Limited", title: "Hire of Cutter Suction Dredger for Dredging Services at Kochi LNG Terminal", company: "Meka Dredging" },

  // --- MEKA INFRASTRUCTURE PRIVATE LIMITED ---
  { id: 59, client: "Adani Power Ltd., Udupi", title: "Design, Engineering, Manufacturing, Procurement, Testing Old/New Diffuser", company: "Meka Infra" },
  { id: 60, client: "Cobratecton Pvt. Ltd.", title: "Design, Construction, Installation of Intake and Outfall system for 150 MLD Desalination", company: "Meka Infra" },
  { id: 61, client: "L&T - Tecton JV Dahej", title: "Construction of Intake Channel & Outfall pipe works for 100 MLD SWRO Desalination", company: "Meka Infra" },
  { id: 62, client: "McDermott International", title: "Provision of prelay trenching and backfilling services for KG- DWN 98/2 at Yanam", company: "Meka Infra" },
  { id: 63, client: "Coastal Energen Limited", title: "2 x 600 MW Mutiara Thermal Power Project - Sea water Intake and Outfall offshore piping", company: "Meka Infra" },
  { id: 64, client: "VA Tech WABAG Ltd.", title: "100 mld Disalination Plant of CMWSSB at Nemmeli - Intake and Outfall works", company: "Meka Infra" },
  { id: 65, client: "Lanco Infratech Limited", title: "Installation & Commissioning of Intake & Outflow Submarine Pipline System at Udupi", company: "Meka Infra" }
];

const CATEGORIES = ["All", "Amma Lines", "Meka Dredging", "Meka Infra", "Meka Group"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(15);
  const [hoveredRowId, setHoveredRowId] = useState(null); 
  
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const navBarRef = useRef(null);
  const imageRevealRef = useRef(null);

  // Set up GSAP quickTo for 60fps buttery smooth cursor tracking
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter & Search Logic
  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = filter === "All" || p.company === filter;
    const matchesSearch = 
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  useGSAP(() => {
    // Initialize quickTo for mouse follow
    xTo.current = gsap.quickTo(imageRevealRef.current, "x", { duration: 0.4, ease: "power3" });
    yTo.current = gsap.quickTo(imageRevealRef.current, "y", { duration: 0.4, ease: "power3" });

    const heroTl = gsap.timeline({ delay: 0.2 });

    heroTl
      .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
      .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" }, "-=0.8")
      .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    // Sticky Nav Shadow
    ScrollTrigger.create({
      trigger: navBarRef.current,
      start: "top top",
      toggleClass: { targets: navBarRef.current, className: "shadow-[0_10px_30px_rgba(0,0,0,0.04)]" }
    });

    gsap.fromTo(".project-row", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%" }
      }
    );

    // CTA
    gsap.fromTo(".cta-text", { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
    });

  }, { scope: containerRef });

  // Animate changes when filter/search updates
  useEffect(() => {
    gsap.fromTo(".project-row", 
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }
    );
  }, [filter, searchQuery, visibleCount]);

  // Track Mouse Movement over the list
  const handleMouseMove = (e) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  // Determine which image to show (using your existing 4 images as placeholders cyclically)
  const hoveredProjectImage = hoveredRowId 
    ? `/projects/image${((hoveredRowId - 1) % 4) + 1}.png` 
    : null;

  return (
    <>
      <main 
        ref={containerRef} 
        className="bg-[#f5f5f0] text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden relative"
      >
        {/* Floating Cursor Image Reveal Container */}
        <div 
          ref={imageRevealRef}
          className={`pointer-events-none fixed top-0 left-0 z-50 w-64 md:w-80 aspect-[4/3] overflow-hidden rounded-sm shadow-2xl transition-all duration-300 ease-out origin-center ${
            hoveredRowId ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transform: "translate(-50%, -50%)" }} // Center on cursor
        >
          {hoveredProjectImage && (
            <img 
              src={hoveredProjectImage} 
              alt="Project Preview" 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* ── Architectural Structural Line ── */}
        <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

        {/* ═══════════════════════════════════════
            1. HERO (Editorial Layout)
            ═══════════════════════════════════════ */}
        <section className="hero-section relative w-full pt-48 pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[70vh]">
          
          {/* Blueprint Grid */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

          <div className="relative z-10 w-full max-w-[1600px] mx-auto">
            <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
              The Archive
            </span>

            <h1 className="text-[16vw] lg:text-[11vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-10">
              <span className="block overflow-hidden py-5 -my-5">
                <span className="hero-word block">Project</span>
              </span>
              <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
                <span className="hero-word block text-black/20">Index</span>
              </span>
            </h1>

            <div className="w-full max-w-xl lg:ml-[8vw]">
              <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-8 origin-left" />
              <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
                A precise architectural archive of our engineering defiance, spanning decades of maritime and heavy infrastructure development.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            2. COMMAND BAR (Search + Filter)
            ═══════════════════════════════════════ */}
        <div ref={navBarRef} className="sticky top-0 z-40 bg-[#f5f5f0]/90 backdrop-blur-xl border-y border-black/[0.05] transition-all duration-300">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Filter Tags */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-black/30 mr-2">
                Filter
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setFilter(cat); setVisibleCount(15); }}
                  className={`text-[10px] md:text-[11px] font-sans font-bold tracking-[0.15em] uppercase transition-all duration-300 px-5 py-2.5 border rounded-full ${
                    filter === cat 
                      ? "bg-[#0ea5a4] text-white border-[#0ea5a4]" 
                      : "text-black/60 border-black/[0.08] hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search clients or projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-black/10 text-[#050505] text-[11px] md:text-xs font-sans tracking-wide py-3 px-5 rounded-full focus:outline-none focus:border-[#0ea5a4] transition-colors placeholder:text-gray-400 shadow-sm"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════
            3. TYPOGRAPHIC PROJECT INDEX
            ═══════════════════════════════════════ */}
        <section 
          ref={listRef} 
          className="max-w-[1600px] mx-auto px-6 md:px-16 py-16 md:py-24 relative z-10"
          onMouseMove={handleMouseMove} // Added mouse tracking here
        >
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-black/10 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 mb-4">
            <div className="col-span-1">No.</div>
            <div className="col-span-3">Client</div>
            <div className="col-span-6">Project Details</div>
            <div className="col-span-2 text-right">Entity</div>
          </div>

          {/* Project Rows */}
          <div className="flex flex-col relative" onMouseLeave={() => setHoveredRowId(null)}>
            {displayedProjects.map((project, index) => {
              // Spotlight Effect Logic
              const isHovered = hoveredRowId === project.id;
              const isFaded = hoveredRowId !== null && !isHovered;

              return (
                <div 
                  key={project.id} 
                  onMouseEnter={() => setHoveredRowId(project.id)}
                  className={`project-row group grid grid-cols-1 md:grid-cols-12 gap-y-3 gap-x-6 py-8 md:py-10 border-b border-black/[0.05] transition-all duration-500 cursor-default ${
                    isFaded ? "opacity-20 blur-[1px]" : "opacity-100 blur-0"
                  } ${isHovered ? "bg-white/50 -mx-6 px-6 md:-mx-16 md:px-16 rounded-sm shadow-sm border-transparent" : ""}`}
                >
                  
                  {/* Index Number */}
                  <div className="hidden md:block col-span-1 font-serif text-lg text-black/20 group-hover:text-[#0ea5a4] transition-colors duration-300">
                    {String(index + 1).padStart(3, '0')}
                  </div>

                  {/* Client Name */}
                  <div className="col-span-3">
                    <p className="text-sm md:text-base font-sans font-bold text-[#050505] group-hover:text-[#0ea5a4] group-hover:translate-x-2 transition-all duration-500">
                      {project.client}
                    </p>
                  </div>
                  
                  {/* Project Title */}
                  <div className="col-span-6 pr-4">
                    <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed group-hover:text-[#050505] transition-colors duration-300">
                      {project.title}
                    </p>
                  </div>

                  {/* Company Badge */}
                  <div className="col-span-2 pt-3 md:pt-0 flex items-start md:items-center justify-between md:justify-end gap-6 overflow-hidden">
                    <span className={`inline-block px-4 py-2 bg-white border border-black/10 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-black/60 transition-all duration-300 ${
                      isHovered ? "border-[#0ea5a4]/30 text-[#0ea5a4] shadow-sm" : ""
                    }`}>
                      {project.company}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
          
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-32 text-center">
              <span className="text-black/20 text-4xl mb-4 block">∅</span>
              <p className="text-black/40 text-[11px] font-bold tracking-[0.25em] uppercase">
                No projects match your search criteria.
              </p>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredProjects.length && (
            <div className="mt-20 text-center flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 15)}
                className="group flex items-center gap-6 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-black/50 hover:text-[#0ea5a4] transition-colors"
              >
                <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
                Load More ({filteredProjects.length - visibleCount})
                <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
              </button>
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════
            4. CTA SECTION
            ═══════════════════════════════════════ */}
        <section className="cta-section relative py-40 md:py-64 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] border-t border-black/[0.06]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
            MEKA
          </div>

          <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
            <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
              Start a Project
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.85]">
              Ready to<br />
              <span className="text-black/15">Build?</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12">
              Partner with us to engineer solutions that redefine the boundaries of maritime and heavy infrastructure.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/contact"
                className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow">
                <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <span className="relative z-10">Initiate Consultation</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      {/* FOOTER OUTSIDE MAIN */}
      <Footer/>
    </>
  );
}
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
// import React, { useState, useRef, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Link } from "react-router-dom";
// import Footer from '../components/layout/Footer'
// import { useTranslation } from "react-i18next";

// gsap.registerPlugin(ScrollTrigger);

// // Project Data
// const PROJECTS_DATA = [
//   // --- AMMA LINES PRIVATE LIMITED ---
//   { id: 1, client: "Indian Railway", title: "13 K.M Long Rail-cum-Road Bridge across Godavari River, Rajahmundry, A.P", company: "Amma Lines" },
//   { id: 2, client: "Tuticorin Port Trust", title: "Two Additional Berths; 2 Breakwaters 4 Nos. Alongside berths pier heads 3 Nos. Dredging and Reclamation", company: "Amma Lines" },
//   { id: 3, client: "Government of Gujarat", title: "Breakwater & Deepwater Berth, Porbandar Gujarat; Fishery Harbour, Mangrol Gujarat; Veraval Fishing Harbour", company: "Amma Lines" },
//   { id: 4, client: "Madras Port Trust, Tamilnadu", title: "Madras Harbour; Outer Protection Arm, Breakwater", company: "Amma Lines" },
//   { id: 5, client: "Government of Indian Enterprises", title: "Krishak Bharathi Co-operative Ltd. (KRIBHCO) Wharf & Jetty in Surat, Gujarat", company: "Amma Lines" },
//   { id: 6, client: "Government of Tamilnadu", title: "Fishery Harbour, Kanyakumari, Tamilnadu", company: "Amma Lines" },
//   { id: 7, client: "Rashtriya Chemicals & Fertilizers", title: "Mandwa Jetty (Maharashtra)", company: "Amma Lines" },
//   { id: 8, client: "Mumbai Port Trust", title: "Sassoon Fish Harbour, Mumbai", company: "Amma Lines" },
//   { id: 9, client: "Mitsui & Co.", title: "Guide Bund (Breakwaters) Nehru Port Trust at Jawaharlal", company: "Amma Lines" },
//   { id: 10, client: "Government of Maharashtra", title: "New Elephanta Jetty", company: "Amma Lines" },
//   { id: 11, client: "Vikram Ispat", title: "Approach Bund, Caisson Bridge and Jetty, Revdanda; Twin Dolphins for Mooring Iron Ore Bridges; Additional Jetty", company: "Amma Lines" },
//   { id: 12, client: "BSES", title: "Cooling Water Systems at BSES Dahanu", company: "Amma Lines" },
//   { id: 13, client: "Bombay Suburban Elect. Supply Ltd.", title: "BSES Coal Unloading Jetty at Dahanu including literage of Coal", company: "Amma Lines" },
//   { id: 14, client: "O.C.C. Ltd.", title: "Intake Channel at IB Thermal Power Station; Underwater excavation of CW intake channel", company: "Amma Lines" },
//   { id: 15, client: "Ennore Coal Port Project", title: "Construction of work harbour and South and North breakwater", company: "Amma Lines" },
//   { id: 16, client: "Municipal Corp. of Greater Mumbai", title: "Precast Roof Troughs for M/s. Orkay Silk Mills; Construction of Sassoon Fish Harbour Project, Colaba; Training of Dharavi Nala", company: "Amma Lines" },
//   { id: 17, client: "Andhra Civil Construction Co. Chennai", title: "Construction of Mandwa Pipeline Trench Earthwork at JNPT, Nhava", company: "Amma Lines" },
//   { id: 18, client: "Nhaval Vallsons, Sheva", title: "Construction of Guide Bund for JNPT at Nhava Sheva", company: "Amma Lines" },
//   { id: 19, client: "Urmila & Company, Mumbai", title: "Earthwork for main canal for Sardar Sarovar Narmada Nigam", company: "Amma Lines" },
//   { id: 20, client: "Jaiprakash Co.", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
//   { id: 21, client: "Tourism Development Corp. Ltd", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
//   { id: 22, client: "The Freyssinet Press Concrete Co.", title: "Restoration of Damaged North Dolphin at Sikka (Jamnagar)", company: "Amma Lines" },
//   { id: 23, client: "Glencore India Pvt. Ltd", title: "Construction of Barge Terminal and Associated facilities; Transhipment of Coal", company: "Amma Lines" },
//   { id: 24, client: "Brihanmumbai Mahanagar Palika", title: "Replacement/laying standard dia distributory water mains in City North Area Phase - II", company: "Amma Lines" },
//   { id: 25, client: "Oil & Natural Gas Corp. Ltd., Uran", title: "Protection of Seashore along the road towards south gate at LPG/CSU Plant, ONGC, Uran", company: "Amma Lines" },
//   { id: 26, client: "Reshamsingh & Co. Pvt. Ltd.", title: "Construction Jetty/Breakwater at NPCIL, Kundankulam Project, Kudankulam", company: "Amma Lines" },
//   { id: 27, client: "Govt. of Karnataka", title: "Construction of Fisheries Harbour, Breakwater, piled Jetty construction", company: "Amma Lines" },
//   { id: 28, client: "Hindustan Const. Co. Ltd.", title: "Construction of RCC Link Bridge at location R 16 to R29 in BCC's Bandra Worli Sea Link", company: "Amma Lines" },
//   { id: 29, client: "Marg Limited, Chennai", title: "Construction of Breakwaters at Karaikal Port", company: "Amma Lines" },
//   { id: 30, client: "Larsen Toubro & Limited", title: "Construction of wharf wall using plain concrete blocks for outfitting jetty No.2 at L&T plant", company: "Amma Lines" },
//   { id: 31, client: "M/s. Alpine Services & Pipelines", title: "Trench Dredging for Colaba Marine Outfall", company: "Amma Lines" },
//   { id: 32, client: "M/s. Andhra Civil Construction Co.", title: "Dredging soft and rock with hydraulic rock breaker at Bandra", company: "Amma Lines" },
//   { id: 33, client: "M/s. Bholasingh Jayprakash & Co.", title: "Dredging for Sassoon Fish Harbour Project", company: "Amma Lines" },
//   { id: 34, client: "Metropolitan Regional Dev Auth", title: "Dredging of Thermal Power Station, Bihar (Soft & Rock)", company: "Amma Lines" },
//   { id: 35, client: "Mazagon Dock Ltd, Mumbai", title: "Dredging at Mazagon Dock, Mumbai; Maintenance Dredging in front of Alcock yard", company: "Amma Lines" },
//   { id: 36, client: "M/s. Dodsal Ltd., Mumbai", title: "Dredging Trench in Thane Creek for Pipe Line", company: "Amma Lines" },
//   { id: 37, client: "M/s. J.M. Baxi & Co. Mumbai", title: "Dredging KRIBHCO Jetty at Hazira", company: "Amma Lines" },
//   { id: 38, client: "M. Pallonji & Co. Pvt. Ltd.", title: "Dredging at Tata Electric Jetty at Trombay", company: "Amma Lines" },
//   { id: 39, client: "Larsen & Toubro Ltd.", title: "Dredging in river Tapti adjacent to Larsen & Toubro at Hazira", company: "Amma Lines" },
//   { id: 40, client: "Vikram Ispat Ltd.", title: "Dredging and Construction of Jetty at Revdanda", company: "Amma Lines" },
//   { id: 41, client: "Patel Engineering Co", title: "Dredging and Construction of Rock Bund for KHEP", company: "Amma Lines" },
//   { id: 42, client: "Jawaharlal Nehru Port Trust", title: "Dredging in the Lagoon Nehru Administration behind Bulk Berth at JNPT", company: "Amma Lines" },
//   { id: 43, client: "Hyundai Heavy Industries", title: "Trench Filling for ONGC", company: "Amma Lines" },
//   { id: 44, client: "Tamilnadu Electricity Board", title: "Dredging at Ennore for Tamilnadu Electricity Board", company: "Amma Lines" },
//   { id: 45, client: "BSES Ltd.", title: "Dredging in Dock basin and entrance channel for BSES Jetty at Dahanu", company: "Amma Lines" },
//   { id: 46, client: "Hindustan Petroleum Corp. Ltd", title: "Dredging for HPCL", company: "Amma Lines" },
//   { id: 47, client: "Dronagiri Prakalpagrast", title: "Dredging in soft strata for construction of wharf wall-I, II, III and channel", company: "Amma Lines" },
//   { id: 48, client: "Kirloskar Brothers Ltd.", title: "Underwater and open A/c.NPCIL excavation RAPP Kota, Rajasthan", company: "Amma Lines" },
//   { id: 49, client: "Maharashtra Maritime Board", title: "Dredging in the port of Dabhol, Varsova and Gorai", company: "Amma Lines" },

//   // --- CURRENT WORKS IN HAND (MEKA GROUP) ---
//   { id: 50, client: "Reliance Industries Limited.", title: "Installation of New Offshore (EDPL) HDPE Pipeline LSTK Contract at RIL - DMD, Dahej", company: "Meka Group" },
//   { id: 51, client: "Wabag Va Tech Ltd.", title: "Concrete anchor block fixing, launching offshore and sinking of Intake, Outfall for 400 MLD SWRO", company: "Meka Group" },
//   { id: 52, client: "McDermott Middle East Inc.", title: "North Field Expansion (NFXP) Project - Trenching and Backfilling Works - Qatar", company: "Meka Group" },

//   // --- MEKA DREDGING COMPANY PVT. LTD. ---
//   { id: 53, client: "M/s. Larsen & Toubro Ltd.", title: "Dredging & Reclamation in L&T West plot at Hazira, Surat-Phase-I, II, and III", company: "Meka Dredging" },
//   { id: 54, client: "M/s. Marg Limited", title: "Dredging and Reclamation works at Karaikal Port", company: "Meka Dredging" },
//   { id: 55, client: "Reliance Industries Ltd.", title: "Dredging and Reclamation works for Site development of PTA-10 at RIL, Hazira", company: "Meka Dredging" },
//   { id: 56, client: "M/s. Nagarjuna Oil Corp Ltd.", title: "Rental for Dredging, Clean up Operation, Maintainance of Ro-Ro jetty Cuddalore", company: "Meka Dredging" },
//   { id: 57, client: "Marshal Marine International", title: "Hire of Cutter Suction Dredger for Dredging & Reclamation at Cochin Naval Dock", company: "Meka Dredging" },
//   { id: 58, client: "Petronet LNG Limited", title: "Hire of Cutter Suction Dredger for Dredging Services at Kochi LNG Terminal", company: "Meka Dredging" },

//   // --- MEKA INFRASTRUCTURE PRIVATE LIMITED ---
//   { id: 59, client: "Adani Power Ltd., Udupi", title: "Design, Engineering, Manufacturing, Procurement, Testing Old/New Diffuser", company: "Meka Infra" },
//   { id: 60, client: "Cobratecton Pvt. Ltd.", title: "Design, Construction, Installation of Intake and Outfall system for 150 MLD Desalination", company: "Meka Infra" },
//   { id: 61, client: "L&T - Tecton JV Dahej", title: "Construction of Intake Channel & Outfall pipe works for 100 MLD SWRO Desalination", company: "Meka Infra" },
//   { id: 62, client: "McDermott International", title: "Provision of prelay trenching and backfilling services for KG- DWN 98/2 at Yanam", company: "Meka Infra" },
//   { id: 63, client: "Coastal Energen Limited", title: "2 x 600 MW Mutiara Thermal Power Project - Sea water Intake and Outfall offshore piping", company: "Meka Infra" },
//   { id: 64, client: "VA Tech WABAG Ltd.", title: "100 mld Disalination Plant of CMWSSB at Nemmeli - Intake and Outfall works", company: "Meka Infra" },
//   { id: 65, client: "Lanco Infratech Limited", title: "Installation & Commissioning of Intake & Outflow Submarine Pipline System at Udupi", company: "Meka Infra" }
// ];

// const CATEGORIES = ["All", "Amma Lines", "Meka Dredging", "Meka Infra", "Meka Group"];

// export default function ProjectsPage() {
//   const [filter, setFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleCount, setVisibleCount] = useState(15);
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const { t } = useTranslation();

//   const containerRef = useRef(null);
//   const listRef = useRef(null);
//   const navBarRef = useRef(null);
//   const imageRevealRef = useRef(null);

//   // Set up GSAP quickTo for 60fps buttery smooth cursor tracking
//   const xTo = useRef(null);
//   const yTo = useRef(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Filter & Search Logic
//   const filteredProjects = PROJECTS_DATA.filter((p) => {
//     const matchesCategory = filter === "All" || p.company === filter;
//     const matchesSearch = 
//       p.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
//       p.title.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const displayedProjects = filteredProjects.slice(0, visibleCount);

//   useGSAP(() => {
//     // Initialize quickTo for mouse follow
//     xTo.current = gsap.quickTo(imageRevealRef.current, "x", { duration: 0.4, ease: "power3" });
//     yTo.current = gsap.quickTo(imageRevealRef.current, "y", { duration: 0.4, ease: "power3" });

//     const heroTl = gsap.timeline({ delay: 0.2 });

//     heroTl
//       .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
//       .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
//       .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" }, "-=0.8")
//       .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

//     // Sticky Nav Shadow
//     ScrollTrigger.create({
//       trigger: navBarRef.current,
//       start: "top top",
//       toggleClass: { targets: navBarRef.current, className: "shadow-[0_10px_30px_rgba(0,0,0,0.04)]" }
//     });

//     gsap.fromTo(".project-row", 
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out",
//         scrollTrigger: { trigger: listRef.current, start: "top 80%" }
//       }
//     );

//     // CTA
//     gsap.fromTo(".cta-text", { y: 40, opacity: 0 }, {
//       y: 0, opacity: 1, duration: 1, ease: "power3.out",
//       scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
//     });

//   }, { scope: containerRef });

//   // Animate changes when filter/search updates
//   useEffect(() => {
//     gsap.fromTo(".project-row", 
//       { opacity: 0, x: -10 },
//       { opacity: 1, x: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }
//     );
//   }, [filter, searchQuery, visibleCount]);

//   // Track Mouse Movement over the list
//   const handleMouseMove = (e) => {
//     if (xTo.current && yTo.current) {
//       xTo.current(e.clientX);
//       yTo.current(e.clientY);
//     }
//   };

//   // Determine which image to show (using your existing 4 images as placeholders cyclically)
//   const hoveredProjectImage = hoveredRowId 
//     ? `/projects/image${((hoveredRowId - 1) % 4) + 1}.png` 
//     : null;

//   return (
//     <>
//       <Helmet>
//         <title>Projects | Meka Group — 65+ Marine & Infrastructure Projects</title>
//         <meta name="description" content="Browse Meka Group's complete project archive spanning decades of marine construction, dredging, and heavy infrastructure development across India and Qatar." />
//       </Helmet>
//       <main
//         ref={containerRef} 
//         className="bg-[#f5f5f0] text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden relative"
//       >
//         {/* Floating Cursor Image Reveal Container */}
//         <div 
//           ref={imageRevealRef}
//           className={`pointer-events-none fixed top-0 left-0 z-50 w-64 md:w-80 aspect-[4/3] overflow-hidden rounded-sm shadow-2xl transition-all duration-300 ease-out origin-center ${
//             hoveredRowId ? "opacity-100 scale-100" : "opacity-0 scale-75"
//           }`}
//           style={{ transform: "translate(-50%, -50%)" }} // Center on cursor
//         >
//           {hoveredProjectImage && (
//             <img 
//               src={hoveredProjectImage} 
//               alt="Project Preview" 
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>

//         {/* ── Architectural Structural Line ── */}
//         <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

//         {/* ═══════════════════════════════════════
//             1. HERO (Editorial Layout)
//             ═══════════════════════════════════════ */}
//         <section className="hero-section relative w-full pt-48 pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[70vh]">
          
//           {/* Blueprint Grid */}
//           <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
//             style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

//           <div className="relative z-10 w-full max-w-[1600px] mx-auto">
//             <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
//               {t("projects.theArchive")}
//             </span>

//             <h1 className="text-[16vw] lg:text-[11vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-10">
//               <span className="block overflow-hidden py-5 -my-5">
//                 <span className="hero-word block">{t("projects.projectIndex")}</span>
//               </span>
//               <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
//                 <span className="hero-word block text-black/20">{t("projects.index")}</span>
//               </span>
//             </h1>

//             <div className="w-full max-w-xl lg:ml-[8vw]">
//               <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-8 origin-left" />
//               <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
//                 {t("projects.archiveDesc")}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════
//             2. COMMAND BAR (Search + Filter)
//             ═══════════════════════════════════════ */}
//         <div ref={navBarRef} className="sticky top-0 z-40 bg-[#f5f5f0]/90 backdrop-blur-xl border-y border-black/[0.05] transition-all duration-300">
//           <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
//             {/* Filter Tags */}
//             <div className="flex flex-wrap items-center gap-4 md:gap-6">
//               <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-black/30 mr-2">
//                 {t("projects.filter")}
//               </span>
//               {CATEGORIES.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => { setFilter(cat); setVisibleCount(15); }}
//                   className={`text-[10px] md:text-[11px] font-sans font-bold tracking-[0.15em] uppercase transition-all duration-300 px-5 py-2.5 border rounded-full ${
//                     filter === cat 
//                       ? "bg-[#0ea5a4] text-white border-[#0ea5a4]" 
//                       : "text-black/60 border-black/[0.08] hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full md:w-72">
//               <input 
//                 type="text" 
//                 placeholder={t("projects.searchPlaceholder")} 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-white border border-black/10 text-[#050505] text-[11px] md:text-xs font-sans tracking-wide py-3 px-5 rounded-full focus:outline-none focus:border-[#0ea5a4] transition-colors placeholder:text-gray-400 shadow-sm"
//               />
//               <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>

//           </div>
//         </div>

//         {/* ═══════════════════════════════════════
//             3. TYPOGRAPHIC PROJECT INDEX
//             ═══════════════════════════════════════ */}
//         <section 
//           ref={listRef} 
//           className="max-w-[1600px] mx-auto px-6 md:px-16 py-16 md:py-24 relative z-10"
//           onMouseMove={handleMouseMove} // Added mouse tracking here
//         >
          
//           {/* Table Header */}
//           <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-black/10 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 mb-4">
//             <div className="col-span-1">{t("projects.no")}</div>
//             <div className="col-span-3">{t("projects.client")}</div>
//             <div className="col-span-6">{t("projects.projectDetails")}</div>
//             <div className="col-span-2 text-right">{t("projects.entity")}</div>
//           </div>

//           {/* Project Rows */}
//           <div className="flex flex-col relative" onMouseLeave={() => setHoveredRowId(null)}>
//             {displayedProjects.map((project, index) => {
//               // Spotlight Effect Logic
//               const isHovered = hoveredRowId === project.id;
//               const isFaded = hoveredRowId !== null && !isHovered;

//               return (
//                 <div 
//                   key={project.id} 
//                   onMouseEnter={() => setHoveredRowId(project.id)}
//                   className={`project-row group grid grid-cols-1 md:grid-cols-12 gap-y-3 gap-x-6 py-8 md:py-10 border-b border-black/[0.05] transition-all duration-500 cursor-default ${
//                     isFaded ? "opacity-20 blur-[1px]" : "opacity-100 blur-0"
//                   } ${isHovered ? "bg-white/50 -mx-6 px-6 md:-mx-16 md:px-16 rounded-sm shadow-sm border-transparent" : ""}`}
//                 >
                  
//                   {/* Index Number */}
//                   <div className="hidden md:block col-span-1 font-serif text-lg text-black/20 group-hover:text-[#0ea5a4] transition-colors duration-300">
//                     {String(index + 1).padStart(3, '0')}
//                   </div>

//                   {/* Client Name */}
//                   <div className="col-span-3">
//                     <p className="text-sm md:text-base font-sans font-bold text-[#050505] group-hover:text-[#0ea5a4] group-hover:translate-x-2 transition-all duration-500">
//                       {project.client}
//                     </p>
//                   </div>
                  
//                   {/* Project Title */}
//                   <div className="col-span-6 pr-4">
//                     <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed group-hover:text-[#050505] transition-colors duration-300">
//                       {project.title}
//                     </p>
//                   </div>

//                   {/* Company Badge */}
//                   <div className="col-span-2 pt-3 md:pt-0 flex items-start md:items-center justify-between md:justify-end gap-6 overflow-hidden">
//                     <span className={`inline-block px-4 py-2 bg-white border border-black/10 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-black/60 transition-all duration-300 ${
//                       isHovered ? "border-[#0ea5a4]/30 text-[#0ea5a4] shadow-sm" : ""
//                     }`}>
//                       {project.company}
//                     </span>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Empty State */}
//           {filteredProjects.length === 0 && (
//             <div className="py-32 text-center">
//               <span className="text-black/20 text-4xl mb-4 block">∅</span>
//               <p className="text-black/40 text-[11px] font-bold tracking-[0.25em] uppercase">
//                 {t("projects.noResults")}
//               </p>
//             </div>
//           )}

//           {/* Load More Button */}
//           {visibleCount < filteredProjects.length && (
//             <div className="mt-20 text-center flex justify-center">
//               <button 
//                 onClick={() => setVisibleCount(prev => prev + 15)}
//                 className="group flex items-center gap-6 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-black/50 hover:text-[#0ea5a4] transition-colors"
//               >
//                 <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
//                 {t("projects.loadMore")} ({filteredProjects.length - visibleCount})
//                 <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
//               </button>
//             </div>
//           )}
//         </section>

//         {/* ═══════════════════════════════════════
//             4. CTA SECTION
//             ═══════════════════════════════════════ */}
//         <section className="cta-section relative py-40 md:py-64 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] border-t border-black/[0.06]">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
//             MEKA
//           </div>

//           <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
//             <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
//               {t("projects.startAProject")}
//             </span>
//             <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.85]">
//               {t("projects.readyTo")}<br />
//               <span className="text-black/15">{t("projects.build")}</span>
//             </h2>
//             <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12">
//               {t("projects.readyToBuildDesc")}
//             </p>
//             <div className="flex flex-wrap justify-center gap-5">
//               <Link to="/contact"
//                 className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow">
//                 <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
//                 <span className="relative z-10">{t("projects.initiateConsultation")}</span>
//               </Link>
//             </div>
//           </div>
//         </section>

//       </main>
      
//       {/* FOOTER OUTSIDE MAIN */}
//       <Footer/>
//     </>
//   );
// }
// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)
// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)

// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
// import React, { useState, useRef, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Link } from "react-router-dom";
// import Footer from '../components/layout/Footer'
// import { useTranslation } from "react-i18next";

// gsap.registerPlugin(ScrollTrigger);

// // Project Data
// const PROJECTS_DATA = [
//   // --- AMMA LINES PRIVATE LIMITED ---
//   { id: 1, client: "Indian Railway", title: "13 K.M Long Rail-cum-Road Bridge across Godavari River, Rajahmundry, A.P", company: "Amma Lines" },
//   { id: 2, client: "Tuticorin Port Trust", title: "Two Additional Berths; 2 Breakwaters 4 Nos. Alongside berths pier heads 3 Nos. Dredging and Reclamation", company: "Amma Lines" },
//   { id: 3, client: "Government of Gujarat", title: "Breakwater & Deepwater Berth, Porbandar Gujarat; Fishery Harbour, Mangrol Gujarat; Veraval Fishing Harbour", company: "Amma Lines" },
//   { id: 4, client: "Madras Port Trust, Tamilnadu", title: "Madras Harbour; Outer Protection Arm, Breakwater", company: "Amma Lines" },
//   { id: 5, client: "Government of Indian Enterprises", title: "Krishak Bharathi Co-operative Ltd. (KRIBHCO) Wharf & Jetty in Surat, Gujarat", company: "Amma Lines" },
//   { id: 6, client: "Government of Tamilnadu", title: "Fishery Harbour, Kanyakumari, Tamilnadu", company: "Amma Lines" },
//   { id: 7, client: "Rashtriya Chemicals & Fertilizers", title: "Mandwa Jetty (Maharashtra)", company: "Amma Lines" },
//   { id: 8, client: "Mumbai Port Trust", title: "Sassoon Fish Harbour, Mumbai", company: "Amma Lines" },
//   { id: 9, client: "Mitsui & Co.", title: "Guide Bund (Breakwaters) Nehru Port Trust at Jawaharlal", company: "Amma Lines" },
//   { id: 10, client: "Government of Maharashtra", title: "New Elephanta Jetty", company: "Amma Lines" },
//   { id: 11, client: "Vikram Ispat", title: "Approach Bund, Caisson Bridge and Jetty, Revdanda; Twin Dolphins for Mooring Iron Ore Bridges; Additional Jetty", company: "Amma Lines" },
//   { id: 12, client: "BSES", title: "Cooling Water Systems at BSES Dahanu", company: "Amma Lines" },
//   { id: 13, client: "Bombay Suburban Elect. Supply Ltd.", title: "BSES Coal Unloading Jetty at Dahanu including literage of Coal", company: "Amma Lines" },
//   { id: 14, client: "O.C.C. Ltd.", title: "Intake Channel at IB Thermal Power Station; Underwater excavation of CW intake channel", company: "Amma Lines" },
//   { id: 15, client: "Ennore Coal Port Project", title: "Construction of work harbour and South and North breakwater", company: "Amma Lines" },
//   { id: 16, client: "Municipal Corp. of Greater Mumbai", title: "Precast Roof Troughs for M/s. Orkay Silk Mills; Construction of Sassoon Fish Harbour Project, Colaba; Training of Dharavi Nala", company: "Amma Lines" },
//   { id: 17, client: "Andhra Civil Construction Co. Chennai", title: "Construction of Mandwa Pipeline Trench Earthwork at JNPT, Nhava", company: "Amma Lines" },
//   { id: 18, client: "Nhaval Vallsons, Sheva", title: "Construction of Guide Bund for JNPT at Nhava Sheva", company: "Amma Lines" },
//   { id: 19, client: "Urmila & Company, Mumbai", title: "Earthwork for main canal for Sardar Sarovar Narmada Nigam", company: "Amma Lines" },
//   { id: 20, client: "Jaiprakash Co.", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
//   { id: 21, client: "Tourism Development Corp. Ltd", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
//   { id: 22, client: "The Freyssinet Press Concrete Co.", title: "Restoration of Damaged North Dolphin at Sikka (Jamnagar)", company: "Amma Lines" },
//   { id: 23, client: "Glencore India Pvt. Ltd", title: "Construction of Barge Terminal and Associated facilities; Transhipment of Coal", company: "Amma Lines" },
//   { id: 24, client: "Brihanmumbai Mahanagar Palika", title: "Replacement/laying standard dia distributory water mains in City North Area Phase - II", company: "Amma Lines" },
//   { id: 25, client: "Oil & Natural Gas Corp. Ltd., Uran", title: "Protection of Seashore along the road towards south gate at LPG/CSU Plant, ONGC, Uran", company: "Amma Lines" },
//   { id: 26, client: "Reshamsingh & Co. Pvt. Ltd.", title: "Construction Jetty/Breakwater at NPCIL, Kundankulam Project, Kudankulam", company: "Amma Lines" },
//   { id: 27, client: "Govt. of Karnataka", title: "Construction of Fisheries Harbour, Breakwater, piled Jetty construction", company: "Amma Lines" },
//   { id: 28, client: "Hindustan Const. Co. Ltd.", title: "Construction of RCC Link Bridge at location R 16 to R29 in BCC's Bandra Worli Sea Link", company: "Amma Lines" },
//   { id: 29, client: "Marg Limited, Chennai", title: "Construction of Breakwaters at Karaikal Port", company: "Amma Lines" },
//   { id: 30, client: "Larsen Toubro & Limited", title: "Construction of wharf wall using plain concrete blocks for outfitting jetty No.2 at L&T plant", company: "Amma Lines" },
//   { id: 31, client: "M/s. Alpine Services & Pipelines", title: "Trench Dredging for Colaba Marine Outfall", company: "Amma Lines" },
//   { id: 32, client: "M/s. Andhra Civil Construction Co.", title: "Dredging soft and rock with hydraulic rock breaker at Bandra", company: "Amma Lines" },
//   { id: 33, client: "M/s. Bholasingh Jayprakash & Co.", title: "Dredging for Sassoon Fish Harbour Project", company: "Amma Lines" },
//   { id: 34, client: "Metropolitan Regional Dev Auth", title: "Dredging of Thermal Power Station, Bihar (Soft & Rock)", company: "Amma Lines" },
//   { id: 35, client: "Mazagon Dock Ltd, Mumbai", title: "Dredging at Mazagon Dock, Mumbai; Maintenance Dredging in front of Alcock yard", company: "Amma Lines" },
//   { id: 36, client: "M/s. Dodsal Ltd., Mumbai", title: "Dredging Trench in Thane Creek for Pipe Line", company: "Amma Lines" },
//   { id: 37, client: "M/s. J.M. Baxi & Co. Mumbai", title: "Dredging KRIBHCO Jetty at Hazira", company: "Amma Lines" },
//   { id: 38, client: "M. Pallonji & Co. Pvt. Ltd.", title: "Dredging at Tata Electric Jetty at Trombay", company: "Amma Lines" },
//   { id: 39, client: "Larsen & Toubro Ltd.", title: "Dredging in river Tapti adjacent to Larsen & Toubro at Hazira", company: "Amma Lines" },
//   { id: 40, client: "Vikram Ispat Ltd.", title: "Dredging and Construction of Jetty at Revdanda", company: "Amma Lines" },
//   { id: 41, client: "Patel Engineering Co", title: "Dredging and Construction of Rock Bund for KHEP", company: "Amma Lines" },
//   { id: 42, client: "Jawaharlal Nehru Port Trust", title: "Dredging in the Lagoon Nehru Administration behind Bulk Berth at JNPT", company: "Amma Lines" },
//   { id: 43, client: "Hyundai Heavy Industries", title: "Trench Filling for ONGC", company: "Amma Lines" },
//   { id: 44, client: "Tamilnadu Electricity Board", title: "Dredging at Ennore for Tamilnadu Electricity Board", company: "Amma Lines" },
//   { id: 45, client: "BSES Ltd.", title: "Dredging in Dock basin and entrance channel for BSES Jetty at Dahanu", company: "Amma Lines" },
//   { id: 46, client: "Hindustan Petroleum Corp. Ltd", title: "Dredging for HPCL", company: "Amma Lines" },
//   { id: 47, client: "Dronagiri Prakalpagrast", title: "Dredging in soft strata for construction of wharf wall-I, II, III and channel", company: "Amma Lines" },
//   { id: 48, client: "Kirloskar Brothers Ltd.", title: "Underwater and open A/c.NPCIL excavation RAPP Kota, Rajasthan", company: "Amma Lines" },
//   { id: 49, client: "Maharashtra Maritime Board", title: "Dredging in the port of Dabhol, Varsova and Gorai", company: "Amma Lines" },

//   // --- CURRENT WORKS IN HAND (MEKA GROUP) ---
//   { id: 50, client: "Reliance Industries Limited.", title: "Installation of New Offshore (EDPL) HDPE Pipeline LSTK Contract at RIL - DMD, Dahej", company: "Meka Group" },
//   { id: 51, client: "Wabag Va Tech Ltd.", title: "Concrete anchor block fixing, launching offshore and sinking of Intake, Outfall for 400 MLD SWRO", company: "Meka Group" },
//   { id: 52, client: "McDermott Middle East Inc.", title: "North Field Expansion (NFXP) Project - Trenching and Backfilling Works - Qatar", company: "Meka Group" },

//   // --- MEKA DREDGING COMPANY PVT. LTD. ---
//   { id: 53, client: "M/s. Larsen & Toubro Ltd.", title: "Dredging & Reclamation in L&T West plot at Hazira, Surat-Phase-I, II, and III", company: "Meka Dredging" },
//   { id: 54, client: "M/s. Marg Limited", title: "Dredging and Reclamation works at Karaikal Port", company: "Meka Dredging" },
//   { id: 55, client: "Reliance Industries Ltd.", title: "Dredging and Reclamation works for Site development of PTA-10 at RIL, Hazira", company: "Meka Dredging" },
//   { id: 56, client: "M/s. Nagarjuna Oil Corp Ltd.", title: "Rental for Dredging, Clean up Operation, Maintainance of Ro-Ro jetty Cuddalore", company: "Meka Dredging" },
//   { id: 57, client: "Marshal Marine International", title: "Hire of Cutter Suction Dredger for Dredging & Reclamation at Cochin Naval Dock", company: "Meka Dredging" },
//   { id: 58, client: "Petronet LNG Limited", title: "Hire of Cutter Suction Dredger for Dredging Services at Kochi LNG Terminal", company: "Meka Dredging" },

//   // --- MEKA INFRASTRUCTURE PRIVATE LIMITED ---
//   { id: 59, client: "Adani Power Ltd., Udupi", title: "Design, Engineering, Manufacturing, Procurement, Testing Old/New Diffuser", company: "Meka Infra" },
//   { id: 60, client: "Cobratecton Pvt. Ltd.", title: "Design, Construction, Installation of Intake and Outfall system for 150 MLD Desalination", company: "Meka Infra" },
//   { id: 61, client: "L&T - Tecton JV Dahej", title: "Construction of Intake Channel & Outfall pipe works for 100 MLD SWRO Desalination", company: "Meka Infra" },
//   { id: 62, client: "McDermott International", title: "Provision of prelay trenching and backfilling services for KG- DWN 98/2 at Yanam", company: "Meka Infra" },
//   { id: 63, client: "Coastal Energen Limited", title: "2 x 600 MW Mutiara Thermal Power Project - Sea water Intake and Outfall offshore piping", company: "Meka Infra" },
//   { id: 64, client: "VA Tech WABAG Ltd.", title: "100 mld Disalination Plant of CMWSSB at Nemmeli - Intake and Outfall works", company: "Meka Infra" },
//   { id: 65, client: "Lanco Infratech Limited", title: "Installation & Commissioning of Intake & Outflow Submarine Pipline System at Udupi", company: "Meka Infra" }
// ];

// const CATEGORIES = ["All", "Amma Lines", "Meka Dredging", "Meka Infra", "Meka Group"];

// export default function ProjectsPage() {
//   const [filter, setFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleCount, setVisibleCount] = useState(15);
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const { t } = useTranslation();

//   const containerRef = useRef(null);
//   const listRef = useRef(null);
//   const navBarRef = useRef(null);
//   const imageRevealRef = useRef(null);

//   // Set up GSAP quickTo for 60fps buttery smooth cursor tracking
//   const xTo = useRef(null);
//   const yTo = useRef(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Filter & Search Logic
//   const filteredProjects = PROJECTS_DATA.filter((p) => {
//     const matchesCategory = filter === "All" || p.company === filter;
//     const matchesSearch = 
//       p.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
//       p.title.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const displayedProjects = filteredProjects.slice(0, visibleCount);

//   useGSAP(() => {
//     // Initialize quickTo for mouse follow
//     xTo.current = gsap.quickTo(imageRevealRef.current, "x", { duration: 0.4, ease: "power3" });
//     yTo.current = gsap.quickTo(imageRevealRef.current, "y", { duration: 0.4, ease: "power3" });

//     const heroTl = gsap.timeline({ delay: 0.2 });

//     heroTl
//       .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
//       .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
//       .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" }, "-=0.8")
//       .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

//     // Sticky Nav Shadow
//     ScrollTrigger.create({
//       trigger: navBarRef.current,
//       start: "top top",
//       toggleClass: { targets: navBarRef.current, className: "shadow-[0_10px_30px_rgba(0,0,0,0.04)]" }
//     });

//     gsap.fromTo(".project-row", 
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out",
//         scrollTrigger: { trigger: listRef.current, start: "top 80%" }
//       }
//     );

//     // CTA
//     gsap.fromTo(".cta-text", { y: 40, opacity: 0 }, {
//       y: 0, opacity: 1, duration: 1, ease: "power3.out",
//       scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
//     });

//   }, { scope: containerRef });

//   // Animate changes when filter/search updates
//   useEffect(() => {
//     gsap.fromTo(".project-row", 
//       { opacity: 0, x: -10 },
//       { opacity: 1, x: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }
//     );
//   }, [filter, searchQuery, visibleCount]);

//   // Track Mouse Movement over the list
//   const handleMouseMove = (e) => {
//     if (xTo.current && yTo.current) {
//       xTo.current(e.clientX);
//       yTo.current(e.clientY);
//     }
//   };

//   // Determine which image to show (using your existing 4 images as placeholders cyclically)
//   const hoveredProjectImage = hoveredRowId 
//     ? `/projects/image${((hoveredRowId - 1) % 4) + 1}.png` 
//     : null;

//   return (
//     <>
//       <Helmet>
//         <title>Projects | Meka Group — 65+ Marine & Infrastructure Projects</title>
//         <meta name="description" content="Browse Meka Group's complete project archive spanning decades of marine construction, dredging, and heavy infrastructure development across India and Qatar." />
//       </Helmet>
//       <main
//         ref={containerRef} 
//         className="bg-[#f5f5f0] text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden relative"
//       >
//         {/* Floating Cursor Image Reveal Container */}
//         <div 
//           ref={imageRevealRef}
//           className={`pointer-events-none fixed top-0 left-0 z-50 w-64 md:w-80 aspect-[4/3] overflow-hidden rounded-sm shadow-2xl transition-all duration-300 ease-out origin-center ${
//             hoveredRowId ? "opacity-100 scale-100" : "opacity-0 scale-75"
//           }`}
//           style={{ transform: "translate(-50%, -50%)" }} // Center on cursor
//         >
//           {hoveredProjectImage && (
//             <img 
//               src={hoveredProjectImage} 
//               alt="Project Preview" 
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>

//         {/* ── Architectural Structural Line ── */}
//         <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

//         {/* ═══════════════════════════════════════
//             1. HERO (Editorial Layout)
//             ═══════════════════════════════════════ */}
//         <section className="hero-section relative w-full pt-48 pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[70vh]">
          
//           {/* Blueprint Grid */}
//           <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
//             style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

//           <div className="relative z-10 w-full max-w-[1600px] mx-auto">
//             <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
//               {t("projects.theArchive")}
//             </span>

//             <h1 className="text-[16vw] lg:text-[11vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-10">
//               <span className="block overflow-hidden py-5 -my-5">
//                 <span className="hero-word block">{t("projects.projectIndex")}</span>
//               </span>
//               <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
//                 <span className="hero-word block text-black/20">{t("projects.index")}</span>
//               </span>
//             </h1>

//             <div className="w-full max-w-xl lg:ml-[8vw]">
//               <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-8 origin-left" />
//               <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
//                 {t("projects.archiveDesc")}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════
//             2. COMMAND BAR (Search + Filter)
//             ═══════════════════════════════════════ */}
//         <div ref={navBarRef} className="sticky top-0 z-40 bg-[#f5f5f0]/90 backdrop-blur-xl border-y border-black/[0.05] transition-all duration-300">
//           <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
//             {/* Filter Tags */}
//             <div className="flex flex-wrap items-center gap-4 md:gap-6">
//               <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-black/30 mr-2">
//                 {t("projects.filter")}
//               </span>
//               {CATEGORIES.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => { setFilter(cat); setVisibleCount(15); }}
//                   className={`text-[10px] md:text-[11px] font-sans font-bold tracking-[0.15em] uppercase transition-all duration-300 px-5 py-2.5 border rounded-full ${
//                     filter === cat 
//                       ? "bg-[#0ea5a4] text-white border-[#0ea5a4]" 
//                       : "text-black/60 border-black/[0.08] hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full md:w-72">
//               <input 
//                 type="text" 
//                 placeholder={t("projects.searchPlaceholder")} 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-white border border-black/10 text-[#050505] text-[11px] md:text-xs font-sans tracking-wide py-3 px-5 rounded-full focus:outline-none focus:border-[#0ea5a4] transition-colors placeholder:text-gray-400 shadow-sm"
//               />
//               <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>

//           </div>
//         </div>

//         {/* ═══════════════════════════════════════
//             3. TYPOGRAPHIC PROJECT INDEX
//             ═══════════════════════════════════════ */}
//         <section 
//           ref={listRef} 
//           className="max-w-[1600px] mx-auto px-6 md:px-16 py-16 md:py-24 relative z-10"
//           onMouseMove={handleMouseMove} // Added mouse tracking here
//         >
          
//           {/* Table Header */}
//           <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-black/10 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 mb-4">
//             <div className="col-span-1">{t("projects.no")}</div>
//             <div className="col-span-3">{t("projects.client")}</div>
//             <div className="col-span-6">{t("projects.projectDetails")}</div>
//             <div className="col-span-2 text-right">{t("projects.entity")}</div>
//           </div>

//           {/* Project Rows */}
//           <div className="flex flex-col relative" onMouseLeave={() => setHoveredRowId(null)}>
//             {displayedProjects.map((project, index) => {
//               // Spotlight Effect Logic
//               const isHovered = hoveredRowId === project.id;
//               const isFaded = hoveredRowId !== null && !isHovered;

//               return (
//                 <div 
//                   key={project.id} 
//                   onMouseEnter={() => setHoveredRowId(project.id)}
//                   className={`project-row group grid grid-cols-1 md:grid-cols-12 gap-y-3 gap-x-6 py-8 md:py-10 border-b border-black/[0.05] transition-all duration-500 cursor-default ${
//                     isFaded ? "opacity-20 blur-[1px]" : "opacity-100 blur-0"
//                   } ${isHovered ? "bg-white/50 -mx-6 px-6 md:-mx-16 md:px-16 rounded-sm shadow-sm border-transparent" : ""}`}
//                 >
                  
//                   {/* Index Number */}
//                   <div className="hidden md:block col-span-1 font-serif text-lg text-black/20 group-hover:text-[#0ea5a4] transition-colors duration-300">
//                     {String(index + 1).padStart(3, '0')}
//                   </div>

//                   {/* Client Name */}
//                   <div className="col-span-3">
//                     <p className="text-sm md:text-base font-sans font-bold text-[#050505] group-hover:text-[#0ea5a4] group-hover:translate-x-2 transition-all duration-500">
//                       {project.client}
//                     </p>
//                   </div>
                  
//                   {/* Project Title */}
//                   <div className="col-span-6 pr-4">
//                     <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed group-hover:text-[#050505] transition-colors duration-300">
//                       {project.title}
//                     </p>
//                   </div>

//                   {/* Company Badge */}
//                   <div className="col-span-2 pt-3 md:pt-0 flex items-start md:items-center justify-between md:justify-end gap-6 overflow-hidden">
//                     <span className={`inline-block px-4 py-2 bg-white border border-black/10 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-black/60 transition-all duration-300 ${
//                       isHovered ? "border-[#0ea5a4]/30 text-[#0ea5a4] shadow-sm" : ""
//                     }`}>
//                       {project.company}
//                     </span>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Empty State */}
//           {filteredProjects.length === 0 && (
//             <div className="py-32 text-center">
//               <span className="text-black/20 text-4xl mb-4 block">∅</span>
//               <p className="text-black/40 text-[11px] font-bold tracking-[0.25em] uppercase">
//                 {t("projects.noResults")}
//               </p>
//             </div>
//           )}

//           {/* Load More Button */}
//           {visibleCount < filteredProjects.length && (
//             <div className="mt-20 text-center flex justify-center">
//               <button 
//                 onClick={() => setVisibleCount(prev => prev + 15)}
//                 className="group flex items-center gap-6 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-black/50 hover:text-[#0ea5a4] transition-colors"
//               >
//                 <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
//                 {t("projects.loadMore")} ({filteredProjects.length - visibleCount})
//                 <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
//               </button>
//             </div>
//           )}
//         </section>

//         {/* ═══════════════════════════════════════
//             4. CTA SECTION
//             ═══════════════════════════════════════ */}
//         <section className="cta-section relative py-40 md:py-64 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] border-t border-black/[0.06]">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
//             MEKA
//           </div>

//           <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
//             <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
//               {t("projects.startAProject")}
//             </span>
//             <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.85]">
//               {t("projects.readyTo")}<br />
//               <span className="text-black/15">{t("projects.build")}</span>
//             </h2>
//             <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12">
//               {t("projects.readyToBuildDesc")}
//             </p>
//             <div className="flex flex-wrap justify-center gap-5">
//               <Link to="/contact"
//                 className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow">
//                 <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
//                 <span className="relative z-10">{t("projects.initiateConsultation")}</span>
//               </Link>
//             </div>
//           </div>
//         </section>

//       </main>
      
//       {/* FOOTER OUTSIDE MAIN */}
//       <Footer/>
//     </>
//   );
// }
// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)
// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)

// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
// import React, { useState, useRef, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Link } from "react-router-dom";
// import Footer from '../components/layout/Footer'
// import { useTranslation } from "react-i18next";

// gsap.registerPlugin(ScrollTrigger);

// // Project Data
// const PROJECTS_DATA = [
//   // --- AMMA LINES PRIVATE LIMITED ---
//   { id: 1, client: "Indian Railway", title: "13 K.M Long Rail-cum-Road Bridge across Godavari River, Rajahmundry, A.P", company: "Amma Lines" },
//   { id: 2, client: "Tuticorin Port Trust", title: "Two Additional Berths; 2 Breakwaters 4 Nos. Alongside berths pier heads 3 Nos. Dredging and Reclamation", company: "Amma Lines" },
//   { id: 3, client: "Government of Gujarat", title: "Breakwater & Deepwater Berth, Porbandar Gujarat; Fishery Harbour, Mangrol Gujarat; Veraval Fishing Harbour", company: "Amma Lines" },
//   { id: 4, client: "Madras Port Trust, Tamilnadu", title: "Madras Harbour; Outer Protection Arm, Breakwater", company: "Amma Lines" },
//   { id: 5, client: "Government of Indian Enterprises", title: "Krishak Bharathi Co-operative Ltd. (KRIBHCO) Wharf & Jetty in Surat, Gujarat", company: "Amma Lines" },
//   { id: 6, client: "Government of Tamilnadu", title: "Fishery Harbour, Kanyakumari, Tamilnadu", company: "Amma Lines" },
//   { id: 7, client: "Rashtriya Chemicals & Fertilizers", title: "Mandwa Jetty (Maharashtra)", company: "Amma Lines" },
//   { id: 8, client: "Mumbai Port Trust", title: "Sassoon Fish Harbour, Mumbai", company: "Amma Lines" },
//   { id: 9, client: "Mitsui & Co.", title: "Guide Bund (Breakwaters) Nehru Port Trust at Jawaharlal", company: "Amma Lines" },
//   { id: 10, client: "Government of Maharashtra", title: "New Elephanta Jetty", company: "Amma Lines" },
//   { id: 11, client: "Vikram Ispat", title: "Approach Bund, Caisson Bridge and Jetty, Revdanda; Twin Dolphins for Mooring Iron Ore Bridges; Additional Jetty", company: "Amma Lines" },
//   { id: 12, client: "BSES", title: "Cooling Water Systems at BSES Dahanu", company: "Amma Lines" },
//   { id: 13, client: "Bombay Suburban Elect. Supply Ltd.", title: "BSES Coal Unloading Jetty at Dahanu including literage of Coal", company: "Amma Lines" },
//   { id: 14, client: "O.C.C. Ltd.", title: "Intake Channel at IB Thermal Power Station; Underwater excavation of CW intake channel", company: "Amma Lines" },
//   { id: 15, client: "Ennore Coal Port Project", title: "Construction of work harbour and South and North breakwater", company: "Amma Lines" },
//   { id: 16, client: "Municipal Corp. of Greater Mumbai", title: "Precast Roof Troughs for M/s. Orkay Silk Mills; Construction of Sassoon Fish Harbour Project, Colaba; Training of Dharavi Nala", company: "Amma Lines" },
//   { id: 17, client: "Andhra Civil Construction Co. Chennai", title: "Construction of Mandwa Pipeline Trench Earthwork at JNPT, Nhava", company: "Amma Lines" },
//   { id: 18, client: "Nhaval Vallsons, Sheva", title: "Construction of Guide Bund for JNPT at Nhava Sheva", company: "Amma Lines" },
//   { id: 19, client: "Urmila & Company, Mumbai", title: "Earthwork for main canal for Sardar Sarovar Narmada Nigam", company: "Amma Lines" },
//   { id: 20, client: "Jaiprakash Co.", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
//   { id: 21, client: "Tourism Development Corp. Ltd", title: "Construction of All Weather Passenger jetty at Elephanta", company: "Amma Lines" },
//   { id: 22, client: "The Freyssinet Press Concrete Co.", title: "Restoration of Damaged North Dolphin at Sikka (Jamnagar)", company: "Amma Lines" },
//   { id: 23, client: "Glencore India Pvt. Ltd", title: "Construction of Barge Terminal and Associated facilities; Transhipment of Coal", company: "Amma Lines" },
//   { id: 24, client: "Brihanmumbai Mahanagar Palika", title: "Replacement/laying standard dia distributory water mains in City North Area Phase - II", company: "Amma Lines" },
//   { id: 25, client: "Oil & Natural Gas Corp. Ltd., Uran", title: "Protection of Seashore along the road towards south gate at LPG/CSU Plant, ONGC, Uran", company: "Amma Lines" },
//   { id: 26, client: "Reshamsingh & Co. Pvt. Ltd.", title: "Construction Jetty/Breakwater at NPCIL, Kundankulam Project, Kudankulam", company: "Amma Lines" },
//   { id: 27, client: "Govt. of Karnataka", title: "Construction of Fisheries Harbour, Breakwater, piled Jetty construction", company: "Amma Lines" },
//   { id: 28, client: "Hindustan Const. Co. Ltd.", title: "Construction of RCC Link Bridge at location R 16 to R29 in BCC's Bandra Worli Sea Link", company: "Amma Lines" },
//   { id: 29, client: "Marg Limited, Chennai", title: "Construction of Breakwaters at Karaikal Port", company: "Amma Lines" },
//   { id: 30, client: "Larsen Toubro & Limited", title: "Construction of wharf wall using plain concrete blocks for outfitting jetty No.2 at L&T plant", company: "Amma Lines" },
//   { id: 31, client: "M/s. Alpine Services & Pipelines", title: "Trench Dredging for Colaba Marine Outfall", company: "Amma Lines" },
//   { id: 32, client: "M/s. Andhra Civil Construction Co.", title: "Dredging soft and rock with hydraulic rock breaker at Bandra", company: "Amma Lines" },
//   { id: 33, client: "M/s. Bholasingh Jayprakash & Co.", title: "Dredging for Sassoon Fish Harbour Project", company: "Amma Lines" },
//   { id: 34, client: "Metropolitan Regional Dev Auth", title: "Dredging of Thermal Power Station, Bihar (Soft & Rock)", company: "Amma Lines" },
//   { id: 35, client: "Mazagon Dock Ltd, Mumbai", title: "Dredging at Mazagon Dock, Mumbai; Maintenance Dredging in front of Alcock yard", company: "Amma Lines" },
//   { id: 36, client: "M/s. Dodsal Ltd., Mumbai", title: "Dredging Trench in Thane Creek for Pipe Line", company: "Amma Lines" },
//   { id: 37, client: "M/s. J.M. Baxi & Co. Mumbai", title: "Dredging KRIBHCO Jetty at Hazira", company: "Amma Lines" },
//   { id: 38, client: "M. Pallonji & Co. Pvt. Ltd.", title: "Dredging at Tata Electric Jetty at Trombay", company: "Amma Lines" },
//   { id: 39, client: "Larsen & Toubro Ltd.", title: "Dredging in river Tapti adjacent to Larsen & Toubro at Hazira", company: "Amma Lines" },
//   { id: 40, client: "Vikram Ispat Ltd.", title: "Dredging and Construction of Jetty at Revdanda", company: "Amma Lines" },
//   { id: 41, client: "Patel Engineering Co", title: "Dredging and Construction of Rock Bund for KHEP", company: "Amma Lines" },
//   { id: 42, client: "Jawaharlal Nehru Port Trust", title: "Dredging in the Lagoon Nehru Administration behind Bulk Berth at JNPT", company: "Amma Lines" },
//   { id: 43, client: "Hyundai Heavy Industries", title: "Trench Filling for ONGC", company: "Amma Lines" },
//   { id: 44, client: "Tamilnadu Electricity Board", title: "Dredging at Ennore for Tamilnadu Electricity Board", company: "Amma Lines" },
//   { id: 45, client: "BSES Ltd.", title: "Dredging in Dock basin and entrance channel for BSES Jetty at Dahanu", company: "Amma Lines" },
//   { id: 46, client: "Hindustan Petroleum Corp. Ltd", title: "Dredging for HPCL", company: "Amma Lines" },
//   { id: 47, client: "Dronagiri Prakalpagrast", title: "Dredging in soft strata for construction of wharf wall-I, II, III and channel", company: "Amma Lines" },
//   { id: 48, client: "Kirloskar Brothers Ltd.", title: "Underwater and open A/c.NPCIL excavation RAPP Kota, Rajasthan", company: "Amma Lines" },
//   { id: 49, client: "Maharashtra Maritime Board", title: "Dredging in the port of Dabhol, Varsova and Gorai", company: "Amma Lines" },

//   // --- CURRENT WORKS IN HAND (MEKA GROUP) ---
//   { id: 50, client: "Reliance Industries Limited.", title: "Installation of New Offshore (EDPL) HDPE Pipeline LSTK Contract at RIL - DMD, Dahej", company: "Meka Group" },
//   { id: 51, client: "Wabag Va Tech Ltd.", title: "Concrete anchor block fixing, launching offshore and sinking of Intake, Outfall for 400 MLD SWRO", company: "Meka Group" },
//   { id: 52, client: "McDermott Middle East Inc.", title: "North Field Expansion (NFXP) Project - Trenching and Backfilling Works - Qatar", company: "Meka Group" },

//   // --- MEKA DREDGING COMPANY PVT. LTD. ---
//   { id: 53, client: "M/s. Larsen & Toubro Ltd.", title: "Dredging & Reclamation in L&T West plot at Hazira, Surat-Phase-I, II, and III", company: "Meka Dredging" },
//   { id: 54, client: "M/s. Marg Limited", title: "Dredging and Reclamation works at Karaikal Port", company: "Meka Dredging" },
//   { id: 55, client: "Reliance Industries Ltd.", title: "Dredging and Reclamation works for Site development of PTA-10 at RIL, Hazira", company: "Meka Dredging" },
//   { id: 56, client: "M/s. Nagarjuna Oil Corp Ltd.", title: "Rental for Dredging, Clean up Operation, Maintainance of Ro-Ro jetty Cuddalore", company: "Meka Dredging" },
//   { id: 57, client: "Marshal Marine International", title: "Hire of Cutter Suction Dredger for Dredging & Reclamation at Cochin Naval Dock", company: "Meka Dredging" },
//   { id: 58, client: "Petronet LNG Limited", title: "Hire of Cutter Suction Dredger for Dredging Services at Kochi LNG Terminal", company: "Meka Dredging" },

//   // --- MEKA INFRASTRUCTURE PRIVATE LIMITED ---
//   { id: 59, client: "Adani Power Ltd., Udupi", title: "Design, Engineering, Manufacturing, Procurement, Testing Old/New Diffuser", company: "Meka Infra" },
//   { id: 60, client: "Cobratecton Pvt. Ltd.", title: "Design, Construction, Installation of Intake and Outfall system for 150 MLD Desalination", company: "Meka Infra" },
//   { id: 61, client: "L&T - Tecton JV Dahej", title: "Construction of Intake Channel & Outfall pipe works for 100 MLD SWRO Desalination", company: "Meka Infra" },
//   { id: 62, client: "McDermott International", title: "Provision of prelay trenching and backfilling services for KG- DWN 98/2 at Yanam", company: "Meka Infra" },
//   { id: 63, client: "Coastal Energen Limited", title: "2 x 600 MW Mutiara Thermal Power Project - Sea water Intake and Outfall offshore piping", company: "Meka Infra" },
//   { id: 64, client: "VA Tech WABAG Ltd.", title: "100 mld Disalination Plant of CMWSSB at Nemmeli - Intake and Outfall works", company: "Meka Infra" },
//   { id: 65, client: "Lanco Infratech Limited", title: "Installation & Commissioning of Intake & Outflow Submarine Pipline System at Udupi", company: "Meka Infra" }
// ];

// const CATEGORIES = ["All", "Amma Lines", "Meka Dredging", "Meka Infra", "Meka Group"];

// export default function ProjectsPage() {
//   const [filter, setFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [visibleCount, setVisibleCount] = useState(15);
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const { t } = useTranslation();

//   const containerRef = useRef(null);
//   const listRef = useRef(null);
//   const navBarRef = useRef(null);
//   const imageRevealRef = useRef(null);

//   // Set up GSAP quickTo for 60fps buttery smooth cursor tracking
//   const xTo = useRef(null);
//   const yTo = useRef(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Filter & Search Logic
//   const filteredProjects = PROJECTS_DATA.filter((p) => {
//     const matchesCategory = filter === "All" || p.company === filter;
//     const matchesSearch = 
//       p.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
//       p.title.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const displayedProjects = filteredProjects.slice(0, visibleCount);

//   useGSAP(() => {
//     // Initialize quickTo for mouse follow
//     xTo.current = gsap.quickTo(imageRevealRef.current, "x", { duration: 0.4, ease: "power3" });
//     yTo.current = gsap.quickTo(imageRevealRef.current, "y", { duration: 0.4, ease: "power3" });

//     const heroTl = gsap.timeline({ delay: 0.2 });

//     heroTl
//       .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
//       .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
//       .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.out" }, "-=0.8")
//       .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

//     // Sticky Nav Shadow
//     ScrollTrigger.create({
//       trigger: navBarRef.current,
//       start: "top top",
//       toggleClass: { targets: navBarRef.current, className: "shadow-[0_10px_30px_rgba(0,0,0,0.04)]" }
//     });

//     gsap.fromTo(".project-row", 
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out",
//         scrollTrigger: { trigger: listRef.current, start: "top 80%" }
//       }
//     );

//     // CTA
//     gsap.fromTo(".cta-text", { y: 40, opacity: 0 }, {
//       y: 0, opacity: 1, duration: 1, ease: "power3.out",
//       scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
//     });

//   }, { scope: containerRef });

//   // Animate changes when filter/search updates
//   useEffect(() => {
//     gsap.fromTo(".project-row", 
//       { opacity: 0, x: -10 },
//       { opacity: 1, x: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }
//     );
//   }, [filter, searchQuery, visibleCount]);

//   // Track Mouse Movement over the list
//   const handleMouseMove = (e) => {
//     if (xTo.current && yTo.current) {
//       xTo.current(e.clientX);
//       yTo.current(e.clientY);
//     }
//   };

//   // Determine which image to show (using your existing 4 images as placeholders cyclically)
//   const hoveredProjectImage = hoveredRowId 
//     ? `/projects/image${((hoveredRowId - 1) % 4) + 1}.png` 
//     : null;

//   return (
//     <>
//       <Helmet>
//         <title>Projects | Meka Group — 65+ Marine & Infrastructure Projects</title>
//         <meta name="description" content="Browse Meka Group's complete project archive spanning decades of marine construction, dredging, and heavy infrastructure development across India and Qatar." />
//       </Helmet>
//       <main
//         ref={containerRef} 
//         className="bg-[#f5f5f0] text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden relative"
//       >
//         {/* Floating Cursor Image Reveal Container */}
//         <div 
//           ref={imageRevealRef}
//           className={`pointer-events-none fixed top-0 left-0 z-50 w-64 md:w-80 aspect-[4/3] overflow-hidden rounded-sm shadow-2xl transition-all duration-300 ease-out origin-center ${
//             hoveredRowId ? "opacity-100 scale-100" : "opacity-0 scale-75"
//           }`}
//           style={{ transform: "translate(-50%, -50%)" }} // Center on cursor
//         >
//           {hoveredProjectImage && (
//             <img 
//               src={hoveredProjectImage} 
//               alt="Project Preview" 
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>

//         {/* ── Architectural Structural Line ── */}
//         <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

//         {/* ═══════════════════════════════════════
//             1. HERO (Editorial Layout)
//             ═══════════════════════════════════════ */}
//         <section className="hero-section relative w-full pt-48 pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[70vh]">
          
//           {/* Blueprint Grid */}
//           <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
//             style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

//           <div className="relative z-10 w-full max-w-[1600px] mx-auto">
//             <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
//               {t("projects.theArchive")}
//             </span>

//             <h1 className="text-[16vw] lg:text-[11vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-10">
//               <span className="block overflow-hidden py-5 -my-5">
//                 <span className="hero-word block">{t("projects.projectIndex")}</span>
//               </span>
//               <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
//                 <span className="hero-word block text-black/20">{t("projects.index")}</span>
//               </span>
//             </h1>

//             <div className="w-full max-w-xl lg:ml-[8vw]">
//               <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-8 origin-left" />
//               <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
//                 {t("projects.archiveDesc")}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════
//             2. COMMAND BAR (Search + Filter)
//             ═══════════════════════════════════════ */}
//         <div ref={navBarRef} className="sticky top-0 z-40 bg-[#f5f5f0]/90 backdrop-blur-xl border-y border-black/[0.05] transition-all duration-300">
//           <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-4 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
//             {/* Filter Tags */}
//             <div className="flex flex-wrap items-center gap-4 md:gap-6">
//               <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-black/30 mr-2">
//                 {t("projects.filter")}
//               </span>
//               {CATEGORIES.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => { setFilter(cat); setVisibleCount(15); }}
//                   className={`text-[10px] md:text-[11px] font-sans font-bold tracking-[0.15em] uppercase transition-all duration-300 px-5 py-2.5 border rounded-full ${
//                     filter === cat 
//                       ? "bg-[#0ea5a4] text-white border-[#0ea5a4]" 
//                       : "text-black/60 border-black/[0.08] hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full md:w-72">
//               <input 
//                 type="text" 
//                 placeholder={t("projects.searchPlaceholder")} 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-white border border-black/10 text-[#050505] text-[11px] md:text-xs font-sans tracking-wide py-3 px-5 rounded-full focus:outline-none focus:border-[#0ea5a4] transition-colors placeholder:text-gray-400 shadow-sm"
//               />
//               <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>

//           </div>
//         </div>

//         {/* ═══════════════════════════════════════
//             3. TYPOGRAPHIC PROJECT INDEX
//             ═══════════════════════════════════════ */}
//         <section 
//           ref={listRef} 
//           className="max-w-[1600px] mx-auto px-6 md:px-16 py-16 md:py-24 relative z-10"
//           onMouseMove={handleMouseMove} // Added mouse tracking here
//         >
          
//           {/* Table Header */}
//           <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-black/10 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 mb-4">
//             <div className="col-span-1">{t("projects.no")}</div>
//             <div className="col-span-3">{t("projects.client")}</div>
//             <div className="col-span-6">{t("projects.projectDetails")}</div>
//             <div className="col-span-2 text-right">{t("projects.entity")}</div>
//           </div>

//           {/* Project Rows */}
//           <div className="flex flex-col relative" onMouseLeave={() => setHoveredRowId(null)}>
//             {displayedProjects.map((project, index) => {
//               // Spotlight Effect Logic
//               const isHovered = hoveredRowId === project.id;
//               const isFaded = hoveredRowId !== null && !isHovered;

//               return (
//                 <div 
//                   key={project.id} 
//                   onMouseEnter={() => setHoveredRowId(project.id)}
//                   className={`project-row group grid grid-cols-1 md:grid-cols-12 gap-y-3 gap-x-6 py-8 md:py-10 border-b border-black/[0.05] transition-all duration-500 cursor-default ${
//                     isFaded ? "opacity-20 blur-[1px]" : "opacity-100 blur-0"
//                   } ${isHovered ? "bg-white/50 -mx-6 px-6 md:-mx-16 md:px-16 rounded-sm shadow-sm border-transparent" : ""}`}
//                 >
                  
//                   {/* Index Number */}
//                   <div className="hidden md:block col-span-1 font-serif text-lg text-black/20 group-hover:text-[#0ea5a4] transition-colors duration-300">
//                     {String(index + 1).padStart(3, '0')}
//                   </div>

//                   {/* Client Name */}
//                   <div className="col-span-3">
//                     <p className="text-sm md:text-base font-sans font-bold text-[#050505] group-hover:text-[#0ea5a4] group-hover:translate-x-2 transition-all duration-500">
//                       {project.client}
//                     </p>
//                   </div>
                  
//                   {/* Project Title */}
//                   <div className="col-span-6 pr-4">
//                     <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed group-hover:text-[#050505] transition-colors duration-300">
//                       {project.title}
//                     </p>
//                   </div>

//                   {/* Company Badge */}
//                   <div className="col-span-2 pt-3 md:pt-0 flex items-start md:items-center justify-between md:justify-end gap-6 overflow-hidden">
//                     <span className={`inline-block px-4 py-2 bg-white border border-black/10 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-black/60 transition-all duration-300 ${
//                       isHovered ? "border-[#0ea5a4]/30 text-[#0ea5a4] shadow-sm" : ""
//                     }`}>
//                       {project.company}
//                     </span>
//                   </div>

//                 </div>
//               );
//             })}
//           </div>
          
//           {/* Empty State */}
//           {filteredProjects.length === 0 && (
//             <div className="py-32 text-center">
//               <span className="text-black/20 text-4xl mb-4 block">∅</span>
//               <p className="text-black/40 text-[11px] font-bold tracking-[0.25em] uppercase">
//                 {t("projects.noResults")}
//               </p>
//             </div>
//           )}

//           {/* Load More Button */}
//           {visibleCount < filteredProjects.length && (
//             <div className="mt-20 text-center flex justify-center">
//               <button 
//                 onClick={() => setVisibleCount(prev => prev + 15)}
//                 className="group flex items-center gap-6 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-black/50 hover:text-[#0ea5a4] transition-colors"
//               >
//                 <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
//                 {t("projects.loadMore")} ({filteredProjects.length - visibleCount})
//                 <span className="w-12 h-px bg-black/10 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
//               </button>
//             </div>
//           )}
//         </section>

//         {/* ═══════════════════════════════════════
//             4. CTA SECTION
//             ═══════════════════════════════════════ */}
//         <section className="cta-section relative py-40 md:py-64 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] border-t border-black/[0.06]">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32vw] font-serif text-black/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
//             MEKA
//           </div>

//           <div className="cta-text max-w-4xl mx-auto text-center relative z-10">
//             <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
//               {t("projects.startAProject")}
//             </span>
//             <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-6 leading-[0.85]">
//               {t("projects.readyTo")}<br />
//               <span className="text-black/15">{t("projects.build")}</span>
//             </h2>
//             <p className="text-gray-600 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12">
//               {t("projects.readyToBuildDesc")}
//             </p>
//             <div className="flex flex-wrap justify-center gap-5">
//               <Link to="/contact"
//                 className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow">
//                 <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
//                 <span className="relative z-10">{t("projects.initiateConsultation")}</span>
//               </Link>
//             </div>
//           </div>
//         </section>

//       </main>
      
//       {/* FOOTER OUTSIDE MAIN */}
//       <Footer/>
//     </>
//   );
// }
// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)
// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)

// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)

// src/pages/ProjectsPage.jsx
//
// Requires: npm install react-leaflet leaflet
// (react-leaflet v4 for React 18 • v5 for React 19)

import { useState, useRef, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/layout/Footer";
import { useArchive } from "../hooks/useArchive";
import { useProjectsPage } from "../hooks/useProjectsPage";
import { loc } from "../lib/locale";

// Map
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ── Tokens ──
const INK    = "#050505";
const CREAM  = "#f5f5f0";
const ACCENT = "#0ea5a4";

// Image paths stay in code, keyed by archive entry slug. Mirrors
// MoreProjects.jsx's ARCHIVE_IMAGES — adding a new slug in Sanity needs a
// matching entry here + a file under /public/more_projects/.
const ARCHIVE_IMAGES = {
  nhava_sheva:         "/more_projects/nhava_sheva.jpg",
  government_of_gujrat: "/more_projects/government_of_gujrat.jpg",
  marg_limited:        "/more_projects/marg_limited.jpg",
  krishak:             "/more_projects/krishak.jpg",
  madras_port:         "/more_projects/madras_port.jpg",
  vikram_ispat:        "/more_projects/vikram_ispat.jpg",
  jnpt:                "/more_projects/jnpt.jpg",
  landt:               "/more_projects/landt.jpg",
  bmc:                 "/more_projects/bmc.jpg",
  urmila:              "/more_projects/urmila.jpg",
};

const REGION_BOUNDS = [
  [4.0, 45.0],   // SW
  [30.0, 90.0],  // NE
];

// ──────────────────────────────────────────────────────────────
//  MARKERS — built ONCE at module scope
// ──────────────────────────────────────────────────────────────
const makeIcon = (isActive) =>
  L.divIcon({
    className: "meka-marker",
    html: `
      <span class="meka-dot ${isActive ? "is-active" : ""}"></span>
      ${isActive ? '<span class="meka-ring" aria-hidden="true"></span>' : ""}
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

const ICON_INACTIVE = makeIcon(false);
const ICON_ACTIVE   = makeIcon(true);

// ──────────────────────────────────────────────────────────────
//  MAP HELPERS
// ──────────────────────────────────────────────────────────────

// invalidateSize on container resize, coalesced via rAF so rapid
// events (mobile URL bar hide/show, layout shifts) become one relayout.
function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const el = map.getContainer();
    map.invalidateSize();
    let rafId = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => map.invalidateSize());
    });
    ro.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [map]);
  return null;
}

// Mobile: instant setView/fitBounds (no camera animation).
// Desktop: flyTo/flyToBounds for polish.
function MapController({ selectedProject, isMobile }) {
  const map = useMap();
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      if (!selectedProject) return;
    }
    if (selectedProject) {
      const target = [selectedProject.lat, selectedProject.lng];
      if (isMobile) {
        map.setView(target, 7, { animate: false });
      } else {
        map.flyTo(target, 7, { duration: 1.1, easeLinearity: 0.25 });
      }
    } else {
      if (isMobile) {
        map.fitBounds(REGION_BOUNDS, { padding: [24, 24], animate: false });
      } else {
        map.flyToBounds(REGION_BOUNDS, { duration: 1.2, padding: [24, 24] });
      }
    }
  }, [selectedProject, map, isMobile]);
  return null;
}

// ──────────────────────────────────────────────────────────────
//  MAIN
// ──────────────────────────────────────────────────────────────
export default function ProjectsMapPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const archive = useArchive();
  const page = useProjectsPage();

  // Resolve archive entries into the shape the map needs, dropping any
  // entry without lat/lng (those exist only in the home Archive list and
  // shouldn't get a marker).
  const projects = useMemo(
    () =>
      archive.entries
        .filter((e) => typeof e.lat === "number" && typeof e.lng === "number")
        .map((e, i) => ({
          id: e.slug || String(i),
          slug: e.slug,
          year: e.year,
          client: e.name,
          title: loc(e.title, lang) || e.name,
          company: loc(e.category, lang),
          location: loc(e.location, lang),
          lat: e.lat,
          lng: e.lng,
          image: ARCHIVE_IMAGES[e.slug] || "",
          desc: loc(e.description, lang),
        })),
    [archive.entries, lang]
  );

  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef      = useRef(null);
  const detailsBoxRef     = useRef(null);
  const detailsContentRef = useRef(null);

  // One-shot: detect mobile, mark mounted, scroll to top.
  // Both state updates are batched in React 18 — a single re-render.
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.matchMedia) {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    }
    setMounted(true);
  }, []);

  // Mobile: bring details into view after selection.
  useEffect(() => {
    if (!selectedProject || !detailsBoxRef.current || !isMobile) return;
    const timer = window.setTimeout(() => {
      const rect = detailsBoxRef.current.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.scrollY - 80,
        behavior: "smooth",
      });
    }, 140);
    return () => window.clearTimeout(timer);
  }, [selectedProject, isMobile]);

  // Mount animation — desktop only. On mobile we skip it (GSAP intros
  // are the most common source of jank on low-end Android during hydration).
  useGSAP(
    () => {
      if (!mounted || isMobile) return;
      gsap.fromTo(
        ".split-col",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );
    },
    { scope: containerRef, dependencies: [mounted, isMobile] }
  );

  // Selection stagger — also desktop only.
  useGSAP(
    () => {
      if (isMobile || !selectedProject || !detailsContentRef.current) return;
      gsap.fromTo(
        detailsContentRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: "power2.out" }
      );
    },
    { scope: containerRef, dependencies: [selectedProject, isMobile] }
  );

  return (
    <>
      <Helmet>
        <title>Projects Portfolio | Meka Group</title>
        <meta
          name="description"
          content="Explore Meka Group's global marine, dredging, and heavy infrastructure projects via our interactive portfolio map."
        />
      </Helmet>

      <main
        ref={containerRef}
        className="w-full min-h-screen bg-[#f5f5f0] pt-28 md:pt-36 pb-20 px-5 md:px-10 lg:px-12 flex flex-col selection:bg-[#0ea5a4] selection:text-white"
      >
        {/* HEADER */}
        <div className="w-full max-w-[1600px] mx-auto mb-8 md:mb-14">
          <span className="block text-[#0ea5a4] text-[10px] font-sans tracking-[0.4em] uppercase font-bold mb-4">
            {loc(page.eyebrow, lang)}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tighter leading-[0.85] text-[#050505]">
            {loc(page.title, lang)}
          </h1>
          <div className="mt-6 md:mt-10 flex items-start gap-5">
            <div className="w-10 h-px bg-black/20 mt-3 shrink-0" aria-hidden="true" />
            <p className="text-sm md:text-base text-black/60 font-sans leading-relaxed max-w-lg font-medium">
              {loc(page.description, lang)}
            </p>
          </div>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-stretch">

          {/* LEFT — MAP. Lighter shadow on mobile (shadow-md), full on md+. */}
          <div className="split-col relative w-full h-[420px] sm:h-[480px] lg:h-[clamp(500px,calc(100dvh_-_14rem),740px)] bg-white rounded-[1.25rem] shadow-md md:shadow-xl md:shadow-black/[0.04] border border-white overflow-hidden order-1">
            {mounted ? (
              <MapContainer
                bounds={REGION_BOUNDS}
                maxBounds={REGION_BOUNDS}
                maxBoundsViscosity={1.0}
                minZoom={4}
                maxZoom={isMobile ? 10 : 12}
                zoomControl={false}
                scrollWheelZoom={false}
                tap={false}                     // kill Leaflet's legacy 300ms tap shim
                fadeAnimation={!isMobile}       // skip tile fade-in on mobile
                markerZoomAnimation={!isMobile} // skip marker zoom morph on mobile
                className="w-full h-full z-0"
                style={{ background: "#eaeae3" }}
              >
                <TileLayer
                  // Non-retina tiles on mobile — roughly 4× less pixel data.
                  url={
                    isMobile
                      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  }
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  subdomains="abcd"
                  updateWhenIdle={isMobile}     // only load tiles when pan stops
                  updateWhenZooming={!isMobile} // skip mid-zoom tile updates on mobile
                  keepBuffer={isMobile ? 1 : 2} // tighter offscreen prefetch on mobile
                />
                <MapResizeHandler />
                <MapController selectedProject={selectedProject} isMobile={isMobile} />

                {projects.map((project) => (
                  <Marker
                    key={project.id}
                    position={[project.lat, project.lng]}
                    icon={selectedProject?.id === project.id ? ICON_ACTIVE : ICON_INACTIVE}
                    title={`${project.client} — ${project.title}`}
                    keyboard
                    eventHandlers={{
                      click: () => setSelectedProject(project),
                    }}
                  />
                ))}
              </MapContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#eaeae3]">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-black/40 font-bold">
                  {loc(page.loadingLabel, lang)}
                </span>
              </div>
            )}

            {/* Legend — solid bg, no backdrop-blur (expensive on mobile GPUs) */}
            <div
              aria-hidden="true"
              className="absolute top-4 left-4 z-[400] flex items-center gap-2 bg-white border border-black/[0.06] px-3 py-1.5 rounded-full shadow-sm pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#0ea5a4]" />
              <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-black/60 font-bold">
                {projects.length} {loc(page.deploymentsLabel, lang)}
              </span>
            </div>

            {selectedProject && (
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-[400] bg-white px-5 py-2.5 rounded-full text-[9px] uppercase tracking-[0.25em] font-bold text-black/55 shadow-md border border-black/5 hover:text-[#0ea5a4] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]"
              >
                {loc(page.resetMapLabel, lang)}
              </button>
            )}
          </div>

          {/* RIGHT — DETAILS */}
          <div
            ref={detailsBoxRef}
            className="split-col relative w-full min-h-[420px] sm:min-h-[480px] lg:h-[clamp(500px,calc(100dvh_-_14rem),740px)] bg-white rounded-[1.25rem] shadow-md md:shadow-xl md:shadow-black/[0.04] border border-white overflow-hidden order-2 flex flex-col"
          >
            {selectedProject ? (
              <div
                ref={detailsContentRef}
                className="flex flex-col h-full p-6 md:p-10 overflow-y-auto custom-scrollbar"
              >
                <div>
                  <span className="inline-block px-4 py-1.5 bg-[#f5f5f0] border border-black/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-[#0ea5a4] mb-5 shadow-sm">
                    {selectedProject.company}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-[2.25rem] font-serif text-[#050505] leading-[1.1] tracking-tight mb-5 break-words">
                  {selectedProject.title}
                </h2>

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/[0.06]">
                  <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-black/40 shrink-0">
                    {loc(page.clientLabel, lang)}
                  </span>
                  <span className="text-[11px] font-sans font-bold tracking-[0.1em] text-[#050505] min-w-0 truncate">
                    {selectedProject.client}
                  </span>
                </div>

                {/* Image: transition-transform only above md (no hover on touch anyway) */}
                <div className="aspect-[4/3] w-full max-w-[380px] mx-auto bg-zinc-100 rounded-xl overflow-hidden mb-6 relative group shrink-0">
                  {selectedProject.image && (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                      className="w-full h-full object-cover md:transition-transform md:duration-700 md:group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                </div>

                <p className="text-sm md:text-[15px] font-sans text-black/60 leading-relaxed mb-8 font-medium">
                  {selectedProject.desc}
                </p>

                <div className="pt-5 border-t border-black/[0.06] mt-auto">
                  <Link
                    to="/contact"
                    className="group flex items-center justify-between w-full py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#050505] group-hover:text-[#0ea5a4] transition-colors">
                      {loc(page.ctaLabel, lang)}
                    </span>
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-black/20 group-hover:text-[#0ea5a4] group-hover:translate-x-1 transition-[color,transform]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#f7f5ee]">
                <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(#050505 1px, transparent 1px), linear-gradient(90deg, #050505 1px, transparent 1px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                  <div className="relative w-14 h-14 rounded-full bg-white shadow-md border border-black/5 flex items-center justify-center z-10">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-[#0ea5a4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-[#050505] mb-3 tracking-tight">
                  {loc(page.emptyTitle, lang)}
                </h3>
                <p className="text-[13px] font-sans text-black/50 max-w-[260px] leading-relaxed font-medium">
                  {loc(page.emptyDescription, lang)}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        /* Reset Leaflet's div-icon chrome */
        .meka-marker {
          background: transparent !important;
          border: 0 !important;
          pointer-events: auto;
        }

        .meka-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 14px;
          height: 14px;
          margin: -7px 0 0 -7px;
          background: ${ACCENT};
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
          transition: width 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      height 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      margin 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
                      background-color 200ms ease;
        }
        .meka-dot.is-active {
          width: 22px;
          height: 22px;
          margin: -11px 0 0 -11px;
          background: ${INK};
        }
        .meka-marker:hover .meka-dot {
          transform: scale(1.08);
        }
        .meka-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 30px;
          height: 30px;
          margin: -15px 0 0 -15px;
          border-radius: 50%;
          border: 1.5px solid ${ACCENT};
          opacity: 0.6;
          animation: meka-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          pointer-events: none;
          will-change: transform, opacity;
        }
        @keyframes meka-ping {
          0%   { transform: scale(1);   opacity: 0.7; }
          80%  { transform: scale(1.8); opacity: 0;   }
          100% { transform: scale(1.8); opacity: 0;   }
        }

        /* Kill marker animations on small viewports — saves compositor work */
        @media (max-width: 767px) {
          .meka-dot  { transition: none; }
          .meka-ring { animation: none; opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .meka-ring { animation: none; opacity: 0.6; }
          .meka-dot  { transition: none; }
          .meka-marker:hover .meka-dot { transform: none; }
        }

        .leaflet-container {
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          background: #eaeae3;
        }
        .leaflet-control-attribution {
          background: rgba(245, 245, 240, 0.85) !important;
          font-size: 10px !important;
          color: rgba(0, 0, 0, 0.5) !important;
        }
        .leaflet-control-attribution a { color: ${ACCENT} !important; }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <Footer />
    </>
  );
}
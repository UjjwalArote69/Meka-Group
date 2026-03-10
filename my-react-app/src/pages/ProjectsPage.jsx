import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from '../components/Footer'

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
  const [hoveredRowId, setHoveredRowId] = useState(null); // Used for "Spotlight Effect"
  
  const containerRef = useRef(null);
  const listRef = useRef(null);

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
    gsap.from(".projects-title span", {
      y: 150,
      skewY: 7,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.fromTo(".project-row", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    gsap.fromTo(".project-row", 
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, stagger: 0.03, duration: 0.4, ease: "power2.out" }
    );
  }, [filter, searchQuery, visibleCount]);

  return (
    <main 
      ref={containerRef} 
      className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#0ea5a4]"
    >
      {/* --- HERO --- */}
      <section className="relative pt-40 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="overflow-hidden">
            <h1 className="projects-title text-[15vw] md:text-[8vw] font-serif leading-[0.85] uppercase tracking-tighter pt-5">
              <span className="block">Project</span>
              <span className="block text-gray-700">Index</span>
            </h1>
          </div>
          <div className="max-w-xs mb-4">
            <p className="text-gray-400 text-sm leading-relaxed border-l border-[#0ea5a4] pl-4">
              A precise architectural archive of our engineering defiance spanning decades of maritime and infrastructure development.
            </p>
          </div>
        </div>
      </section>

      {/* --- COMMAND BAR (Search + Filter) --- */}
      <nav className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-y border-white/5 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold">Filter By</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setVisibleCount(15);
                }}
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

          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search clients or projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-xs py-2 px-4 rounded-full focus:outline-none focus:border-[#0ea5a4] transition-colors placeholder:text-gray-600"
            />
          </div>

        </div>
      </nav>

      {/* --- TYPOGRAPHIC PROJECT INDEX --- */}
      <section ref={listRef} className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-6 pb-6 border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">
          <div className="col-span-1">No.</div>
          <div className="col-span-3">Client</div>
          <div className="col-span-5">Project Details</div>
          <div className="col-span-3 text-right">Entity</div>
        </div>

        {/* Project Rows */}
        <div className="flex flex-col relative" onMouseLeave={() => setHoveredRowId(null)}>
          {displayedProjects.map((project, index) => {
            // Determine opacity based on spotlight hover state
            const isHovered = hoveredRowId === project.id;
            const isFaded = hoveredRowId !== null && !isHovered;

            return (
              <div 
                key={project.id} 
                onMouseEnter={() => setHoveredRowId(project.id)}
                className={`project-row group grid grid-cols-1 md:grid-cols-12 gap-y-2 gap-x-6 py-8 border-b border-white/10 transition-all duration-500 cursor-default ${
                  isFaded ? "opacity-30 blur-[1px]" : "opacity-100 blur-0"
                }`}
              >
                
                {/* Index Number */}
                <div className="hidden md:block col-span-1 text-gray-600 font-mono text-sm group-hover:text-[#0ea5a4] transition-colors duration-300">
                  {String(index + 1).padStart(3, '0')}
                </div>

                {/* Client Name */}
                <div className="col-span-3">
                  <p className="text-sm md:text-base font-semibold text-gray-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-500">
                    {project.client}
                  </p>
                </div>
                
                {/* Project Title */}
                <div className="col-span-5 pr-4">
                  <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {project.title}
                  </p>
                </div>

                {/* Company & Animated Arrow */}
                <div className="col-span-3 pt-2 md:pt-0 flex items-start md:items-center justify-between md:justify-end gap-6 overflow-hidden">
                  <span className="inline-block px-3 py-1 bg-transparent border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-gray-500 group-hover:border-[#0ea5a4]/50 group-hover:text-[#0ea5a4] transition-all duration-300">
                    {project.company}
                  </span>
                  
                  {/* Sliding Arrow Indicator */}
                  <div className="text-[#0ea5a4] opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out hidden md:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
        
        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-gray-500 text-sm tracking-widest uppercase">
            No projects match your search criteria.
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="mt-16 text-center flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 15)}
              className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
            >
              <span className="w-16 h-[1px] bg-gray-700 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
              Load More ({filteredProjects.length - visibleCount})
              <span className="w-16 h-[1px] bg-gray-700 group-hover:bg-[#0ea5a4] transition-colors duration-500"></span>
            </button>
          </div>
        )}
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Abstract background grid for the CTA to give it depth */}
        <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif uppercase mb-8">Ready to Build?</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-sm leading-relaxed">
            Partner with us to engineer solutions that redefine the boundaries of maritime and heavy infrastructure.
          </p>
          <button className="px-12 py-5 bg-white text-black uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#0ea5a4] hover:text-white transition-all duration-500 rounded-full">
            Initiate Consultation
          </button>
        </div>
      </section>

        <Footer/>
    </main>
  );
}
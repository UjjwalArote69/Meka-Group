import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const OPENINGS = [
  {
    id: "01",
    title: "Marine Project Engineer",
    department: "Marine Construction",
    location: "Mumbai, India",
    type: "Full-time",
  },
  {
    id: "02",
    title: "Dredging Operations Manager",
    department: "Dredging & Reclamation",
    location: "Mumbai, India",
    type: "Full-time",
  },
  {
    id: "03",
    title: "Structural Design Engineer",
    department: "Heavy Engineering",
    location: "Mumbai, India",
    type: "Full-time",
  },
  {
    id: "04",
    title: "Port Development Analyst",
    department: "India Ports",
    location: "Rewas, India",
    type: "Full-time",
  },
  {
    id: "05",
    title: "Safety & Compliance Officer",
    department: "Operations",
    location: "Mumbai, India",
    type: "Full-time",
  },
];

export default function CareersPage() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl
        .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
        .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, "-=1.0")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      gsap.utils.toArray(".role-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%" },
          }
        );
      });

      gsap.fromTo(".cta-text", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".cta-section", start: "top 75%" },
      });
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef} className="bg-[#f5f5f0] min-h-screen text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden">
      {/* ═══════════════════════════════════════
          1. HERO
          ═══════════════════════════════════════ */}
      <section className="hero-section relative w-full pt-48 pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[70vh]">
        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
            Join the Legacy
          </span>

          <h1 className="text-[16vw] lg:text-[11vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-10">
            <span className="block overflow-hidden py-5 -my-5">
              <span className="hero-word block">Build</span>
            </span>
            <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
              <span className="hero-word block text-black/20">With Us</span>
            </span>
          </h1>

          <div className="w-full max-w-xl lg:ml-[8vw]">
            <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-8 origin-left" />
            <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
              Four decades of engineering excellence. Join a team that reshapes coastlines, builds tomorrow's infrastructure, and engineers resilience into every project.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. WHY MEKA
          ═══════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-16 border-t border-black/[0.06]">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-8 block">
            Why Meka Group
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { title: "Legacy of Excellence", desc: "45+ years of pioneering marine construction and coastal infrastructure across India and beyond." },
              { title: "Diverse Opportunities", desc: "Nine specialized companies spanning marine, dredging, ports, infrastructure, real estate, and consulting." },
              { title: "Growth & Impact", desc: "Work on landmark projects that shape India's coastline and infrastructure for generations to come." },
            ].map((item, i) => (
              <div key={i} className="role-row">
                <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-tight text-[#050505] mb-4">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          3. OPEN POSITIONS
          ═══════════════════════════════════════ */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-16 border-t border-black/[0.06]">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-12 block">
            Open Positions
          </span>

          <div className="flex flex-col">
            {OPENINGS.map((role) => (
              <div
                key={role.id}
                className="role-row group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black/[0.06] hover:border-[#0ea5a4]/30 transition-colors duration-500 cursor-pointer"
              >
                <div className="flex items-start md:items-center gap-6 md:gap-10 mb-4 md:mb-0">
                  <span className="text-sm font-serif text-black/20 group-hover:text-[#0ea5a4] transition-colors duration-300 pt-1 md:pt-0">
                    {role.id}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif uppercase tracking-tight text-[#050505] group-hover:text-[#0ea5a4] transition-colors duration-300 mb-1">
                      {role.title}
                    </h3>
                    <p className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-black/40">
                      {role.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-10 pl-16 md:pl-0">
                  <span className="text-[10px] font-sans font-bold tracking-[0.15em] uppercase text-black/40">
                    {role.location}
                  </span>
                  <span className="text-[10px] font-sans font-bold tracking-[0.15em] uppercase text-black/40 bg-white px-4 py-2 border border-black/[0.08] rounded-full">
                    {role.type}
                  </span>
                  <svg className="w-5 h-5 text-[#0ea5a4] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          4. CTA
          ═══════════════════════════════════════ */}
      <section className="cta-section relative py-40 md:py-64 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] border-t border-black/[0.06]">
        <div className="cta-text max-w-[1600px] mx-auto text-center flex flex-col items-center">
          <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-6 block">
            Don't see your role?
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-tighter leading-[0.9] text-[#050505] mb-12 max-w-4xl">
            Send us your resume
          </h2>
          <Link
            to="/contact"
            className="group relative px-10 md:px-12 py-4 bg-[#050505] text-white text-[10px] tracking-[0.3em] uppercase font-bold overflow-hidden rounded-sm shadow-xl hover:shadow-2xl transition-shadow"
          >
            <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="relative z-10">Get in Touch</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

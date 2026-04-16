import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const pageRef = useRef(null);
  const location = useLocation();

  // ── ROUTING: Scroll to Hash IDs (e.g., #values) ──
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useGSAP(() => {
    // 1. HERO ANIMATIONS
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-img-wrapper",
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.6, ease: "power4.inOut" }
    )
    .fromTo(".hero-bg-img", 
      { scale: 1.3, filter: "blur(8px)" }, 
      { scale: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" },
      "-=1.6"
    )
    .fromTo(".hero-subtitle",
      { y: "100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=1.2"
    )
    .fromTo(".hero-title-word",
      { y: "110%", opacity: 0, rotateX: -20 }, 
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" },
      "-=1.0"
    )
    .fromTo(".hero-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(".hero-desc",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(".hero-accent-box",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "back.out(1.5)" },
      "-=0.6"
    );

    // Hero Image Parallax on Scroll
    gsap.to(".hero-bg-img", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: { 
        trigger: ".hero-section", 
        start: "top top", 
        end: "bottom top", 
        scrub: true 
      }
    });

    // 2. SCROLL-SCRUB TEXT REVEAL
    const revealLines = gsap.utils.toArray(".reveal-text");
    revealLines.forEach((line) => {
      gsap.to(line, {
        color: "#000000",
        scrollTrigger: {
          trigger: line,
          start: "top 75%",
          end: "bottom 55%",
          scrub: true,
        }
      });
    });

    // 3. STAT COUNTERS
    const counters = gsap.utils.toArray(".stat-number");
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute("data-target"));
      gsap.fromTo(counter, 
        { innerText: 0 }, 
        { 
          innerText: target, 
          duration: 2, 
          ease: "power2.out",
          snap: { innerText: 1 }, 
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
          },
          onUpdate: function() {
            counter.innerText = Math.ceil(this.targets()[0].innerText);
          }
        }
      );
    });

  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="bg-[#f5f5f0] min-h-screen text-[#050505] w-full overflow-x-hidden selection:bg-[#0ea5a4] selection:text-white">

      {/* --- 1. HERO SECTION --- */}
      <section id="about" className="hero-section relative w-full min-h-screen pt-32 md:pt-40 pb-20 px-6 md:px-12 flex items-center overflow-hidden bg-[#f5f5f0]">
        
        {/* Subtle Engineering Grid Background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '4rem 4rem' 
          }}
        ></div>

        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center z-10 relative">

          {/* Left: Typography */}
          <div className="lg:col-span-7 flex flex-col z-20">
            <div className="overflow-hidden mb-6 md:mb-8">
              <span className="hero-subtitle block text-[#0ea5a4] text-xs md:text-sm font-sans tracking-[0.4em] uppercase font-bold">
                The Meka Group Story
              </span>
            </div>

<h1 className="text-[14vw] lg:text-[8.5vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply">
              <span className="overflow-hidden block py-5 -my-5">
                <span className="hero-title-word block">Forging</span>
              </span>
              <span className="overflow-hidden block py-5 -my-5 ml-[8vw] lg:ml-[4vw]">
                <span className="hero-title-word block text-black/25">The</span>
              </span>
              <span className="overflow-hidden block py-5 -my-5">
                <span className="hero-title-word block">Future</span>
              </span>
            </h1>

            <div className="mt-12 md:mt-16 w-full max-w-md ml-0 lg:ml-[4vw]">
              <div className="w-12 h-[2px] bg-[#0ea5a4] mb-6 hero-line origin-left"></div>
              <p className="hero-desc text-base md:text-lg text-gray-700 font-sans leading-relaxed">
                Decades of maritime engineering excellence. We reshape coastlines, build tomorrow's infrastructure, and engineer resilience into every project.
              </p>
            </div>
          </div>

          {/* Right: Layered Image Container */}
          <div className="lg:col-span-5 relative mt-12 lg:mt-0 lg:-ml-12 z-10">
            {/* FIX: ".jgp" → ".jpg" */}
            <div className="hero-img-wrapper w-full aspect-[4/5] md:aspect-square lg:aspect-[3/4] overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.15)] relative bg-zinc-200">
              <div 
                className="hero-bg-img absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: "url('/about_page.jpg')" }} 
              />
            </div>

            {/* Floating Accent Box */}
            <div className="hero-accent-box absolute -bottom-8 -left-8 md:-left-12 bg-white p-6 md:p-8 shadow-2xl rounded-sm border border-black/5 max-w-[200px] md:max-w-[240px] z-20 hidden sm:block">
              <span className="text-[#0ea5a4] text-4xl md:text-5xl font-serif block mb-2 leading-none">45+</span>
              <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-gray-500 font-bold leading-relaxed block">
                Years of Excellence
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* --- 2. TEXT REVEAL --- */}
      <section className="relative z-10 py-24 md:py-40 px-6 md:px-12 max-w-6xl mx-auto flex justify-start md:justify-end">
        <div className="w-full md:w-[85%]">
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.3] md:leading-[1.2] tracking-tight">
            <span className="reveal-text text-black/10">Since our inception, Meka Group has stood at the vanguard of maritime engineering. </span>
            <span className="reveal-text text-black/10">We do not just build infrastructure; we engineer resilience. </span>
            <span className="reveal-text text-black/10">From complex dredging operations to massive fleet logistics, </span>
            <span className="reveal-text text-black/10">our legacy is written in the deep waters and towering ports across the subcontinent.</span>
          </p>
        </div>
      </section>

      {/* --- 3. STATS --- */}
      <section className="stats-section relative z-10 py-20 md:py-32 bg-[#f0f0e8] border-y border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-20">
          <div className="w-full h-px bg-black/10 mb-16 md:mb-24"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-8 md:gap-x-6">
            {[
              { label: "Years of Excellence", target: "45", suffix: "+" },
              { label: "Vessels in Fleet", target: "25", suffix: "+" },
              { label: "Major Projects", target: "25", suffix: "+" },
              { label: "Global Partners", target: "10", suffix: "" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left border-l-0 md:border-l border-black/10 md:pl-8 first:border-0 first:pl-0">
                <div className="text-6xl md:text-7xl lg:text-8xl font-serif text-[#050505] mb-4 flex items-baseline">
                  <span className="stat-number" data-target={stat.target}>0</span>
                  <span className="text-[#0ea5a4]">{stat.suffix}</span>
                </div>
                <span className="text-[11px] md:text-xs font-sans tracking-[0.2em] uppercase text-gray-500 font-bold max-w-[120px] md:max-w-none">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. BOARD OF DIRECTORS --- */}
      <section id="board" className="py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 gap-8">
          <div className="max-w-3xl">
            <span className="text-[#0ea5a4] text-xs font-sans tracking-[0.3em] uppercase mb-6 block font-bold">Leadership</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505]">Board of Directors</h2>
          </div>
          <p className="max-w-sm text-gray-600 font-sans text-base leading-relaxed md:pb-3">
            Guided by decades of experience, our leadership team steers Meka Group toward sustainable growth and engineering excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {[
            { name: "Dr. Meka Vijay Paparao", role: "Chairman and Managing Director", img: "/directors/drmekapaparao.jpeg" },
            { name: "Hemanth Meka Rao", role: "Group CEO & Director", img: "/directors/hemantrao.png" },
            { name: "M. Rajyalakshmi Rao", role: "Co-Founder & Director", img: "/directors/mrsrajyalaskhmirao.jpg" }
          ].map((person, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-zinc-200 mb-8 rounded-sm shadow-xl">
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[800ms] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif uppercase text-[#050505] leading-tight mb-3 group-hover:text-[#0ea5a4] transition-colors duration-300">
                {person.name}
              </h3>
              <p className="text-gray-500 text-[11px] font-sans font-bold tracking-[0.2em] uppercase">
                {person.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. OUR VALUES --- */}
      <section id="values" className="py-32 md:py-48 px-6 md:px-12 bg-white border-y border-black/5">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          <div className="lg:w-1/3">
            <div className="sticky top-40">
              <span className="text-[#0ea5a4] text-xs font-sans tracking-[0.3em] uppercase mb-6 block font-bold">Core Principles</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-tighter text-[#050505] mb-8 leading-[0.9]">
                Our<br/>Values
              </h2>
              <div className="w-12 h-px bg-black/20 mb-8"></div>
              <p className="text-base text-gray-600 font-sans leading-relaxed max-w-sm">
                These foundational pillars govern every project we undertake, every partnership we build, and every decision we make across our global operations.
              </p>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16 md:gap-y-24">
            {[
              { title: "Safety First", desc: "Uncompromising commitment to the health and safety of our workforce, partners, and the communities we operate in." },
              { title: "Resilience", desc: "Engineering infrastructure that withstands the test of time and the harshest marine environments." },
              { title: "Innovation", desc: "Leveraging cutting-edge technology and advanced engineering methods to solve complex maritime challenges." },
              { title: "Integrity", desc: "Upholding the highest standards of transparency, honesty, and ethics in all global operations." },
              { title: "Sustainability", desc: "Deeply committed to minimizing our environmental footprint and protecting delicate marine ecosystems." },
              { title: "Excellence", desc: "Delivering superior quality, precision, and craftsmanship in every project, no matter the scale." },
              { title: "Collaboration", desc: "Fostering strong partnerships and seamless teamwork to achieve extraordinary, large-scale outcomes." },
              { title: "Accountability", desc: "Taking full ownership of our actions, decisions, and the long-term success of our infrastructure builds." },
              { title: "Empowerment", desc: "Investing heavily in our people, nurturing talent, and encouraging decisive leadership at every organizational level." }
            ].map((val, i) => (
              <div key={i} className="relative pt-8 border-t border-black/10 group transition-all duration-300 hover:border-[#0ea5a4]">
                <span className="absolute -top-3.5 left-0 bg-white pr-4 text-[#0ea5a4] text-sm font-sans tracking-[0.2em] font-bold block transition-transform duration-300 group-hover:-translate-y-1">
                  0{i+1}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif uppercase text-[#050505] mb-4 mt-2">
                  {val.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* --- 7. FOOTER --- */}
      <div className="relative z-30">
        <Footer />
      </div>

    </main>
  );
}
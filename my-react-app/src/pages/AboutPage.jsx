import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const pageRef = useRef(null);
  const horizontalRef = useRef(null);
  const horizontalWrapperRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // 1. HERO ANIMATIONS
    const tl = gsap.timeline();
    tl.fromTo(".hero-bg-img", 
      { scale: 1.4, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    )
    .fromTo(".hero-title-word",
      { y: "110%", opacity: 0, rotateX: -20 }, // Increased y offset and reduced rotation for cleaner entry
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: "power4.out" },
      "-=1.5"
    );

    gsap.to(".hero-content", {
      yPercent: 30,
      opacity: 0,
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
        color: "#ffffff",
        scrollTrigger: {
          trigger: line,
          start: "top 90%",
          end: "bottom 70%",
          scrub: true,
        }
      });
    });

    // 3. IMPROVED HORIZONTAL SCROLL (Fixed Cropping)
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      // Calculate the exact distance to move
      const totalWidth = horizontalRef.current.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;

      gsap.to(horizontalRef.current, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalWrapperRef.current,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, 
          // Adding a small padding to the end of the scroll
          end: () => "+=" + (amountToScroll + (isDesktop ? 200 : 100)),
        }
      });
    });

    // 4. STAT COUNTERS
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
    <main ref={pageRef} className="bg-[#050505] min-h-screen text-white w-full overflow-x-hidden selection:bg-[#0ea5a4]">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="hero-section relative w-full h-[90vh] md:h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="hero-bg-img absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/frames/frame_0001.webp')" }} 
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/40 to-transparent"></div> 
        </div>
        
        <div className="hero-content relative z-10 flex flex-col items-start w-full max-w-7xl mx-auto">
          <span className="text-[#0ea5a4] text-[10px] md:text-sm font-sans tracking-[0.4em] uppercase mb-4 md:mb-10">
            The Meka Group Story
          </span>
          {/* Added py-4 and -my-4 to allow room for descenders/ascenders without cropping */}
          <h1 className="text-[15vw] md:text-[10vw] font-serif uppercase tracking-tighter leading-[0.85] flex flex-wrap gap-x-3 md:gap-x-8">
            <span className="overflow-hidden py-5 -my-4">
              <span className="hero-title-word block">Forging</span>
            </span>
            <span className="overflow-hidden py-5 -my-4">
              <span className="hero-title-word block text-gray-400">The</span>
            </span>
            <span className="overflow-hidden py-5 -my-4">
              <span className="hero-title-word block">Future</span>
            </span>
          </h1>
        </div>
      </section>

      {/* --- 2. TEXT REVEAL --- */}
      <section className="relative z-10 py-20 md:py-40 px-6 md:px-12 max-w-6xl mx-auto flex justify-start md:justify-end">
        <div className="w-full md:w-3/4">
          <p className="text-2xl md:text-5xl lg:text-6xl font-serif leading-[1.3] md:leading-[1.2] tracking-tight">
            <span className="reveal-text text-zinc-800">Since our inception, Meka Group has stood at the vanguard of maritime engineering. </span>
            <span className="reveal-text text-zinc-800">We do not just build infrastructure; we engineer resilience. </span>
            <span className="reveal-text text-zinc-800">From complex dredging operations to massive fleet logistics, </span>
            <span className="reveal-text text-zinc-800">our legacy is written in the deep waters and towering ports across the subcontinent.</span>
          </p>
        </div>
      </section>

      {/* --- 3. STATS --- */}
      <section className="stats-section relative z-10 py-16 md:py-24 bg-zinc-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { label: "Decades of Excellence", target: "30", suffix: "+" },
            { label: "Vessels in Fleet", target: "45", suffix: "+" },
            { label: "Major Projects", target: "150", suffix: "+" },
            { label: "Global Partners", target: "25", suffix: "" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="text-5xl md:text-7xl font-serif text-white mb-2 flex items-baseline">
                <span className="stat-number" data-target={stat.target}>0</span>
                <span className="text-[#0ea5a4]">{stat.suffix}</span>
              </div>
              <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. HORIZONTAL SHOWCASE --- */}
      <section ref={horizontalWrapperRef} className="relative z-10 h-screen bg-[#050505] overflow-hidden flex items-center">
        <div className="absolute top-12 md:top-24 left-6 md:left-12 z-20 pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-serif uppercase tracking-tighter text-white/10">Our Ecosystem</h2>
        </div>

        {/* The Track: Increased padding-right to prevent the last panel from sticking to the edge */}
        <div ref={horizontalRef} className="flex flex-nowrap h-[65vh] md:h-[70vh] items-center px-6 md:px-12 pr-[20vw] gap-6 md:gap-16">
          {[
            { 
              id: "01", 
              title: "Meka Group", 
              desc: "Commanding a massive fleet of cutter suction and trailing suction hopper dredgers to reshape coastlines.",
              img: "/frames/frame_0050.webp"
            },
            { 
              id: "02", 
              title: "Amma Lines", 
              desc: "End-to-end maritime transportation and offshore support driven by state-of-the-art navigation tech.",
              img: "/frames/frame_0100.webp"
            },
            { 
              id: "03", 
              title: "Meka Heavy Engineering", 
              desc: "Constructing robust marine infrastructure, breakwaters, and port facilities engineered to last.",
              img: "/frames/frame_0150.webp"
            }
          ].map((item, idx) => (
            <div key={idx} className="h-panel w-[85vw] md:w-[60vw] h-full shrink-0 relative group rounded-xl overflow-hidden shadow-2xl">
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 pr-6">
                <span className="text-[#0ea5a4] text-[10px] font-sans tracking-[0.3em] uppercase mb-2 block">{item.id} / Division</span>
                <h3 className="text-3xl md:text-5xl font-serif text-white uppercase mb-3 md:mb-4">{item.title}</h3>
                <p className="text-xs md:text-base font-sans text-gray-300 max-w-sm line-clamp-3 md:line-clamp-none">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. FOOTER --- */}
      <div className="relative z-30">
        <Footer />
      </div>

    </main>
  );
}
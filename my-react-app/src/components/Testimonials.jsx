// src/components/Testimonials.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: "01",
    quote: "Meka Group's precision in maritime infrastructure is absolutely unmatched. They delivered the deep-water port months ahead of our aggressive schedule.",
    name: "Arthur Pendelton",
    role: "Director, Global Maritime Authority",
    img: "https://randomuser.me/api/portraits/men/32.jpg" // High-quality placeholder face
  },
  {
    id: "02",
    quote: "Their offshore fabrication capabilities completely redefined our energy extraction timeline. A truly world-class engineering partner.",
    name: "Sarah Jenkins",
    role: "VP Engineering, Oceanic Energy",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "03",
    quote: "From complex dredging to massive land reclamation, Meka executes with absolute authority, flawless precision, and impeccable safety standards.",
    name: "Dr. Wei Chen",
    role: "Chairman, National Infrastructure Board",
    img: "https://randomuser.me/api/portraits/men/68.jpg"
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    // Section header scroll entrance
    gsap.fromTo(
      ".test-header",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  // This useGSAP hook re-runs EVERY time activeIndex changes
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Animate the massive quote words
    tl.fromTo(
      ".quote-word",
      { yPercent: 120, rotationZ: 5, opacity: 0 },
      {
        yPercent: 0,
        rotationZ: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.04,
        ease: "expo.out",
      }
    )
    // 2. Pop the portrait image in
    .fromTo(
      ".author-img",
      { scale: 0.5, opacity: 0, rotationZ: -15 },
      { scale: 1, opacity: 1, rotationZ: 0, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.5" // Start slightly before the words finish
    )
    // 3. Fade and slide in the author details
    .fromTo(
      ".author-details-text",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden z-10">
      
      {/* Massive Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="text-[40vw] font-serif italic text-white/[0.02] leading-none">
          "
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col justify-between min-h-[50vh]">
        
        {/* Section Header */}
        <div className="test-header mb-16 md:mb-24">
          <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-4">
            Client Perspectives
          </p>
          <div className="w-16 h-px bg-white/20" />
        </div>

        {/* The Quote Display */}
        <div className="w-full md:w-4/5 lg:w-3/4 mb-16 md:mb-24 min-h-[300px] md:min-h-[350px]">
          
          <h3 className="flex flex-wrap text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.1] tracking-tight font-serif italic text-white">
            {testimonials[activeIndex].quote.split(" ").map((word, i) => (
              <span key={`${activeIndex}-${i}`} className="inline-block overflow-hidden pb-2 md:pb-4 mr-3 md:mr-6">
                <span className="quote-word inline-block transform-gpu origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h3>

          {/* UPGRADED: Author Details with Portrait */}
          <div className="mt-12 md:mt-16 flex items-center gap-6 md:gap-8">
            
            {/* The Avatar */}
            <div className="author-img relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/10 shrink-0 shadow-2xl">
              <img 
                src={testimonials[activeIndex].img} 
                alt={testimonials[activeIndex].name} 
                className="w-full h-full object-cover grayscale brightness-90 contrast-125"
              />
            </div>

            {/* Teal Accent Line */}
            <div className="author-details-text hidden md:block w-8 md:w-12 h-[2px] bg-[#0ea5a4]" />
            
            {/* The Text */}
            <div className="author-details-text">
              <p className="font-sans font-black text-lg md:text-xl uppercase tracking-widest text-white mb-1">
                {testimonials[activeIndex].name}
              </p>
              <p className="font-sans font-light text-[10px] md:text-xs tracking-[0.2em] text-[#0ea5a4] uppercase">
                {testimonials[activeIndex].role}
              </p>
            </div>

          </div>
        </div>

        {/* Architectural Navigation Controls */}
        <div className="flex items-center gap-6 md:gap-12 border-t border-white/10 pt-8">
          {testimonials.map((test, index) => (
            <button
              key={test.id}
              onClick={() => setActiveIndex(index)}
              className="group relative flex flex-col items-start gap-2 focus:outline-none"
            >
              <span className={`font-sans text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${activeIndex === index ? "text-[#0ea5a4]" : "text-white/30 group-hover:text-white/70"}`}>
                {test.id}
              </span>
              
              {/* Progress Line */}
              <div className="w-16 md:w-24 h-[2px] bg-white/10 relative overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full bg-[#0ea5a4] transition-all duration-700 ease-out origin-left ${activeIndex === index ? "w-full" : "w-0"}`} 
                />
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
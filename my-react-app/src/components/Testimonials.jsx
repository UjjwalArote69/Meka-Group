// src/components/Testimonials.jsx
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: "01",
    quote: "We are immensely satisfied with the performance of Meka while executing the work. They are committed to achieve the targets and complete the work. They have got a large marine spread and extensive experience to take up challenging marine works. We wish them success in their future ventures.",
    name: "CR Pradeep",
    role: "Additional GM - Projects, Vatech Wabag",
    // FIX: Reference public assets from the root directory
    img: "/testimonials/crpradeep.jpg"
  },
  {
    id: "02",
    quote: "Meka Dredging have performed to our entire satisfaction while executing this work. They have got the experienced and skilled staff to execute such and similar works. We wish them success for their future ventures!",
    name: "Vipinkant Doshi",
    role: "Reliance Industries",
    img: "/testimonials/vipinkantdoshi.jpg"
  },
  {
    id: "03",
    quote: "The work has been carried out in an excellent workmanship like manner. The project displayed Amma Lines professionalism and technical expertise for marine works. They have got the experienced staff and a team of specialized underwater divers to take up challenging work. They have also got a large fleet of marine equipments and dredging equipments. We are immensely satisfied with their performance. We strongly recommend Amma Lines for such and similar marine construction works and wish them all the success for their ventures.",
    name: "AK Upadhyay",
    role: "DGM - Civil Projects, L & T Hazira Works",
    img: '/testimonials/akupadhyay.png'
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

  useGSAP(() => {
    const tl = gsap.timeline();

    // FIX: Adjusted animation for longer text. 
    // Reduced y-offset and staggering speed so it doesn't take 10 seconds to read.
    tl.fromTo(
      ".quote-word",
      { y: 30, opacity: 0, rotationZ: 2 },
      {
        y: 0,
        opacity: 1,
        rotationZ: 0,
        duration: 0.8,
        stagger: 0.015, // Much faster stagger for long paragraphs
        ease: "power3.out",
      }
    )
    .fromTo(
      ".author-img",
      { scale: 0.5, opacity: 0, rotationZ: -15 },
      { scale: 1, opacity: 1, rotationZ: 0, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.4"
    )
    .fromTo(
      ".author-details-text",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden z-10">
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="text-[40vw] font-serif italic text-white/5 leading-none">
          "
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between">
        
        {/* Section Header */}
        <div className="test-header mb-12 md:mb-16">
          <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-4">
            Client Perspectives
          </p>
          <div className="w-16 h-px bg-white/20" />
        </div>

        {/* The Quote Display */}
        <div className="w-full lg:w-4/5 mb-16 min-h-[40vh] md:min-h-[30vh]">
          
          {/* FIX: Reduced font size and adjusted line-height for longer quotes */}
          <h3 className="flex flex-wrap text-xl md:text-3xl lg:text-4xl leading-relaxed md:leading-normal tracking-wide font-serif italic text-gray-200">
            {testimonials[activeIndex].quote.split(" ").map((word, i) => (
              <span key={`${activeIndex}-${i}`} className="inline-block overflow-hidden mr-2 md:mr-3 mb-1 md:mb-2">
                <span className="quote-word inline-block transform-gpu origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h3>

          {/* Author Details */}
          <div className="mt-12 flex items-center gap-6">
            
            {/* The Avatar */}
            <div className="author-img relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-800 overflow-hidden border border-white/10 shrink-0 shadow-2xl flex items-center justify-center">
              {/* Added fallback text/icon in case image still doesn't load */}
              <span className="absolute text-slate-500 text-xs text-center p-2">No Img</span>
              <img 
                src={testimonials[activeIndex].img} 
                alt={testimonials[activeIndex].name} 
                className="w-full h-full object-cover grayscale brightness-90 contrast-125 relative z-10"
                onError={(e) => e.target.style.display = 'none'} // Hides broken image icon if path fails
              />
            </div>

            <div className="author-details-text hidden md:block w-8 md:w-12 h-0.5 bg-[#0ea5a4]" />
            
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

        {/* Navigation Controls */}
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
              
              <div className="w-16 md:w-24 h-0.5 bg-white/10 relative overflow-hidden">
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
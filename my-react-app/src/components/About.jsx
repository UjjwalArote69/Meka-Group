// src/components/About.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const storyChapters = [
  {
    id: "1979",
    title: "Establishment in Mumbai",
    text: "Meka Group began its journey in Mumbai under the vision of Dr. Meka Vijay Papa Rao (PhD, UIUC), focusing on specialized civil and marine engineering solutions for India's growing coastline.",
  },
  {
    id: "1982",
    title: "Foundation of Amma Lines",
    text: "The group established Amma Lines Ltd, which became a cornerstone of the organization, eventually building nearly 70% of the new jetties and ports across Maharashtra and Tamil Nadu.",
  },
  {
    id: "1995",
    title: "Leadership in Subsea Engineering",
    text: "Meka Infrastructure was founded, establishing the group as a leader in subsea intake and outfall pipelines, providing critical infrastructure for desalination and industrial cooling systems.",
  },
  {
    id: "2002",
    title: "The Rewas Port Milestone",
    text: "The Government of Maharashtra awarded the group a 50-year concession to develop the Rewas Port. This mega-project, later partnered with Reliance, aimed to create one of India's deepest ports.",
  },
  {
    id: "2010",
    title: "Deep-Water Port Innovation",
    text: "Based on proprietary design patents, the group received approval to develop a ₹6,000 crore deep-water port in West Bengal, further diversifying its port development portfolio.",
  },
  {
    id: "2013",
    title: "Nemmelli Desalination Success",
    text: "Successfully executed the landmark 100 MLD subsea intake outfall pipeline for the Nemmelli Desalination Plant, demonstrating world-class precision in subsea utility installations.",
  },
  {
    id: "2018",
    title: "International Expansion",
    text: "Leveraging its diverse fleet of dredgers and marine equipment, the group expanded operations into the Middle East, notably securing infrastructure and environmental roles in Qatar.",
  },
  {
    id: "2024",
    title: "Global Marine EPC Leader",
    text: "Today, Meka Group is recognized as a premier partner for Marine EPC, dredging, and offshore installations, serving government agencies and global energy corporations with a focus on innovation.",
  },
];

const About = () => {
  const containerRef = useRef(null);

  // Robust layout recalculation to prevent premature triggering
  useEffect(() => {
    const handleRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleRefresh);
    
    // Multiple refreshes to catch lazy-loaded assets and fonts above this section
    const t1 = setTimeout(handleRefresh, 100);
    const t2 = setTimeout(handleRefresh, 500);
    const t3 = setTimeout(handleRefresh, 1500);

    return () => {
      window.removeEventListener("resize", handleRefresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useGSAP(() => {
    // 0. RESET INITIAL STATES VIA GSAP (Removes Tailwind conflicts)
    gsap.set(".scroll-progress-line", { scaleY: 0, transformOrigin: "top" });
    
    const chapters = gsap.utils.toArray(".story-chapter");
    chapters.forEach((chapter) => {
      gsap.set(chapter, { opacity: 0.15 });
      gsap.set(chapter.querySelector(".text-wrapper"), { y: 50, rotationX: -20, opacity: 0, filter: "blur(10px)" });
      gsap.set(chapter.querySelector(".chapter-dot"), { scale: 0.5, backgroundColor: "#ffffff" });
    });

    // 1. MASTER SCROLL TRACK (Perfectly synced to viewport center)
    gsap.to(".scroll-progress-line", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".chapters-wrapper",
        start: "top 50%",    
        end: "bottom 50%",   
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    chapters.forEach((chapter) => {
      const watermark = chapter.querySelector(".chapter-watermark");
      const dot = chapter.querySelector(".chapter-dot");
      const textWrap = chapter.querySelector(".text-wrapper");

      // Parallax for the giant year watermark
      gsap.to(watermark, {
        y: -100, 
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // 2. THE SCRUBBED ENTRANCE
      const tlIn = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "top 75%", // Starts a bit earlier
          end: "top 45%",   // Finishes when centered
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      tlIn.to(chapter, { opacity: 1, ease: "none" }, 0)
          .to(dot, { 
            scale: 1.5, 
            backgroundColor: "#0ea5a4", 
            boxShadow: "0 0 20px rgba(14,165,164,0.8)", 
            ease: "none" 
          }, 0)
          .to(textWrap, 
            { y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out" }, 
            0
          );

      // 3. THE SCRUBBED EXIT
      const tlOut = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "bottom 50%",
          end: "bottom 20%",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      tlOut.to(chapter, { opacity: 0.15, ease: "none" }, 0)
           .to(dot, { 
             scale: 0.5, 
             backgroundColor: "#ffffff", 
             boxShadow: "0 0 0px rgba(255,255,255,0)", 
             ease: "none" 
           }, 0);
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden z-10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-32 md:mb-48 relative z-20">
          <h2 className="text-sm md:text-base uppercase tracking-[0.4em] text-[#0ea5a4] mb-4 font-medium">
            About Us
          </h2>
          <h3 className="text-4xl md:text-7xl font-bold tracking-tight">
            Our Legacy
          </h3>
        </div>

        {/* Chapters Wrapper */}
        <div className="chapters-wrapper flex flex-col gap-32 md:gap-48 relative">
          
          {/* Global Background Track */}
          <div className="hidden md:block absolute left-[30%] top-4 bottom-12 w-px bg-white/10 z-0" />
          
          {/* Global Animated Progress Fill (Tailwind classes removed to let GSAP handle it) */}
          <div className="hidden md:block absolute left-[30%] top-4 bottom-12 w-px z-10">
            <div className="scroll-progress-line w-full h-full bg-[#0ea5a4]" />
          </div>

          {storyChapters.map((chapter) => (
            <div 
              key={chapter.id} 
              className="story-chapter flex flex-col md:flex-row relative"
              style={{ perspective: "1000px" }}
            >
              
              {/* Massive Background Watermark */}
              <div className="chapter-watermark absolute -top-10 md:-top-20 left-0 md:left-[10%] text-8xl md:text-[180px] font-black text-white/5 select-none pointer-events-none z-0 tracking-tighter">
                {chapter.id}
              </div>

              {/* Node Indicator */}
              <div className="hidden md:block absolute left-[30%] top-3 -translate-x-1.5 z-20">
                <div className="chapter-dot w-3 h-3 rounded-full bg-white transition-colors" />
              </div>

              {/* Wrapped content for 3D Reveal */}
              <div className="text-wrapper flex flex-col md:flex-row w-full transform-gpu origin-bottom z-10 relative">
                
                {/* Fixed Overlap: Left Side matches the 30% line position */}
                <div className="md:w-[30%] pr-12 md:pr-20 mb-6 md:mb-0 mt-1">
                  <span className="block text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {chapter.id}
                  </span>
                  <h4 className="text-xl md:text-3xl font-semibold leading-snug text-gray-200">
                    {chapter.title}
                  </h4>
                </div>

                {/* Right Side: Story Text */}
                <div className="md:w-[70%] md:pl-24 pt-2 md:pt-4">
                  <p className="text-base md:text-2xl leading-relaxed text-gray-400 font-light">
                    {chapter.text}
                  </p>
                </div>
                
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
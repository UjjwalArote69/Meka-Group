// src/components/About.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const storyChapters = [
  {
    id: "1979",
    title: "Founded in Mumbai",
    text: "Meka Group was established with a vision to provide engineering excellence in coastal and industrial infrastructure, beginning with small port support works and marine services.",
  },
  {
    id: "1985",
    title: "First Marine Project",
    text: "Successfully delivered its first large-scale marine construction contract for a coastal breakwater project, establishing credibility in dredging and shoreline stabilization.",
  },
  {
    id: "1992",
    title: "Expansion into Offshore Services",
    text: "Expanded capabilities to include offshore pipeline installation and subsea systems, supporting energy and utility sectors with complex marine installations.",
  },
  {
    id: "2001",
    title: "Integrated EPC Services",
    text: "Formalized full EPC (Engineering, Procurement, Construction) services, delivering end-to-end solutions for industrial and maritime infrastructure across India and the Middle East.",
  },
  {
    id: "2010",
    title: "Launch of Heavy Engineering Division",
    text: "Opened a dedicated fabrication and heavy engineering division, enabling in-house production of large structural modules and vessel components.",
  },
  {
    id: "2015",
    title: "First International Projects",
    text: "Completed landmark projects outside India, including port facilities in East Africa and offshore pipelines in the Arabian Gulf, marking Meka’s entry into global infrastructure markets.",
  },
  {
    id: "2020",
    title: "Advanced Project Digitization",
    text: "Adopted cutting-edge project digitalization tools, integrating BIM, 3D visualization, and simulation workflows to support high-precision engineering and remote collaboration.",
  },
  {
    id: "2024",
    title: "Leading Marine Infrastructure Provider",
    text: "Now recognized as a trusted partner for marine infrastructure, industrial EPC, and offshore installations — partnering with government agencies, energy corporations, and global engineering firms.",
  },
];

const About = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const chapters = gsap.utils.toArray(".story-chapter");

    chapters.forEach((chapter) => {
      const watermark = chapter.querySelector(".chapter-watermark");
      const dot = chapter.querySelector(".chapter-dot");
      const line = chapter.querySelector(".chapter-line");
      const content = chapter.querySelector(".chapter-content");

      // 1. Parallax effect for the massive background year
      gsap.to(watermark, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. The main entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "top 65%", // Triggers perfectly when chapter reaches reading height
          toggleActions: "play none none reverse", // Illuminates on scroll down, dims if scrolled back up
        },
      });

      tl.to(chapter, { 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.inOut" 
      })
      // Scale up the glowing node
      .fromTo(
        dot,
        { scale: 0 },
        { scale: 1, duration: 0.5, ease: "back.out(1.7)" },
        "<" // Starts at the same time as opacity
      )
      // Shoot the line downwards
      .fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "expo.out", transformOrigin: "top" },
        "<0.2"
      )
      // Slight vertical slide and blur removal for the text to "snap" into focus
      .fromTo(
        content,
        { y: 30, filter: "blur(8px)" },
        { y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "<0.1"
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden z-10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-32 md:mb-48 relative z-20">
          <h2 className="text-sm md:text-base uppercase tracking-[0.4em] text-gray-500 mb-4 font-medium">
            About Us
          </h2>
          <h3 className="text-4xl md:text-7xl font-bold tracking-tight">
            Our Legacy
          </h3>
        </div>

        {/* Chapters */}
        <div className="flex flex-col gap-32 md:gap-48 relative">
          
          {/* Global Background Track */}
          <div className="hidden md:block absolute left-[30%] top-0 bottom-0 w-px bg-white/5" />

          {storyChapters.map((chapter) => (
            <div 
              key={chapter.id} 
              // Starts dimmed out at 30% opacity
              className="story-chapter flex flex-col md:flex-row relative opacity-30 transition-opacity"
            >
              
              {/* Massive Background Watermark */}
              <div className="chapter-watermark absolute top-[-40px] md:top-[-80px] left-0 md:left-[10%] text-8xl md:text-[180px] font-black text-white/[0.03] select-none pointer-events-none z-0 tracking-tighter">
                {chapter.id}
              </div>

              {/* Animated Timeline Elements (Desktop only) */}
              <div className="hidden md:block absolute left-[30%] top-3 bottom-[-192px] w-0.5 z-20">
                {/* Glowing Dot */}
                <div className="chapter-dot absolute -left-[5px] top-0 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                {/* The Active Line */}
                <div className="chapter-line w-full h-full bg-gradient-to-b from-white/60 to-transparent mt-3" />
              </div>

              {/* Left Side: Year & Title */}
              <div className="md:w-[35%] pr-10 mb-6 md:mb-0 z-10 relative mt-2">
                <span className="block text-4xl md:text-5xl font-bold text-white mb-4">
                  {chapter.id}
                </span>
                <h4 className="text-xl md:text-3xl font-semibold leading-snug text-gray-200">
                  {chapter.title}
                </h4>
              </div>

              {/* Right Side: Story Text */}
              <div className="chapter-content md:w-[65%] md:pl-24 pt-2 md:pt-4 z-10 relative">
                <p className="text-base md:text-xl leading-relaxed text-gray-400 font-light">
                  {chapter.text}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
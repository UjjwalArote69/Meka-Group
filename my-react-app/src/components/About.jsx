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
    // 1. MASTER SCROLL TRACK (Perfectly synced to viewport center)
    gsap.to(".scroll-progress-line", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".chapters-wrapper",
        start: "top 50%",    
        end: "bottom 50%",   
        scrub: true,
      }
    });

    const chapters = gsap.utils.toArray(".story-chapter");

    chapters.forEach((chapter) => {
      const watermark = chapter.querySelector(".chapter-watermark");
      const dot = chapter.querySelector(".chapter-dot");
      const textWrap = chapter.querySelector(".text-wrapper");

      // Reset starting states
      gsap.set(dot, { scale: 0.5, backgroundColor: "#ffffff" });

      // Parallax for the giant year watermark
      gsap.to(watermark, {
        y: -100, // Increased distance for a more pronounced 3D effect
        ease: "none",
        scrollTrigger: {
          trigger: chapter,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. THE SCRUBBED ENTRANCE (Fades in perfectly with the scroll wheel)
      const tlIn = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "top 80%", // Starts fading in near the bottom
          end: "top 40%",   // Fully lit when it reaches the center
          scrub: true,
        }
      });

      tlIn.to(chapter, { opacity: 1, ease: "none" }, 0)
          .to(dot, { 
            scale: 1.5, 
            backgroundColor: "#0ea5a4", 
            boxShadow: "0 0 20px rgba(14,165,164,0.8)", 
            ease: "none" 
          }, 0)
          // 3D Text Reveal linked to the scroll
          .fromTo(textWrap, 
            { y: 50, rotationX: -30, opacity: 0, filter: "blur(12px)" }, 
            { y: 0, rotationX: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out" }, 
            0
          );

      // 3. THE SCRUBBED EXIT (Fades out perfectly as it leaves the center)
      const tlOut = gsap.timeline({
        scrollTrigger: {
          trigger: chapter,
          start: "bottom 50%", // Starts fading out as it passes the center
          end: "bottom 20%",   // Fully dimmed near the top
          scrub: true,
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
          
          {/* Global Animated Progress Fill */}
          <div className="hidden md:block absolute left-[30%] top-4 bottom-12 w-px z-10">
            <div className="scroll-progress-line w-full h-full bg-[#0ea5a4] origin-top scale-y-0" />
          </div>

          {storyChapters.map((chapter) => (
            <div 
              key={chapter.id} 
              // Chapters start dimmed at 15% opacity
              className="story-chapter flex flex-col md:flex-row relative opacity-15"
              style={{ perspective: "1000px" }} // Added perspective for the 3D text roll
            >
              
              {/* Massive Background Watermark */}
              <div className="chapter-watermark absolute top-[-40px] md:top-[-80px] left-0 md:left-[10%] text-8xl md:text-[180px] font-black text-white/[0.03] select-none pointer-events-none z-0 tracking-tighter">
                {chapter.id}
              </div>

              {/* Node Indicator */}
              <div className="hidden md:block absolute left-[30%] top-3 -translate-x-[5px] z-20">
                <div className="chapter-dot w-3 h-3 rounded-full bg-white transition-colors" />
              </div>

              {/* Wrapped content for 3D Reveal */}
              <div className="text-wrapper flex flex-col md:flex-row w-full transform-gpu origin-bottom z-10 relative">
                
                {/* Left Side: Year & Title */}
                <div className="md:w-[35%] pr-10 mb-6 md:mb-0 mt-1">
                  <span className="block text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {chapter.id}
                  </span>
                  <h4 className="text-xl md:text-3xl font-semibold leading-snug text-gray-200">
                    {chapter.title}
                  </h4>
                </div>

                {/* Right Side: Story Text */}
                <div className="md:w-[65%] md:pl-24 pt-2 md:pt-4">
                  <p className="text-base md:text-xl leading-relaxed text-gray-400 font-light">
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
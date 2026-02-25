// src/components/Projects.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    id: "01",
    title: "Madras\nPort",
    subtitle: "MARINE CONSTRUCTION",
    img: "/projects/image2.png", 
  },
  {
    id: "02",
    title: "Hyundai\nHeavy\nIndustries",
    subtitle: "DREDGING & RECLAMATION",
    img: "/projects/image1.png",
  },
  {
    id: "03",
    title: "Mitsui &\nCompany",
    subtitle: "PORT DEVELOPMENT",
    img: "/projects/image3.png",
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const track = trackRef.current;
    const panels = gsap.utils.toArray(".project-panel");
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    // 1. MASTER HORIZONTAL SCROLL TIMELINE
    const scrollTween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // 2. MASSIVE BACKGROUND PARALLAX
    gsap.to(".bg-marquee", {
      xPercent: -30, // Moves slightly slower/different direction than the main track
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        scrub: 1,
      },
    });

    // 3. BOTTOM PROGRESS BAR
    gsap.to(".progress-fill", {
      scaleX: 1,
      ease: "none",
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        scrub: true,
      },
    });

    // 4. INDIVIDUAL PROJECT REVEALS (Cinematic Image & Text animations)
    panels.forEach((panel, i) => {
      // Skip the intro panel (index 0) for these specific effects
      if (i === 0) return; 

      const imageContainer = panel.querySelector(".img-container");
      const image = panel.querySelector(".parallax-img");
      const textWrap = panel.querySelector(".text-wrap");

      // The Container expands (unveils) from 60% width to 100%
      gsap.fromTo(
        imageContainer,
        { clipPath: "polygon(15% 0%, 85% 0%, 85% 100%, 15% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 80%", // Triggers when the panel enters 80% of the screen horizontally
            end: "left 20%",
            scrub: true,
          }
        }
      );

      // The Image inside scales down to create a "breathing" effect
      gsap.fromTo(
        image,
        { scale: 1.4 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "right 0%",
            scrub: true,
          }
        }
      );

      // Text slides up and fades in
      gsap.fromTo(
        textWrap,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 60%", // Pops in exactly when the image is centered
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 5. FLOAT THE RED SHIP (Intro panel detail)
    gsap.to(".intro-ship", {
      y: -25,
      rotationZ: 2,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

  }, { scope: containerRef });

  return (
    // Crisp editorial white/gray background
    <section ref={containerRef} className="w-full h-screen bg-[#F0F0F0] text-black overflow-hidden relative z-10">
      
      {/* MASSIVE BACKGROUND TEXT (Parallax Layer) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200vw] pointer-events-none z-0">
        <h1 
          className="bg-marquee text-[15vw] font-black uppercase whitespace-nowrap opacity-5"
          style={{ WebkitTextStroke: "2px #000", color: "transparent" }}
        >
          MEKA ENGINEERING &bull; MEKA ENGINEERING &bull;
        </h1>
      </div>

      {/* GLOBAL PROGRESS BAR */}
      <div className="absolute bottom-8 left-12 right-12 md:left-24 md:right-24 h-[2px] bg-black/10 z-50">
        <div className="progress-fill w-full h-full bg-black scale-x-0" />
      </div>

      {/* SCROLLING TRACK */}
      <div 
        ref={trackRef} 
        // Dynamic width based on total panels (1 intro + 3 projects = 400vw)
        className="flex h-full w-[400vw] relative z-10" 
      >
        
        {/* PANEL 0: INTRO */}
        <div className="project-panel w-screen h-full flex flex-col justify-center relative flex-shrink-0 px-12 md:px-32">
          <div className="z-20">
            <p className="text-sm md:text-lg tracking-[0.3em] font-medium text-black/50 mb-4">OUR PORTFOLIO</p>
            <h2 className="text-6xl md:text-[8rem] leading-[0.9] font-serif tracking-tighter text-black">
              Engineering <br />
              The Future.
            </h2>
          </div>
          <img 
            src="/projects/image4.png" // Fallback to an image if ship is missing
            alt="Meka Group Project" 
            className="intro-ship absolute bottom-20 right-10 md:bottom-32 md:right-40 w-72 md:w-[700px] object-contain drop-shadow-2xl z-30"
          />
        </div>

        {/* PANELS 1-3: PROJECTS */}
        {projectData.map((project) => (
          <div 
            key={project.id} 
            className="project-panel w-screen h-full flex flex-col justify-center relative flex-shrink-0 px-6 md:px-24"
          >
            <div className="relative w-full h-[70vh] flex items-center justify-center max-w-[1400px] mx-auto">
              
              {/* Central Image Mask Container */}
              <div className="img-container w-full md:w-[60%] h-full overflow-hidden relative shadow-2xl bg-gray-300">
                <img 
                  src={project.img} 
                  alt={project.title.replace('\n', ' ')}
                  className="parallax-img w-full h-full object-cover transform-gpu"
                />
              </div>

              {/* Floating Typography Wrapper */}
              <div className="text-wrap absolute inset-0 flex flex-col justify-between pointer-events-none py-10 md:py-20 z-20">
                
                {/* Top Number */}
                <div className="flex justify-start">
                  <span className="text-6xl md:text-8xl font-black  mix-blend-difference text-white">
                    {project.id}
                  </span>
                </div>

                {/* Bottom Title & Subtitle */}
                <div className="flex flex-col md:flex-row md:items-end justify-between w-full">
                  <h3 className="text-5xl md:text-[6rem] font-serif leading-[0.9] tracking-tight text-black mix-blend-difference">
                    {project.title}
                  </h3>
                  
                  <div className="mt-4 md:mt-0 text-left md:text-right bg-white/90 p-4 md:p-6 backdrop-blur-md">
                    <p className="text-xs md:text-sm tracking-[0.2em] font-bold text-black">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Projects;
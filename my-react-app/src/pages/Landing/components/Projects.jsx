// src/components/Projects.jsx
import React, { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useProjects } from "../../../hooks/useProjects";
import { loc } from "../../../lib/locale";

gsap.registerPlugin(ScrollTrigger);

// Image paths stay in code, keyed by project id. Admin can edit copy in
// Sanity but adding a new project id requires a matching entry here +
// a file under /public/projects/.
const PROJECT_IMAGES = {
  "01": "/projects/image2.png",
  "02": "/projects/image1.png",
  "03": "/projects/image3.png",
};

const Projects = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const projects = useProjects();
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const projectData = useMemo(
    () =>
      projects.projects.map((p) => ({
        id: p.id,
        title: p.title || "",
        img: PROJECT_IMAGES[p.id] || "",
        subtitle: loc(p.subtitle, lang),
      })),
    [projects.projects, lang]
  );

  // Total panels = 1 intro + N projects. Track width scales accordingly so
  // the GSAP x-translation math still maps to the full scrollable distance.
  const totalPanels = projectData.length + 1;

  useGSAP(() => {
    const track = trackRef.current;
    const panels = gsap.utils.toArray(".project-panel");
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
    // Total vertical scroll distance — ensure each panel gets at least ~1 viewport
    // of scroll so mobile doesn't fly through in one flick.
    const getEndDistance = () =>
      Math.max(track.scrollWidth, panels.length * window.innerHeight);

    // 1. MASTER HORIZONTAL SCROLL TIMELINE
    const scrollTween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: () => `+=${getEndDistance()}`,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // 2. MASSIVE BACKGROUND PARALLAX
    gsap.to(".bg-marquee", {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getEndDistance()}`,
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
        end: () => `+=${getEndDistance()}`,
        scrub: true,
      },
    });

    // 4. INDIVIDUAL PROJECT REVEALS
    panels.forEach((panel, i) => {
      if (i === 0) return; // Skip intro panel

      const imageContainer = panel.querySelector(".img-container");
      const image = panel.querySelector(".parallax-img");
      const textWrap = panel.querySelector(".text-wrap");

      // Container Expand (Wipes from left to right)
      gsap.fromTo(
        imageContainer,
        { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 75%",
            end: "left 25%",
            scrub: true,
          }
        }
      );

      // Image Scale Down
      gsap.fromTo(
        image,
        { scale: 1.3 },
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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 50%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // 5. FLOAT THE RED SHIP (Intro panel)
    gsap.to(".intro-ship", {
      y: -25,
      rotationZ: 2,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

  }, { scope: containerRef, dependencies: [projects.projects] });

  return (
    // Solid, clean off-white background
    // dir="ltr" forces the horizontal-scroll carousel to keep its LTR layout
    // even when the document is RTL (Arabic). The GSAP x-translation math
    // assumes LTR; flipping the container would scroll the wrong way.
    <section ref={containerRef} dir="ltr" className="w-full h-screen bg-[#F4F4F4] text-[#111] overflow-hidden relative z-10">

      {/* MASSIVE BACKGROUND TEXT (Parallax Layer) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[200vw] pointer-events-none z-0">
        <h1
          className="bg-marquee text-[18vw] 2xl:text-[18rem] font-sans font-black uppercase whitespace-nowrap opacity-[0.03]"
          style={{ WebkitTextStroke: "2px #000", color: "transparent" }}
        >
          MEKA ENGINEERING &bull; MEKA ENGINEERING &bull;
        </h1>
      </div>

      {/* GLOBAL PROGRESS BAR */}
      <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-24 md:right-24 h-0.5 bg-black/10 z-50">
        <div className="progress-fill w-full h-full bg-[#0ea5a4] scale-x-0" />
      </div>

      {/* SCROLLING TRACK */}
      <div
        ref={trackRef}
        className="flex h-full relative z-10"
        style={{ width: `${totalPanels * 100}vw` }}
      >

        {/* PANEL 0: INTRO */}
        <div className="project-panel w-screen h-full flex flex-col justify-center relative shrink-0 px-6 md:px-24 pb-16 md:pb-0">
          <div className="w-full max-w-350 mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="z-20 md:w-1/2">
              <p className="text-sm md:text-lg tracking-[0.4em] font-sans font-medium text-black/40 mb-6 uppercase">
                {loc(projects.introLabel, lang)}
              </p>
              <h2 className="text-5xl sm:text-6xl md:text-[8rem] 2xl:text-[9rem] leading-[0.85] tracking-tighter text-[#111] uppercase">
                <span className="font-sans font-black">{loc(projects.titleWord1, lang)}</span> <br />
                <span className="font-serif italic text-[#0ea5a4] lowercase pr-4">{loc(projects.titleConnector, lang)}</span>
                <span className="font-sans font-black">{loc(projects.titleWord2, lang)}</span>
              </h2>
            </div>
            <div className="z-20 md:w-1/2 relative h-[40vh] md:h-[60vh] flex items-center justify-center mt-12 md:mt-0">
              <img
                src="/projects/image4.png"
                alt="Meka Group Project"
                decoding="async"
                className="intro-ship w-[80%] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* PANELS 1-N: PROJECTS */}
        {projectData.map((project) => (
          <div
            key={project.id}
            className="project-panel w-screen h-full flex items-center justify-center relative shrink-0 px-6 md:px-24 pb-16 md:pb-0"
          >
            <div className="w-full h-full max-h-200 max-w-350 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20">

              {/* Left Column: Typography */}
              <div className="text-wrap w-full md:w-[45%] flex flex-col justify-center z-20">
                <span className="text-xl md:text-3xl font-sans font-light text-black/30 mb-4 md:mb-8 block">
                  {loc(projects.noLabel, lang)} {project.id}
                </span>

                {/* Clean, readable Rich Black text */}
                <h3 className="text-4xl sm:text-5xl md:text-[6rem] lg:text-[7rem] 2xl:text-[8rem] font-serif uppercase leading-[0.85] tracking-tighter text-[#111] mb-8 md:mb-12">
                  {project.title}
                </h3>

                {/* Solid pill badge for category */}
                <div className="bg-[#111] px-6 py-3 md:py-4 rounded-full flex items-center gap-4 w-max shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-[#0ea5a4] animate-pulse"></span>
                  <p className="text-[10px] md:text-xs tracking-[0.25em] font-sans font-semibold text-white uppercase mt-0.5">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Column: Bounded Image */}
              <div className="w-full md:w-[65%] h-[40vh] md:h-[70vh] relative z-10 mt-12 md:mt-0">
                <div className="img-container w-full h-full overflow-hidden shadow-2xl rounded-sm bg-gray-200">
                  <img
                    src={project.img}
                    alt={project.title.replace('\n', ' ')}
                    decoding="async"
                    className="parallax-img w-full h-full object-cover transform-gpu"
                  />
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

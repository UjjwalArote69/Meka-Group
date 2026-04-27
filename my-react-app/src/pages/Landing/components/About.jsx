// src/components/About.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useAbout } from "../../../hooks/useAbout";
import { loc } from "../../../lib/locale";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const about = useAbout();
  const chapters = about.chapters;
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

    const chapterEls = gsap.utils.toArray(".story-chapter");
    chapterEls.forEach((chapter) => {
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

    chapterEls.forEach((chapter) => {
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
  }, { scope: containerRef, dependencies: [chapters] });

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] text-white py-32 px-6 md:px-12 lg:px-24 overflow-hidden z-10 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-32 md:mb-48 relative z-20">
          <h2 className="text-sm md:text-base uppercase tracking-[0.4em] text-[#0ea5a4] mb-4 font-medium">
            {loc(about.sectionLabel, lang)}
          </h2>
          <h3 className="text-4xl md:text-7xl font-bold tracking-tight">
            {loc(about.sectionTitle, lang)}
          </h3>
        </div>

        {/* Chapters Wrapper */}
        <div className="chapters-wrapper flex flex-col gap-32 md:gap-48 relative">

          {/* Global Background Track — mirrored via start-* so RTL flips the rail to the right */}
          <div className="hidden md:block absolute start-[30%] top-4 bottom-12 w-px bg-white/10 z-0" />

          {/* Global Animated Progress Fill */}
          <div className="hidden md:block absolute start-[30%] top-4 bottom-12 w-px z-10">
            <div className="scroll-progress-line w-full h-full bg-[#0ea5a4]" />
          </div>

          {chapters.map((chapter) => (
            <div
              key={chapter.year}
              className="story-chapter flex flex-col md:flex-row relative"
              style={{ perspective: "1000px" }}
            >

              {/* Massive Background Watermark */}
              <div className="chapter-watermark absolute -top-10 md:-top-20 start-0 md:start-[10%] text-8xl md:text-[180px] font-black text-white/5 select-none pointer-events-none z-0 tracking-tighter">
                {chapter.year}
              </div>

              {/* Node Indicator — sits on the rail */}
              <div className="hidden md:block absolute start-[30%] top-3 -translate-x-1.5 rtl:translate-x-1.5 z-20">
                <div className="chapter-dot w-3 h-3 rounded-full bg-white transition-colors" />
              </div>

              {/* Wrapped content for 3D Reveal */}
              <div className="text-wrapper flex flex-col md:flex-row w-full transform-gpu origin-bottom z-10 relative">

                {/* Left column (year + title) — uses logical end-padding so it flips in RTL */}
                <div className="md:w-[30%] pe-12 md:pe-20 mb-6 md:mb-0 mt-1">
                  <span className="block text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {chapter.year}
                  </span>
                  <h4 className="text-xl md:text-3xl font-semibold leading-snug text-gray-200">
                    {loc(chapter.title, lang)}
                  </h4>
                </div>

                {/* Right column (story text) — logical start-padding clears the rail on both sides */}
                <div className="md:w-[70%] md:ps-24 pt-2 md:pt-4">
                  <p className="text-base md:text-2xl leading-relaxed text-gray-400 font-light">
                    {loc(chapter.text, lang)}
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

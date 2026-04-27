// src/components/Testimonials.jsx
import React, { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useTestimonials } from "../../../hooks/useTestimonials";
import { loc } from "../../../lib/locale";

gsap.registerPlugin(ScrollTrigger);

// Avatar paths stay in code, keyed by testimonial id. Adding a new
// testimonial in Sanity requires a matching entry here + a file under
// /public/testimonials/.
const TESTIMONIAL_IMAGES = {
  "01": "/testimonials/crpradeep.jpg",
  "02": "/testimonials/vipinkantdoshi.jpg",
  "03": "/testimonials/akupadhyay.png",
};

const Testimonials = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const data = useTestimonials();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = useMemo(
    () =>
      data.entries.map((p) => ({
        id: p.id,
        name: p.name,
        img: TESTIMONIAL_IMAGES[p.id] || "",
        quote: loc(p.quote, lang),
        role: loc(p.role, lang),
      })),
    [data.entries, lang]
  );

  // Clamp the index in case the entries list is shorter than the previous one
  // (e.g. defaults render first with N entries, Sanity returns fewer).
  const safeIndex = testimonials.length === 0 ? 0 : Math.min(activeIndex, testimonials.length - 1);
  const active = testimonials[safeIndex];

  useGSAP(() => {
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

    tl.fromTo(
      ".quote-word",
      { y: 30, opacity: 0, rotationZ: 2 },
      {
        y: 0,
        opacity: 1,
        rotationZ: 0,
        duration: 0.8,
        stagger: 0.015,
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
  }, { scope: containerRef, dependencies: [safeIndex, lang] });

  if (!active) return null;

  return (
    <section ref={containerRef} className="w-full bg-[#f5f5f0] text-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden z-10">

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="text-[40vw] 2xl:text-[30rem] font-serif italic text-black/[0.03] leading-none">
          &ldquo;
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col justify-between">

        {/* Section Header */}
        <div className="test-header mb-12 md:mb-16">
          <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-semibold tracking-[0.4em] uppercase mb-4">
            {loc(data.sectionLabel, lang)}
          </p>
          <div className="w-16 h-px bg-black/15" />
        </div>

        {/* The Quote Display */}
        <div className="w-full lg:w-4/5 mb-16 min-h-[40vh] md:min-h-[30vh]">

          <h3 className="flex flex-wrap text-xl md:text-3xl lg:text-4xl leading-relaxed md:leading-normal tracking-wide font-serif italic text-[#0a0a0a]/80">
            {active.quote.split(" ").map((word, i) => (
              <span key={`${safeIndex}-${i}`} className="inline-block overflow-hidden mr-2 md:mr-3 mb-1 md:mb-2">
                <span className="quote-word inline-block transform-gpu origin-bottom-left">
                  {word}
                </span>
              </span>
            ))}
          </h3>

          {/* Author Details */}
          <div className="mt-12 flex items-center gap-6">

            {/* The Avatar */}
            <div className="author-img relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/5 overflow-hidden border border-black/10 shrink-0 shadow-lg flex items-center justify-center">
              <span className="absolute text-black/30 text-xs text-center p-2">No Img</span>
              <img
                src={active.img}
                alt={active.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover brightness-95 contrast-110 relative z-10"
                onError={(e) => e.target.style.display = 'none'}
              />
            </div>

            <div className="author-details-text hidden md:block w-8 md:w-12 h-0.5 bg-[#0ea5a4]" />

            {/* The Text */}
            <div className="author-details-text">
              <p className="font-sans font-black text-lg md:text-xl uppercase tracking-widest text-[#0a0a0a] mb-1">
                {active.name}
              </p>
              <p className="font-sans font-light text-[10px] md:text-xs tracking-[0.2em] text-[#0ea5a4] uppercase">
                {active.role}
              </p>
            </div>

          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6 md:gap-12 border-t border-black/10 pt-8">
          {testimonials.map((test, index) => (
            <button
              key={test.id}
              onClick={() => setActiveIndex(index)}
              className="group relative flex flex-col items-start gap-2 focus:outline-none cursor-pointer"
            >
              <span className={`font-sans text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${safeIndex === index ? "text-[#0ea5a4]" : "text-black/25 group-hover:text-black/60"}`}>
                {test.id}
              </span>

              <div className="w-16 md:w-24 h-0.5 bg-black/10 relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-[#0ea5a4] transition-all duration-700 ease-out origin-left ${safeIndex === index ? "w-full" : "w-0"}`}
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

/* eslint-disable react-hooks/set-state-in-effect */
// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Split links: left side and right side of the centered logo
const leftLinks = [
  { name: "Home", path: "/" },
  { name: "Our Legacy", path: "/about" },
  { name: "Expertise", path: "/expertise" },
];

const rightLinks = [
  { name: "Careers", path: "/careers"},
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const allLinks = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const tl = useRef(null);
  const location = useLocation();

  // 1. Smart Scroll Behavior — hide on scroll down, show on scroll up
  useGSAP(() => {
    const showAnim = gsap
      .from(headerRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.4,
        ease: "power2.out",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // Hide navbar on scroll down (unless menu is open)
        if (self.direction === 1 && !isMenuOpen) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }

        // Compact + blurred background after scrolling past threshold
        if (self.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      },
    });
  }, { scope: headerRef, dependencies: [isMenuOpen] });

  // 2. Full-screen menu animation timeline
  useGSAP(() => {
    gsap.set(menuRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    gsap.set(".nav-link-wrap", {
      y: 100,
      rotationX: -50,
      opacity: 0,
      transformPerspective: 1000,
    });
    gsap.set(".nav-footer", { opacity: 0, y: 30 });
    gsap.set(".menu-watermark", { opacity: 0, scale: 0.9 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "expo.inOut",
      })
      .to(
        ".menu-watermark",
        { opacity: 0.03, scale: 1, duration: 1.5, ease: "power3.out" },
        "-=0.8"
      )
      .to(
        ".nav-link-wrap",
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=1.0"
      )
      .to(
        ".nav-footer",
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
  }, { scope: menuRef });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      document.body.style.overflow = "auto";
      setHoveredIndex(null);
    }
  }, [isMenuOpen]);

  // Helper: is this link the current active route?
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          THE CENTERED-LOGO HEADER (Desktop: split links | Mobile: hamburger)
          ═══════════════════════════════════════════════════════ */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-100 text-white transition-all duration-500 border-b ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl py-3 border-white/5 shadow-2xl"
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* ── LEFT NAV LINKS (hidden on mobile) ── */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 flex-1">
            {leftLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-[11px] xl:text-xs font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 group ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.name}
                {/* Active indicator dot */}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0ea5a4] transition-all duration-300 ${
                    isActive(link.path)
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* ── CENTERED LOGO ── */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="relative z-110 flex items-center justify-center flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Meka Group"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? "h-7 md:h-9" : "h-8 md:h-12"
              }`}
            />
          </Link>

          {/* ── RIGHT NAV LINKS + HAMBURGER ── */}
          <div className="flex items-center gap-8 xl:gap-10 flex-1 justify-end">

            {/* Desktop right links */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {rightLinks.map((link) => {
                // Make "Contact" a styled CTA button
                if (link.name === "Contact") {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-[11px] xl:text-xs font-sans font-semibold uppercase tracking-[0.2em] px-6 py-2.5 border border-white/20 hover:border-[#0ea5a4] hover:bg-[#0ea5a4] hover:text-black transition-all duration-500 rounded-sm"
                    >
                      {link.name}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative text-[11px] xl:text-xs font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 group ${
                      isActive(link.path)
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0ea5a4] transition-all duration-300 ${
                        isActive(link.path)
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── HAMBURGER (visible on mobile, optional on desktop) ── */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="relative z-110 flex items-center gap-3 lg:hidden group"
            >
              <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-white/70">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
              <div className="w-7 h-2.5 flex flex-col justify-between items-end relative">
                <span
                  className={`h-[1.5px] bg-white transition-all duration-500 ease-in-out ${
                    isMenuOpen
                      ? "w-full rotate-45 absolute top-1/2 -translate-y-1/2"
                      : "w-full group-hover:w-2/3"
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-white transition-all duration-500 ease-in-out ${
                    isMenuOpen
                      ? "w-full -rotate-45 absolute top-1/2 -translate-y-1/2"
                      : "w-2/3 group-hover:w-full"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          FULL-SCREEN MOBILE MENU OVERLAY (unchanged behavior)
          ═══════════════════════════════════════════════════════ */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-90 bg-[#050505] text-white flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      >
        {/* Massive Background Watermark */}
        <div className="menu-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-sans font-black text-white pointer-events-none select-none z-0">
          MEKA
        </div>

        <nav className="flex flex-col gap-2 md:gap-4 mt-12 z-10 relative w-fit">
          {allLinks.map((link, i) => (
            <div key={i} className="overflow-hidden py-2">
              <Link
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`nav-link-wrap flex items-center gap-6 md:gap-12 group transform-gpu origin-top transition-opacity duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== i
                    ? "opacity-20"
                    : "opacity-100"
                }`}
              >
                <span className="text-xs md:text-sm font-sans font-medium tracking-[0.3em] text-[#0ea5a4]">
                  0{i + 1}
                </span>
                <span className="text-5xl md:text-[6rem] font-serif uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-6 text-white group-hover:text-gray-200">
                  {link.name}
                </span>
              </Link>
            </div>
          ))}
        </nav>

        {/* Menu Footer */}
        <div className="nav-footer absolute bottom-8 left-6 right-6 md:bottom-12 md:left-24 md:right-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-white/10 pt-6 z-10">
          <div className="flex gap-8">
            <a
              href="#"
              className="text-xs tracking-[0.2em] text-white/50 hover:text-white uppercase font-sans transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-xs tracking-[0.2em] text-white/50 hover:text-white uppercase font-sans transition-colors"
            >
              Instagram
            </a>
          </div>
          <div className="text-left md:text-right">
            <a
              href="mailto:info@mekagroup.in"
              className="text-sm md:text-base font-sans font-light text-white hover:text-[#0ea5a4] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#0ea5a4] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-500"
            >
              info@mekagroup.in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
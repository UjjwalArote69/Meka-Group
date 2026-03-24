/* eslint-disable react-hooks/set-state-in-effect */
// src/components/Navbar.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════════════════
// 1. UPDATED DATA WITH DROPDOWN CHILDREN
// ════════════════════════════════════════
const leftLinks = [
  { name: "Home", path: "/" },
  { 
    name: "Our Legacy", 
    path: "/about",
    children: [
      { name: "About Us", path: "/about" },
      { name: "Board of Directors", path: "/about#board" },
      { name: "Our Values", path: "/about#values" },
    ]
  },
  { 
    name: 'Business', 
    path: "/business",
    children: [
      { name: "Marine Construction", path: "/business#marine" },
      { name: "Dredging & Reclamation", path: "/business#dredging" },
      { name: "Port", path: "/business#port" },
      { name: "Urban Infrastructure", path: "/business#infrastructure" },
      { name: "Real Estate", path: "/business#estate" },
    ]
  },
];

const rightLinks = [
  { 
    name: "Companies", 
    path: "/companies",
    children: [
      { name: "Amma Lines", path: "/companies" },
      { name: "Meka Dredging", path: "/companies" },
      { name: "Meka Infrastructure", path: "/companies" },
    ]
  },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const allLinks = [...leftLinks, ...rightLinks];

const menuImages = {
  "/": "/frames/frame_0001.webp",
  "/about": "/frames/frame_0050.webp",
  "/expertise": "/frames/frame_0080.webp",
  "/careers": "/frames/frame_0040.webp",
  "/companies": "/frames/frame_0040.webp",
  "/projects": "/frames/frame_0100.webp",
  "/contact": "/frames/frame_0120.webp",
};

// ════════════════════════════════════════
// 2. EXISTING FLIP LINK
// ════════════════════════════════════════
function FlipLink({ to, children, isActive, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="nav-flip-link relative inline-flex flex-col overflow-hidden h-4 group"
    >
      <span
        className={`block md:text-[55px] xl:text-xs font-sans font-extrabold uppercase tracking-[0.18em] transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full ${
          isActive ? "md:text-black font-extrabold underline underline-offset-2" : "md:text-black/50 "
        }`}
      >
        {children} 
      </span>
      <span className="block md:text-[55px] xl:text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#0ea5a4] transition-transform duration-[420ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {children} 
      </span>
      {isActive && (
        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0ea5a4]" />
      )}
    </Link>
  );
}

// ════════════════════════════════════════
// 3. NEW: DROPDOWN WRAPPER COMPONENT
// ════════════════════════════════════════
function DesktopNavItem({ link, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const hasChildren = link.children && link.children.length > 0;

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing so the mouse can easily move into the dropdown
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useGSAP(() => {
    if (!dropdownRef.current) return;
    
    if (isOpen) {
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,      // Animates opacity and visibility
        y: 0,              // Slides up into place
        duration: 0.3,
        ease: "power2.out",
        display: "block",
      });
    } else {
      gsap.killTweensOf(dropdownRef.current);
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        y: 10,             // Slides down slightly when hiding
        duration: 0.2,
        ease: "power2.in",
        display: "none",
      });
    }
  }, [isOpen]);

  return (
    <div 
      className="relative flex items-center h-full py-4" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <FlipLink to={link.path} isActive={isActive}>
        {link.name} 
      </FlipLink>

      {hasChildren && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 pt-4 hidden opacity-0 translate-y-2 md:text-black z-50 min-w-[260px]"
        >
          {/* Dropdown Panel Design */}
          <div className="bg-[#0c0c0c] border border-white/[0.08] p-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-sm">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#0ea5a4] to-transparent mb-2 opacity-50" />
            
            {link.children.map((child) => (
              <Link 
                key={child.name} 
                to={child.path} 
                className="group/item flex items-center gap-3 px-4 py-3 transition-colors duration-300 hover:bg-white/[0.04] rounded-sm"
              >
                <span className="text-sm font-sans font-medium text-white/60 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300">
                  {child.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════
// MAIN NAVBAR
// ════════════════════════════════════════
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const progressRef = useRef(null);
  const menuImageRef = useRef(null);
  const tl = useRef(null);
  const location = useLocation();

  const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

  // ════════════════════════════════════════
  // SCROLL — hide/show + compact + progress
  // ════════════════════════════════════════
  useGSAP(() => {
    const showAnim = gsap
      .from(headerRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.5,
        ease: "power3.out",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        gsap.set(progressRef.current, { scaleX: self.progress });

        if (self.direction === 1 && !isMenuOpen) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
        setIsScrolled(self.scrollY > 60);
      },
    });
  }, { scope: headerRef, dependencies: [isMenuOpen] });

  // ════════════════════════════════════════
  // ENTRANCE
  // ════════════════════════════════════════
  useGSAP(() => {
    const entranceTl = gsap.timeline({ delay: 1.8 });

    entranceTl
      .fromTo(
        ".nav-logo",
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      )
      .fromTo(
        ".nav-flip-link",
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".nav-cta",
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        ".nav-hamburger",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.3"
      );
  }, { scope: headerRef });

  // ════════════════════════════════════════
  // FULLSCREEN MENU TIMELINE
  // ════════════════════════════════════════
  useGSAP(() => {
    gsap.set(menuRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    gsap.set(".menu-link-row", {
      y: 80,
      opacity: 0,
      rotateX: -40,
      transformPerspective: 1200,
    });
    gsap.set(".menu-footer-content", { opacity: 0, y: 20 });
    gsap.set(".menu-bg-text", { opacity: 0, scale: 0.95, rotateZ: -3 });
    gsap.set(".menu-image-frame", { opacity: 0, scale: 0.92 });
    gsap.set(".menu-counter", { opacity: 0 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "expo.inOut",
      })
      .to(".menu-bg-text", {
        opacity: 0.025,
        scale: 1,
        rotateZ: 0,
        duration: 1.5,
        ease: "power3.out",
      }, "-=0.6")
      .to(".menu-image-frame", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }, "-=1.0")
      .to(".menu-link-row", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: "power3.out",
      }, "-=0.8")
      .to(".menu-counter", {
        opacity: 1,
        duration: 0.5,
      }, "-=0.5")
      .to(".menu-footer-content", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      }, "-=0.4");
  }, { scope: menuRef });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      document.body.style.overflow = "auto";
      setHoveredMenuIndex(null);
    }
  }, [isMenuOpen]);

  // ════════════════════════════════════════
  // MENU IMAGE SWAP
  // ════════════════════════════════════════
  useEffect(() => {
    if (hoveredMenuIndex === null || !menuImageRef.current) return;
    const img = menuImageRef.current;
    gsap.to(img, {
      opacity: 0,
      scale: 1.05,
      duration: 0.15,
      onComplete: () => {
        img.src = menuImages[allLinks[hoveredMenuIndex]?.path] || "/frames/frame_0001.webp";
        gsap.to(img, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
      },
    });
  }, [hoveredMenuIndex]);

  return (
    <>
      {/* ── SCROLL PROGRESS BAR ── */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[200] pointer-events-none">
        <div
          ref={progressRef}
          className="h-full bg-[#0ea5a4] origin-left scale-x-0"
        />
      </div>

      {/* ═══════════════════════════════════════════════
          HEADER
          ═══════════════════════════════════════════════ */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-[150] text-white md:text-3xl transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a] py-3 shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* ── LEFT LINKS (Updated to use DesktopNavItem) ── */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 h-full">
            {leftLinks.map((link) => (
              <DesktopNavItem key={link.name} link={link} isActive={isActive(link.path)} />
            ))}
          </nav>

          {/* ── LOGO ── */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="nav-logo relative z-160 flex items-center justify-center flex-shrink-0 group"
          >
            <img
              src="/logo.png"
              alt="Meka Group"
              className={`w-auto object-contain transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:brightness-125 ${
                isScrolled ? "h-7 md:h-8" : "h-8 md:h-12"
              }`}
            />
          </Link>

          {/* ── RIGHT SIDE (Updated to use DesktopNavItem) ── */}
          <div className="flex items-center gap-7 xl:gap-9 flex-1 justify-end">
            <nav className="hidden lg:flex md:text-2xl items-center gap-7 xl:gap-9 h-full">
              {rightLinks.map((link) => {
                if (link.name === "Contact") {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="nav-cta relative text-[35px] xl:text-xs font-sans font-semibold uppercase tracking-[0.18em] px-7 py-2.5 overflow-hidden group border-2 text-black border-black/20 hover:border-[#0ea5a4] transition-colors duration-500 ml-2"
                    >
                      <span className="absolute  inset-0 bg-[#0ea5a4] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                      <span className="relative z-10 group-hover:text-[#050505] transition-colors duration-300">
                        {link.name}
                      </span>
                    </Link>
                  );
                }
                return (
                  <DesktopNavItem key={link.name} link={link} isActive={isActive(link.path)} />
                );
              })}
            </nav>

            {/* ── HAMBURGER ── */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="nav-hamburger relative z-[160] flex items-center gap-3 lg:hidden group cursor-pointer"
            >
              <span className="text-[9px] font-sans font-semibold tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors hidden sm:block">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
              <div className="w-7 h-[14px] flex flex-col justify-between items-end relative">
                <span
                  className={`h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isMenuOpen
                      ? "w-full rotate-45 absolute top-1/2 -translate-y-1/2"
                      : "w-full group-hover:w-3/5"
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isMenuOpen
                      ? "w-0 opacity-0 absolute top-1/2"
                      : "w-3/5 group-hover:w-full"
                  }`}
                />
                <span
                  className={`h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    isMenuOpen
                      ? "w-full -rotate-45 absolute top-1/2 -translate-y-1/2"
                      : "w-4/5 group-hover:w-2/5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          FULLSCREEN MENU (Unchanged)
          ═══════════════════════════════════════════════ */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[140] bg-[#050505] text-white overflow-hidden"
      >
        <div className="menu-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[24vw] font-sans font-black text-white pointer-events-none select-none z-0 whitespace-nowrap">
          MEKA
        </div>

        <div className="relative z-10 h-full flex flex-col lg:flex-row">
          {/* LEFT — LINKS */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-28 lg:pt-0">
            <nav className="flex flex-col gap-1 md:gap-2">
              {allLinks.map((link, i) => (
                <div key={i} className="overflow-hidden py-2">
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={() => setHoveredMenuIndex(i)}
                    onMouseLeave={() => setHoveredMenuIndex(null)}
                    className={`menu-link-row flex items-center gap-6 md:gap-10 group transform-gpu origin-top transition-opacity duration-300 ${
                      hoveredMenuIndex !== null && hoveredMenuIndex !== i
                        ? "opacity-15"
                        : "opacity-100"
                    }`}
                  >
                    <span className="text-[10px] md:text-xs font-sans font-semibold tracking-[0.3em] text-[#0ea5a4] w-8">
                      0{i + 1}
                    </span>

                    <span className="relative overflow-hidden h-8 block">
                      <span className="block text-4xl sm:text-5xl md:text-[5.5rem] font-serif uppercase tracking-tighter transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full leading-[1.1]">
                        {link.name}
                      </span>
                      <span className="block text-4xl sm:text-5xl md:text-[5.5rem] font-serif uppercase tracking-tighter text-[#0ea5a4] absolute top-full left-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full leading-[1.1]">
                        {link.name}
                      </span>
                    </span>

                    <svg
                      className="w-5 h-5 md:w-7 md:h-7 text-[#0ea5a4] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </Link>
                </div>
              ))}
            </nav>

           
          </div>

          {/* RIGHT — IMAGE */}
          <div className="menu-image-frame hidden lg:flex w-[42%] xl:w-[38%] items-center justify-center pr-16 xl:pr-24">
            <div className="relative w-full aspect-[3/4] max-h-[70vh] overflow-hidden bg-[#0a0a0a]">
              <img
                ref={menuImageRef}
                src="/frames/frame_0001.webp"
                alt="Navigation preview"
                className="w-full h-full object-cover grayscale opacity-50 transition-[filter] duration-700 hover:grayscale-0 hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-[#050505]/30 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/40">
                  {allLinks[hoveredMenuIndex ?? 0]?.name ?? "Home"}
                </span>
                <span className="font-sans text-[30px] uppercase tracking-[0.3em] text-[#0ea5a4]">
                  Meka Group
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="menu-footer-content absolute bottom-6 left-8 right-8 md:bottom-10 md:left-16 md:right-16 lg:left-24 lg:right-24 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-t border-white/[0.06] pt-5 z-20">
          <div className="flex gap-6">
            {["LinkedIn", "Instagram"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[15px] tracking-[0.2em] text-white/30 hover:text-white uppercase font-sans transition-colors duration-300"
              >
                {s}
              </a>
            ))}
          </div>
          <a
            href="mailto:info@mekagroup.in"
            className="text-sm font-sans font-light text-white/70 hover:text-[#0ea5a4] transition-colors duration-300 relative group"
          >
            info@mekagroup.in
            <span className="absolute bottom-0 left-0 w-full h-px bg-[#0ea5a4] scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left transition-transform duration-500" />
          </a>
        </div>
      </div>
    </>
  );
}
/* eslint-disable react-hooks/set-state-in-effect */
// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; 
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Our Legacy", path: "/about" },
  { name: "Expertise", path: "/expertise" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Tracks which link is hovered
  
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const tl = useRef(null);

  // 1. Smart Scroll Behavior
  useGSAP(() => {
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: "power2.out"
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && !isMenuOpen) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }

        if (self.scrollY > 50) {
          headerRef.current.classList.add("bg-black/90", "backdrop-blur-lg", "py-4", "shadow-xl", "border-white/5");
          headerRef.current.classList.remove("py-6", "bg-transparent", "border-transparent");
        } else {
          headerRef.current.classList.remove("bg-black/90", "backdrop-blur-lg", "py-4", "shadow-xl", "border-white/5");
          headerRef.current.classList.add("py-6", "bg-transparent", "border-transparent");
        }
      }
    });
  }, { scope: headerRef, dependencies: [isMenuOpen] });

  // 2. Full Screen Menu 3D Animation Timeline
  useGSAP(() => {
    gsap.set(menuRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
    // Setup for 3D fold reveal
    gsap.set(".nav-link-wrap", { y: 100, rotationX: -50, opacity: 0, transformPerspective: 1000 });
    gsap.set(".nav-footer", { opacity: 0, y: 30 });
    gsap.set(".menu-watermark", { opacity: 0, scale: 0.9 });

    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "expo.inOut"
      })
      .to(".menu-watermark", {
        opacity: 0.03,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }, "-=0.8")
      .to(".nav-link-wrap", {
        y: 0,
        rotationX: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out"
      }, "-=1.0")
      .to(".nav-footer", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");
  }, { scope: menuRef });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      document.body.style.overflow = "auto";
      setHoveredIndex(null); // Reset hover state on close
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* --- THE MAIN SMART HEADER --- */}
      <header 
        ref={headerRef} 
        className="fixed top-0 left-0 w-full z-100 px-6 md:px-12 py-6 flex justify-between items-center text-white transition-all duration-500 border-b border-transparent"
      >
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="relative z-110 flex items-center">
          {/* Constrained the logo size to prevent layout shifts */}
          <img src="/logo.png" alt="Meka Group" className="h-6 md:h-12 w-auto object-contain" />
        </Link>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-110 text-xs md:text-sm font-sans font-medium tracking-[0.2em] uppercase flex items-center gap-4 overflow-hidden group"
        >
          <div className="relative h-4 w-12 hidden md:block">
            <span className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-full">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
            <span className="absolute inset-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-[#0ea5a4]">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
          </div>
          <span className="md:hidden">{isMenuOpen ? "Close" : "Menu"}</span>

          {/* Upgraded Hamburger Icon */}
          <div className="w-8 h-2.5 flex flex-col justify-between items-end relative">
            <span className={`h-[1.5px] bg-white transition-all duration-500 ease-in-out ${isMenuOpen ? 'w-full rotate-45 absolute top-1/2 -translate-y-1/2' : 'w-full group-hover:w-2/3'}`} />
            <span className={`h-[1.5px] bg-white transition-all duration-500 ease-in-out ${isMenuOpen ? 'w-full -rotate-45 absolute top-1/2 -translate-y-1/2' : 'w-2/3 group-hover:w-full'}`} />
          </div>
        </button>
      </header>

      {/* --- THE FULL SCREEN MENU OVERLAY --- */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 z-90 bg-[#050505] text-white flex flex-col justify-center px-6 md:px-24 overflow-hidden"
      >
        {/* Massive Background Watermark */}
        <div className="menu-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-sans font-black text-white pointer-events-none select-none z-0">
          MEKA
        </div>

        <nav className="flex flex-col gap-2 md:gap-4 mt-12 z-10 relative w-fit">
          {navLinks.map((link, i) => (
            <div key={i} className="overflow-hidden py-2">
              <Link 
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Sibling dimming logic applied here
                className={`nav-link-wrap flex items-center gap-6 md:gap-12 group transform-gpu origin-top transition-opacity duration-300 ${
                  hoveredIndex !== null && hoveredIndex !== i ? 'opacity-20' : 'opacity-100'
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

        {/* Minimalist Menu Footer */}
        <div className="nav-footer absolute bottom-8 left-6 right-6 md:bottom-12 md:left-24 md:right-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-white/10 pt-6 z-10">
          <div className="flex gap-8">
            <a href="#" className="text-xs tracking-[0.2em] text-white/50 hover:text-white uppercase font-sans transition-colors">LinkedIn</a>
            <a href="#" className="text-xs tracking-[0.2em] text-white/50 hover:text-white uppercase font-sans transition-colors">Instagram</a>
          </div>
          <div className="text-left md:text-right">
            <a href="mailto:info@mekagroup.in" className="text-sm md:text-base font-sans font-light text-white hover:text-[#0ea5a4] transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#0ea5a4] after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-500">
              info@mekagroup.in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
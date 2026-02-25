// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom
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
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const tl = useRef(null);

  // 1. Smart Scroll Behavior (Hide on scroll down, show on scroll up)
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
        // If scrolling down, hide header. If scrolling up, show it.
        if (self.direction === 1 && !isMenuOpen) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }

        // Add background blur if we have scrolled past the top
        if (self.scrollY > 50) {
          headerRef.current.classList.add("bg-black/80", "backdrop-blur-md", "py-4");
          headerRef.current.classList.remove("py-6", "bg-transparent");
        } else {
          headerRef.current.classList.remove("bg-black/80", "backdrop-blur-md", "py-4");
          headerRef.current.classList.add("py-6", "bg-transparent");
        }
      }
    });
  }, { scope: headerRef, dependencies: [isMenuOpen] });

  // 2. Full Screen Menu Animation Timeline
  useGSAP(() => {
    // Setup initial state for the menu overlay
    gsap.set(menuRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
    gsap.set(".nav-link-wrap", { yPercent: 100, rotationZ: 5, opacity: 0 });
    gsap.set(".nav-footer", { opacity: 0, y: 20 });

    tl.current = gsap.timeline({ paused: true })
      // Unveil the dark overlay
      .to(menuRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "expo.inOut"
      })
      // Swing the links up sequentially
      .to(".nav-link-wrap", {
        yPercent: 0,
        rotationZ: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4")
      // Fade in the bottom footer info
      .to(".nav-footer", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");
  }, { scope: menuRef });

  // Trigger menu timeline when state changes
  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
      // Lock body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      tl.current.reverse();
      // Restore body scroll
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* --- THE MAIN SMART HEADER --- */}
      <header 
        ref={headerRef} 
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center text-white transition-all duration-300 border-b border-transparent"
      >
        {/* Brand Logo / Text */}
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="relative z-[110]">
          <span className="text-xl md:text-2xl font-bold tracking-widest uppercase">
            <img src="/logo.png" alt="" />
          </span>
        </Link>

        {/* Menu Toggle Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-[110] text-xs md:text-sm font-medium tracking-[0.2em] uppercase uppercase flex items-center gap-3 overflow-hidden group"
        >
          <span className="hidden md:block transition-transform duration-300 group-hover:-translate-y-full absolute">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <span className="hidden md:block transition-transform duration-300 translate-y-full group-hover:translate-y-0">
            {isMenuOpen ? "Close" : "Menu"}
          </span>
          <span className="md:hidden">{isMenuOpen ? "Close" : "Menu"}</span>

          {/* Animated Hamburger Icon */}
          <div className="w-8 h-3 flex flex-col justify-between items-end relative">
            <span className={`h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'w-full rotate-45 absolute top-1/2 -translate-y-1/2' : 'w-full'}`} />
            <span className={`h-[1px] bg-white transition-all duration-500 ${isMenuOpen ? 'w-full -rotate-45 absolute top-1/2 -translate-y-1/2' : 'w-2/3'}`} />
          </div>
        </button>
      </header>

      {/* --- THE FULL SCREEN MENU OVERLAY --- */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 z-[90] bg-[#0a0a0a] text-white flex flex-col justify-center px-6 md:px-24"
      >
        <nav className="flex flex-col gap-4 md:gap-8 mt-12">
          {navLinks.map((link, i) => (
            <div key={i} className="overflow-hidden">
              <Link 
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="nav-link-wrap flex items-center gap-6 group transform-gpu origin-bottom-left"
              >
                <span className="text-sm md:text-xl font-medium tracking-[0.3em] text-white/30 transition-colors duration-300 group-hover:text-[#0ea5a4]">
                  0{i + 1}
                </span>
                <span className="text-5xl md:text-8xl font-serif tracking-tight transition-transform duration-500 group-hover:translate-x-4">
                  {link.name}
                </span>
              </Link>
            </div>
          ))}
        </nav>

        {/* Menu Footer (Contact info) */}
        {/* <div className="nav-footer absolute bottom-12 left-6 right-6 md:left-24 md:right-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-white/10 pt-8">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">Corporate Office</p>
            <p className="text-sm md:text-base font-light">Meka Tower, Marine Drive<br/>Mumbai, Maharashtra, India</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">Inquiries</p>
            <a href="mailto:info@mekagroup.in" className="text-sm md:text-base font-light hover:text-[#0ea5a4] transition-colors">
              info@mekagroup.in
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}
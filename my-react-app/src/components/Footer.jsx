/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Reveal Animation for the entire footer content
      gsap.from(".footer-reveal", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });

      // 2. Parallax effect for the Giant Watermark
      gsap.to(".giant-watermark", {
        y: -100,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 3. Magnetic effect for social links
      const socialLinks =
        gsap.utils.toArray(
          ".social-link",
        );
      socialLinks.forEach((link) => {
        link.addEventListener(
          "mousemove",
          (e) => {
            const rect =
              link.getBoundingClientRect();
            const x =
              e.clientX -
              rect.left -
              rect.width / 2;
            const y =
              e.clientY -
              rect.top -
              rect.height / 2;
            gsap.to(link, {
              x: x * 0.5,
              y: y * 0.5,
              duration: 0.3,
              ease: "power2.out",
            });
          },
        );
        link.addEventListener(
          "mouseleave",
          () => {
            gsap.to(link, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)",
            });
          },
        );
      });
    },
    { scope: footerRef },
  );

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#050505] text-white pt-32 pb-12 overflow-hidden relative"
    >
      <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          {/* Brand Column - Using Official Logo */}
          <div className="footer-reveal lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              {/* Official Logo Integration */}

              <h2 className="text-3xl font-black tracking-tighter uppercase leading-none">
                Meka
                <span className="text-[#0ea5a4]">
                  .
                </span>
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              Engineering the future of
              maritime infrastructure.
              Precision in execution,
              power in performance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-reveal">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-10">
              Directory
            </h4>

            <ul className="space-y-4">
              {[
                "Home",
                "About",
                "Fleet",
                "Projects",
                "Contact",
              ].map((item) => {
                const isContact =
                  item === "Contact";
                const path = isContact
                  ? "/contact"
                  : `/#${item.toLowerCase()}`;

                return (
                  <li key={item}>
                    {isContact ? (
                      <Link
                        to="/contact"
                        className="text-lg font-light text-white/60 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-0 h-px bg-[#0ea5a4] group-hover:w-4 transition-all duration-300"></span>
                        {item}
                      </Link>
                    ) : (
                      <a
                        href={path}
                        className="text-lg font-light text-white/60 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span className="w-0 h-px bg-[#0ea5a4] group-hover:w-4 transition-all duration-300"></span>
                        {item}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-reveal">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-10">
              Global Office
            </h4>
            <div className="space-y-6 text-sm">
              <p className="text-white/60 leading-relaxed font-light">
                Meka Towers, Coastal
                Road,
                <br />
                Marine Drive, Mumbai -
                400021
                <br />
                Maharashtra, India
              </p>
              <div className="space-y-2">
                <p className="text-white hover:text-[#0ea5a4] transition-colors flex items-center gap-2">
                  <span className="text-[#0ea5a4]">
                    E:
                  </span>{" "}
                  info@mekagroup.com
                </p>
                <p className="text-white flex items-center gap-2">
                  <span className="text-[#0ea5a4]">
                    P:
                  </span>{" "}
                  +91 (022) 2345 6789
                </p>
              </div>
            </div>
          </div>

          {/* Socials - With Magnetic Effect */}
          <div className="footer-reveal">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-10">
              Presence
            </h4>
            <div className="flex flex-wrap gap-4">
              {[
                "LinkedIn",
                "Instagram",
                "Twitter",
                "Facebook",
              ].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="social-link px-4 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-reveal border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              © 2026 Meka Group
            </p>
            <div className="hidden md:flex gap-6">
              <a
                href="#"
                className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
          </div>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-[#0ea5a4] transition-colors"
          >
            Back to Top
            <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#0ea5a4] group-hover:-translate-y-1 transition-all">
              ↑
            </span>
          </button>
        </div>
      </div>

      {/* Giant Background Watermark - High End Detail */}
      <div className="giant-watermark absolute bottom-[-5%] left-0 w-full opacity-[0.03] select-none pointer-events-none flex justify-center translate-y-20">
        <h1 className="text-[25vw] leading-none font-black uppercase tracking-tighter whitespace-nowrap">
          MEKA GROUP
        </h1>
      </div>
    </footer>
  );
};

export default Footer;

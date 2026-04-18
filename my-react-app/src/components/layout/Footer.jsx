
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".footer-reveal", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
    });

    // Watermark parallax + magnetic social links are desktop-only.
    // scrub-linked ScrollTrigger + per-link mousemove are expensive on mobile.
    if (isMobile) return;

    gsap.to(".giant-watermark", {
      y: -100,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    const socialLinks = gsap.utils.toArray(".social-link");
    const handlers = [];
    socialLinks.forEach((link) => {
      const onMove = (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.5, y: y * 0.5, duration: 0.3, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };
      link.addEventListener("mousemove", onMove);
      link.addEventListener("mouseleave", onLeave);
      handlers.push({ link, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ link, onMove, onLeave }) => {
        link.removeEventListener("mousemove", onMove);
        link.removeEventListener("mouseleave", onLeave);
      });
    };
  }, { scope: footerRef, dependencies: [isMobile] });

  return (
    <footer ref={footerRef} className="w-full bg-[#050505] text-white pt-32 pb-12 overflow-hidden relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          
          <div className="footer-reveal">
            <h2 className="text-3xl font-serif uppercase tracking-tighter mb-8">
              Meka<span className="text-[#0ea5a4]">.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light uppercase tracking-tight">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="footer-reveal">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-10">{t("footer.directory")}</h4>
            <ul className="space-y-4">
              {[
                { name: t("nav.home"), path: "/" },
                { name: t("nav.aboutUs"), path: "/about" },
                { name: t("nav.business"), path: "/business" },
                { name: t("nav.projects"), path: "/projects" },
                { name: t("nav.companies"), path: "/companies" },
                { name: t("nav.careers"), path: "/careers" },
                { name: t("nav.contact"), path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-lg font-serif uppercase text-white/40 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#0ea5a4] group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-reveal">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-10">{t("footer.headquarters")}</h4>
            <div className="space-y-6 text-sm">
              <p className="text-white/40 leading-relaxed font-light uppercase tracking-tight">
                {t("footer.addressLine1")}<br />
                {t("footer.addressLine2")}
              </p>
              <div className="space-y-2 font-serif uppercase tracking-wider">
                <p className="text-white">info@mekagroup.in</p>
                <p className="text-white">+91 22 4089 0000</p>
              </div>
            </div>
          </div>

          <div className="footer-reveal">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-10">{t("footer.presence")}</h4>
            <div className="flex flex-wrap gap-3">
              {["LinkedIn", "Twitter"].map((social) => (
                <a key={social} href="#" className="social-link px-5 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest hover:bg-[#0ea5a4] hover:text-black hover:border-[#0ea5a4] transition-all duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-reveal border-t border-white/5 pt-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 text-center md:text-left">
            {t("footer.copyright")}
          </p>
        </div>
      </div>

      <div className="giant-watermark absolute bottom-[-5%] left-0 w-full opacity-[0.02] select-none pointer-events-none flex justify-center translate-y-20">
        <h1 className="text-[22vw] 2xl:text-[22rem] leading-none font-serif uppercase tracking-tighter whitespace-nowrap">
          MEKA GROUP
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
/* eslint-disable react-hooks/immutability */
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

const LANGUAGES = [
  { code: "en", label: "English", flag: "EN" },
  { code: "hi", label: "हन्दी", flag: "हिं" },
  { code: "ar", label: "العربية", flag: "عر" },
];

export default function LanguageSwitcher({ variant = "light" }) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const panelRef = useRef(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const changeLang = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = code;
    setIsOpen(false);
  };

  // Set initial dir on mount
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Animate dropdown
  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.to(panelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        display: "block",
      });
    } else {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        y: 8,
        duration: 0.2,
        ease: "power2.in",
        display: "none",
      });
    }
  }, [isOpen]);

  const isDark = variant === "dark";

  return (
    <div ref={dropdownRef} className="relative z-[200]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-full text-[10px] font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
          isDark
            ? "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
            : "border-black/15 text-black/50 hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
        }`}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
        {currentLang.flag}
        <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>

      <div
        ref={panelRef}
        className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-2 hidden opacity-0 translate-y-2 min-w-[140px]"
      >
        <div className={`border p-1 shadow-xl rounded-sm ${isDark ? "bg-[#0c0c0c] border-white/[0.08]" : "bg-white border-black/[0.08]"}`}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLang(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-left rtl:text-right transition-colors duration-200 cursor-pointer ${
                lang.code === i18n.language
                  ? "bg-[#0ea5a4]/10 text-[#0ea5a4]"
                  : isDark
                    ? "text-white/60 hover:bg-white/[0.04] hover:text-white"
                    : "text-black/60 hover:bg-black/[0.04] hover:text-black"
              }`}
            >
              <span className="text-xs font-bold w-6">{lang.flag}</span>
              <span className="text-[11px] font-sans font-medium tracking-wide">{lang.label}</span>
              {lang.code === i18n.language && (
                <svg className="w-3 h-3 ml-auto rtl:mr-auto rtl:ml-0 text-[#0ea5a4]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Marine EPC",
    message: "",
  });

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Hero Text Reveal
      tl.fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      // 2. Sidebar Elements Fade In
      gsap.fromTo(".sidebar-item", 
        { opacity: 0, x: -30 }, 
        {
          opacity: 1, x: 0, stagger: 0.1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 75%" }
        }
      );

      // 3. Form Fade In
      gsap.fromTo(".form-container", 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, y: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 75%" }
        }
      );
    },
    { scope: containerRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for EmailJS
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => alert("Mission Protocol Initiated: Message Sent."))
      .catch(() => alert("Transmission Interrupted: Please try again."));
  };

  return (
    <>
      <main
        ref={containerRef}
        className="bg-[#f5f5f0] min-h-screen text-[#050505] selection:bg-[#0ea5a4] selection:text-white relative overflow-x-hidden"
      >
        {/* ── Architectural Structural Line ── */}
        <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

        {/* ═══════════════════════════════════════
            1. HERO (Editorial Layout)
            ═══════════════════════════════════════ */}
        <section className="hero-section relative w-full pt-48 pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[60vh] md:min-h-[70vh]">
          
          {/* Blueprint Grid */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

          <div className="relative z-10 w-full max-w-[1600px] mx-auto">
            <span className="hero-subtitle block text-[#0ea5a4] text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase font-bold mb-6 md:mb-8">
              Global Partnerships
            </span>

            <h1 className="text-[18vw] md:text-[16vw] lg:text-[11vw] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-8 md:mb-10">
              <span className="block overflow-hidden py-5 -my-5">
                <span className="hero-word block">Connect</span>
              </span>
              <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
                <span className="hero-word block text-black/20">Intelligence</span>
              </span>
            </h1>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            2. THE EDITORIAL GRID
            ═══════════════════════════════════════ */}
        <section className="contact-grid relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* LEFT: STICKY INFO PANEL */}
            <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-16">
              
              <div className="sidebar-item group">
                <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold mb-6">
                  Headquarters
                </h4>
                <div className="flex gap-5">
                  <MapPin size={22} className="text-black/30 mt-1 shrink-0" />
                  <p className="text-base md:text-lg text-gray-700 font-sans leading-relaxed uppercase font-medium">
                    2nd, Madhuli, Dr Annie Besant Rd,
                    <br />
                    Shiv Sagar Estate, Worli,
                    <br />
                    Mumbai 400018
                  </p>
                </div>
              </div>

              <div className="sidebar-item space-y-8">
                <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold mb-6">
                  Direct Channels
                </h4>
                <a href="mailto:info@mekagroup.in" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#0ea5a4] group-hover:bg-[#0ea5a4] group-hover:text-white transition-all duration-500">
                    <Mail size={18} />
                  </div>
                  <span className="text-lg md:text-xl font-serif uppercase group-hover:text-[#0ea5a4] transition-colors">
                    info@mekagroup.in
                  </span>
                </a>
                <a href="tel:+9102240890000" className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#0ea5a4] group-hover:bg-[#0ea5a4] group-hover:text-white transition-all duration-500">
                    <Phone size={18} />
                  </div>
                  <span className="text-lg md:text-xl font-serif uppercase group-hover:text-[#0ea5a4] transition-colors">
                    +91 22 4089 0000
                  </span>
                </a>
              </div>

              <div className="sidebar-item p-8 bg-white border border-black/[0.05] shadow-sm rounded-sm">
                <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold mb-8 flex items-center gap-3">
                  <Globe size={16} /> Regional Hubs
                </h3>
                <ul className="space-y-5 text-xs font-sans tracking-widest uppercase text-black/50 font-semibold">
                  <li className="flex justify-between border-b border-black/[0.05] pb-3">
                    <span>Chennai, India</span> <span className="text-[#050505]">Operations</span>
                  </li>
                  <li className="flex justify-between border-b border-black/[0.05] pb-3">
                    <span>Doha, Qatar</span> <span className="text-[#050505]">ME Hub</span>
                  </li>
                  <li className="flex justify-between border-b border-black/[0.05] pb-3">
                    <span>Singapore</span> <span className="text-[#050505]">APAC Hub</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT: FORM PANEL */}
            <div className="lg:col-span-8">
              <div className="form-container bg-white border border-black/[0.05] shadow-xl p-8 md:p-16 rounded-sm">
                <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter mb-12 md:mb-16">
                  The Project Brief
                </h2>

                <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    {/* Name Input */}
                    <div className="relative group border-b border-black/20 focus-within:border-[#0ea5a4] transition-all duration-500">
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        className="w-full bg-transparent py-4 outline-none text-lg md:text-xl font-sans font-medium uppercase placeholder:text-black/30 placeholder:font-normal text-[#050505]"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative group border-b border-black/20 focus-within:border-[#0ea5a4] transition-all duration-500">
                      <input
                        type="email"
                        required
                        placeholder="Corporate Email"
                        className="w-full bg-transparent py-4 outline-none text-lg md:text-xl font-sans font-medium uppercase placeholder:text-black/30 placeholder:font-normal text-[#050505]"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Service Selector */}
                  <div>
                    <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-black/40 font-bold mb-6">
                      Inquiry Category
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {["Marine EPC", "Dredging", "Subsea", "Heavy Engineering", "Other"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: cat })}
                          className={`px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                            formData.subject === cat
                              ? "bg-[#0ea5a4] border-[#0ea5a4] text-white shadow-md"
                              : "border-black/10 text-black/50 hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="group border-b border-black/20 focus-within:border-[#0ea5a4] transition-all duration-500">
                    <textarea
                      rows="4"
                      required
                      placeholder="Brief description of the scope..."
                      className="w-full bg-transparent py-4 outline-none text-lg md:text-xl font-sans font-medium uppercase placeholder:text-black/30 placeholder:font-normal text-[#050505] resize-none"
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-6 px-12 py-5 bg-[#050505] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#0ea5a4] transition-all duration-700 overflow-hidden rounded-sm shadow-lg hover:shadow-2xl"
                  >
                    <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                    <span className="relative z-10">
                      Initiate Discussion
                    </span>
                    <ArrowRight
                      size={16}
                      className="relative z-10 group-hover:translate-x-2 transition-transform duration-500"
                    />
                  </button>
                </form>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER OUTSIDE MAIN */}
      <Footer />
    </>
  );
};

export default Contact;
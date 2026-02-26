import React, {
  useState,
  useRef,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  ArrowRight,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "Marine EPC",
      message: "",
    });

  useGSAP(
    () => {
      // 1. Hero Text Reveal (Matching About/Expertise)
      gsap.from(".contact-title span", {
        y: "110%",
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });

      // 2. Sidebar Elements Fade In
      gsap.from(".sidebar-item", {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      // 3. Floating Watermark Scroll Effect
      gsap.to(".contact-watermark", {
        y: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for EmailJS (Keep your existing Service/Template IDs)
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_PUBLIC_KEY",
      )
      .then(() =>
        alert(
          "Mission Protocol Initiated: Message Sent.",
        ),
      )
      .catch(() =>
        alert(
          "Transmission Interrupted: Please try again.",
        ),
      );
  };

  return (
    <main
      ref={containerRef}
      className="bg-[#050505] min-h-screen text-white selection:bg-[#0ea5a4]"
    >
      {/* --- 1. MINIMALIST HERO --- */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Background Blueprint Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="relative z-10">
          <span className="text-[#0ea5a4] text-[10px] md:text-xs font-sans tracking-[0.5em] uppercase mb-6 block">
            Global Partnerships
          </span>
          <h1 className="contact-title text-[15vw] md:text-[9vw] font-serif uppercase leading-[0.8] tracking-tighter">
            <span className="block overflow-hidden py-6 -my-2">
              Connect
            </span>
            <span className="block overflow-hidden py-6 -my-6 text-zinc-800">
              Intelligence
            </span>
          </h1>
        </div>
      </section>

      {/* --- 2. THE EDITORIAL GRID --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* LEFT: STICKY INFO PANEL */}
          <div className="lg:col-span-4 space-y-16">
            <div className="sticky top-32 space-y-16">
              <div className="sidebar-item group">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-6">
                  Headquarters
                </h4>
                <div className="flex gap-4">
                  <MapPin
                    size={20}
                    className="text-zinc-600 mt-1"
                  />
                  <p className="text-lg text-zinc-300 font-serif leading-relaxed uppercase">
                    2nd, Madhuli, Dr
                    Annie Besant Rd,
                    <br />
                    Shiv Sagar Estate,
                    Worli,
                    <br />
                    Mumbai 400018
                  </p>
                </div>
              </div>

              <div className="sidebar-item space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0ea5a4] font-bold mb-6">
                  Direct Channels
                </h4>
                <a
                  href="mailto:info@mekagroup.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#0ea5a4] transition-all duration-500">
                    <Mail size={16} />
                  </div>
                  <span className="text-xl font-serif uppercase group-hover:text-[#0ea5a4] transition-colors">
                    info@mekagroup.com
                  </span>
                </a>
                <a
                  href="tel:+9102240890000"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#0ea5a4] transition-all duration-500">
                    <Phone size={16} />
                  </div>
                  <span className="text-xl font-serif uppercase group-hover:text-[#0ea5a4] transition-colors">
                    +91 22 4089 0000
                  </span>
                </a>
              </div>

              <div className="sidebar-item p-8 bg-white/5 border border-white/10 rounded-sm">
                <h3 className="text-[10px] uppercase tracking-widest text-[#0ea5a4] mb-6 flex items-center gap-2">
                  <Globe size={14} />{" "}
                  Regional Hubs
                </h3>
                <ul className="space-y-4 text-xs font-sans tracking-widest uppercase text-zinc-400">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>
                      Chennai, India
                    </span>{" "}
                    <span className="text-white">
                      Operations
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>
                      Doha, Qatar
                    </span>{" "}
                    <span className="text-white">
                      ME Hub
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>
                      Singapore
                    </span>{" "}
                    <span className="text-white">
                      APAC Hub
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: SCROLLING FORM PANEL */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-950 border border-white/10 p-8 md:p-16 rounded-sm">
              <h2 className="text-3xl font-serif uppercase tracking-tight mb-16">
                The Project Brief
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Name Input */}
                  <div className="relative group border-b border-white/20 focus-within:border-[#0ea5a4] transition-all duration-500">
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      className="w-full bg-transparent py-4 outline-none text-xl font-serif uppercase placeholder:text-zinc-800"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target
                            .value,
                        })
                      }
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group border-b border-white/20 focus-within:border-[#0ea5a4] transition-all duration-500">
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email"
                      className="w-full bg-transparent py-4 outline-none text-xl font-serif uppercase placeholder:text-zinc-800"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email:
                            e.target
                              .value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Service Selector */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#0ea5a4] font-bold mb-6">
                    Inquiry Category
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Marine EPC",
                      "Dredging",
                      "Subsea",
                      "Heavy Engineering",
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            subject:
                              cat,
                          })
                        }
                        className={`px-6 py-2 border text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                          formData.subject ===
                          cat
                            ? "bg-[#0ea5a4] border-[#0ea5a4] text-black"
                            : "border-white/10 text-zinc-500 hover:border-white/40"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="group border-b border-white/20 focus-within:border-[#0ea5a4] transition-all duration-500">
                  <textarea
                    rows="4"
                    required
                    placeholder="Brief description of the scope..."
                    className="w-full bg-transparent py-4 outline-none text-xl font-serif uppercase placeholder:text-zinc-800 resize-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message:
                          e.target
                            .value,
                      })
                    }
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-6 px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#0ea5a4] hover:text-white transition-all duration-700 overflow-hidden"
                >
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

      <Footer />
    </main>
  );
};

export default Contact;

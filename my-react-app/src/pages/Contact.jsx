/* eslint-disable no-unused-vars */
import React, {
  useState,
  useRef,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "Marine Infrastructure",
      message: "",
    });

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.fromTo(
        ".contact-header",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
        },
      )
        .fromTo(
          ".contact-sidebar > *",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.1,
          },
          "-=1",
        )
        .fromTo(
          ".contact-form-container",
          {
            opacity: 0,
            scale: 0.95,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
          },
          "-=1.2",
        );

      gsap.to(".contact-watermark", {
        y: -100,
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

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData, // This contains name, email, subject, message
        "YOUR_PUBLIC_KEY",
      )
      .then(
        () => {
          alert(
            "Message sent successfully!",
          );
        },
        (error) => {
          alert(
            "Failed to send message...",
          );
        },
      );
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#050505] min-h-screen text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* BACKGROUND WATERMARK - Lowered opacity for better foreground readability */}
      <div className="contact-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/1.5 pointer-events-none select-none z-0 tracking-tighter uppercase">
        Contact
      </div>

      <div className="max-w-350 mx-auto relative z-10">
        {/* HEADER SECTION */}
        <div className="contact-header mb-20 md:mb-32">
          <p className="font-sans text-[#0ea5a4] text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-4">
            Global Partnerships
          </p>
          <h1 className="text-5xl md:text-8xl font-sans font-black uppercase tracking-tighter leading-none">
            Get in{" "}
            <span className="font-serif italic text-white/80 font-light lowercase tracking-tight">
              touch.
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* SIDEBAR */}
          <div className="contact-sidebar lg:col-span-4 space-y-16">
            <div className="group">
              <h4 className="text-[11px] uppercase tracking-[0.4em] text-[#0ea5a4] font-black mb-6">
                Headquarters
              </h4>
              <div className="flex gap-4 items-start">
                <MapPin
                  size={22}
                  className="text-[#0ea5a4] shrink-0 mt-1"
                />
                <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed">
                  2nd, Madhuli
                  Apartments, <br />
                  Dr Annie Besant Rd,{" "}
                  <br />
                  Shiv Sagar Estate,
                  Worli, <br />
                  Mumbai, Maharashtra
                  400018
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.4em] text-[#0ea5a4] font-black mb-6">
                Direct Channels
              </h4>
              <a
                href="mailto:info@mekagroup.com"
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#0ea5a4] group-hover:bg-[#0ea5a4]/10 transition-all duration-300">
                  <Mail
                    size={18}
                    className="text-white group-hover:text-[#0ea5a4]"
                  />
                </div>
                <span className="text-xl md:text-2xl font-medium text-gray-200 group-hover:text-[#0ea5a4] transition-colors">
                  info@mekagroup.com
                </span>
              </a>
              <a
                href="tel:+9102240890000"
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#0ea5a4] group-hover:bg-[#0ea5a4]/10 transition-all duration-300">
                  <Phone
                    size={18}
                    className="text-white group-hover:text-[#0ea5a4]"
                  />
                </div>
                <span className="text-xl md:text-2xl font-medium text-gray-200 group-hover:text-[#0ea5a4] transition-colors">
                  +91 022 4089 0000
                </span>
              </a>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
              <h3 className="font-black text-xs uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                <Globe
                  size={18}
                  className="text-[#0ea5a4]"
                />{" "}
                Regional Hubs
              </h3>
              <ul className="space-y-4 text-base text-gray-300 font-medium">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>
                    Chennai, India
                  </span>{" "}
                  <span className="text-[#0ea5a4] text-xs">
                    Operations
                  </span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>
                    Doha, Qatar
                  </span>{" "}
                  <span className="text-[#0ea5a4] text-xs">
                    ME Hub
                  </span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Singapore</span>{" "}
                  <span className="text-[#0ea5a4] text-xs">
                    APAC Hub
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* FORM CONTAINER */}
          <div className="contact-form-container lg:col-span-8">
            <div className="bg-white/5 border border-white/10 p-8 md:p-14 rounded-3xl backdrop-blur-3xl shadow-2xl">
              <h2 className="text-3xl font-sans font-black uppercase tracking-tight mb-12">
                Project Brief
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12"
              >
                <div className="relative group">
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 outline-none focus:border-[#0ea5a4] transition-colors peer text-xl font-medium text-white"
                    placeholder=" "
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target
                          .value,
                      })
                    }
                  />
                  <label className="absolute left-0 top-4 text-white/50 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[11px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-[#0ea5a4] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-black">
                    Full Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b-2 border-white/20 py-4 outline-none focus:border-[#0ea5a4] transition-colors peer text-xl font-medium text-white"
                    placeholder=" "
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email:
                          e.target
                            .value,
                      })
                    }
                  />
                  <label className="absolute left-0 top-4 text-white/50 pointer-events-none transition-all peer-focus:-top-6 peer-focus:text-[11px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-[#0ea5a4] peer-[:not(:placeholder-shown)]:-top-6 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-black">
                    Corporate Email
                  </label>
                </div>

                <div className="md:col-span-2 relative">
                  <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#0ea5a4] font-black mb-6">
                    Service Category
                  </h4>
                  <div className="flex flex-wrap gap-4">
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
                        className={`px-8 py-3 rounded-full border-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                          formData.subject ===
                          cat
                            ? "bg-[#0ea5a4] border-[#0ea5a4] text-black"
                            : "border-white/10 hover:border-white/60 text-white/80"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 relative group mt-4">
                  <textarea
                    rows="5"
                    required
                    className="w-full bg-white/3 border-2 border-white/10 rounded-2xl p-6 outline-none focus:border-[#0ea5a4] transition-colors text-xl font-medium text-white placeholder-white/20 resize-none"
                    placeholder="Describe the scope of your project..."
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

                <div className="md:col-span-2 pt-6">
                  <button
                    type="submit"
                    className="group w-full md:w-auto px-16 py-6 bg-[#0ea5a4] text-black font-black text-sm uppercase tracking-[0.3em] rounded-full flex items-center justify-center gap-4 transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(14,165,164,0.3)]"
                  >
                    Initiate Discussion{" "}
                    <Send
                      size={18}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-40 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
        <p>
          © 2026 Meka Group. Precise
          Engineering. Global Scale.
        </p>
        <p className="text-white/60">
          Worli, Mumbai
        </p>
      </div>
    </div>
  );
};

export default Contact;

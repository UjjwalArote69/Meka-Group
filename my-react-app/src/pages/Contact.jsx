import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, ArrowRight, Loader2, CheckCircle, XCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { submitToGoogleSheet } from "../hooks/useGoogleSheet";
import { useContactPage } from "../hooks/useContactPage";
import { loc } from "../lib/locale";

gsap.registerPlugin(ScrollTrigger);

const VALID_SUBJECTS = ["Marine EPC", "Dredging", "Subsea", "Heavy Engineering", "Other"];

const Contact = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const data = useContactPage();
  const containerRef = useRef(null);
  const location = useLocation();
  const prefill = location.state?.prefill;

  const [formData, setFormData] = useState(() => {
    const base = { name: "", email: "", phone: "", subject: "Marine EPC", message: "" };
    if (!prefill) return base;

    const subject = VALID_SUBJECTS.includes(prefill.subject) ? prefill.subject : base.subject;
    const summaryLines = [
      prefill.type && `Project type: ${prefill.type}`,
      prefill.region && `Region: ${prefill.region}`,
      prefill.scale && `Scale: ${prefill.scale}`,
      prefill.entity && `Routed to: ${prefill.entity}`,
    ].filter(Boolean);
    const message = summaryLines.length
      ? `${summaryLines.join("\n")}\n\n`
      : "";

    return { ...base, subject, message };
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
        .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
        .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      gsap.fromTo(".sidebar-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 75%" }
        }
      );

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

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || status === "sending") return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Debug — remove after confirming emails work
    console.log("EmailJS Config:", { serviceId, templateId, publicKey: publicKey ? "***set***" : "MISSING" });
    console.log("Form Data:", formData);

    if (!serviceId || !templateId || !publicKey || templateId.includes("PASTE")) {
      console.error("EmailJS credentials not configured. Update your .env file.");
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Send to Google Sheets (fire-and-forget backup)
    submitToGoogleSheet({ ...formData, formType: "contact" });

    // Send email via EmailJS (primary)
    emailjs
      .send(serviceId, templateId, formData, publicKey)
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "Marine EPC", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      });
  };

  return (
    <>
      <Helmet>
        <title>Contact | Meka Group</title>
        <meta name="description" content="Get in touch with Meka Group for marine EPC, dredging, port development, and infrastructure projects. Headquarters in Mumbai, India." />
      </Helmet>

      <main
        ref={containerRef}
        className="bg-[#f5f5f0] min-h-screen text-[#050505] selection:bg-[#0ea5a4] selection:text-white relative overflow-x-hidden"
      >
        <div className="fixed left-8 md:left-16 top-0 bottom-0 w-px bg-black/[0.04] z-0 pointer-events-none hidden lg:block" />

        <section className="hero-section relative w-full pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh]">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "4rem 4rem" }} />

          <div className="relative z-10 w-full max-w-[1600px] mx-auto">
            <span className="hero-subtitle block text-[#0ea5a4] text-[10px] md:text-xs font-sans tracking-[0.4em] uppercase font-bold mb-6 md:mb-8">
              {loc(data.heroEyebrow, lang)}
            </span>

            <h1 className="text-[18vw] md:text-[16vw] lg:text-[11vw] 2xl:text-[10rem] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-8 md:mb-10">
              <span className="block overflow-hidden py-5 -my-5">
                <span className="hero-word block">{loc(data.heroTitleWord1, lang)}</span>
              </span>
              <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
                <span className="hero-word block text-black/20">{loc(data.heroTitleWord2, lang)}</span>
              </span>
            </h1>
          </div>
        </section>

        <section className="contact-grid relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-16">

              <div className="sidebar-item group">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold mb-6">
                  {loc(data.hqLabel, lang)}
                </h2>
                <div className="flex gap-5">
                  <MapPin size={22} className="text-black/30 mt-1 shrink-0" aria-hidden="true" />
                  <address className="text-base md:text-lg text-gray-700 font-sans leading-relaxed uppercase font-medium not-italic">
                    {data.addressLines.map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {loc(line, lang)}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </address>
                </div>
              </div>

              <div className="sidebar-item space-y-8">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold mb-6">
                  {loc(data.directChannelsLabel, lang)}
                </h2>
                <a href={`mailto:${data.email}`} className="flex items-center gap-5 group" aria-label={`Email ${data.email}`}>
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#0ea5a4] group-hover:bg-[#0ea5a4] group-hover:text-white transition-all duration-500">
                    <Mail size={18} aria-hidden="true" />
                  </div>
                  <span className="text-lg md:text-xl font-serif uppercase group-hover:text-[#0ea5a4] transition-colors">
                    {data.email}
                  </span>
                </a>
                <a href={`tel:${(data.phone || "").replace(/\s+/g, "")}`} className="flex items-center gap-5 group" aria-label={`Call ${data.phone}`}>
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#0ea5a4] group-hover:bg-[#0ea5a4] group-hover:text-white transition-all duration-500">
                    <Phone size={18} aria-hidden="true" />
                  </div>
                  <span className="text-lg md:text-xl font-serif uppercase group-hover:text-[#0ea5a4] transition-colors">
                    {data.phone}
                  </span>
                </a>
              </div>

              <div className="sidebar-item p-8 bg-white border border-black/[0.05] shadow-sm rounded-sm">
                <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#0ea5a4] font-bold mb-8 flex items-center gap-3">
                  <Globe size={16} aria-hidden="true" /> {loc(data.regionalHubsLabel, lang)}
                </h3>
                <ul className="space-y-5 text-xs font-sans tracking-widest uppercase text-black/50 font-semibold">
                  {data.regionalHubs.map((hub, i) => (
                    <li key={i} className="flex justify-between border-b border-black/[0.05] pb-3">
                      <span>{hub.city}</span> <span className="text-[#050505]">{loc(hub.role, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="form-container bg-white border border-black/[0.05] shadow-xl p-8 md:p-16 rounded-sm">
                <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter mb-12 md:mb-16">
                  {loc(data.formTitle, lang)}
                </h2>

                {/* Success/Error Banners */}
                {status === "success" && (
                  <div className="flex items-center gap-3 p-4 mb-8 bg-[#0ea5a4]/10 border border-[#0ea5a4]/20 rounded-sm" role="alert">
                    <CheckCircle size={20} className="text-[#0ea5a4] shrink-0" />
                    <p className="text-sm font-sans text-[#050505]">{t("contact.messageSent")}</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 mb-8 bg-red-50 border border-red-200 rounded-sm" role="alert">
                    <XCircle size={20} className="text-red-500 shrink-0" />
                    <p className="text-sm font-sans text-red-700">{t("contact.messageError")}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-12" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                    <div className="relative group">
                      <label htmlFor="contact-name" className="sr-only">{t("contact.name")}</label>
                      <div className={`border-b transition-all duration-500 ${errors.name ? "border-red-400" : "border-black/20 focus-within:border-[#0ea5a4]"}`}>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          placeholder={t("contact.name")}
                          className="w-full bg-transparent py-4 outline-none text-lg md:text-xl font-sans font-medium uppercase placeholder:text-black/30 placeholder:font-normal text-[#050505]"
                          onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: false }); }}
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label htmlFor="contact-email" className="sr-only">{t("contact.corporateEmail")}</label>
                      <div className={`border-b transition-all duration-500 ${errors.email ? "border-red-400" : "border-black/20 focus-within:border-[#0ea5a4]"}`}>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          placeholder={t("contact.corporateEmail")}
                          className="w-full bg-transparent py-4 outline-none text-lg md:text-xl font-sans font-medium uppercase placeholder:text-black/30 placeholder:font-normal text-[#050505]"
                          onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: false }); }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="relative group">
                    <label htmlFor="contact-phone" className="sr-only">{t("contact.phoneSrLabel")}</label>
                    <div className="border-b border-black/20 focus-within:border-[#0ea5a4] transition-all duration-500 max-w-sm">
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        placeholder={t("contact.phonePlaceholder")}
                        className="w-full bg-transparent py-4 outline-none text-lg md:text-xl font-sans font-medium uppercase placeholder:text-black/30 placeholder:font-normal text-[#050505]"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-black/40 font-bold mb-6">
                      {t("contact.inquiryCategory")}
                    </h3>
                    <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={t("contact.inquiryCategory")}>
                      {VALID_SUBJECTS.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          role="radio"
                          aria-checked={formData.subject === cat}
                          onClick={() => setFormData({ ...formData, subject: cat })}
                          className={`px-6 py-3 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                            formData.subject === cat
                              ? "bg-[#0ea5a4] border-[#0ea5a4] text-white shadow-md"
                              : "border-black/10 text-black/50 hover:border-[#0ea5a4] hover:text-[#0ea5a4]"
                          }`}
                        >
                          {t(`contact.categories.${cat}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative group">
                    <label htmlFor="contact-message" className="sr-only">{t("contact.messagePlaceholder")}</label>
                    <div className={`border-b transition-all duration-500 ${errors.message ? "border-red-400" : "border-black/20 focus-within:border-[#0ea5a4]"}`}>
                      <textarea
                        id="contact-message"
                        rows="4"
                        required
                        value={formData.message}
                        placeholder={t("contact.messagePlaceholder")}
                        className="w-full bg-transparent py-4 outline-none text-lg md:text-xl font-sans font-medium uppercase placeholder:text-black/30 placeholder:font-normal text-[#050505] resize-none"
                        onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: false }); }}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative inline-flex items-center gap-6 px-12 py-5 bg-[#050505] text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#0ea5a4] transition-all duration-700 overflow-hidden rounded-sm shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-[#0ea5a4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                    <span className="relative z-10 flex items-center gap-3">
                      {status === "sending" ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          {t("contact.sending")}
                        </>
                      ) : (
                        t("contact.initiateDiscussion")
                      )}
                    </span>
                    {status !== "sending" && (
                      <ArrowRight
                        size={16}
                        className="relative z-10 rtl:-scale-x-100 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-500"
                      />
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default Contact;

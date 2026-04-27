import React, { useRef, useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/layout/Footer";
import { useTranslation } from "react-i18next";
import { submitToGoogleSheet } from "../hooks/useGoogleSheet";
import { useCareersPage } from "../hooks/useCareersPage";
import { loc } from "../lib/locale";
import { Loader2, CheckCircle, XCircle, ArrowRight, ArrowLeft, Briefcase, User, MapPin, IndianRupee, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Position groups + roles are now CMS-driven (see useCareersPage). Role titles
// stay English (they're industry-standard terms used in resumes, LinkedIn, HR
// tooling) — admins edit them as plain strings in Sanity.
const SOURCES = [
  { value: "LinkedIn",        key: "linkedin" },
  { value: "Indeed",          key: "indeed" },
  { value: "Apna",            key: "apna" },
  { value: "Company Website", key: "companyWebsite" },
  { value: "Referral",        key: "referral" },
  { value: "Other",           key: "other" },
];
const AVAILABILITY = [
  { value: "Immediately", key: "immediately" },
  { value: "15 days",     key: "fifteenDays" },
  { value: "One month",   key: "oneMonth" },
];
const AVAILABILITY_KEY = Object.fromEntries(AVAILABILITY.map((a) => [a.value, a.key]));
const STEP_ICONS = [User, Briefcase, MapPin, IndianRupee, FileText];
const STEP_KEYS = ["personal", "position", "location", "compensation", "resume"];

const INITIAL = {
  fullName: "", email: "", phone: "", dob: "",
  appliedFrom: "", appliedFromOther: "",
  position: "", positionOther: "", yearsOfExperience: "", availability: "",
  presentCity: "", presentState: "", hometown: "", homeState: "", distanceFromWorli: "",
  presentSalary: "", expectedSalary: "", currentCompany: "", smoke: "", drink: "",
  resumeLink: "",
};

// Permissive URL check — requires http(s):// and at least a dotted host,
// which covers Google Drive, Dropbox, LinkedIn, personal sites, etc.
const URL_PATTERN = /^https?:\/\/\S+\.\S+/i;

// ── HELPERS ──
const Label = ({ htmlFor, children, required }) => (
  <label htmlFor={htmlFor} className="text-[10px] font-sans font-bold tracking-[0.15em] uppercase text-black/40 mb-2 block">
    {children}{required && <span className="text-[#0ea5a4] ml-0.5">*</span>}
  </label>
);

const InputField = ({ id, type = "text", value, onChange, placeholder, error, ...props }) => (
  <div className={`border-b-2 transition-all duration-300 ${error ? "border-red-400" : "border-black/10 focus-within:border-[#0ea5a4]"}`}>
    <input id={id} type={type} value={value} placeholder={placeholder}
      className="w-full bg-transparent py-3 outline-none text-sm md:text-[15px] font-sans text-[#050505] placeholder:text-black/20"
      onChange={onChange} {...props} />
  </div>
);

const PillButton = ({ selected, onClick, children }) => (
  <button type="button" onClick={onClick}
    className={`px-5 py-2.5 border rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
      selected
        ? "bg-[#0ea5a4] border-[#0ea5a4] text-white shadow-lg shadow-[#0ea5a4]/20"
        : "border-black/10 text-black/45 hover:border-[#0ea5a4] hover:text-[#0ea5a4] bg-white"
    }`}>
    {children}
  </button>
);

// ── COMPONENT ──
export default function CareersPage() {
  const pageRef = useRef(null);
  const formRef = useRef(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.slice(0, 2) || "en";
  const careersData = useCareersPage();

  const POSITIONS = useMemo(
    () =>
      careersData.positionGroups.map((g) => ({
        id: g.id,
        roles: g.roles || [],
        group: loc(g.label, lang),
      })),
    [careersData.positionGroups, lang]
  );
  const STEPS = useMemo(
    () =>
      STEP_KEYS.map((key, i) => ({
        id: i + 1,
        label: t(`careers.steps.${key}`),
        icon: STEP_ICONS[i],
      })),
    [t]
  );

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [posSearch, setPosSearch] = useState("");

  useGSAP(() => {
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".hero-word", { yPercent: 110, rotateZ: 3 }, { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" }, "-=0.5")
      .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, "-=1.0")
      .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
  }, { scope: pageRef });

  // Animate step transitions — fade only, no vertical movement
  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(formRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
  }, [step]);

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  // Per-step validation
  const validateStep = () => {
    const errs = {};
    if (step === 1) {
      if (!form.fullName.trim()) errs.fullName = true;
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true;
      if (!form.phone.trim()) errs.phone = true;
      if (!form.dob) errs.dob = true;
    } else if (step === 2) {
      if (!form.position) errs.position = true;
      if (form.position === "Other" && !form.positionOther.trim()) errs.positionOther = true;
      if (!form.yearsOfExperience.trim()) errs.yearsOfExperience = true;
      if (!form.availability) errs.availability = true;
    } else if (step === 3) {
      if (!form.presentCity.trim()) errs.presentCity = true;
    } else if (step === 4) {
      if (!form.presentSalary.trim()) errs.presentSalary = true;
      if (!form.expectedSalary.trim()) errs.expectedSalary = true;
      if (!form.currentCompany.trim()) errs.currentCompany = true;
      if (!form.smoke) errs.smoke = true;
      if (!form.drink) errs.drink = true;
    } else if (step === 5) {
      const link = form.resumeLink.trim();
      if (!link) errs.resumeLink = "required";
      else if (!URL_PATTERN.test(link)) errs.resumeLink = "invalid";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep() || status === "sending") return;

    setStatus("sending");
    try {
      await submitToGoogleSheet({
        formType: "career",
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        appliedFrom: form.appliedFrom === "Other" ? form.appliedFromOther : form.appliedFrom,
        position: form.position === "Other" ? form.positionOther : form.position,
        experience: form.yearsOfExperience,
        availability: form.availability,
        presentCity: form.presentCity,
        presentState: form.presentState,
        hometown: form.hometown,
        homeState: form.homeState,
        presentSalary: form.presentSalary,
        expectedSalary: form.expectedSalary,
        currentCompany: form.currentCompany,
        distanceFromWorli: form.distanceFromWorli,
        smoke: form.smoke,
        drink: form.drink,
        resumeLink: form.resumeLink,
      });
      setStatus("success");
      setForm(INITIAL);
      setStep(1);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // Filtered positions for search
  const filteredPositions = POSITIONS.map((group) => ({
    ...group,
    roles: group.roles.filter((r) => r.toLowerCase().includes(posSearch.toLowerCase())),
  })).filter((g) => g.roles.length > 0);

  return (
    <main ref={pageRef} className="bg-[#f5f5f0] min-h-screen text-[#050505] selection:bg-[#0ea5a4] selection:text-white overflow-x-hidden">
      <Helmet>
        <title>Careers | Meka Group — Join Our Engineering Legacy</title>
        <meta name="description" content="Apply to Meka Group. Open positions in marine construction, dredging, port development, and infrastructure across India." />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="hero-section relative w-full pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-20 px-6 md:px-16 overflow-hidden bg-[#f5f5f0] flex flex-col justify-end min-h-[60vh] md:min-h-[70vh]">
        <div className="relative z-10 w-full max-w-[1600px] mx-auto">
          <span className="hero-subtitle block text-[#0ea5a4] text-xs font-sans tracking-[0.4em] uppercase font-bold mb-8">
            {loc(careersData.heroEyebrow, lang)}
          </span>
          <h1 className="text-[16vw] lg:text-[11vw] 2xl:text-[10rem] font-serif uppercase tracking-tighter leading-[0.85] text-[#050505] mix-blend-multiply mb-10">
            <span className="block overflow-hidden py-5 -my-5">
              <span className="hero-word block">{loc(careersData.heroTitleWord1, lang)}</span>
            </span>
            <span className="block overflow-hidden py-5 -my-5 lg:ml-[8vw]">
              <span className="hero-word block text-black/20">{loc(careersData.heroTitleWord2, lang)}</span>
            </span>
          </h1>
          <div className="w-full max-w-xl lg:ml-[8vw]">
            <div className="hero-line w-16 h-[2px] bg-[#0ea5a4] mb-8 origin-left" />
            <p className="hero-desc text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
              {loc(careersData.heroDescription, lang)}
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ WHY MEKA ═══════════ */}
      <section className="relative z-10 py-20 md:py-32 px-6 md:px-16 border-t border-black/[0.06]">
        <div className="max-w-[1600px] mx-auto">
          <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-8 block">
            {loc(careersData.whyMekaEyebrow, lang)}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {careersData.whyMekaCards.map((item, i) => (
              <div key={i}>
                <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-tight text-[#050505] mb-4">{loc(item.title, lang)}</h3>
                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed">{loc(item.description, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MULTI-STEP FORM ═══════════ */}
      <section id="apply-section" className="relative py-24 md:py-40 px-6 md:px-16 border-t border-black/[0.06]">
        <div className="max-w-[780px] mx-auto">

          {/* Header */}
          <div className="mb-10 md:mb-14">
            <span className="text-[#0ea5a4] text-[11px] font-sans tracking-[0.4em] uppercase font-bold mb-4 block">{loc(careersData.applyEyebrow, lang)}</span>
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter leading-[0.9] text-[#050505] mb-3">
              {loc(careersData.applyTitle, lang)}
            </h2>
            <p className="text-gray-400 text-sm font-sans max-w-lg">
              {loc(careersData.applyDescription, lang)}
            </p>
          </div>

          {/* ── Progress Steps ── */}
          <div className="flex items-center justify-between mb-10 relative">
            {/* Background line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-black/10 z-0" />
            <div className="absolute top-5 left-0 h-px bg-[#0ea5a4] z-[1] transition-all duration-500" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />

            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isDone = step > s.id;
              return (
                <button key={s.id} type="button"
                  onClick={() => { if (isDone) setStep(s.id); }}
                  className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-300 ${isDone ? "cursor-pointer" : "cursor-default"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? "bg-[#0ea5a4] text-white shadow-lg shadow-[#0ea5a4]/30 scale-110"
                    : isDone ? "bg-[#0ea5a4] text-white"
                    : "bg-white border-2 border-black/10 text-black/30"
                  }`}>
                    {isDone ? (
                      <svg className="w-4 h-4" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M2 6l3 3 5-5" /></svg>
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>
                  <span className={`text-[9px] font-sans font-bold tracking-[0.15em] uppercase transition-colors duration-300 hidden sm:block ${
                    isActive ? "text-[#0ea5a4]" : isDone ? "text-[#050505]" : "text-black/25"
                  }`}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Banners */}
          {status === "success" && (
            <div className="flex items-start gap-4 p-6 mb-8 bg-[#0ea5a4]/10 border border-[#0ea5a4]/20 rounded-sm" role="alert">
              <CheckCircle size={24} className="text-[#0ea5a4] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-sans font-bold text-[#050505]">{t("careers.applicationSuccess")}</p>
                <p
                  className="text-xs font-sans text-gray-500 mt-1"
                  dangerouslySetInnerHTML={{ __html: t("careers.applicationSuccessDetail") }}
                />
              </div>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-3 p-5 mb-8 bg-red-50 border border-red-200 rounded-sm" role="alert">
              <XCircle size={20} className="text-red-500 shrink-0" />
              <p className="text-sm font-sans text-red-700">{t("careers.applicationError")}</p>
            </div>
          )}

          {/* ── Form Card ── */}
          <form onSubmit={handleSubmit} noValidate>
            <div ref={formRef} className="bg-white border border-black/[0.05] shadow-xl rounded-sm overflow-hidden min-h-[480px] flex flex-col">

              {/* ═══ STEP 1: Personal ═══ */}
              {step === 1 && (
                <div className="p-6 md:p-10 space-y-7 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <User size={18} className="text-[#0ea5a4]" />
                    <h3 className="text-lg font-serif uppercase tracking-tight text-[#050505]">{t("careers.sections.personal")}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" required>{t("careers.fields.fullName")}</Label>
                      <InputField id="fullName" value={form.fullName} placeholder={t("careers.fields.examples.name")} error={errors.fullName} onChange={(e) => set("fullName", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="email" required>{t("careers.fields.email")}</Label>
                      <InputField id="email" type="email" value={form.email} placeholder={t("careers.fields.examples.email")} error={errors.email} onChange={(e) => set("email", e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" required>{t("careers.fields.phone")}</Label>
                      <InputField id="phone" type="tel" value={form.phone} placeholder={t("careers.fields.examples.phone")} error={errors.phone} onChange={(e) => set("phone", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="dob" required>{t("careers.fields.dob")}</Label>
                      <InputField id="dob" type="date" value={form.dob} error={errors.dob} onChange={(e) => set("dob", e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <Label>{t("careers.fields.foundOpening")}</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SOURCES.map((src) => (
                        <PillButton key={src.value} selected={form.appliedFrom === src.value} onClick={() => set("appliedFrom", src.value)}>{t(`careers.sources.${src.key}`)}</PillButton>
                      ))}
                    </div>
                    {form.appliedFrom === "Other" && (
                      <div className="mt-3 max-w-xs">
                        <InputField value={form.appliedFromOther} placeholder={t("careers.fields.specify")} error={errors.appliedFromOther} onChange={(e) => set("appliedFromOther", e.target.value)} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ═══ STEP 2: Position ═══ */}
              {step === 2 && (
                <div className="p-6 md:p-10 space-y-7 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase size={18} className="text-[#0ea5a4]" />
                    <h3 className="text-lg font-serif uppercase tracking-tight text-[#050505]">{t("careers.sections.position")}</h3>
                  </div>

                  <div>
                    <Label required>{t("careers.fields.whichPosition")}</Label>
                    <p className="text-[10px] text-black/30 font-sans mb-3">{t("careers.fields.notFresher")}</p>

                    {/* Search */}
                    <div className="relative mb-3">
                      <input type="text" value={posSearch} onChange={(e) => setPosSearch(e.target.value)} placeholder={t("careers.fields.searchPositions")}
                        className="w-full bg-[#fafaf8] border border-black/[0.06] text-sm font-sans py-2.5 px-4 rounded-sm outline-none focus:border-[#0ea5a4] transition-colors placeholder:text-black/20" />
                      {posSearch && (
                        <button type="button" onClick={() => setPosSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black/60 text-xs">{t("careers.fields.clear")}</button>
                      )}
                    </div>

                    {/* Grouped list */}
                    <div className="max-h-[320px] overflow-y-auto border border-black/[0.06] rounded-sm bg-[#fafaf8] divide-y divide-black/[0.04]">
                      {filteredPositions.map((group) => (
                        <div key={group.id}>
                          <div className="px-4 py-2 bg-black/[0.02] sticky top-0 z-10">
                            <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-[#0ea5a4]">{group.group}</span>
                          </div>
                          {group.roles.map((role) => (
                            <label key={role} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${form.position === role ? "bg-[#0ea5a4]/8" : "hover:bg-black/[0.02]"}`}>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${form.position === role ? "border-[#0ea5a4] bg-[#0ea5a4]" : "border-black/15"}`}>
                                {form.position === role && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <input type="radio" name="position" value={role} checked={form.position === role} onChange={() => set("position", role)} className="sr-only" />
                              <span className={`text-[13px] font-sans leading-snug ${form.position === role ? "text-[#050505] font-medium" : "text-black/55"}`}>{role}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                      {filteredPositions.length === 0 && (
                        <div className="py-8 text-center text-black/30 text-sm">{t("careers.fields.noMatches", { query: posSearch })}</div>
                      )}
                    </div>
                    {errors.position && <p className="text-red-400 text-[10px] mt-2">{t("careers.fields.selectPosition")}</p>}

                    {form.position === "Other" && (
                      <div className="mt-3 max-w-sm">
                        <InputField value={form.positionOther} placeholder={t("careers.fields.specifyPosition")} error={errors.positionOther} onChange={(e) => set("positionOther", e.target.value)} />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="exp" required>{t("careers.fields.yearsExperience")}</Label>
                      <InputField id="exp" value={form.yearsOfExperience} placeholder={t("careers.fields.examples.years")} error={errors.yearsOfExperience} onChange={(e) => set("yearsOfExperience", e.target.value)} />
                    </div>
                    <div>
                      <Label required>{t("careers.fields.availability")}</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {AVAILABILITY.map((opt) => (
                          <PillButton key={opt.value} selected={form.availability === opt.value} onClick={() => set("availability", opt.value)}>{t(`careers.availability.${opt.key}`)}</PillButton>
                        ))}
                      </div>
                      {errors.availability && <p className="text-red-400 text-[10px] mt-1">{t("careers.fields.required")}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ STEP 3: Location ═══ */}
              {step === 3 && (
                <div className="p-6 md:p-10 space-y-7 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin size={18} className="text-[#0ea5a4]" />
                    <h3 className="text-lg font-serif uppercase tracking-tight text-[#050505]">{t("careers.sections.location")}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="presentCity" required>{t("careers.fields.presentCity")}</Label>
                      <InputField id="presentCity" value={form.presentCity} placeholder={t("careers.fields.examples.city")} error={errors.presentCity} onChange={(e) => set("presentCity", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="presentState">{t("careers.fields.presentState")}</Label>
                      <InputField id="presentState" value={form.presentState} placeholder={t("careers.fields.examples.state")} onChange={(e) => set("presentState", e.target.value)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="hometown">{t("careers.fields.hometown")}</Label>
                      <InputField id="hometown" value={form.hometown} placeholder="" onChange={(e) => set("hometown", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="homeState">{t("careers.fields.homeState")}</Label>
                      <InputField id="homeState" value={form.homeState} placeholder="" onChange={(e) => set("homeState", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="distanceWorli">{t("careers.fields.distanceWorli")}</Label>
                    <p className="text-[10px] text-black/30 font-sans mb-2">{t("careers.fields.distanceDetail")}</p>
                    <InputField id="distanceWorli" value={form.distanceFromWorli} placeholder={t("careers.fields.examples.distance")} onChange={(e) => set("distanceFromWorli", e.target.value)} />
                  </div>
                </div>
              )}

              {/* ═══ STEP 4: Compensation ═══ */}
              {step === 4 && (
                <div className="p-6 md:p-10 space-y-7 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <IndianRupee size={18} className="text-[#0ea5a4]" />
                    <h3 className="text-lg font-serif uppercase tracking-tight text-[#050505]">{t("careers.sections.compensation")}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="curSalary" required>{t("careers.fields.presentSalary")}</Label>
                      <InputField id="curSalary" value={form.presentSalary} placeholder={t("careers.fields.examples.salaryLow")} error={errors.presentSalary} onChange={(e) => set("presentSalary", e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="expSalary" required>{t("careers.fields.expectedSalary")}</Label>
                      <p className="text-[10px] text-black/30 font-sans mb-2">{t("careers.fields.salaryNote")}</p>
                      <InputField id="expSalary" value={form.expectedSalary} placeholder={t("careers.fields.examples.salaryHigh")} error={errors.expectedSalary} onChange={(e) => set("expectedSalary", e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currentCompany" required>{t("careers.fields.currentCompany")}</Label>
                    <InputField id="currentCompany" value={form.currentCompany} placeholder={t("careers.fields.examples.company")} error={errors.currentCompany} onChange={(e) => set("currentCompany", e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label required>{t("careers.fields.smoke")}</Label>
                      <div className="flex gap-3 mt-1">
                        {[
                          { value: "No",  label: t("careers.fields.no") },
                          { value: "Yes", label: t("careers.fields.yes") },
                        ].map((opt) => (
                          <PillButton key={opt.value} selected={form.smoke === opt.value} onClick={() => set("smoke", opt.value)}>{opt.label}</PillButton>
                        ))}
                      </div>
                      {errors.smoke && <p className="text-red-400 text-[10px] mt-1">{t("careers.fields.required")}</p>}
                    </div>
                    <div>
                      <Label required>{t("careers.fields.drink")}</Label>
                      <div className="flex gap-3 mt-1">
                        {[
                          { value: "No",  label: t("careers.fields.no") },
                          { value: "Yes", label: t("careers.fields.yes") },
                        ].map((opt) => (
                          <PillButton key={opt.value} selected={form.drink === opt.value} onClick={() => set("drink", opt.value)}>{opt.label}</PillButton>
                        ))}
                      </div>
                      {errors.drink && <p className="text-red-400 text-[10px] mt-1">{t("careers.fields.required")}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* ═══ STEP 5: Resume ═══ */}
              {step === 5 && (
                <div className="p-6 md:p-10 space-y-7 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText size={18} className="text-[#0ea5a4]" />
                    <h3 className="text-lg font-serif uppercase tracking-tight text-[#050505]">{t("careers.sections.resume")}</h3>
                  </div>

                  <div>
                    <Label htmlFor="resumeLink" required>{t("careers.fields.resumeLink")}</Label>
                    <p className="text-[10px] text-black/30 font-sans mb-3">{t("careers.fields.resumeLinkHint")}</p>
                    <div className={`border-b-2 transition-all duration-300 ${errors.resumeLink ? "border-red-400" : "border-black/10 focus-within:border-[#0ea5a4]"}`}>
                      <input
                        id="resumeLink"
                        type="url"
                        required
                        inputMode="url"
                        value={form.resumeLink}
                        placeholder={t("careers.fields.resumeLinkPlaceholder")}
                        className="w-full bg-transparent py-3 outline-none text-sm md:text-[15px] font-sans text-[#050505] placeholder:text-black/20"
                        onChange={(e) => set("resumeLink", e.target.value)}
                      />
                    </div>
                    {errors.resumeLink === "required" && (
                      <p className="text-red-400 text-[10px] mt-1">{t("careers.fields.required")}</p>
                    )}
                    {errors.resumeLink === "invalid" && (
                      <p className="text-red-400 text-[10px] mt-1">{t("careers.fields.resumeLinkInvalid")}</p>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="bg-[#fafaf8] border border-black/[0.06] rounded-sm p-4">
                    <p className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-black/30 mb-3">{t("careers.summary.title")}</p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-sans">
                      <span className="text-black/40">{t("careers.summary.name")}</span><span className="text-[#050505] font-medium">{form.fullName || "—"}</span>
                      <span className="text-black/40">{t("careers.summary.position")}</span><span className="text-[#050505] font-medium">{form.position === "Other" ? form.positionOther : form.position || "—"}</span>
                      <span className="text-black/40">{t("careers.summary.experience")}</span><span className="text-[#050505] font-medium">{form.yearsOfExperience ? t("careers.summary.yearsValue", { n: form.yearsOfExperience }) : "—"}</span>
                      <span className="text-black/40">{t("careers.summary.city")}</span><span className="text-[#050505] font-medium">{form.presentCity || "—"}</span>
                      <span className="text-black/40">{t("careers.summary.expectedCTC")}</span><span className="text-[#050505] font-medium">{form.expectedSalary ? `₹${form.expectedSalary}L` : "—"}</span>
                      <span className="text-black/40">{t("careers.summary.availability")}</span><span className="text-[#050505] font-medium">{form.availability ? t(`careers.availability.${AVAILABILITY_KEY[form.availability]}`) : "—"}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Navigation Bar ── */}
              <div className="flex items-center justify-between px-6 md:px-10 py-5 bg-[#fafaf8] border-t border-black/[0.05]">
                {step > 1 ? (
                  <button type="button" onClick={prevStep}
                    className="flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-black/40 hover:text-[#050505] transition-colors cursor-pointer">
                    <ArrowLeft size={14} className="rtl:-scale-x-100" /> {t("careers.nav.back")}
                  </button>
                ) : <div />}

                <div className="flex items-center gap-3">
                  {step < 5 ? (
                    <button type="button" onClick={nextStep}
                      className="group flex items-center gap-2 px-6 py-3 bg-[#050505] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#0ea5a4] transition-colors cursor-pointer">
                      {t("careers.nav.next")} <ArrowRight size={14} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <button type="submit" disabled={status === "sending"}
                      className="group flex items-center gap-2 px-8 py-3 bg-[#0ea5a4] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-[#050505] transition-colors disabled:opacity-50 cursor-pointer">
                      {status === "sending" ? (
                        <><Loader2 size={14} className="animate-spin" /> {t("careers.nav.submitting")}</>
                      ) : (
                        <>{t("careers.nav.submit")} <ArrowRight size={14} className="rtl:-scale-x-100" /></>
                      )}
                    </button>
                  )}
                </div>
              </div>

            </div>
          </form>

        </div>
      </section>

      <Footer />
    </main>
  );
}

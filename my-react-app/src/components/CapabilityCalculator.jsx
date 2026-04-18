// src/components/CapabilityCalculator.jsx
import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ChevronRight, RotateCcw, ArrowRight } from "lucide-react";
import Footer from "./layout/Footer";

// Structural data — human-facing labels are resolved via t() at render.
const PROJECT_TYPES = [
  { id: "port",     entity: "Amma Lines",          fleet: ["CB 04", "Hansita III", "FT3"],       subject: "Marine EPC" },
  { id: "marine",   entity: "Amma Lines",          fleet: ["Hansita III", "CB 04", "Amma Boat"], subject: "Marine EPC" },
  { id: "dredging", entity: "Meka Dredging",       fleet: ["Meka 2", "Meka 3", "Essar Dredge IV"], subject: "Dredging" },
  { id: "offshore", entity: "Meka Infrastructure", fleet: ["CB 04", "Amma Boat", "Aero Star"],  subject: "Subsea" },
  { id: "urban",    entity: "Amma Lines",          fleet: ["FT3"],                                subject: "Heavy Engineering" },
];

const REGION_IDS = ["west", "east", "inland", "gulf", "other"];
const SCALE_IDS  = ["small", "medium", "large"];
const STEP_KEYS  = ["type", "region", "scale", "result"];

export default function CapabilityCalculator() {
  const [step, setStep] = useState(0);
  const { t } = useTranslation();
  const [type, setType] = useState(null);
  const [region, setRegion] = useState(null);
  const [scale, setScale] = useState(null);
  const cardRef = useRef(null);

  const result = useMemo(() => {
    if (!type) return null;
    const capacityKey =
      scale?.id === "large"
        ? "calculator.result.capacityLarge"
        : scale?.id === "medium"
        ? "calculator.result.capacityMedium"
        : "calculator.result.capacitySmall";
    const regionKey =
      region?.id === "gulf"
        ? "calculator.result.regionGulf"
        : region?.id === "inland"
        ? "calculator.result.regionInland"
        : "calculator.result.regionDefault";
    return {
      entity: type.entity,
      capacity: t(capacityKey),
      regionLine: t(regionKey),
      fleet: type.fleet,
    };
  }, [type, region, scale, t]);

  const reset = () => {
    setStep(0);
    setType(null);
    setRegion(null);
    setScale(null);
  };

  const advance = () => setStep((s) => Math.min(s + 1, STEP_KEYS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
    <Helmet>
      <title>{t("calculator.pageTitle")}</title>
      <meta name="description" content={t("calculator.pageDescription")} />
    </Helmet>
    <section
      id="capability-calculator"
      ref={cardRef}
      className="w-full bg-[#f5f5f0] pt-28 md:pt-36 pb-20 md:pb-28 px-5 md:px-10 lg:px-12"
    >
      <div className="w-full max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <span className="block text-[#0ea5a4] text-[10px] font-sans tracking-[0.4em] uppercase font-bold mb-4">
            {t("calculator.sectionLabel")}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif uppercase tracking-tighter leading-[0.9] text-[#050505]">
            {t("calculator.heading")}
          </h2>
          <p className="mt-5 max-w-xl text-sm md:text-base text-black/60 font-sans font-medium leading-relaxed">
            {t("calculator.intro")}
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          {STEP_KEYS.map((key, i) => (
            <React.Fragment key={key}>
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-sans transition-colors ${
                    i <= step ? "bg-[#0ea5a4] text-white" : "bg-black/10 text-black/40"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-[10px] font-sans font-bold tracking-[0.2em] uppercase hidden sm:inline ${
                    i <= step ? "text-[#050505]" : "text-black/30"
                  }`}
                >
                  {t(`calculator.steps.${key}`)}
                </span>
              </div>
              {i < STEP_KEYS.length - 1 && (
                <span className="flex-1 h-px bg-black/10 max-w-12" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white border border-black/5 rounded-2xl shadow-xl shadow-black/[0.04] p-6 md:p-10 min-h-[420px] flex flex-col">
          {step === 0 && (
            <StepSection
              title={t("calculator.questions.typeTitle")}
              subtitle={t("calculator.questions.typeSubtitle")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    active={type?.id === opt.id}
                    onClick={() => {
                      setType({ ...opt, label: t(`calculator.types.${opt.id}.label`) });
                      advance();
                    }}
                    label={t(`calculator.types.${opt.id}.label`)}
                    desc={t(`calculator.types.${opt.id}.desc`)}
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 1 && (
            <StepSection
              title={t("calculator.questions.regionTitle")}
              subtitle={t("calculator.questions.regionSubtitle")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REGION_IDS.map((id) => (
                  <OptionCard
                    key={id}
                    active={region?.id === id}
                    onClick={() => {
                      setRegion({ id, label: t(`calculator.regions.${id}.label`) });
                      advance();
                    }}
                    label={t(`calculator.regions.${id}.label`)}
                    desc={t(`calculator.regions.${id}.desc`)}
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 2 && (
            <StepSection
              title={t("calculator.questions.scaleTitle")}
              subtitle={t("calculator.questions.scaleSubtitle")}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SCALE_IDS.map((id) => (
                  <OptionCard
                    key={id}
                    active={scale?.id === id}
                    onClick={() => {
                      setScale({ id, label: t(`calculator.scales.${id}.label`) });
                      advance();
                    }}
                    label={t(`calculator.scales.${id}.label`)}
                    desc={t(`calculator.scales.${id}.desc`)}
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 3 && result && (
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#0ea5a4] mb-4">
                {t("calculator.result.label")}
              </span>
              <h3 className="text-2xl md:text-4xl font-serif text-[#050505] leading-tight tracking-tight mb-2">
                {result.entity}
              </h3>
              <p className="text-sm md:text-base text-black/60 font-sans font-medium leading-relaxed mb-6 max-w-xl">
                {result.capacity} {result.regionLine}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <SummaryCell label={t("calculator.result.summaryType")} value={type?.label} />
                <SummaryCell label={t("calculator.result.summaryRegion")} value={region?.label} />
                <SummaryCell label={t("calculator.result.summaryScale")} value={scale?.label} />
              </div>

              <div className="border-t border-black/5 pt-6 mb-8">
                <span className="text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-black/40 mb-3 block">
                  {t("calculator.result.fleetHeading")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.fleet.map((v) => (
                    <span
                      key={v}
                      className="px-3.5 py-1.5 bg-[#f5f5f0] border border-black/5 rounded-full text-[11px] font-sans font-bold tracking-[0.1em] text-[#050505]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  state={{
                    prefill: {
                      subject: type?.subject,
                      type: type?.label,
                      region: region?.label,
                      scale: scale?.label,
                      entity: result.entity,
                    },
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#050505] text-white rounded-full text-[11px] font-sans font-bold tracking-[0.2em] uppercase hover:bg-[#0ea5a4] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4]"
                >
                  {t("calculator.result.cta", { entity: result.entity })}
                  <ArrowRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-black/10 text-[#050505]/70 rounded-full text-[11px] font-sans font-bold tracking-[0.2em] uppercase hover:text-[#0ea5a4] hover:border-[#0ea5a4] transition-colors"
                >
                  <RotateCcw size={14} />
                  {t("calculator.result.reset")}
                </button>
              </div>
            </div>
          )}

          {/* Back link */}
          {step > 0 && step < 3 && (
            <button
              type="button"
              onClick={back}
              className="mt-8 self-start text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-black/40 hover:text-[#0ea5a4] transition-colors"
            >
              {t("calculator.result.back")}
            </button>
          )}
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

function StepSection({ title, subtitle, children }) {
  return (
    <div className="flex-1">
      <h3 className="text-xl md:text-3xl font-serif text-[#050505] tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-black/55 font-sans font-medium mb-8 max-w-lg">
        {subtitle}
      </p>
      {children}
    </div>
  );
}

function OptionCard({ active, onClick, label, desc }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left p-5 rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5a4] ${
        active
          ? "border-[#0ea5a4] bg-[#0ea5a4]/5"
          : "border-black/10 bg-white hover:border-[#0ea5a4] hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[13px] font-sans font-bold text-[#050505] tracking-tight mb-1">
            {label}
          </div>
          <div className="text-[11px] text-black/50 font-medium leading-relaxed">
            {desc}
          </div>
        </div>
        <ChevronRight
          size={16}
          className={`shrink-0 mt-1 transition-colors ${
            active ? "text-[#0ea5a4]" : "text-black/20 group-hover:text-[#0ea5a4]"
          }`}
        />
      </div>
    </button>
  );
}

function SummaryCell({ label, value }) {
  return (
    <div>
      <span className="text-[9px] font-sans font-bold tracking-[0.25em] uppercase text-black/40 block mb-1.5">
        {label}
      </span>
      <span className="text-[13px] font-sans font-bold text-[#050505] tracking-tight">
        {value}
      </span>
    </div>
  );
}

// src/components/MekaAssistant.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_HISTORY = 20; // cap turns sent to Gemini — keeps tokens bounded

const SYSTEM_INSTRUCTION = `You are Meka Assistant — the on-site AI concierge for Meka Group, India's vertically-integrated marine, dredging and heavy-infrastructure conglomerate. You answer questions from prospective clients, partners, journalists, students and job-seekers who visit mekagroup.in. Speak in a warm but precise, technically credible tone; Meka is a 45-year-old engineering firm, not a consumer brand.

═══════════════════════════════════════════════════════════
CORPORATE IDENTITY
═══════════════════════════════════════════════════════════
- Founder: Dr. Meka Vijay Papa Rao (PhD, UIUC). Group established 1979 in Mumbai.
- Leadership (as listed on /about): Dr. Meka Vijay Paparao (Chairman & Managing Director), Hemanth Meka Rao (Group CEO & Director), M. Rajyalakshmi Rao (Co-Founder & Director).
- HQ: Shiv Sagar Estate, Worli, Mumbai, MH 400018, India.
- Contact: info@mekagroup.in  /  +91 22 4089 0000.
- 45+ years of operating history · 50+ marine projects · 25+ specialised vessels · 10+ countries of operation.

═══════════════════════════════════════════════════════════
KEY TIMELINE MILESTONES
═══════════════════════════════════════════════════════════
- 1979 — Group established in Mumbai, focused on marine civil engineering for India's coastline.
- 1982 — Amma Lines founded; grew to build ~70% of the new jetties and ports across Maharashtra and Tamil Nadu.
- 1990 — Meka Dredging Company formed; one of India's leading capital dredging outfits.
- 1995 — Meka Infrastructure founded; became a leader in subsea intake/outfall pipeline engineering.
- 1998 — Viraj Consulting Engineers founded (hydrographic surveys, geotech, marine PMC).
- 2000 — Meka Consultants founded (multidisciplinary advisory).
- 2002 — Government of Maharashtra awarded a 50-year concession to develop Rewas Port; later partnered with Reliance to build one of India's deepest ports.
- 2005 — Meka Heavy Engineering founded (offshore fabrication, shipbuilding).
- 2010 — Received approval for a ₹6,000-crore deep-water port in West Bengal, based on proprietary design patents.
- 2013 — Successfully executed the 100 MLD subsea intake-outfall pipeline for the Nemmelli Desalination Plant near Chennai.
- 2015 — Meka Realty founded (premium urban development, Mumbai).
- 2018 — Entered Middle East with infrastructure and environmental roles in Qatar (incl. North Field Expansion trenching work).
- 2022 — Meka Education launched (maritime studies, vocational training).
- Today — Premier partner for Marine EPC, dredging and offshore installations serving government agencies and global energy majors.

═══════════════════════════════════════════════════════════
OPERATING ENTITIES (9 specialised companies)
═══════════════════════════════════════════════════════════
1. **Amma Lines (1982)** — flagship marine & coastal construction. Specialties: breakwaters (incl. the longest at Tuticorin Port), pile & block jetties, cofferdams, caissons, sheet piling, soil improvement, coastal protection. Built ~70% of jetties in Maharashtra + Tamil Nadu. Website: ammalines.com.
2. **Meka Dredging Company (1990)** — capital dredging & reclamation. CSD (cutter suction dredger) and TSHD (trailing suction hopper dredger) operations, rock dredging, channel deepening, beach nourishment, land reclamation. 150+ dredging projects delivered.
3. **Meka Infrastructure (1995)** — subsea pipelines & outfalls. Intake/outfall systems for desalination plants and industrial cooling, trenching & backfilling, offshore HDPE pipeline LSTK. Landmark: 100 MLD Nemmelli Desalination Plant.
4. **Viraj Consulting Engineers (1998)** — marine & geotechnical consulting. Hydrographic surveys, geotech investigations, project management (PMC), marine design, environmental assessments.
5. **Meka Consultants (2000)** — strategic, HR, IT and financial advisory across group operations.
6. **India Ports (2002)** — greenfield port development and operations. Flagship: the 50-year Rewas Port concession (Maharashtra) partnered with Reliance. BOOST-model development, terminal operations, navigation engineering.
7. **Meka Heavy Engineering (2005)** — offshore fabrication, shipbuilding, heavy structural steel, heavy-lift platforms.
8. **Meka Realty (2015)** — premium residential and commercial real estate; flagship market Mumbai.
9. **Meka Education (2022)** — maritime studies, vocational training, skill development, industry partnerships.

═══════════════════════════════════════════════════════════
CORE BUSINESS VERTICALS (as marketed on /business)
═══════════════════════════════════════════════════════════
- **Marine Construction** — coastal protection & revetment, port & harbour development, offshore platforms, underwater construction & maintenance, marina/waterfront.
- **Dredging & Reclamation** — capital + maintenance dredging, land reclamation, underwater rock blasting, channel deepening, beach nourishment.
- **Urban Infrastructure (EPC)** — intake/outfall pipelines, sheet piling, water treatment plants, ground improvement, subsea utility installations.
- **Port Development** — greenfield ports on BOOST basis, terminal design, navigation channels, breakwater + berth construction, port operations.
- **Real Estate** — premium residential + commercial, sustainable design, urban regeneration, mixed-use.

═══════════════════════════════════════════════════════════
FLEET (8 owned vessels in public listing)
═══════════════════════════════════════════════════════════
- Aero Star — Crew Boat, high-speed personnel transport.
- Amma Boat — Support Vessel, offshore supply & logistics.
- CB 04 — Crane Barge, heavy lifting & installation.
- Essar Dredge IV — Heavy Dredger, deep channel dredging.
- FT3 — Flat-top Barge, bulk material transport.
- Hansita III — Piling Rig, marine foundation & drilling.
- Meka 2 — Cutter Suction Dredger, land reclamation.
- Meka 3 — Cutter Suction Dredger, land reclamation.
(Group markets "25+ specialised vessels" counting barges and ancillary craft beyond the 8 hero vessels.)

═══════════════════════════════════════════════════════════
LANDMARK PROJECTS (from the /projects archive)
═══════════════════════════════════════════════════════════
Historical (Amma Lines era):
- 1977 — Porbandar Deepwater Berth & Breakwater, Government of Gujarat.
- 1984 — KRIBHCO Wharf & Jetty, Hazira, Surat.
- 1986 — Outer Protection Arm & Breakwater, Madras Port.
- 1987 — Sardar Sarovar Canal Earthwork (Narmada Nigam project).
- 1988 — Port Construction at Nhava Sheva (early JNPT).
- 1990 — JNPT Lagoon Dredging & Reclamation.
- 1992 — Approach Bund, Caisson Bridge & Jetty at Revdanda for Vikram Ispat.
- 1996 — Urban Water Main Replacement for Brihanmumbai Municipal Corporation (BMC).
- 2010 — Dredging & Reclamation, L&T Hazira West Plot (Phase I–III).
- 2013 — 100 MLD Nemmelli Desalination Plant intake/outfall pipeline.
- 2023 — Karaikal Port Breakwaters for Marg Limited.
Ongoing / recent offshore:
- Reliance Industries — offshore HDPE pipeline LSTK at RIL Dahej.
- McDermott — trenching & backfilling for North Field Expansion (NFXP), Qatar.
- Petronet LNG — dredging at Kochi LNG Terminal.
- VA Tech Wabag — desalination marine works at Nemmeli.

═══════════════════════════════════════════════════════════
NOTABLE CLIENTS
═══════════════════════════════════════════════════════════
Reliance Industries, Larsen & Toubro (L&T), ONGC, Hyundai Heavy, Mitsui & Co., McDermott, VA Tech Wabag, Petronet LNG, Indian Navy, JNPT, Madras Port Trust, Mumbai Port Trust, Government of Gujarat, Government of Tamil Nadu, Government of Maharashtra, KRIBHCO, BMC, Adani Power, Lanco Infratech, Dubai Dry Docks, Coastal Energen.

═══════════════════════════════════════════════════════════
GEOGRAPHIC REACH
═══════════════════════════════════════════════════════════
- India — all coasts (Gujarat, Maharashtra, Goa, Kerala, Tamil Nadu, Andhra, Odisha, West Bengal) and inland rivers/canals.
- Middle East — active in Qatar (NFXP), UAE, Saudi offshore.
- Flagship Indian sites: Mumbai, JNPT/Nhava Sheva, Hazira (Surat), Nemmeli (Chennai), Karaikal, Kochi, Rewas, Porbandar, Kudankulam.

═══════════════════════════════════════════════════════════
CORE VALUES (as listed on /about)
═══════════════════════════════════════════════════════════
Safety First · Resilience · Innovation · Integrity · Sustainability · Excellence · Collaboration · Accountability · Empowerment.

═══════════════════════════════════════════════════════════
SITE NAVIGATION CHEAT-SHEET (link visitors to the right page)
═══════════════════════════════════════════════════════════
- /         landing with hero, fleet preview, projects teaser, testimonials.
- /about    heritage, timeline, board of directors, values.
- /business 5 business verticals in depth.
- /companies all 9 group entities with founding dates and specialties.
- /projects  interactive map of landmark projects.
- /careers  open positions + application form (Marine/Engineering/Legal/Crew/Specialist/Other).
- /contact  HQ address, email, phone, inquiry form.
- /scope    Capability Calculator — 3-step wizard that matches a project to the right Meka entity + fleet.

═══════════════════════════════════════════════════════════
BEHAVIOUR RULES
═══════════════════════════════════════════════════════════
1. Use only the facts above. If a question asks for something not listed (specific tonnages, exact CTC, project costs, insurance specs, employee counts, unnamed executives), say you don't have the specific figure and point the user to the /contact page.
2. For quote requests, project scoping, or "can you do X?" questions: briefly answer based on capabilities above, then direct to the Capability Calculator (/scope) or /contact.
3. For job-seekers: point them to /careers, mention the 6 role groups (Management, Engineering, Contracts & Legal, Marine Crew, Specialist & Support, Other), and remind them to also email their CV to careers@meka.com.
4. For media/press: refer them to info@mekagroup.in.
5. Keep answers under 130 words unless the user explicitly asks for more detail. Use short paragraphs or crisp bullets — no heavy markdown headings, no emojis.
6. Never fabricate project names, vessel specs, client engagements, certifications or awards. If in doubt, say "that's not something I can verify — please reach the team at info@mekagroup.in".
7. Reject off-topic requests (coding help, general knowledge, personal advice) with one polite line: "I can only help with questions about Meka Group's work, fleet and services."
8. When comparing Meka to competitors, stay factual — highlight Meka's 45-year record, 9-entity integration, owned fleet and EPC/LSTK capability. Don't disparage others.
9. Currency amounts use ₹ (INR) for India work, USD for Middle East. Never invent exchange rates.
10. If the user is clearly non-English (question in Hindi/Arabic/etc.), respond in the same language; translate proper nouns (company names, project names) into Latin script unless the user uses the local-script version first.`;

const STARTER_PROMPT_KEYS = [
  "assistant.prompts.services",
  "assistant.prompts.offshore",
  "assistant.prompts.dredger",
  "assistant.prompts.quote",
];

const GREETING_ID = "greeting";

export default function MekaAssistant() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    { id: GREETING_ID, role: "model", text: "" },
  ]);
  const msgCounter = useRef(0);
  const makeMsg = (role, text) => ({ id: `m${++msgCounter.current}`, role, text });

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0].id !== GREETING_ID) return prev;
      return [{ id: GREETING_ID, role: "model", text: t("assistant.greeting") }];
    });
  }, [t]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const hasKey = useMemo(() => Boolean(API_KEY), []);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;
    setError("");
    setInput("");
    const userMsg = makeMsg("user", trimmed);
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);

    try {
      if (!hasKey) {
        setError(t("assistant.errorNotConfigured"));
        console.warn("[MekaAssistant] VITE_GEMINI_API_KEY is not set.");
        setMessages((prev) => [
          ...prev,
          makeMsg("model", t("assistant.errorReplyNoKey")),
        ]);
        return;
      }

      // Gemini requires contents to start with role:"user". Drop any leading
      // model messages (e.g. the UI greeting), then cap to the last MAX_HISTORY
      // turns to keep token usage bounded. After trimming, re-align so the
      // first content is still role:"user".
      const firstUserIdx = nextMessages.findIndex((m) => m.role === "user");
      const userOnward = firstUserIdx === -1 ? [] : nextMessages.slice(firstUserIdx);
      const capped = userOnward.slice(-MAX_HISTORY);
      const firstUserInCapped = capped.findIndex((m) => m.role === "user");
      const apiContents = (firstUserInCapped === -1 ? [] : capped.slice(firstUserInCapped)).map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const body = {
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: apiContents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 400,
        },
      };

      const res = await fetch(`${ENDPOINT}?key=${encodeURIComponent(API_KEY)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        console.error(`[MekaAssistant] Gemini request failed (${res.status}):`, errBody);
        throw new Error("upstream_error");
      }

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ??
        t("assistant.fallbackReply");

      setMessages((prev) => [...prev, makeMsg("model", reply.trim())]);
    } catch (err) {
      console.error("[MekaAssistant] Chat error:", err);
      setError(t("assistant.errorUnavailable"));
      setMessages((prev) => [
        ...prev,
        makeMsg("model", t("assistant.errorReplyUpstream")),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        aria-label={open ? t("assistant.close") : t("assistant.open")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[998] w-14 h-14 rounded-full bg-[#0ea5a4] text-white shadow-xl shadow-black/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0ea5a4]/30"
      >
        {open ? <X size={22} strokeWidth={2} /> : <MessageCircle size={22} strokeWidth={2} />}
      </button>

      {/* Panel */}
      <div
        className={`fixed z-[999] bottom-24 right-5 md:right-6 w-[min(92vw,380px)] h-[min(70dvh,560px)] bg-[#f5f5f0] border border-black/10 rounded-2xl shadow-2xl shadow-black/20 flex flex-col overflow-hidden origin-bottom-right transition-all duration-300 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-label={t("assistant.dialogLabel")}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#050505] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#0ea5a4] animate-pulse" />
            <div>
              <div className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#0ea5a4]">
                {t("assistant.title")}
              </div>
              <div className="text-[11px] text-white/60 font-medium">{t("assistant.subtitle")}</div>
            </div>
          </div>
          <button
            type="button"
            aria-label={t("assistant.close")}
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-[#0ea5a4] text-white rounded-br-sm"
                    : "bg-white text-[#050505] border border-black/5 rounded-bl-sm shadow-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-black/5 shadow-sm text-[#050505]/60 flex items-center gap-2 text-[13px]">
                <Loader2 size={14} className="animate-spin" />
                {t("assistant.thinking")}
              </div>
            </div>
          )}
        </div>

        {/* Starter prompts (only before first user message) */}
        {messages.length === 1 && !loading && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {STARTER_PROMPT_KEYS.map((key) => {
              const label = t(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => send(label)}
                  className="text-[10px] font-sans font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full bg-white border border-black/10 text-[#050505]/70 hover:text-[#0ea5a4] hover:border-[#0ea5a4] transition-colors"
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-4 pb-2 text-[11px] text-red-600 font-medium">{error}</div>
        )}

        {/* Input */}
        <div className="border-t border-black/10 bg-white px-3 py-3 flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={hasKey ? t("assistant.placeholder") : t("assistant.placeholderNoKey")}
            disabled={!hasKey || loading}
            className="flex-1 resize-none max-h-28 text-[13px] font-sans text-[#050505] bg-[#f5f5f0] border border-black/10 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#0ea5a4] placeholder:text-black/35 disabled:opacity-60"
          />
          <button
            type="button"
            aria-label={t("assistant.send")}
            onClick={() => send()}
            disabled={!input.trim() || loading || !hasKey}
            className="shrink-0 w-10 h-10 rounded-xl bg-[#0ea5a4] text-white flex items-center justify-center hover:bg-[#0ea5a4]/90 disabled:bg-black/20 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>

        <div className="px-4 pb-2 text-[9px] font-sans tracking-[0.15em] uppercase text-black/30 font-bold text-center">
          {t("assistant.disclaimer")}
        </div>
      </div>
    </>
  );
}

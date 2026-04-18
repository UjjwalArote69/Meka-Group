// src/components/MekaAssistant.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_HISTORY = 20; // cap turns sent to Gemini — keeps tokens bounded

const SYSTEM_INSTRUCTION = `You are Meka Assistant, the on-site AI concierge for Meka Group — an Indian marine, dredging and heavy-infrastructure conglomerate with 45+ years of operating history (group roots from 1979). Answer visitor questions briefly, accurately and in a professional, helpful tone. Keep replies under 120 words unless explicitly asked for detail.

OPERATING ENTITIES (founding years)
- Amma Lines (1982) — flagship marine & coastal construction: breakwaters, jetties, cofferdams, caissons, coastal protection.
- Meka Dredging (1990) — capital dredging & reclamation: CSD/TSHD operations, rock dredging, channel deepening.
- Viraj Consulting Engineers (1998) — hydrographic surveys, geotechnical investigation, marine PMC.
- Meka Infrastructure (1995) — subsea intake/outfall pipelines, desalination infrastructure, trenching.
- Meka Consultants (2000) — strategic, IT, financial and human-capital advisory.
- India Ports (2002) — greenfield port development, including the Rewas Port concession.
- Meka Heavy Engineering (2005) — offshore fabrication, shipbuilding, heavy structural works.
- Meka Realty (2015) and Meka Education (2022) — newer diversifications.

CORE CAPABILITIES
- Ports & harbours: breakwaters (incl. India's longest at Tuticorin), deepwater berths, fishery harbours, wharves.
- Marine construction: jetties, caisson bridges, approach bunds, piled structures, sheet piling.
- Dredging & reclamation: CSD, TSHD, maintenance dredging, land reclamation, beach nourishment.
- Urban & heavy infra: water-main laying, canal earthwork, shore protection.
- Offshore: HDPE pipeline LSTK, intake/outfall installation, trenching & backfilling.

FLEET (8 owned vessels)
- Aero Star (Crew Boat) — high-speed transport
- Amma Boat (Support Vessel) — offshore supply & logistics
- CB 04 (Crane Barge) — heavy lifting & installation
- Essar Dredge IV (Heavy Dredger) — deep channel dredging
- FT3 (Flat Top Barge) — bulk material transport
- Hansita III (Piling Rig) — marine foundation & drilling
- Meka 2 and Meka 3 (Cutter Suction Dredgers) — land reclamation

REACH & CLIENTS
India (all coasts + inland), Qatar, Middle East offshore. Notable clients: Reliance Industries, L&T, McDermott, Petronet LNG, VA Tech Wabag, JNPT, Madras Port, Government of Gujarat, KRIBHCO. Headquartered in Worli, Mumbai.

RULES
- If asked for a quote or project scoping, direct the user to the Capability Calculator at /scope or the /contact page.
- Never invent specific vessel specs, tonnage, project costs, or timelines. If unknown, say so and suggest contacting the team.
- Do not answer questions unrelated to Meka or marine/infrastructure — politely redirect.
- Use plain prose. Avoid heavy markdown. No emojis.`;

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

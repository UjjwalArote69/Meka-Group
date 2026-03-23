/* eslint-disable react-hooks/set-state-in-effect */
// src/components/CustomCursor.jsx
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const RING = 64;
const DOT = 8;
const HOVER_SCALE = 1.5;
const VIEW_SCALE = 1.8;
const CLICK_SCALE = 0.65;
const EASE_RING = 0.18;
const EASE_DOT = 0.1;
const MD_BREAKPOINT = 768;

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, .cursor-hover";
const VIEWABLE = "img, video, .cursor-view, .fleet-gallery-item, .company-card";
const HIDDEN = ".cursor-hide";

export default function CustomCursor() {
  const wrapRef = useRef(null);
  const dotEl = useRef(null);
  const ringEl = useRef(null);
  const ticksEl = useRef(null);
  const pingEl = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const prev = useRef({ x: -100, y: -100 });
  const state = useRef("default");
  const visible = useRef(false);

  // ── Only show on md+ screens (not touch, not small) ──
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return false;
    return window.innerWidth >= MD_BREAKPOINT;
  });

  useEffect(() => {
    // Touch devices never get cursor
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsDesktop(false);
      return;
    }

    const check = () => setIsDesktop(window.innerWidth >= MD_BREAKPOINT);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const wrap = wrapRef.current;
    const dot = dotEl.current;
    const ring = ringEl.current;
    const ticks = ticksEl.current;
    const ping = pingEl.current;

    if (!wrap || !dot || !ring) return;

    // Hide native cursor
    const styleTag = document.createElement("style");
    styleTag.id = "meka-cursor-hide";
    styleTag.textContent = `
      @media (min-width: ${MD_BREAKPOINT}px) {
        *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(styleTag);

    const dotLeft = gsap.quickTo(dot, "left", { duration: EASE_DOT, ease: "power3" });
    const dotTop = gsap.quickTo(dot, "top", { duration: EASE_DOT, ease: "power3" });
    const ringLeft = gsap.quickTo(ring, "left", { duration: EASE_RING, ease: "power3" });
    const ringTop = gsap.quickTo(ring, "top", { duration: EASE_RING, ease: "power3" });

    function setState(next) {
      if (state.current === next) return;
      state.current = next;

      switch (next) {
        case "hover":
          gsap.to(dot, { scale: 0, duration: 0.2, ease: "power2.in" });
          gsap.to(ring, {
            scale: HOVER_SCALE,
            borderColor: "#0ea5a4",
            duration: 0.35,
            ease: "back.out(1.5)",
          });
          break;

        case "view":
          gsap.to(dot, { scale: 0.5, duration: 0.2 });
          gsap.to(ring, {
            scale: VIEW_SCALE,
            borderColor: "rgba(14,165,164,0.5)",
            duration: 0.35,
            ease: "back.out(1.5)",
          });
          break;

        case "hidden":
          gsap.to(wrap, { opacity: 0, duration: 0.15 });
          break;

        default:
          gsap.to(wrap, { opacity: 1, duration: 0.2 });
          gsap.to(dot, { scale: 1, duration: 0.3, ease: "back.out(2)" });
          gsap.to(ring, {
            scale: 1,
            borderColor: "rgba(14,165,164,0.2)",
            duration: 0.3,
          });
          break;
      }
    }

    function onMove(e) {
      const { clientX: x, clientY: y } = e;
      pos.current = { x, y };

      dotLeft(x - DOT / 2);
      dotTop(y - DOT / 2);
      ringLeft(x - RING / 2);
      ringTop(y - RING / 2);

      if (!visible.current) {
        visible.current = true;
        gsap.to(wrap, { opacity: 1, duration: 0.3 });
      }

      const dx = x - prev.current.x;
      const dy = y - prev.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3 && ticks) {
        const bearing = ((Math.atan2(dy, dx) * 180 / Math.PI + 90) % 360 + 360) % 360;
        gsap.to(ticks, {
          rotation: bearing,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (state.current === "default") {
        const breath = 1 + Math.min(dist * 0.004, 0.12);
        gsap.to(ring, { scale: breath, duration: 0.25, overwrite: "auto" });
      }

      prev.current = { x, y };

      const el = e.target;
      if (el.closest(HIDDEN)) setState("hidden");
      else if (el.closest(INTERACTIVE)) setState("hover");
      else if (el.closest(VIEWABLE)) setState("view");
      else setState("default");
    }

    function onDown() {
      gsap.to(dot, { scale: state.current === "hover" ? 0 : 0.4, duration: 0.08 });
      gsap.to(ring, { scale: CLICK_SCALE, duration: 0.08 });

      if (ping) {
        gsap.set(ping, {
          left: pos.current.x - RING / 2,
          top: pos.current.y - RING / 2,
          scale: 0.5,
          opacity: 0.5,
        });
        gsap.to(ping, { scale: 2.5, opacity: 0, duration: 0.7, ease: "power2.out" });
      }
    }

    function onUp() {
      const ds = state.current === "hover" ? 0 : state.current === "view" ? 0.5 : 1;
      const rs = state.current === "hover" ? HOVER_SCALE : state.current === "view" ? VIEW_SCALE : 1;
      gsap.to(dot, { scale: ds, duration: 0.3, ease: "back.out(2)" });
      gsap.to(ring, { scale: rs, duration: 0.3, ease: "back.out(2)" });
    }

    function onLeave() {
      gsap.to(wrap, { opacity: 0, duration: 0.2 });
      visible.current = false;
    }
    function onEnter() {
      if (!visible.current) {
        visible.current = true;
        gsap.to(wrap, { opacity: 1, duration: 0.2 });
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      const tag = document.getElementById("meka-cursor-hide");
      if (tag) tag.remove();
    };
  }, [isDesktop]);

  // Don't render anything on small screens or touch devices
  if (!isDesktop) return null;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 pointer-events-none z-[9999] opacity-0"
      aria-hidden="true"
    >
      <div
        ref={pingEl}
        className="absolute rounded-full pointer-events-none opacity-0"
        style={{ width: RING, height: RING, border: "2px solid #0ea5a4" }}
      />

      <div
        ref={ringEl}
        className="absolute pointer-events-none"
        style={{
          width: RING,
          height: RING,
          borderRadius: "50%",
          border: "2.5px solid rgba(14,165,164,0.2)",
          top: -100,
          left: -100,
        }}
      >
        <div ref={ticksEl} className="absolute inset-0">
          {/* N */}
          <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[2px] h-[10px] bg-[#0ea5a4]" />
          {/* S */}
          <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-[1.5px] h-[7px]" style={{ backgroundColor: "rgba(14,165,164,0.4)" }} />
          {/* E */}
          <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[7px] h-[1.5px]" style={{ backgroundColor: "rgba(14,165,164,0.4)" }} />
          {/* W */}
          <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-[7px] h-[1.5px]" style={{ backgroundColor: "rgba(14,165,164,0.4)" }} />
          {/* NE */}
          <div className="absolute w-[1.5px] h-[5px]" style={{ top: "12%", right: "12%", transform: "rotate(45deg)", backgroundColor: "rgba(14,165,164,0.2)" }} />
          {/* NW */}
          <div className="absolute w-[1.5px] h-[5px]" style={{ top: "12%", left: "12%", transform: "rotate(-45deg)", backgroundColor: "rgba(14,165,164,0.2)" }} />
          {/* SE */}
          <div className="absolute w-[1.5px] h-[5px]" style={{ bottom: "12%", right: "12%", transform: "rotate(-45deg)", backgroundColor: "rgba(14,165,164,0.2)" }} />
          {/* SW */}
          <div className="absolute w-[1.5px] h-[5px]" style={{ bottom: "12%", left: "12%", transform: "rotate(45deg)", backgroundColor: "rgba(14,165,164,0.2)" }} />
        </div>
      </div>

      <div
        ref={dotEl}
        className="absolute rounded-full bg-[#0ea5a4] pointer-events-none"
        style={{ width: DOT, height: DOT, top: -100, left: -100 }}
      />
    </div>
  );
}
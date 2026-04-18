import { useEffect, useState } from "react";

// "Mobile" here means a touch / coarse-pointer device (phones + tablets).
// We deliberately do NOT match on max-width alone — a desktop user with a
// narrow browser window still has a mouse and expects cursor effects, hover
// previews, etc. Conflating "narrow" with "mobile" makes desktop testing at
// responsive widths look broken. `(pointer: coarse)` is the correct signal.
const QUERY = "(pointer: coarse)";

const getInitial = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
};

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return isMobile;
}

// Utility for one-shot detection outside React (e.g. module-level guards)
export function detectIsMobile() {
  return getInitial();
}

// Honour prefers-reduced-motion — independent signal, often checked alongside
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

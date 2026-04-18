import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * Shared hero entrance animation used across all page heroes.
 * Animates: subtitle fade, title word reveal, accent line scale, description fade.
 *
 * @param {React.RefObject} scopeRef - Container ref to scope animations
 * @param {object} [options]
 * @param {number} [options.delay=0.2] - Initial delay
 * @param {boolean} [options.hasLine=true] - Whether to animate .hero-line
 */
export default function useHeroAnimation(scopeRef, { delay = 0.2, hasLine = true } = {}) {
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay });

      tl.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        ".hero-word",
        { yPercent: 110, rotateZ: 3 },
        { yPercent: 0, rotateZ: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" },
        "-=0.5"
      );

      if (hasLine) {
        tl.fromTo(
          ".hero-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "expo.out" },
          "-=1.0"
        );
      }

      tl.fromTo(
        ".hero-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    },
    { scope: scopeRef }
  );
}

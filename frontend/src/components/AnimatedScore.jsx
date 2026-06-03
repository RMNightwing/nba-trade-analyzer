// Counts the score up from 0 → value on mount, ~700ms, easing out. Honors the
// user's reduced-motion preference (snaps to the final value with no tween).
// Pure presentation; the rendered number always lands on the exact integer.
import { useEffect, useState } from "react";

const DURATION_MS = 700;

export default function AnimatedScore({ value, className }) {
  const [shown, setShown] = useState(() => {
    if (typeof window === "undefined") return value;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      ? value
      : 0;
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(value);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      // easeOutCubic — quick start, gentle land
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span className={className}>{shown}</span>;
}

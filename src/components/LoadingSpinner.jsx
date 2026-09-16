import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import style from "./LoadingSpinner.module.css";

const BOOT_LINES = ["initializing portfolio", "loading modules", "compiling experience"];

function LoadingSpinner() {
  const [percent, setPercent] = useState(0);
  const reducedMotion = useReducedMotion();
  const barRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) {
      setPercent(100);
      return;
    }
    let raf;
    const duration = 1500;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(progress * 100);
      setPercent(value);
      if (barRef.current) barRef.current.style.width = `${value}%`;
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <div className={style.loadingContainer} role="status" aria-live="polite">
      <div className={style.terminal}>
        {BOOT_LINES.map((line, i) => (
          <p
            className={style.line}
            key={line}
            style={{ animationDelay: reducedMotion ? "0s" : `${i * 0.25}s` }}
          >
            {line}
          </p>
        ))}
        <div className={style.percentRow}>
          <span className={style.percent}>{percent}%</span>
          <span className={style.status}>Loading</span>
        </div>
        <div className={style.barTrack}>
          <div className={style.barFill} ref={barRef} />
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;

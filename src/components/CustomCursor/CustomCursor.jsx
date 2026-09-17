import { useEffect, useRef, useState } from "react";
import style from "./CustomCursor.module.css";

const INTERACTIVE_SELECTOR = "a, button, [data-cursor='hover']";

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    document.body.classList.add("cursor-ready");

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;
    let rafId;

    const handleMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
      }
    };

    const handleOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setActive(true);
    };
    const handleOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setActive(false);
    };

    const animateRing = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    return () => {
      document.body.classList.remove("cursor-ready");
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className={style.dot} />
      <div ref={ringRef} className={`${style.ring} ${active ? style.ringActive : ""}`} />
    </>
  );
}

export default CustomCursor;

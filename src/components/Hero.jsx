import { useEffect, useRef, useState } from "react";
import { gsap } from "../utils/gsapSetup";
import myPhoto from "../../assets/MyPhoto.jpg";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { scrollToId } from "../utils/scrollTo";
import style from "./Hero.module.css";

const ROLES = [
  "Full Stack Developer",
  "Competitive Programmer",
  "Blockchain Developer",
  "Cyber Security Enthusiast",
];

const SCRAMBLE_CHARS = "!@#$%^&*()_=+;?/~";

function Hero() {
  const canvasRef = useRef(null);
  const roleRef = useRef(null);
  const photoFrameRef = useRef(null);
  const contentRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let destroy;
    let cancelled = false;
    import("../three/heroScene").then(({ createHeroScene }) => {
      if (cancelled) return;
      destroy = createHeroScene(canvas, { reduceMotion: reducedMotion });
    });
    return () => {
      cancelled = true;
      if (destroy) destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const el = roleRef.current;
    if (!el) return;
    const text = ROLES[roleIndex];
    const stepCount = text.length * 3;
    let frame = 0;
    const interval = setInterval(() => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        output +=
          frame / stepCount > i / text.length
            ? text[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = output;
      frame++;
      if (frame >= stepCount) {
        clearInterval(interval);
        el.textContent = text;
      }
    }, (1.4 * 1000) / stepCount);
    return () => clearInterval(interval);
  }, [roleIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i === ROLES.length - 1 ? 0 : i + 1));
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(photoFrameRef.current, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 1,
        ease: "back.out(1.6)",
      }).from(
        contentRef.current.querySelectorAll("[data-reveal]"),
        { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
        "-=0.5"
      );
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const frame = photoFrameRef.current;
    if (!frame || !window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (e) => {
      frame.style.transition = "none";
      const rect = frame.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(800px) rotateY(${relX * 24}deg) rotateX(${-relY * 24}deg)`;
    };
    const handleLeave = () => {
      frame.style.transition = "transform 0.6s var(--ease-out)";
      frame.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    };

    frame.addEventListener("mousemove", handleMove);
    frame.addEventListener("mouseleave", handleLeave);
    return () => {
      frame.removeEventListener("mousemove", handleMove);
      frame.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section id="intro" className={style.hero}>
      <canvas ref={canvasRef} className={style.canvas} aria-hidden="true" />

      <div className={style.content} ref={contentRef}>
        <span className="eyebrow" data-reveal>
          Full Stack &middot; Blockchain &middot; Security
        </span>

        <div className={style.photoOuter}>
          <div className={style.photoFrame} ref={photoFrameRef}>
            <img src={myPhoto} alt="Portrait of Ayush Mazumdar" width="160" height="160" />
          </div>
        </div>

        <h1 className={style.name} data-reveal>
          Ayush&nbsp;Mazumdar
        </h1>

        <h2 className={style.role} ref={roleRef} data-reveal></h2>

        <div className={style.ctaRow} data-reveal>
          <button className={style.ctaPrimary} onClick={() => scrollToId("projects")}>
            View Work
          </button>
          <button className={style.ctaSecondary} onClick={() => scrollToId("contact")}>
            Get In Touch
          </button>
        </div>
      </div>

      <button
        className={style.scrollCue}
        onClick={() => scrollToId("about")}
        aria-label="Scroll to About section"
      >
        <span>Scroll</span>
        <span className={style.scrollLine}></span>
      </button>
    </section>
  );
}

export default Hero;

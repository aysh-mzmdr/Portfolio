import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../utils/gsapSetup";
import style from "./About.module.css";

const STATS = [
  { value: 4, suffix: "", label: "Projects Shipped" },
  { value: 3, suffix: "", label: "Core Domains" },
  { value: 20, suffix: "", label: "Technologies" },
];

function About() {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const statsColRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const dur = reduced ? 0.01 : 0.9;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(textColRef.current, { opacity: 1, y: 0, duration: dur, ease: "power3.out" })
        .to(statsColRef.current, { opacity: 1, y: 0, duration: dur, ease: "power3.out" }, reduced ? "<" : "-=0.6");

      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i].value;
        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value: target,
            duration: reduced ? 0.01 : 1.4,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = Math.round(counter.value) + STATS[i].suffix;
            },
          },
          reduced ? "<" : "-=0.9"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className={style.about} ref={sectionRef}>
      <div className={style.inner}>
        <div className={style.textCol} ref={textColRef}>
          <span className="eyebrow">About Me</span>
          <h2 className={style.heading}>
            Building at the intersection of software, security, and decentralized
            systems.
          </h2>
          <p className={style.bio}>
            I'm <strong>Ayush Mazumdar</strong>, an aspiring software engineer who enjoys
            turning hard problems into clean, working code. My focus spans{" "}
            <span className={style.highlight}>full-stack web development</span>,{" "}
            <span className={style.highlight}>blockchain engineering</span>, and{" "}
            <span className={style.highlight}>cyber security</span> — with competitive
            programming sharpening how I think about algorithms along the way. I care about
            building software that's fast, secure, and genuinely useful.
          </p>
        </div>

        <div className={style.statsCol} ref={statsColRef}>
          {STATS.map((stat, i) => (
            <div className={style.statCard} key={stat.label}>
              <div
                className={style.statNumber}
                ref={(el) => (numberRefs.current[i] = el)}
              >
                0
              </div>
              <div className={style.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;

import { useEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../utils/gsapSetup";
import style from "./About.module.css";
import { projectCount } from "../../data/projects";
import { techCount } from "../../data/technologies";
import { useCodeforcesRating } from "../../hooks/useCodeforcesRating";

function About() {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const statsColRef = useRef(null);
  const numberRefs = useRef([]);
  const { rating: cfRating, rank: cfRank } = useCodeforcesRating();

  const STATS = useMemo(
    () => [
      { value: projectCount, suffix: "", label: "Projects Shipped" },
      { value: cfRating, suffix: "", label: "Codeforces Rating", badge: cfRank },
      { value: techCount, suffix: "", label: "Technologies" },
    ],
    [cfRating, cfRank]
  );

  useEffect(() => {
    // Wait for the live Codeforces rating to resolve before wiring up the
    // count-up reveal, so it never animates to a placeholder value.
    if (cfRating === null) return;

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
  }, [cfRating, STATS]);

  return (
    <section id="about" className={style.about} ref={sectionRef}>
      <div className={style.inner}>
        <div className={style.textCol} ref={textColRef}>
          <span className="eyebrow">About Me</span>
          <h2 className={style.heading}>
            Passion to build. Hunger to learn. Eagerness to refactor.
          </h2>
          <p className={style.bio}>
            I'm <strong>Ayush Mazumdar</strong>, a software engineer who genuinely loves
            building stuff and exploring new technologies. My core focus spans{" "}
            <span className={style.highlight}>full-stack web development</span> and{" "}
            <span className={style.highlight}>cyber security</span>, sharpened by regular
            competitive programming, but I don't confine myself to a single domain. When something
            pulls my curiosity, I chase it, whether that's diving into{" "}
            <span className={style.highlightAlt}>blockchain</span>, building{" "}
            <span className={style.highlightAlt}>a game in Unity</span>, or exploring how{" "}
            <span className={style.highlightAlt}>AI and RAG pipelines</span> fit into real
            projects. I'm also meticulous by nature, always pushing to build the best
            possible result I can.
          </p>
        </div>

        <div className={style.statsCol} ref={statsColRef}>
          {STATS.map((stat, i) => (
            <div className={style.statCard} key={stat.label}>
              <div className={style.statNumberRow}>
                <div
                  className={style.statNumber}
                  ref={(el) => (numberRefs.current[i] = el)}
                >
                  0
                </div>
                {stat.badge && <div className={style.statBadge}>{stat.badge}</div>}
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

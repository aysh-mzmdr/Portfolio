import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../utils/gsapSetup";
import style from "./Skills.module.css";

const CATEGORIES = [
  { label: "Languages", items: ["C++", "Java", "Python"] },
  { label: "Web Development", items: ["ReactJs", "ExpressJs", "NodeJs", "Django"] },
  {
    label: "Blockchain",
    items: ["Solidity", "Web3Js", "Ganache", "Truffle", "Hardhat", "Foundry"],
  },
  { label: "Databases", items: ["MySQL", "PostgreSQL"] },
  { label: "Tools & Systems", items: ["GSAP", "ThreeJs", "Blender", "Windows", "Linux"] },
];

function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      gsap.to("[data-category]", {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.01 : 0.7,
        stagger: reduced ? 0 : 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className={style.skills} ref={sectionRef}>
      <div className={style.inner}>
        <div className={style.header}>
          <span className="eyebrow">Skill Set</span>
          <h2 className={style.heading}>Tools I reach for</h2>
        </div>

        <div className={style.grid}>
          {CATEGORIES.map((category) => (
            <div className={style.category} data-category key={category.label}>
              <span className={style.categoryLabel}>{category.label}</span>
              <div className={style.tagList}>
                {category.items.map((item) => (
                  <span className={style.tag} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

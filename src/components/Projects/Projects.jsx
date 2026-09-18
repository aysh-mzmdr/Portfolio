import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../utils/gsapSetup";
import ProjectCard from "../ProjectCard/ProjectCard";
import style from "./Projects.module.css";
import { projects } from "../../data/projects";

const PROJECTS = projects;

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-project-row]").forEach((row) => {
        gsap.to(row, {
          opacity: 1,
          y: 0,
          duration: reduced ? 0.01 : 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            once: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className={style.projects} ref={sectionRef}>
      <div className={style.inner}>
        <div className={style.header}>
          <span className="eyebrow">Selected Work</span>
          <h2 className={style.heading}>Projects</h2>
        </div>

        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} index={i + 1} reverse={i % 2 === 1} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;

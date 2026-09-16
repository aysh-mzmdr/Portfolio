import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../utils/gsapSetup";
import ProjectCard from "./ProjectCard";
import style from "./Projects.module.css";
import Chemical_Equipment_Parameter_Visualizer from "../../assets/Chemical_Equipment_Parameter_Visualizer.jpg";
import ObstacleMania from "../../assets/ObstacleMania.jpg";
import Solidity_Wallet from "../../assets/Solidity_Wallet.jpg";
import Coffee_Website from "../../assets/Coffee Website.jpg";

const PROJECTS = [
  {
    image: Chemical_Equipment_Parameter_Visualizer,
    name: "Chemical Equipment Parameter Visualizer",
    info: "A hybrid web and desktop application to analyze and visualize chemical equipment data in real time.",
    link: "https://github.com/aysh-mzmdr/Chemical_Equipment_Parameter_Visualizer/",
    tags: ["Python", "JavaScript", "Data Visualization"],
  },
  {
    image: ObstacleMania,
    name: "ObstacleMania",
    info: "A high-speed obstacle dodging game built in Unity with multiple difficulty levels and real-time collision mechanics.",
    link: "https://aysh-mzmdr.github.io/ObstacleMania/",
    tags: ["Unity", "C#", "WebGL"],
  },
  {
    image: Solidity_Wallet,
    name: "Solidity Wallet",
    info: "A decentralized wallet interface for sending and receiving Ether through on-chain blockchain transactions.",
    link: "https://github.com/aysh-mzmdr/Solidity_Wallet/",
    tags: ["Solidity", "Web3.js", "Ethereum"],
  },
  {
    image: Coffee_Website,
    name: "Coffee Website",
    info: "A front-end responsive website designed and built for a fictional coffee shop brand.",
    link: "https://aysh-mzmdr.github.io/Coffee_Website/",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

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

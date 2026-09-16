import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../utils/gsapSetup";
import { useMagnetic } from "../hooks/useMagnetic";
import { scrollToId } from "../utils/scrollTo";
import Linkedin from "../../assets/Linkedin.svg";
import Instagram from "../../assets/Instagram.svg";
import GitHub from "../../assets/GitHub.svg";
import Resume from "../../assets/Resume.png";
import style from "./Contact.module.css";

const LINKS = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/aysh-mzmdr/" },
  { name: "GitHub", icon: GitHub, href: "https://github.com/aysh-mzmdr" },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/aysh_mzmdr?igsh=MWo3dnYzZDQ0d3I0bw==",
  },
  {
    name: "My Resume",
    icon: Resume,
    href: "https://drive.google.com/file/d/1-R20VstUSQ1JlsfRXYhp2f9iuVoE2Hga/view?usp=sharing",
  },
];

function IconButton({ name, icon, href }) {
  const ref = useMagnetic(0.4);
  return (
    <div className={style.iconDiv} data-icon-div>
      <button
        ref={ref}
        className={style.iconButton}
        onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
        aria-label={name}
      >
        <img className={style.icon} src={icon} alt="" aria-hidden="true" />
      </button>
      <p className={style.iconName}>{name}</p>
    </div>
  );
}

function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.to("[data-icon-div]", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: reduced ? 0.01 : 0.6,
        stagger: reduced ? 0 : 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className={style.contact} ref={sectionRef}>
      <div className={style.inner}>
        <span className="eyebrow">Get In Touch</span>
        <h2 className={style.heading}>Let&rsquo;s build something worth shipping.</h2>
        <p className={style.subtitle}>
          Have a project, an idea, or just want to talk tech? My inbox is open.
        </p>
        <a className={style.emailLink} href="mailto:ayush.mazumdar111@gmail.com">
          ayush.mazumdar111@gmail.com
        </a>

        <div className={style.iconSection}>
          {LINKS.map((link) => (
            <IconButton key={link.name} {...link} />
          ))}
        </div>

        <div className={style.footer}>
          <span>&copy; {new Date().getFullYear()} Ayush Mazumdar</span>
          <button className={style.backToTop} onClick={() => scrollToId("intro")}>
            Back to top &uarr;
          </button>
        </div>
      </div>
    </section>
  );
}

export default Contact;

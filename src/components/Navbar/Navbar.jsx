import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { scrollToId } from "../../utils/scrollTo";
import style from "./Navbar.module.css";

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [activeId, setActiveId] = useState("intro");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgStyle, setBgStyle] = useState({ transform: "translateX(0)", width: 0 });
  const linkRefs = useRef({});
  const navRef = useRef(null);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // Thin horizontal band ~1/4 down the viewport, so a section is "active"
      // as soon as it crosses that line — independent of the section's height
      // (a plain 50% threshold never fires for sections taller than 2x the viewport).
      { rootMargin: "-20% 0px -75% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = linkRefs.current[activeId];
    if (!el) return;
    setBgStyle({
      transform: `translateX(${el.offsetLeft}px)`,
      width: `${el.offsetWidth}px`,
    });
  }, [activeId]);

  const goTo = (id) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div className={style.navbar}>
        <div className={style.logo}>
          aysh<span className={style.underscore}>_</span><span>mzmdr</span>
        </div>

        <nav className={style.pillNav} ref={navRef}>
          <div
            className={style.navLinkBg}
            style={{ transform: bgStyle.transform, width: bgStyle.width, left: 0 }}
          />
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              ref={(el) => (linkRefs.current[section.id] = el)}
              className={`${style.navLink} ${activeId === section.id ? style.active : ""}`}
              onClick={() => goTo(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <button
          className={`${style.menuButton} ${menuOpen ? style.open : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`${style.mobileOverlay} ${menuOpen ? style.visible : ""}`}>
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            className={style.mobileLink}
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => goTo(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default Navbar;

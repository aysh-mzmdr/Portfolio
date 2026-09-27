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
  const [hidden, setHidden] = useState(false);
  const linkRefs = useRef({});
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const revealTimer = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const IDLE_REVEAL_DELAY = 650;

    lastScrollY.current = window.scrollY;

    const evaluateScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (revealTimer.current) clearTimeout(revealTimer.current);

      if (currentY < 80) {
        setHidden(false);
      } else {
        if (Math.abs(delta) > 4) setHidden(true);
        // Reschedule on every scroll tick (not just significant ones) so
        // momentum scrolling's tiny trailing deltas still push the reveal
        // out until motion has actually stopped for IDLE_REVEAL_DELAY.
        revealTimer.current = setTimeout(() => setHidden(false), IDLE_REVEAL_DELAY);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(evaluateScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (revealTimer.current) clearTimeout(revealTimer.current);
    };
  }, []);

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
      <div className={`${style.navbar} ${hidden ? style.navbarHidden : ""}`}>
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

import { gsap } from "./gsapSetup";

export function scrollToId(id, duration = 1.3) {
  const target = document.getElementById(id);
  if (!target) return;
  gsap.to(window, { scrollTo: target, duration, ease: "power2.inOut" });
}

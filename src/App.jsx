import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import About from "./components/About/About.jsx";
import Skills from "./components/Skills/Skills.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Contact from "./components/Contact/Contact.jsx";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";
import { useReducedMotion } from "./hooks/useReducedMotion";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), reducedMotion ? 300 : 1700);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;

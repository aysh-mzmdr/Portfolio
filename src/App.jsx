import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
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

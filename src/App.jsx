import { useRef,useState,useEffect } from "react";
import {gsap} from "gsap";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import style from "./style.module.css"

gsap.registerPlugin(ScrollToPlugin);

function App(){

  const IntroGSAP=useRef()
  const AboutGSAP=useRef()
  const SkillsGSAP=useRef()
  const ProjectsGSAP=useRef()
  const ContactGSAP=useRef()

  // Hacking Transition

  /*const titles=[
    "Full-Stack Developer",
    "Competitive Programmer",
    "Blockchain Developer",
    "Cyber-Security Enthusiast"
  ]
  const textRef = useRef();
    const [index, setIndex] = useState(0);
  
    const scrambleText = (text) => {
      const chars = "!<>-_\\/[]{}—=+*^?#________";
      const duration = 1.5;
      const steps = text.length * 3;
      let frame = 0;
  
      const scrambleInterval = setInterval(() => {
        let output = '';
        for (let i = 0; i < text.length; i++) {
          if (frame / steps > i / text.length) {
            output += text[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        if (textRef.current) textRef.current.textContent = output;
  
        frame++;
        if (frame >= steps) {
          clearInterval(scrambleInterval);
          if (textRef.current) textRef.current.textContent = text;
        }
      }, duration * 1000 / steps);
    };
  
    useEffect(() => {
      scrambleText(titles[index]);
  
      const interval = setInterval(() => {
        const nextIndex = (index + 1) % titles.length;
        setIndex(nextIndex);
      }, 3000);
  
      return () => clearInterval(interval);
    }, [index]);
    
    <h1
      ref={textRef}           This goes in return statement
      style={{
        fontSize: "2.5rem",
        color: "#00bf89",
        textShadow: "0 0 10px #00bf89",
        fontFamily: "monospace",
      }}
    ></h1>*/

  return(
    <>
    <div className={style.navbar}>
      <button className={style.navbarButton} onClick={() => gsap.to(window,{scrollTo:IntroGSAP.current,duration:1})}>Intro</button>
      <button className={style.navbarButton} onClick={() => gsap.to(window,{scrollTo:AboutGSAP.current,duration:1})}>About</button>
      <button className={style.navbarButton} onClick={() => gsap.to(window,{scrollTo:SkillsGSAP.current,duration:1})}>Skills</button>
      <button className={style.navbarButton} onClick={() => gsap.to(window,{scrollTo:ProjectsGSAP.current,duration:1})}>Projects</button>
      <button className={style.navbarButton} onClick={() => gsap.to(window,{scrollTo:ContactGSAP.current,duration:1})}>Contact</button>      
    </div>
      <div className={style.intro} ref={IntroGSAP}>
        <img src="../assets/MyPhoto.jpg" alt="My Photo"></img>
          <h1>Ayush Mazumdar</h1>
          <h1>Full-Stack Developer</h1>
      </div>
      <h1 className={style.head} ref={AboutGSAP}>About</h1>
      <div className={style.about}>
          <div className={style.aboutBox}> 
            Aspiring to build a successful career as a software engineer by leveraging strong programming skills, problem solving abilities, and a passion for technology to 
            contribute effectively to innovative and impactful software solutions.
          </div>
      </div>
      <h1 className={style.head}>Skills</h1>
      <div className={style.skills} ref={SkillsGSAP}>
        <button className={style.skill}>C++</button>
        <button className={style.skill}>C</button>
        <button className={style.skill}>Java</button>
        <button className={style.skill}>Python</button>
        <button className={style.skill}>Javascript</button>
        <button className={style.skill}>ReactJs</button>
        <button className={style.skill}>ExpressJs</button>
        <button className={style.skill}>ThreeJs</button>
        <button className={style.skill}>NodeJs</button>
        <button className={style.skill}>Solidity</button>
        <button className={style.skill}>Unity</button>
        <button className={style.skill}>GSAP</button>
        <button className={style.skill}>Kali Linux</button>
        <button className={style.skill}>Blender</button>
      </div>
      <h1 className={style.head}>Projects</h1>
      <div className={style.projects} ref={ProjectsGSAP}>

      </div>
      <div className={style.contact} ref={ContactGSAP}>
        <div>Made by aysh_mzmdr</div>
        <div>Hyperlinks to LinkedIn,Github</div>
      </div>
    </>
  )
}

export default App;
import { useRef,useState,useEffect } from "react";
import {gsap} from "gsap";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import style from "./style.module.css"
import Card from "./Card.jsx"
gsap.registerPlugin(ScrollToPlugin);

function App(){

  const IntroGSAP=useRef()
  const AboutGSAP=useRef()
  const SkillsGSAP=useRef()
  const ProjectsGSAP=useRef()
  const ContactGSAP=useRef()
  const textRef=useRef()

  const roles=[
    "Full Stack Developer",
    "Competitive Programmer",
    "Blockchain Developer",
    "Cyber Security Enthusiast"
  ]

  const [index,setIndex] = useState(0);

  const scrambleText=(text) => {  

  const chars="!@#$%^&*()_=+;?/~"
  let frame=0
  const step=text.length*3
  const scrambleInterval = setInterval(() => {
    let output=""
    for(let i=0;i<text.length;i++){
      if(frame/step > i/text.length)
        output=output + text[i]
      else
        output=output + chars[Math.floor(Math.random()*chars.length)]
      textRef.current.textContent=output
    }
    frame++
    if(frame>=step){
      clearInterval(scrambleInterval)
      textRef.current.textContent=text
    }
  },1.5*1000/step)
}

  useEffect(() => {
    scrambleText(roles[index])
    const interval = setInterval(() => {
      setIndex(index==roles.length-1?0:index+1)
    },3000)
    return() => clearInterval(interval);
  },[index])

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
        <img className={style.profileimg} src="./assets/MyPhoto.jpg" alt="My Photo"></img>
          <h1 className={style.name}>Ayush Mazumdar</h1>
          <h1 className={style.role} ref={textRef}></h1>
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
          <Card className={style.blackImage} image="../assets/Coffee Website.png" name="Coffee Website" info="A Front-end based website meant to be used for a Coffee Shop " link="https://aysh-mzmdr.github.io/Coffee_Website/"></Card>
          <Card className={style.whiteImage} image="../assets/ObstacleMania.png" name="ObstacleMania" info="A high-speed obstacle dodging game with different levels of difficulty. " link="https://aysh-mzmdr.github.io/ObstacleMania/"></Card>
          <Card className={style.blackImage} image="../assets/Scholars Playground.png" name="Scholars Playground" info="An interactive learning platform that uses gamification elements to engage users." link="https://aysh-mzmdr.github.io/Scholars_Playground/"></Card>
          <Card className={style.whiteImage} image="../assets/Pokedex.png" name="Pokedex" info="A replica of the Pokedex from the popular anime series Pokemon. " link="https://aysh-mzmdr.github.io/Pokedex/"></Card>
      </div>
      <div className={style.contact} ref={ContactGSAP}>
        <div className={style.iconSection}>
          <div className={style.iconDiv}><button className={style.iconButton} onClick={() => window.open("https://www.linkedin.com/in/aysh-mzmdr/","_blank")}><img className={style.icon} src="../assets/Linkedin.svg" alt="Linkedin"></img></button><p className={style.iconName}>Linkedin</p></div>
          <div className={style.iconDiv}><button className={style.iconButton} onClick={() => window.open("https://github.com/aysh-mzmdr","_blank")}><img className={style.icon} src="../assets/GitHub.svg" alt="GitHub"></img></button><p className={style.iconName}>GitHub</p></div>
          <div className={style.iconDiv}><button className={style.iconButton} onClick={() => window.open("https://www.instagram.com/aysh_mzmdr?igsh=MWo3dnYzZDQ0d3I0bw==","_blank")}><img className={style.icon} src="../assets/Instagram.svg" alt="Intagram"></img></button><p className={style.iconName}>Instagram</p></div>
          <div className={style.iconDiv}><button className={style.iconButton} onClick={() => window.open("","_blank")}><img className={style.icon} src="../assets/Resume.png" alt="Resume"></img></button><p className={style.iconName}>My Resume</p></div>
        </div>
        <div className={style.finalText}>
          <h1 style={{color:"white",textShadow:"none"}}>Made by aysh_mzmdr</h1>
          <h2>Email : ayush.mazumdar111@gmail.com</h2>
        </div>
      </div>
    </> 
  )
}

export default App;
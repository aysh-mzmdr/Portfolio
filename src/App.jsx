import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import style from "./style.module.css"
import Card from "./Card.jsx"
import LoadingSpinner from "./LoadingSpinner.jsx"
import myPhoto from "../assets/MyPhoto.jpg"
import Linkedin from "../assets/Linkedin.svg"
import Instagram from "../assets/Instagram.svg"
import GitHub from "../assets/GitHub.svg"
import Resume from "../assets/Resume.png"
import Coffee_Website from "../assets/Coffee Website.png"
import ObstacleMania from "../assets/ObstacleMania.png"
import Solidity_Wallet from "../assets/Solidity_Wallet.png"
import Chemical_Equipment_Parameter_Visualizer from "../assets/Chemical_Equipment_Parameter_Visualizer.png"

gsap.registerPlugin(ScrollToPlugin, TextPlugin);

function App() {
  const IntroGSAP = useRef()
  const AboutGSAP = useRef()
  const SkillsGSAP = useRef()
  const ProjectsGSAP = useRef()
  const ContactGSAP = useRef()
  const textRef = useRef()
  const profileImgRef = useRef()
  const nameRef = useRef()
  const aboutBoxRef = useRef()
  const skillsRef = useRef()
  const projectsRef = useRef()
  const contactRef = useRef()
  const navbarRef = useRef()

  const roles = [
    "Full Stack Developer",
    "Competitive Programmer",
    "Blockchain Developer",
    "Cyber Security Enthusiast"
  ]

  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const scrambleText = (text) => {
    const chars = "!@#$%^&*()_=+;?/~"
    let frame = 0
    const step = text.length * 3
    const scrambleInterval = setInterval(() => {
      let output = ""
      for (let i = 0; i < text.length; i++) {
        if (frame / step > i / text.length)
          output = output + text[i]
        else
          output = output + chars[Math.floor(Math.random() * chars.length)]
        textRef.current.textContent = output
      }
      frame++
      if (frame >= step) {
        clearInterval(scrambleInterval)
        textRef.current.textContent = text
      }
    }, 1.5 * 1000 / step)
  }

  useEffect(() => {
    scrambleText(roles[index])
    const interval = setInterval(() => {
      setIndex(index == roles.length - 1 ? 0 : index + 1)
    }, 3000)
    return () => clearInterval(interval);
  }, [index])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline()
    
    // Navbar animation
    tl.from(navbarRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    
    // Profile image animation
    tl.from(profileImgRef.current, {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    }, "-=0.5")
    
    // Name animation
    tl.from(nameRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    
    // Role text animation
    tl.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")

    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target
          
          if (element === aboutBoxRef.current) {
            gsap.fromTo(element,
              {
                y: 100,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
              }
            )
          }
          
          if (element === skillsRef.current) {
            const skillButtons = element.querySelectorAll('.skill')
            gsap.fromTo(skillButtons,
              {
                scale: 0,
                rotation: 180,
                opacity: 0
              },
              {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
              }
            )
          }
          
          if (element === projectsRef.current) {
            const cards = element.querySelectorAll('.card')
            gsap.fromTo(cards,
              {
                y: 100,
                opacity: 0,
                scale: 0.8
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
              }
            )
          }
          
          if (element === contactRef.current) {
            const iconDivs = element.querySelectorAll('.iconDiv')
            gsap.fromTo(iconDivs,
              {
                y: 50,
                opacity: 0,
                scale: 0.8
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
              }
            )
          }
          
          observer.unobserve(element)
        }
      })
    }, observerOptions)

    // Observe elements
    if (aboutBoxRef.current) observer.observe(aboutBoxRef.current)
    if (skillsRef.current) observer.observe(skillsRef.current)
    if (projectsRef.current) observer.observe(projectsRef.current)
    if (contactRef.current) observer.observe(contactRef.current)

    return () => observer.disconnect()
  }, [])

  const smoothScroll = (element) => {
    gsap.to(window, {
      scrollTo: element,
      duration: 1.5,
      ease: "power2.inOut"
    })
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className={style.navbar} ref={navbarRef}>
        <button className={style.navbarButton} onClick={() => smoothScroll(IntroGSAP.current)}>Intro</button>
        <button className={style.navbarButton} onClick={() => smoothScroll(AboutGSAP.current)}>About</button>
        <button className={style.navbarButton} onClick={() => smoothScroll(SkillsGSAP.current)}>Skills</button>
        <button className={style.navbarButton} onClick={() => smoothScroll(ProjectsGSAP.current)}>Projects</button>
        <button className={style.navbarButton} onClick={() => smoothScroll(ContactGSAP.current)}>Contact</button>
      </div>
      
      <div className={style.intro} ref={IntroGSAP}>
        <img className={style.profileimg} ref={profileImgRef} src={myPhoto} alt="My Photo"></img>
        <h1 className={style.name} ref={nameRef}>Ayush Mazumdar</h1>
        <h1 className={style.role} ref={textRef}></h1>
      </div>
      
      <h1 className={style.head} ref={AboutGSAP}>About</h1>
      <div className={style.about}>
        <div className={style.aboutBox} ref={aboutBoxRef}>
          Aspiring to build a successful career as a software engineer by leveraging strong programming skills, problem solving abilities, and a passion for technology to
          contribute effectively to innovative and impactful software solutions.
        </div>
      </div>
      
      <h1 className={style.head}>Skills</h1>
      <div className={style.skills} ref={SkillsGSAP}>
        <button className={style.skill}>C++</button>
        <button className={style.skill}>Java</button>
        <button className={style.skill}>Python</button>
        <button className={style.skill}>ReactJs</button>
        <button className={style.skill}>ExpressJs</button>
        <button className={style.skill}>NodeJs</button>
        <button className={style.skill}>Django</button>
        <button className={style.skill}>ThreeJs</button>
        <button className={style.skill}>GSAP</button>
        <button className={style.skill}>Solidity</button>
        <button className={style.skill}>Web3Js</button>
        <button className={style.skill}>Ganache</button>
        <button className={style.skill}>Truffle</button>
        <button className={style.skill}>Hardhat</button>
        <button className={style.skill}>Foundry</button>
        <button className={style.skill}>Windows</button>
        <button className={style.skill}>Linux</button>
        <button className={style.skill}>Blender</button>
        <button className={style.skill}>MySQL</button>
        <button className={style.skill}>PostgreSQL</button>
      </div>
      
      <h1 className={style.head}>Projects</h1>
      <div className={style.projects} ref={ProjectsGSAP}>
        <Card className={style.project} image={Chemical_Equipment_Parameter_Visualizer} name="Chemical Equipment Parameter Visualizer" info="A hybrid Web and Desktop application to analyze and visualize chemical equipment data." link="https://github.com/aysh-mzmdr/Chemical_Equipment_Parameter_Visualizer/"></Card>
        <Card className={style.project} image={ObstacleMania} name="ObstacleMania" info="A high-speed obstacle dodging game, implementing multiple difficulty levels and real-time collision mechanics. " link="https://aysh-mzmdr.github.io/ObstacleMania/"></Card>
        <Card className={style.project} image={Solidity_Wallet} name="Solidity Wallet" info="A Decentralized wallet interface for sending and receiving Ether through blockchain transactions" link="https://github.com/aysh-mzmdr/Solidity_Wallet/"></Card>
        <Card className={style.project} image={Coffee_Website} name="Coffee Website" info="A Front-end based website meant to be used for a Coffee Shop " link="https://aysh-mzmdr.github.io/Coffee_Website/"></Card>
      </div>
      
      <div className={style.contact} ref={ContactGSAP}>
        <div className={style.iconSection}>
          <div className={style.iconDiv}>
            <button className={style.iconButton} onClick={() => window.open("https://www.linkedin.com/in/aysh-mzmdr/", "_blank")}>
              <img className={style.icon} src={Linkedin} alt="Linkedin"></img>
            </button>
            <p className={style.iconName}>Linkedin</p>
          </div>
          <div className={style.iconDiv}>
            <button className={style.iconButton} onClick={() => window.open("https://github.com/aysh-mzmdr", "_blank")}>
              <img className={style.icon} src={GitHub} alt="GitHub"></img>
            </button>
            <p className={style.iconName}>GitHub</p>
          </div>
          <div className={style.iconDiv}>
            <button className={style.iconButton} onClick={() => window.open("https://www.instagram.com/aysh_mzmdr?igsh=MWo3dnYzZDQ0d3I0bw==", "_blank")}>
              <img className={style.icon} src={Instagram} alt="Instagram"></img>
            </button>
            <p className={style.iconName}>Instagram</p>
          </div>
          <div className={style.iconDiv}>
            <button className={style.iconButton} onClick={() => window.open("https://drive.google.com/file/d/1-R20VstUSQ1JlsfRXYhp2f9iuVoE2Hga/view?usp=sharing", "_blank")}>
              <img className={style.icon} src={Resume} alt="Resume"></img>
            </button>
            <p className={style.iconName}>My Resume</p>
          </div>
        </div>
        <div className={style.finalText}>
          <h1>Made by aysh_mzmdr</h1>
          <h2>Email : ayush.mazumdar111@gmail.com</h2>
        </div>
      </div>
    </>
  )
}

export default App;
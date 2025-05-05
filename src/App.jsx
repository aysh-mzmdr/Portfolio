import style from "./style.module.css"
function App(){
  
  return(
    <>
    <div className={style.navbar}>
      <button className={style.navbarButton}>Intro</button>
      <button className={style.navbarButton}>About</button>
      <button className={style.navbarButton}>Skills</button>
      <button className={style.navbarButton}>Projects</button>
      <button className={style.navbarButton}>Contact</button>      
    </div>
      <div className={style.intro}>
        <img src="../assets/MyPhoto.jpg" alt="My Photo"></img>
          <h1>Ayush Mazumdar</h1>
          <h1>Software Engineer</h1>
      </div>
      <h1 className={style.head}>About</h1>
      <div className={style.about}>
          <div className={style.aboutBox}> 
            Aspiring to build a successful career as a software engineer by leveraging strong programming skills, problem solving abilities, and a passion for technology to 
            contribute effectively to innovative and impactful software solutions.
          </div>
      </div>
      <h1 className={style.head}>Skills</h1>
      <div className={style.skills}>
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
      <div className={style.projects}>

      </div>
      <div className={style.contact}>
        <div>Made by aysh_mzmdr</div>
        <div>Hyperlinks to LinkedIn,Github</div>
      </div>
    </>
  )
}

export default App;
import style from "./style.module.css"
function App(){
  
  return(
    <>
      <div className={style.head}>
          <h1>Ayush Mazumdar</h1>
          <h1>Software Engineer</h1>
      </div>
      <h1 style={{textAlign:"center"}}>About</h1>
      <div className={style.about}>
          <div className={style.aboutBox}> 
            Aspiring to build a successful career as a software engineer by leveraging strong programming skills, problem solving abilities, and a passion for technology to 
            contribute effectively to innovative and impactful software solutions.
          </div>
      </div>
      <h1 style={{textAlign:"center"}}>Skills</h1>
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
      <h1 style={{textAlign:"center"}}>Projects</h1>
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
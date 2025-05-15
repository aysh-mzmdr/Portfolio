import cardStyle from "./card.module.css"
import style from "./style.module.css"

function Card(props){

    return(
        <>
            <div className={cardStyle.card}>
                <img className={props.className} src={props.image} alt={props.name}></img>
                <h1 className={cardStyle.name}>{props.name}</h1>
                <p className={cardStyle.info}>{props.info}</p>
                <button className={cardStyle.linkButton} onClick={() => window.open(props.link,"_blank")}>View Project</button>
            </div>
        </>
    )
}

export default Card
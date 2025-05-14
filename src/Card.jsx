import cardStyle from "./card.module.css"

function Card(props){

    return(
        <>
            <div className={cardStyle.card}>
                <img class={cardStyle.image} src={props.image} alt={props.name}></img>
                <h1 className={cardStyle.name}>{props.name}</h1>
                <p className={cardStyle.info}>{props.info}</p>
                <button className={cardStyle.linkButton} onClick={() => window.open(props.link,"_blank")}>View Project</button>
            </div>
        </>
    )
}

export default Card
import style from "./ProjectCard.module.css";

function ProjectCard({ index, image, name, info, link, tags, reverse }) {
  const openLink = () => window.open(link, "_blank", "noopener,noreferrer");

  return (
    <div className={`${style.row} ${reverse ? style.reverse : ""}`} data-project-row>
      <button
        className={style.imageWrap}
        data-cursor="hover"
        onClick={openLink}
        aria-label={`Open ${name} project`}
      >
        <img src={image} alt={name} loading="lazy" decoding="async" />
      </button>

      <div className={style.textBlock}>
        <span className={style.index}>{String(index).padStart(2, "0")}</span>
        <h3 className={style.name}>{name}</h3>
        <p className={style.info}>{info}</p>
        <div className={style.tags}>
          {tags.map((tag) => (
            <span className={style.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <button className={style.linkButton} onClick={openLink}>
          View Project <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;

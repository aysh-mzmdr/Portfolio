import style from "./ProjectCard.module.css";

function ProjectCard({ index, image, name, info, githubLink, hasLiveLink, liveLink, tags, reverse }) {
  const openGithub = () => window.open(githubLink, "_blank", "noopener,noreferrer");
  const openLiveLink = () => window.open(liveLink, "_blank", "noopener,noreferrer");

  return (
    <div className={`${style.row} ${reverse ? style.reverse : ""}`} data-project-row>
      <button
        className={style.imageWrap}
        data-cursor="hover"
        onClick={openGithub}
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
        <div className={style.buttonRow}>
          <button className={style.linkButton} onClick={openGithub}>
            View Project <span aria-hidden="true">&rarr;</span>
          </button>
          {hasLiveLink && (
            <button className={style.liveLinkButton} onClick={openLiveLink}>
              Live Link <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;

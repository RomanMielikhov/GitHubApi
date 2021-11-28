import { memo } from "react";
import { ReactElement, FC } from "react";
import RepositoryType from "app/types/repository";
import "./styles.scss";

type CardType = {
  repo: RepositoryType;
};

const Card: FC<CardType> = memo(({ repo }): ReactElement => {
  const { name, forks_count, stargazers_count, html_url } = repo;
  return (
    <div className="repo_card">
      <a href={html_url} target="_blank" rel="noreferrer">
        <div className="name">
          <div>{name}</div>
        </div>
        <div className="stats">
          <div>{stargazers_count} stars</div>
          <div>{forks_count} forks</div>
        </div>
      </a>
    </div>
  );
});

export default Card;

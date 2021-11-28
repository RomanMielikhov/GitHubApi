import { memo } from "react";
import { ReactElement, FC } from "react";
import Avatar from "app/components/Avatar";
import UserType from "app/types/user";
import "./styles.scss";

type CardType = {
  user: UserType;
  onCardClick: (login: string) => void;
};

const Card: FC<CardType> = memo(({ user, onCardClick }): ReactElement => {
  const { avatar_url, login } = user;

  return (
    <div className="user_card" onClick={() => onCardClick(login)}>
      <div>
        <Avatar src={avatar_url} name={login} size="sm" />
      </div>
      <div>{login}</div>
      <div>Repo:##</div>
    </div>
  );
});

export default Card;

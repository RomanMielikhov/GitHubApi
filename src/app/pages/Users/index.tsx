import { useCallback, useMemo, memo } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "app/hooks/useUser";
import Card from "app/components/userCard";
import statuses from "app/hooks/status";
import Input from "app/components/Input";
import "./styles.scss";

const Users = memo(() => {
  const navigate = useNavigate();
  const { users, error, status, fetch } = useUsers();

  const changeHandler = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      if (!value) return;
      fetch(e.currentTarget.value);
    },
    [fetch]
  );

  const cardHandler = useCallback(
    (login) => {
      localStorage.setItem("users", JSON.stringify(users));

      navigate(`user-info/${login}`);
    },
    [navigate, users]
  );

  const userCards = useMemo(() => {
    if (!users) return <></>;
    return users.map((user) => (
      <Card key={user.id} user={user} onCardClick={cardHandler} />
    ));
  }, [cardHandler, users]);

  return (
    <div className="users_wrapper">
      <Input onChange={changeHandler} />
      {status === statuses.loading && <>Loading...</>}
      {status === statuses.error && <>{error}</>}
      {userCards && <div className="users_card">{userCards}</div>}
    </div>
  );
});

export default Users;

import { useCallback, useMemo } from "react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useUserInfo } from "app/hooks/useUserInfo";
import { useRepositories } from "app/hooks/useRepositories";
import RepoCard from "app/components/repoCard";
import Input from "app/components/Input";
import Avatar from "app/components/Avatar";
import statuses from "app/hooks/status";
import "./styles.scss";

const UserInfo = () => {
  const { login } = useParams();

  const { user, error, status } = useUserInfo({ login });
  const {
    fetch,
    repositories,
    error: repoError,
    status: repoStatus,
  } = useRepositories();

  const changeHandler = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      if (!value) return;
      fetch(e.currentTarget.value, login!);
    },
    [fetch, login]
  );

  const userRepos = useMemo(() => {
    if (!repositories) return <></>;
    return repositories.map((e) => <RepoCard key={e.id} repo={e} />);
  }, [repositories]);

  return (
    <>
      {status === statuses.loading && <>Loading...</>}
      {status === statuses.error && <>{error}</>}
      {status === statuses.susses && (
        <>
          <div className="user_info">
            <Avatar src={user!.avatar_url} name={user!.name} size="lg" />
            <div className="details">
              <span>{user?.name}</span>
              <span>{user?.email ?? "email not found"}</span>
              <span>{user?.location ?? "location not found"}</span>
              <span>{new Date(user!.created_at).toDateString()}</span>
              <span>Followers: {user!.followers}</span>
              <span>Following: {user!.following}</span>
            </div>
          </div>
          <p className="bio">{user?.bio}</p>
          <div className="user_repositories">
            <Input onChange={changeHandler} />
            <div className="repo">
              {repoStatus === statuses.loading && <>Loading...</>}
              {repoStatus === statuses.error && <>{repoError}</>}
              {repoStatus === statuses.susses && <>{userRepos}</>}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UserInfo;

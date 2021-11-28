import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { useApi } from "app/context/api";
import UserType from "app/types/user";
import STATUS from "./status";

type UserInfoType = {
  login: string | undefined;
};

export const useUserInfo = ({ login }: UserInfoType) => {
  const api = useApi();
  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(STATUS.idle);

  const fetch = useCallback(
    async (login: string | undefined) => {
      try {
        if (!login) return;
        setStatus(STATUS.loading);

        const res = await api?.userInfo(login);

        const userInfo = res?.data;
        setUser(userInfo);
        setStatus(STATUS.susses);
      } catch (e) {
        const err = e as AxiosError;
        setStatus(STATUS.error);
        setError(err?.message);
      }
    },
    [api]
  );

  useEffect(() => {
    fetch(login);
  }, [fetch, login]);

  return { user, error, status } as const;
};

import { useState, useCallback, useEffect } from "react";
import { AxiosError } from "axios";
import { useApi } from "app/context/api";
import UserType from "app/types/user";
import STATUS from "./status";

export const useUsers = () => {
  const api = useApi();
  const [users, setUsers] = useState<UserType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(STATUS.idle);

  const fetch = useCallback(
    async (params: string) => {
      try {
        setStatus(STATUS.loading);
        const data = await api?.users(
          `q=${encodeURIComponent(params)}+in:name`
        );
        setUsers(data?.data.items);
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
    if (!users) {
      const cash = localStorage.getItem("users");

      if (cash) setUsers(JSON.parse(cash));
    }
  }, [users]);

  return { users, error, status, fetch };
};

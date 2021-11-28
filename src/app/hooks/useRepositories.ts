import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { useApi } from "app/context/api";
import RepositoryType from "app/types/repository";
import STATUS from "./status";

export const useRepositories = () => {
  const api = useApi();
  const [repositories, setRepositories] = useState<RepositoryType[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(STATUS.idle);

  const fetch = useCallback(
    async (params: string | undefined, user: string) => {
      try {
        if (!params) return;
        setStatus(STATUS.loading);
        const res = await api?.searchRepositories(
          `q=${encodeURIComponent(params)}+user:${user}`
        );
        setRepositories(res?.data.items);
        setStatus(STATUS.susses);
      } catch (e) {
        const err = e as AxiosError;
        setStatus(STATUS.error);
        setError(err?.message);
      }
    },
    [api]
  );

  return { repositories, error, status, fetch } as const;
};

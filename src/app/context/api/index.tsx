import { createContext, useMemo, useContext } from "react";
import { ReactNode, FC, ReactElement } from "react";
import Axios, { AxiosInstance, AxiosResponse } from "axios";

interface ApiContextInterface {
  users: (data: string) => Promise<AxiosResponse<any, any>>;
  userInfo: (data: string) => Promise<AxiosResponse<any, any>>;
  repositories: (data: string) => Promise<AxiosResponse<any, any>>;
  searchRepositories: (data: string) => Promise<AxiosResponse<any, any>>;
}

interface ApiProviderInterface {
  children: ReactNode;
}

export const ApiContext = createContext<ApiContextInterface | null>(null);

export const ApiProvider: FC<ApiProviderInterface> = ({
  children,
}): ReactElement => {
  const api = useMemo<AxiosInstance>(() => {
    const axios = Axios.create({
      timeout: 10000,
      baseURL: "https://api.github.com/",
      validateStatus: (status) => status >= 200 && status < 300,
    });

    return axios;
  }, []);

  const value: ApiContextInterface = {
    users: (data) => api.get(`search/users?${data}`),
    userInfo: (login) => api.get(`users/${login}`),
    repositories: (login) => api.get(`/users/${login}/repos`),
    searchRepositories: (data) => api.get(`search/repositories?${data}`),
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext<ApiContextInterface | null>(ApiContext);
};

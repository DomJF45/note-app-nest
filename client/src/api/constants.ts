import { AxiosRequestConfig } from "axios";

export const API_URL = import.meta.env.VITE_REACT_APP_API_ENDPOINT;

export const getToken = (): string => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  return token;
};

export const axiosOptions = (token: string): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

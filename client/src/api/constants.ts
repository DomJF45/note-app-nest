import {
  AxiosHeaderValue,
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

export const API_URL = "/api";

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

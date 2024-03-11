import { AxiosRequestConfig } from "axios";

// API proxy defined in vite config
export const API_URL = import.meta.env.VITE_REACT_APP_API_ENDPOINT;

// function to grab token from storage and throw an error if it does not exist
export const getToken = (): string => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  return token;
};

// function to set the token in local storage
export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

// axios options
// NOTE: There is a way to set the axios options to include this on all requests
// due to the simplicity of the application I made this function that will return options with the token attached to avoid unnescary headers
export const axiosOptions = (token: string): AxiosRequestConfig => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

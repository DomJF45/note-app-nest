import axios from "axios";
import type { iLoginUser, iRegisterUser, iUser } from "../../types/user.types";
import { API_URL, axiosOptions, getToken } from "../constants";

// logs user in, if no response throw a new error
export async function login(data: iLoginUser): Promise<void> {
  const { email, password } = data;
  const res = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  if (!res) throw new Error();
  // sets jwt in local storage
  localStorage.setItem("token", res.data.token);
}

// registers user
export async function registerUser(data: iRegisterUser) {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  if (!res) throw new Error();
  // sets token in local storage
  localStorage.setItem("token", res.data.token);
}

export async function getProfile(): Promise<iUser> {
  // function to get token from local storage
  const token = getToken();
  const res = await axios.get(`${API_URL}/auth/profile`, axiosOptions(token));
  // return the user
  return res.data.user;
}

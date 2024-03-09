import axios from "axios";
import type { iLoginUser, iRegisterUser, iUser } from "../../types/user.types";
import { API_URL, axiosOptions, getToken } from "../constants";

export async function login(data: iLoginUser): Promise<void> {
  const { email, password } = data;
  const res = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  if (!res) throw new Error();
  localStorage.setItem("token", res.data.token);
}

export async function registerUser(data: iRegisterUser) {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  if (!res) throw new Error();
  localStorage.setItem("token", res.data.token);
}

export async function getProfile(): Promise<iUser> {
  const token = getToken();
  const res = await axios.get(`${API_URL}/auth/profile`, axiosOptions(token));
  return res.data.user;
}

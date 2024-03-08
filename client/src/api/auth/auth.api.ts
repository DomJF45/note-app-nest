import axios from "axios";
import type { iUser } from "../../types/user.types";
import { API_URL } from "../constants";

export async function login(data: {
  email: string;
  password: string;
}): Promise<void> {
  const { email, password } = data;
  const res = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  if (!res) throw new Error();
  localStorage.setItem("token", res.data.token);
}

export async function getProfile(): Promise<iUser> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");
  const res = await axios.get(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.data.user;
}

import axios from "axios";
import { iUser } from "../../types/user.types";
import { API_URL, axiosOptions, getToken } from "../constants";

export async function getUsers(): Promise<iUser[]> {
  const token = getToken();
  const res = await axios.get(`${API_URL}/users`, axiosOptions(token));
  return res.data;
}

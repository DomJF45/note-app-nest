import axios from "axios";
import type { iNote } from "../../types/note.types";
import { API_URL, axiosOptions, getToken } from "../constants";

export async function getNotes(): Promise<iNote[]> {
  const token = getToken();
  const res = await axios.get(`${API_URL}/notes`, axiosOptions(token));
  return res.data;
}

export async function createNote(note: string): Promise<void> {
  const token = getToken();
  await axios.post(`${API_URL}/notes`, { content: note }, axiosOptions(token));
}

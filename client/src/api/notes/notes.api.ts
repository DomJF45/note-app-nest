import axios from "axios";
import type { iEditNote, iNote } from "../../types/note.types";
import { API_URL, axiosOptions, getToken } from "../constants";

// get all notes by a user through JWT in axiosOptions
export async function getNotes(): Promise<iNote[]> {
  // grab token
  const token = getToken();
  // make fetch
  const res = await axios.get(`${API_URL}/notes`, axiosOptions(token));
  // return data
  return res.data;
}

export async function createNote(note: string): Promise<void> {
  // grab token
  const token = getToken();
  // post note data
  await axios.post(`${API_URL}/notes`, { content: note }, axiosOptions(token));
}

export async function updateNote(note: iEditNote): Promise<void> {
  // grab token
  const token = getToken();
  // put new note data in existing note through note id
  await axios.put(`${API_URL}/notes/${note.id}`, note, axiosOptions(token));
}

export async function deleteNote(id: number): Promise<void> {
  // grab token
  const token = getToken();
  // delete note by id and user token
  await axios.delete(`${API_URL}/notes/${id}`, axiosOptions(token));
}

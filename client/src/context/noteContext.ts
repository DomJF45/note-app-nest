import { createContext } from "react";
import { iNoteContext } from "../types/note.types";

export const NoteContext = createContext<iNoteContext | null>(null);

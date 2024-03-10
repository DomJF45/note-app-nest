import { createContext } from "react";
import { iNoteContext } from "../types/note.types";

// takes iNoteContext and null as type, but initializes to null
export const NoteContext = createContext<iNoteContext | null>(null);

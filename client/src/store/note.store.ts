import { create } from "zustand";
import { iNote } from "../types/note.types";

// Zustand store for note state management

// define note state interface
// state has values and actions
interface NoteState {
  notes: iNote[];
  dateFilter: string;
  noteFilter: string;
  actions: {
    setNotes: (notes: iNote[]) => void;
    setDateFilter: (dateFilter: string) => void;
    setNoteFilter: (noteFilter: string) => void;
  };
}

// create the note store, pass in default values
export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  dateFilter: "DSC",
  noteFilter: "",
  actions: {
    setNotes: (notes) => set({ notes }),
    setDateFilter: (dateFilter) => set({ dateFilter }),
    setNoteFilter: (noteFilter) => set({ noteFilter }),
  },
}));

// use atomic selectors to avoid access to all state

export const useNotes = () => useNoteStore((state) => state.notes);
export const useDateFilter = () => useNoteStore((state) => state.dateFilter);
export const useNoteFilter = () => useNoteStore((state) => state.noteFilter);

// export actions for destructuring
export const useNoteActions = () => useNoteStore((state) => state.actions);

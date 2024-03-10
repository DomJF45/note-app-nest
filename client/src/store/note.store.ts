import { create } from "zustand";
import { iNote } from "../types/note.types";

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

export const useNotes = () => useNoteStore((state) => state.notes);
export const useDateFilter = () => useNoteStore((state) => state.dateFilter);
export const useNoteFilter = () => useNoteStore((state) => state.noteFilter);
export const useNoteActions = () => useNoteStore((state) => state.actions);

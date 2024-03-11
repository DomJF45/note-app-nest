import { useQuery, useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import type { iNote, iEditNote } from "../../../types/note.types";
import {
  createNote,
  updateNote,
  deleteNote,
  getNotes,
} from "../../../api/notes/notes.api";
import { useNoteActions } from "../../../store/note.store";

/*
 * This File handles all the crud mutations and queries for Notes.
 * It acts similar to a controller, but powered by useQuery
 * Rather than having all of this on top of the page component, I extracted it into its own hook
 * */

// return type for hook
interface iNoteCrud {
  queries: {
    data: iNote[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  handlers: {
    handleAddNote: (data: string) => void;
    handleEditNote: (data: iEditNote) => void;
    handleDeleteNote: (id: number) => void;
  };
}

export const useNoteCrud = (): iNoteCrud => {
  const { setNotes } = useNoteActions();
  const queryClient = useQueryClient();
  // add notes mutation
  const createNoteMutation = useMutation((data: string) => createNote(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      toast.success("Note created");
    },
    onError: () => {
      toast.error("Error creating note");
    },
  });
  // edit notes mutation
  const editNoteMutation = useMutation((data: iEditNote) => updateNote(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      toast.success("Note edited");
    },
    onError: () => {
      toast.error("Error editing note");
    },
  });
  // delete notes mutation
  const deleteNoteMutation = useMutation((id: number) => deleteNote(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      toast.success("Note deleted");
    },
    onError: () => {
      toast.error("Error deleting note");
    },
  });

  // handler function to add note
  const handleAddNote = (data: string) => {
    createNoteMutation.mutate(data);
  };

  // handler function to edit note
  const handleEditNote = (data: iEditNote) => {
    editNoteMutation.mutate(data);
  };

  // handler function to delete note
  const handleDeleteNote = (id: number) => {
    deleteNoteMutation.mutate(id);
  };

  // data query for notes
  const { data, isLoading, isError } = useQuery(["notes"], getNotes, {
    // if data gets returned, set the notes state to data
    onSuccess: (data: iNote[]) => {
      setNotes(data);
    },
  });

  return {
    queries: {
      data,
      isLoading,
      isError,
    },
    handlers: {
      handleAddNote,
      handleEditNote,
      handleDeleteNote,
    },
  };
};

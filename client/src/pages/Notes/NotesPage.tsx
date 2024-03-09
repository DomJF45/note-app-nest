import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import type { iEditNote, iNote } from "../../types/note.types";
import { FilterBar, FilterDropDown } from "../../components/Filter";
import { AddNote, Notes } from "../../components/Notes";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../../api/notes/notes.api";
import NoteGuard from "./NoteGuard";
import { NoteContext } from "../../context/noteContext";
import toast from "react-hot-toast";

export default function NotesPage() {
  // notes state
  const [notes, setNotes] = useState<iNote[]>([]);
  // handles filer by date
  const [dateFilter, setDateFilter] = useState<string>("DSC");
  // handles filter by content
  const [noteFilter, setNoteFilter] = useState<string>("");

  // add notes mutation
  const createNoteMutation = useMutation((data: string) => createNote(data), {
    onSuccess: () => {
      toast.success("Note created");
    },
    onError: () => {
      toast.error("Error creating note");
    },
  });
  // edit notes mutation
  const editNoteMutation = useMutation((data: iEditNote) => updateNote(data), {
    onSuccess: () => {
      toast.success("Note edited");
    },
    onError: () => {
      toast.error("Error editing note");
    },
  });
  // delete notes mutation
  const deleteNoteMutation = useMutation((id: number) => deleteNote(id), {
    onSuccess: () => {
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
  const { data, isLoading } = useQuery(
    ["getNotes", createNoteMutation, editNoteMutation, deleteNoteMutation],
    getNotes,
    {
      onSuccess: (data: iNote[]) => {
        setNotes(data);
      },
    }
  );

  // filter function
  const handleFilter = useCallback(() => {
    if (data) {
      setNotes(() => {
        let filteredNotes = [...data!];

        if (dateFilter === "ASC") {
          filteredNotes.sort(
            (a: iNote, b: iNote) =>
              +new Date(a.dateEdited) - +new Date(b.dateEdited)
          );
        } else if (dateFilter === "DSC") {
          filteredNotes.sort(
            (a: iNote, b: iNote) =>
              +new Date(b.dateEdited) - +new Date(a.dateEdited)
          );
        }

        if (noteFilter) {
          filteredNotes = filteredNotes.filter((n) =>
            n.content.toLowerCase().includes(noteFilter.toLowerCase())
          );
        }
        return filteredNotes;
      });
    }
  }, [dateFilter, noteFilter, data]);

  // update filter
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <NoteGuard>
      <NoteContext.Provider
        value={{
          updateNote: handleEditNote,
          deleteNote: handleDeleteNote,
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          <div className="flex items-end gap-5">
            <FilterBar noteFilter={noteFilter} setNoteFilter={setNoteFilter} />
            <FilterDropDown
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </div>
          <div className="flex items-end relative">
            <AddNote handleAddNote={handleAddNote} />
          </div>
        </div>
        {/* reverse notes for last added */}
        <Notes notes={notes} loading={isLoading} />
      </NoteContext.Provider>
    </NoteGuard>
  );
}

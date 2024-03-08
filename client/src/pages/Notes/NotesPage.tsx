import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "react-query";
import type { DropDownOptions, iNote } from "../../types/note.types";
import { FilterBar, FilterDropDown } from "../../components/Filter";
import { AddNote, Notes } from "../../components/Notes";
import { createNote, getNotes } from "../../api/notes/notes.api";
import NoteGuard from "./NoteGuard";

export default function NotesPage() {
  // notes state
  const [notes, setNotes] = useState<iNote[]>([]);
  // handles filer by date
  const [dateFilter, setDateFilter] = useState<string>("ASC");
  // handles filter by content
  const [noteFilter, setNoteFilter] = useState<string>("");

  // add notes mutation
  const notesMutation = useMutation((data: string) => createNote(data));

  // handler function to add note
  const handleAddNote = (data: string) => {
    notesMutation.mutate(data);
  };

  // data query for notes
  const { data, isLoading } = useQuery(["getNotes", notesMutation], getNotes, {
    onSuccess: (data: iNote[]) => {
      setNotes(data);
    },
  });

  const handleFilter = useCallback(() => {
    if (data) {
      setNotes(() => {
        let filteredNotes = [...data!];

        if (dateFilter === "ASC") {
          filteredNotes.sort(
            (a: iNote, b: iNote) => +a.dateCreated - +b.dateCreated
          );
        } else if (dateFilter === "DSC") {
          filteredNotes.sort(
            (a: iNote, b: iNote) => +b.dateCreated - +a.dateCreated
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

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <NoteGuard>
      <div className="flex flex-col sm:flex-row justify-between">
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
    </NoteGuard>
  );
}

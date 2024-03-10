import { FilterBar, FilterDropDown } from "../../components/Filter";
import { AddNote, Notes } from "../../components/Notes";
import NoteGuard from "./NoteGuard";
import { NoteContext } from "../../context/noteContext";
import { useNotes } from "../../store/note.store";
import { useFilterNotes } from "./hooks/useFilterNotes";
import { useNoteCrud } from "./hooks/useNoteCrud";

/*
 * I like to keep all of my data fetching / manipulation on the top most component, in this case the Note Page component.
 * If a component needs to manupulate / read data, it can subsribe to the zustand store rather than prop drilling
 * */

export default function NotesPage() {
  // grabs notes from zustand store
  const notes = useNotes();

  // hook that returns all queries and mutation functions related to Notes
  const {
    queries: { data, isLoading },
    handlers: { handleAddNote, handleEditNote, handleDeleteNote },
  } = useNoteCrud();

  // hook that filters the requested notes and sets the state in the note store
  useFilterNotes(data);

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
            <FilterBar />
            <FilterDropDown />
          </div>
          <div className="flex items-end relative">
            <AddNote handleAddNote={handleAddNote} />
          </div>
        </div>
        <Notes notes={notes} loading={isLoading} />
      </NoteContext.Provider>
    </NoteGuard>
  );
}

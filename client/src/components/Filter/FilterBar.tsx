import { useNoteActions, useNoteFilter } from "../../store/note.store";
import type { FilterBarComponent } from "./types";

/*
 * This component filters by note content
 * It sets the state of notes in zustand store which renders out notes containing content in noteFilter
 * */

const FilterBar: FilterBarComponent = () => {
  // grab note filter from note store
  const noteFilter = useNoteFilter();
  // grab setNoteFilter from note store actions
  const { setNoteFilter } = useNoteActions();
  // handler funciton for setting the note filter to value of input
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteFilter(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">Search:</label>
      <input
        className="border-1 rounded-md border-slate-300 text-sm w-full"
        placeholder="note"
        value={noteFilter}
        onChange={handleFilter}
      />
    </div>
  );
};

export default FilterBar;

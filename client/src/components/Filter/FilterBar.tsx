import { useNoteActions, useNoteFilter } from "../../store/note.store";
import type { FilterBarComponent } from "./types";

const FilterBar: FilterBarComponent = () => {
  const noteFilter = useNoteFilter();
  const { setNoteFilter } = useNoteActions();

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

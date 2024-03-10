import type { iNote } from "../../../types/note.types";
import {
  useDateFilter,
  useNoteActions,
  useNoteFilter,
} from "../../../store/note.store";
import { useCallback, useEffect } from "react";

/*
 * This hook filters the data and sets the state accordingly
 * It takes in an array of the data originally returned by the useQuery, e.g data
 * */

export const useFilterNotes = (data: iNote[] | undefined): void => {
  // get date filter from note store
  const dateFilter = useDateFilter();
  // get note filter from note store
  const noteFilter = useNoteFilter();
  // get setNotes function from note store functions
  const { setNotes } = useNoteActions();

  // filter the notes by note content or date posted / updated
  const handleFilter = useCallback(() => {
    // check that data exists
    if (data) {
      // copy data returned from query, NOT state data. This allows the filter to reset when you backspace
      let filteredNotes = [...data];

      // check if date is either ascending or descending
      if (dateFilter === "ASC") {
        // filter dates by first to last
        filteredNotes.sort(
          (a: iNote, b: iNote) =>
            +new Date(a.dateEdited) - +new Date(b.dateEdited)
        );
      } else if (dateFilter === "DSC") {
        // filter dates by last to first
        filteredNotes.sort(
          (a: iNote, b: iNote) =>
            +new Date(b.dateEdited) - +new Date(a.dateEdited)
        );
      }
      // check if note is being filtered by content
      if (noteFilter) {
        // set filteredNotes to content being filtered
        filteredNotes = filteredNotes.filter((n) =>
          n.content.toLowerCase().includes(noteFilter.toLowerCase())
        );
      }
      // set the notes in state
      setNotes(filteredNotes);
    }
  }, [data, dateFilter, noteFilter, setNotes]);

  // use effect for re-rendering when filters change
  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
};

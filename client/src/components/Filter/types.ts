import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface FilterBarProps {
  noteFilter: string;
  setNoteFilter: Dispatch<SetStateAction<string>>;
}

interface FilterDropDownProps {
  dateFilter: string;
  setDateFilter: Dispatch<SetStateAction<string>>;
}

export type FilterBarComponent = FunctionComponent<FilterBarProps>;
export type FilterDropDownComponent = FunctionComponent<FilterDropDownProps>;

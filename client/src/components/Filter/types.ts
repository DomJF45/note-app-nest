import { FunctionComponent } from "react";

/*
 * Originally I was prop drilling note data,
 * Instead I moved all note state to a zustand store
 * This gets rid of prop drilling
 *
 * These component types are left over from drilling props,
 * however I'll leave them be in case I need to add props.
 * */

// props for filter bar
interface FilterBarProps {}

// props for filter drop down
interface FilterDropDownProps {}

// filter bar component type with props
export type FilterBarComponent = FunctionComponent<FilterBarProps>;
// filter dropdown  component type with props
export type FilterDropDownComponent = FunctionComponent<FilterDropDownProps>;

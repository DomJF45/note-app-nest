import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

/*
 * This is a function to render the nav on each react router component contained within the parent
 * Outlet allows me to render routes almost like {children} props
 * */
export function WithNav() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 px-5 sm:px-12 py-6">
        <Outlet />
      </div>
    </>
  );
}

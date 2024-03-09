import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

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

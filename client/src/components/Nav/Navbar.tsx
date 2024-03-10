import { Link } from "react-router-dom";
import type { NavBarComponent } from "./types";
import { useAuth } from "../../hooks/useAuth";

/*
 * This component renders a nav bar,
 * it takes in both the user and logout function from the user store
 * */
const Navbar: NavBarComponent = () => {
  const { user, handleLogout } = useAuth();
  return (
    <div className="bg-white sticky top-0 left-0 w-full h-[60px] px-5 sm:px-12 border-b-[1px] border-slate-300 z-[3]">
      <div className="flex flex-row justify-between items-center h-full">
        <div>
          <Link to={"/"} className="font-bold text-2xl flex gap-1 items-end">
            Notes<span className="text-pink-500 text-3xl">.</span>
          </Link>
        </div>
        <div className="flex gap-5">
          <a className="text-slate-600">{user?.username}</a>
          {user ? (
            <a className="cursor-pointer" onClick={handleLogout}>
              logout
            </a>
          ) : (
            <Link to={"/auth/login"} className="cursor-pointer">
              login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

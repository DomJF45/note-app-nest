import { Link } from "react-router-dom";
import type { NavBarComponent } from "./types";
import { useAuth } from "../../hooks/useAuth";

const Navbar: NavBarComponent = () => {
  const { user, handleLogout } = useAuth();
  return (
    <div className="bg-white sticky top-0 left-0 w-full h-[60px] px-12 border-b-[1px] border-slate-300 z-[3]">
      <div className="flex flex-row justify-between items-center h-full">
        <div>
          <h1 className="font-bold text-2xl flex gap-1 items-end">
            Notes<span className="text-pink-500 text-3xl">.</span>
          </h1>
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

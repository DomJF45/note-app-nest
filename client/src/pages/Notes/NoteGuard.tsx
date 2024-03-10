import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/user.store";
import { NoteGuardComponent } from "./types";
import { useEffect } from "react";

const NoteGuard: NoteGuardComponent = ({ children }) => {
  const navigate = useNavigate();
  // gets user from zustand state
  const user = useUser();
  // checks if token exists or if user exists
  const isAuthenticated = localStorage.getItem("token") || user;

  // '/notes' is a protected route
  // determines isAuthenticated, then redirects to "/" if no isAuthenticated
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  // returns children
  return <>{children}</>;
};

export default NoteGuard;

import { useNavigate } from "react-router-dom";
import { useUser } from "../../store/user.store";
import { NoteGuardComponent } from "./types";
import { useEffect } from "react";

const NoteGuard: NoteGuardComponent = ({ children }) => {
  const navigate = useNavigate();
  const user = useUser();
  const isAuthenticated = localStorage.getItem("token") || user;

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default NoteGuard;

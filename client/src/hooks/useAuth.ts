import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/auth/auth.api";
import type { iUser } from "../types/user.types";
import { useSetUser, useUser, useLogout } from "../store/user.store";

export const useAuth = (): {
  user: iUser | undefined;
  handleLogout: () => void;
} => {
  const setUser = useSetUser();
  const user = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };

  useQuery(["getProfile"], getProfile, {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  return {
    user,
    handleLogout,
  };
};

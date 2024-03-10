import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/auth/auth.api";
import type { iUser } from "../types/user.types";
import { useSetUser, useUser, useLogout } from "../store/user.store";

// hook for determining if user is authenticated

export const useAuth = (): {
  user: iUser | undefined;
  handleLogout: () => void;
} => {
  // grab setUser from user store
  const setUser = useSetUser();
  // grab user from user store
  const user = useUser();
  // grab logout function from user store
  const logout = useLogout();
  const navigate = useNavigate();

  // handle logout function
  const handleLogout = () => {
    // log user out
    logout();
    // remove token
    localStorage.removeItem("token");
    // redirect to home page
    navigate("/");
  };

  // query the user by token
  // gets the user
  useQuery(["getProfile"], getProfile, {
    onSuccess: (data) => {
      // sets the user in zustand store
      setUser(data);
    },
  });
  // returns user and logout function
  return {
    user,
    handleLogout,
  };
};

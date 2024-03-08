import { createBrowserRouter } from "react-router-dom";
import { WithNav } from "./components/Nav/WithNav";
import { HomePage } from "./pages/Home";
import { NotesPage } from "./pages/Notes";
import AuthPage from "./pages/Auth/AuthPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WithNav />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/notes",
        element: <NotesPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

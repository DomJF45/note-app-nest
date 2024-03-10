import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const image_url =
  "https://images.unsplash.com/photo-1706720091754-ef4fad47d10d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
//const image_url = "https://images.unsplash.com/photo-1709599226704-160351a268be?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function AuthPage() {
  // gets current url path
  const location = useLocation();
  const navigate = useNavigate();

  // checks if route is not auth/register or auth/login and redirects if not
  useEffect(() => {
    if (location.pathname === "/auth/" || location.pathname === "/auth") {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-screen w-full">
      <div
        className="w-1/3 hidden md:flex flex-col items-center justify-center text-white/90 gap-12 bg-stone-800"
        style={{
          backgroundImage: `url(${image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="font-bold text-8xl">
          Notes<span className="text-7xl text-pink-500">.</span>
        </h1>
        <p>Sign in and start saving notes</p>
      </div>
      <div className="w-full md:w-2/3 flex flex-col px-12 items-center md:justify-center">
        <div className="flex sm:none">
          <h1 className="font-bold text-6xl w-full">
            Notes<span className="text-5xl text-pink-500">.</span>
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

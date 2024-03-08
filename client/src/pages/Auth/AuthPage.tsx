import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const image_url =
  "https://images.unsplash.com/photo-1709599226704-160351a268be?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/auth/" || location.pathname === "/auth") {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-screen">
      <div
        className="w-1/3 flex flex-col items-center justify-center text-white/80 gap-12"
        style={{
          backgroundImage: `url(${image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="font-bold text-8xl">Notes</h1>
        <p>Sign in and start saving notes</p>
      </div>
      <div className="w-2/3 flex flex-col px-12 items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Input } from "./Input";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const togglePass = () => {
    setShowPass((prev) => !prev);
  };
  const Eye = showPass ? HiEyeOff : HiEye;
  const passType = showPass ? "text" : "password";

  return (
    <>
      <h1 className="text-3xl mb-10">Login to start saving notes</h1>
      <form className="flex flex-col gap-5 w-[50%]">
        <div className="flex flex-col ">
          <label>Username</label>
          <Input type="text" placeholder="coolperson20" />
        </div>
        <div className="flex flex-col ">
          <label>Email</label>
          <Input type="email" placeholder="example@mail.com" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <label>Password</label>
            <span className="cursor-pointer" onClick={togglePass}>
              <Eye />
            </span>
          </div>

          <Input type={passType} placeholder="password" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <label>Confirm Password</label>
            <span className="cursor-pointer" onClick={togglePass}>
              <Eye />
            </span>
          </div>

          <Input type={passType} placeholder="password" />
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded text-sm">
          Sign In
        </button>
        <p className="w-full">
          Already have an account?{" "}
          <Link className="text-emerald-600" to={"/auth/login"}>
            Log In
          </Link>
        </p>
      </form>
    </>
  );
}

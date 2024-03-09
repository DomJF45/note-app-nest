import { useState } from "react";
import { useMutation } from "react-query";
import z from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import Spinner from "../../components/Spinner/Spinner";
import type { iUser } from "../../types/user.types";
import { login } from "../../api/auth/auth.api";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState<boolean>(false);
  const togglePass = () => {
    setShowPass((prev) => !prev);
  };

  const mutation = useMutation(
    (data: Pick<iUser, "email" | "password">) => {
      return login(data);
    },
    {
      onSuccess: () => {
        navigate("/notes");
        toast.success("Logged in!");
      },
      onError: () => {
        toast.error("Error logging in");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <h1 className="text-3xl mb-10">Login to start saving notes</h1>
      <form
        className="flex flex-col gap-5 w-full md:w-[50%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label>Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="example@mail.com"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <label>Password</label>
            <span className="cursor-pointer" onClick={togglePass}>
              {showPass ? <HiEyeOff /> : <HiEye />}
            </span>
          </div>

          <Input
            {...register("password")}
            type={showPass ? "text" : "password"}
            placeholder="password"
          />
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded text-sm flex justify-center">
          {isSubmitting ? <Spinner /> : <p>Login</p>}
        </button>
        {errors.root && (
          <p className="text-sm text-red-500">{errors.root.message}</p>
        )}
        <p className="w-full">
          Don't have an account?{" "}
          <Link className="text-emerald-600" to={"/auth/register"}>
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
}

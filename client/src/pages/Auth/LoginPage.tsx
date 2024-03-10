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
import { AxiosError } from "axios";

// zod validation schema
const schema = z.object({
  email: z.string().email({ message: "must be a valid email" }).trim(),
  password: z.string().trim(),
});

// infer schema type, apply to FormFields for useForm
type FormFields = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  // state for showing password
  const [showPass, setShowPass] = useState<boolean>(false);
  // toggles on/off for showing password
  const togglePass = () => {
    setShowPass((prev) => !prev);
  };

  // mutation that logs user in
  const mutation = useMutation(
    (data: Pick<iUser, "email" | "password">) => {
      return login(data);
    },
    {
      // if successful, redirect to notes and displays toast
      onSuccess: () => {
        navigate("/notes");
        toast.success("Logged in!");
      },
      // if not successful, show error in toast
      onError: (
        err: AxiosError<{ message: string; error: string; statusCode: number }>
      ) => {
        toast.error("Error logging in!");
        setError("root", {
          type: "manual",
          message: err.response?.data.message,
        });
      },
    }
  );

  // form made with useForm, allows for better form control and validation
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  // submit handler for login form
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    try {
      mutation.mutate(data);
    } catch (err: unknown) {
      toast("Error loggin in!");
      if (err instanceof AxiosError) {
        setError("root", {
          type: "manual",
          message: err.response?.data,
        });
      }
    }
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
            {...register("email", {
              required: "email is required",
            })}
            type="email"
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <label>Password</label>
            <span className="cursor-pointer" onClick={togglePass}>
              {showPass ? <HiEyeOff /> : <HiEye />}
            </span>
          </div>

          <Input
            {...register("password", {
              required: "password is required",
            })}
            type={showPass ? "text" : "password"}
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
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

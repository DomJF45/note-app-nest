import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import { Input } from "./Input";
import { PASS_REGEX, USERNAME_REGEX } from "./constants";
import type { iRegisterUser } from "../../types/user.types";
import { registerUser } from "../../api/auth/auth.api";
import Spinner from "../../components/Spinner/Spinner";
import { AxiosError } from "axios";

// zod schema for registering user
const schema = z
  .object({
    username: z
      .string()
      .regex(USERNAME_REGEX, {
        message:
          "must be between 3 and 28 characters and contain no spaces or special characters",
      })
      .trim(),
    email: z.string().email({ message: "must be a valid email" }).trim(),
    password: z
      .string()
      .regex(PASS_REGEX, {
        message:
          "Password must be at least 6 characters, contain: 1 uppercase, 1 lowercase, 1 digit, and 1 special char (#?!@%) ",
      })
      .trim(),
    confirmPass: z
      .string()
      .regex(PASS_REGEX, {
        message:
          "Password must be at least 6 characters, contain: 1 uppercase, 1 lowercase, 1 digit, and 1 special char (#?!@%) ",
      })
      .trim(),
  })
  .superRefine(({ confirmPass, password }, ctx) => {
    if (confirmPass !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

// apply schema type to useForm form
type FormFields = z.infer<typeof schema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  // toggles password view
  const [showPass, setShowPass] = useState<boolean>(false);
  const togglePass = () => {
    setShowPass((prev) => !prev);
  };
  const Eye = showPass ? HiEyeOff : HiEye;
  const passType = showPass ? "text" : "password";

  // register mutation for registering a user
  const registerMutation = useMutation(
    (data: iRegisterUser) => registerUser(data),
    {
      onSuccess: () => {
        // if successful, redirect to /notes
        toast.success("Created account!");
        navigate("/notes");
      },
      onError: (
        err: AxiosError<{ message: string; error: string; statusCode: number }>
      ) => {
        // if error, display error in toast
        toast.error("Error creating account");
        setError("root", {
          type: "manual",
          message: err.response?.data.message,
        });
      },
    }
  );

  // form state from useForm (react-hook-form)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    resolver: zodResolver(schema),
  });

  // checks if password = confirmPassword, then registers user
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    try {
      if (watch("password") !== watch("confirmPass")) {
        setError("password", new Error("Passwords must match"));
      }
      // mutate register user
      const newUser: iRegisterUser = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      registerMutation.mutate(newUser);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError("root", {
          type: "manual",
          message: err?.response?.data,
        });
      }
    }
  };

  return (
    <>
      <h1 className="text-3xl mb-10">Sign up to start saving notes</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full md:w-[50%]"
      >
        <div className="flex flex-col ">
          <label>Username</label>
          <Input
            {...register("username", {
              required: "Username is required",
              pattern: USERNAME_REGEX,
            })}
            type="text"
            placeholder="coolperson20"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col ">
          <label>Email</label>
          <Input
            {...register("email", {
              required: "You must provide a valid email",
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
              <Eye />
            </span>
          </div>

          <Input
            {...register("password", {
              required: "Password is required",
              min: 6,
              pattern: PASS_REGEX,
            })}
            type={passType}
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <label>Confirm Password</label>
            <span className="cursor-pointer" onClick={togglePass}>
              <Eye />
            </span>
          </div>
          <Input
            {...register("confirmPass", {
              required: "You must confirm your password",
            })}
            type={passType}
            placeholder="password"
          />
          {errors.confirmPass && (
            <p className="text-red-500 text-xs">{errors.confirmPass.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded text-sm"
        >
          {isSubmitting ? <Spinner /> : <p>Login</p>}
        </button>
        {errors.root && (
          <p className="text-red-500 text-xs">{errors.root.message}</p>
        )}
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

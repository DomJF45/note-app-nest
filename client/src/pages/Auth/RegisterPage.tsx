import { useState } from "react";
import z from "zod";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PASS_REGEX, USERNAME_REGEX } from "./constants";
import { useMutation } from "react-query";
import { iRegisterUser } from "../../types/user.types";
import { registerUser } from "../../api/auth/auth.api";
import toast from "react-hot-toast";

// zod schema for registering user
const schema = z.object({
  username: z.string().trim(),
  email: z.string().email().trim(),
  password: z.string().trim(),
  confirmPass: z.string().trim(),
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
      onError: () => {
        // if error, display error in toast
        toast.error("Error creating account");
      },
    }
  );

  // form state from useForm (react-hook-form)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
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
    if (watch("password") !== watch("confirmPass")) return;
    // mutate register user
    const newUser: iRegisterUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    registerMutation.mutate(newUser);
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
              validate: (value: string) => {
                if (!USERNAME_REGEX.test(value)) {
                  return "Username must be between 3 and 28 characters, and contain no spaces or special characters";
                }
                return false;
              },
            })}
            type="text"
            placeholder="coolperson20"
          />
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
              validate: (value) => {
                if (!PASS_REGEX.test(value)) {
                  return "Minimum of 6 characters, 1 number, 1 uppercase, and 1 special character (#?!@$%^&*-)";
                }
              },
            })}
            type={passType}
            placeholder="password"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
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
              validate: (value: string) => {
                if (watch("password") !== value) {
                  return "passwords must match";
                }
                return true;
              },
            })}
            type={passType}
            placeholder="password"
          />
          {errors.confirmPass && (
            <p className="text-red-500">{errors.confirmPass.message}</p>
          )}
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded text-sm">
          Sign In
        </button>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
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

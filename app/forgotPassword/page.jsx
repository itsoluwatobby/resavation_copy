"use client";
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorStyle, SuccessStyle } from "../../lib/helperFunction";
import { toast } from "react-hot-toast";
import axiosAuth from "../../lib/authAxios";

export default function ForgotPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailAddress = searchParams.get("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => setEmail(event.target.value);

  useEffect(() => {
    if (emailAddress) setEmail(emailAddress);
    else return;
  }, [emailAddress]);

  useEffect(() => {
    let timerId;
    if (error?.length) {
      timerId = setTimeout(() => {
        setError("");
      }, 8000);
    }
    return () => clearTimeout(timerId);
  }, [error]);

  const canSubmit = Boolean(email);

  const handleGetLink = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    try {
      const res = await axiosAuth.post(`/forgot-password?email=${email}`);
      toast.success(`${res?.data?.message}`, SuccessStyle);
      setEmail("");
      router.push(`/set_new_password?email=${email}`);
    } catch (error) {
      let errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
      setError(errorMessage);
      toast.error(`${errorMessage}`, ErrorStyle);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      onClick={() => setError("")}
      className={`h-[55%] mdxl:text-base  ${
        error?.length ? "bg-red-200 bg-opacity-30" : ""
      }  mt-10 flex-grow gap-7 text-sm p-6 flex flex-col justify-between w-full md:w-1/2 sm:m-auto`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">Forgot</h1>
          <h1 className="font-bold text-lg -mt-2">Password</h1>
        </div>
        <p className="text-gray-500 text-sm">
          We'll e-mail a 4-digit pass-code to reset your password
        </p>
      </div>

      
      <form
        onSubmit={handleGetLink}
        className="flex flex-col gap-6 items-center w-full"
      >
        <Input
          type="text"
          name="email"
          value={email}
          required={true}
          handleChange={handleChange}
          placeholder={"Email"}
        />

        <button
          type="submit"
          disabled={
            error?.length ? Boolean(error) : isLoading ? isLoading : !canSubmit
          }
          className={`${
            canSubmit && !isLoading && !error?.length
              ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700"
              : "bg-gray-500"
          } ${isLoading ? "animate-pulse" : "animate-none"} ${
            error?.length ? "bg-red-500" : ""
          } p-4 transition-all capitalize text-white rounded-md w-full`}
        >
          {error?.length
            ? error?.substring(0, 25) + "..."
            : isLoading
            ? "In Progress..."
            : "Send Reset Link"}
        </button>
      </form>

      <p className="flex text-sm items-center justify-center gap-1 mt-1.5 mb-1.5">
        <span className="text-gray-500">Back to login?</span>
        <Link href={"/login"}>
          <span className="text-blue-700 hover:text-blue-500 font-bold transition-all active:text-blue-700 cursor-pointer">
            Login
          </span>
        </Link>
      </p>
    </section>
  );
  ;
}

/**
 * 
  '';
      error?.response?.status == 400 ? errorMessage = 'Invalid email address' : error?.response?.status == 404 ? errorMessage = 'You do not have an Account' : error?.response?.status == 406 ? errorMessage = 'Check your email to activate your account' : error?.response?.status >= 500 ? errorMessage = 'Internal Server Error' : errorMessage =
 */

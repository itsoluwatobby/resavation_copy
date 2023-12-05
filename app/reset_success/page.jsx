"use client"
import Link from "next/link";
import { BsCheck2Circle } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function SuccessReset() {
  const router = useRouter()

  useEffect(() => {
    let timerId;
    timerId = setTimeout(() => {
      router.push('/login')
    }, 8000)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <section className="h-[57%] mdxl:text-base mt-8 flex-grow gap-5 text-sm p-6 flex flex-col justify-between w-full md:w-1/2 sm:m-auto">
      <div className="flex flex-col items-center gap-8 p-2">
        <BsCheck2Circle className="text-green-700 text-6xl" />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-lg">Password reset</h1>
          <h1 className="font-bold text-lg -mt-1">successful</h1>
        </div>
        <p className="flex flex-col text-sm">
          <span className="text-gray-400">
            You have successfully reset your password
          </span>
          <span className="text-gray-400">
            Please use your new password when logging in
          </span>
        </p>
      </div>

      <Link href={"/login"} 
        className="w-full"
      >
        <button
          type="submit"
          className={`bg-blue-700 p-4 transition-all w-[95%] text-white rounded-md hover:bg-blue-600 active:bg-blue-700 uppercase`}
        >
          Login
        </button>
      </Link>
    </section>
  );
}

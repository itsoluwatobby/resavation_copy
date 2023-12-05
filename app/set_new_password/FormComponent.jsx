"use client";

import HiddenInput from "../../components/HiddenInput";
import PasswordChecker from "./PasswordChecker";

export default function FormComponent({ changePassword, setChangePassword, isLoading, error, handleSubmit, canSubmit, strongPassword }) {
  const { password, verifyPassword } = changePassword;

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setChangePassword((prev) => ({ ...prev, [name]: value }));
  };
  
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">Set new</h1>
          <h1 className="font-bold text-lg -mt-1">Password</h1>
        </div>
        <p className="flex flex-col text-sm">
          <span className="text-gray-400">
            Your new password must be different to
          </span>
          <span className="text-gray-400">previously used passwords</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center w-full mb-2"
      >
        <div className="w-full flex flex-col gap-1">
          <div className="border border-gray-300 rounded-md">
            <HiddenInput
              placeholder={"Password"}
              name="password"
              value={changePassword.password}
              handleChange={handleChange}
            />
            <HiddenInput
              placeholder={"Verify password"}
              name={"verifyPassword"}
              value={changePassword.verifyPassword}
              handleChange={handleChange}
            />
          </div>
          <PasswordChecker
            password={password}
            verifyPassword={verifyPassword}
            strongPassword={strongPassword}
          />
        </div>

        <button
          type="submit"
          disabled={error?.length ? Boolean(error) : isLoading ? isLoading : !canSubmit}
          className={`${(canSubmit && !isLoading && !error.length) ? "bg-blue-700 hover:bg-blue-600 active:bg-blue-700" : "bg-gray-500"} ${isLoading ? 'animate-pulse' : 'animate-none'} ${error?.length ? 'bg-red-500' : ''} p-4 transition-all capitalize text-white rounded-md w-full`}
        >
          {
            error?.length ? (error?.substring(0, 25)+'...') :
            isLoading ? 'In Progress...' : 'Reset Password'
          }
        </button>
      </form>
    </>
  );
}


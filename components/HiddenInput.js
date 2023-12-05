"use client";
import { useState } from "react";
import Input from "./Input";

export default function HiddenInput({ first, inputRef, handleChange, name, value, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        type={show ? "text" : "password"}
        inputRef={inputRef}
        first={first}
        name={name}
        required={true}
        value={value}
        handleChange={handleChange}
        placeholder={placeholder}
      />
      <span
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-2 top-4 font-bold underline cursor-pointer"
      >
        {show ? "Hide" : "show"}
      </span>
    </div>
  );
}

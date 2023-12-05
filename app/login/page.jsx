"use client";
import { useState, useEffect, useRef } from "react";
import Input from "../../components/Input";
import Link from "next/link";
import axiosAuth from "../../lib/authAxios";
import { ErrorStyle, SuccessStyle } from "../../lib/helperFunction";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { usersDB } from '../../lib/firebase'
import { nanoid } from "nanoid";
import { doc, getDoc, setDoc, updateDoc } from '@firebase/firestore'
import { useResavationAppProvider } from "@/context/useResavationAppProvider";

export default function Login() {
  const { credentials, setCredentials } = useResavationAppProvider()
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [inputRef1, inputRef2] = [useRef(), useRef()];
  const [userDetails, setUserDetails] = useState({
    email: "", password: "",
  });
  const [rememberMe, setRememberMe] = useState(false); 

  const { email, password } = userDetails;

  const handleChecked = (event) => {
    setRememberMe(event.target.checked);
    localStorage.setItem(
      "resavation-persist-login",
      JSON.stringify(event.target.checked)
    );
  };

  useEffect(() => {
    let isMounted = true;
    if (credentials) {
      isMounted
        ? setUserDetails((prev) => ({ ...prev, email: credentials?.email }))
        : null;
    }
    return () => {
      isMounted = false;
    };
  }, [credentials?.message]);

  useEffect(() => {
    if (inputRef1?.current && !email?.length) inputRef1?.current.focus();
    else if (inputRef2?.current) inputRef2?.current?.focus();
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let timerId;
    if (error?.length) {
      timerId = setTimeout(() => {
        setError("");
      }, 8000);
    }
    return () => clearTimeout(timerId);
  }, [error]);

  const canSubmit = [...Object.values(userDetails)].every(Boolean);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    try {
      const res = await axiosAuth.post(`/login`, JSON.stringify(userDetails));
      setCredentials(res?.data)
      // Creating user chat information if it does not exist
      const userDocRef = doc(usersDB, "chatUsers", res?.data?.email)
      const getUserDoc = await getDoc(userDocRef)
      // setCurrentUserInfo({...getUserDoc.data()})
      if(!getUserDoc.exists()){
        const pid = nanoid(15)
        await setDoc(userDocRef, {
          emailId: res?.data?.email, firstName: '', pid, lastName: '', 
          displayPic: '', lastMessage: [], isOnline: true, lastSeen: '', 
          conversationIds: [pid], chatIds: [], presentChatId: '', 
          createdAt: new Date().toString(), updatedAt: new Date().toString(),
        }).then(async() => {
          await setDoc(doc(usersDB, 'ChatsDB', pid), {
            admin: {
              email: res?.data?.email,
              id: pid
            }, conversations: [], 
            createdAt: new Date().toString(), 
            updatedAt: new Date().toString(), 
          })
        })
      }
      else{
        await updateDoc(doc(usersDB, "chatUsers", res?.data?.email), {
          isOnline: true, updatedAt: new Date().toString()
        })
      }
      if(typeof window !== 'undefined'){
        localStorage.setItem('loggedIn_User', JSON.stringify(res?.data))
        localStorage.setItem('user_email', res?.data?.email)
        localStorage.setItem('user_token', res?.data?.token)
        localStorage.setItem('user_refresh', res?.data?.refreshToken)
      }
      toast.success('Welcome', SuccessStyle) 
      setUserDetails({ email: "", password: "" });
      res.data?.isProfilePreferenceUploaded ? router.push('/') : router.push('/preference')
    } catch (error) {
      let errorMessage = "";
      if (error?.response?.status == 406) {
        errorMessage =
          "Account not activated, You will be redirected soon. Please enter the 4-digit code sent to you";
        setError(errorMessage);
        toast.error(`${errorMessage}`, ErrorStyle);
        setTimeout(() => {
          router.push(`/verification_code?email=${email}`);
        }, 5000);
      } 
      else if(error?.name === "FirebaseError" && error?.code === "unavailable"){
        let msg = "PLease check your network"
        setError(msg)
        toast.error(msg, ErrorStyle)
      }
      else {
        errorMessage = error?.response?.data?.message ? error?.response?.data?.message : error?.message;
        setError(errorMessage);
        toast.error(`${errorMessage}`, ErrorStyle);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      onClick={() => setError("")}
      className={`h-[57%] mdxl:text-base ${
        error?.length ? "bg-red-200 bg-opacity-30" : ""
      } mt-8 flex-grow gap-7 text-sm p-6 flex flex-col justify-between w-full sm:m-auto md:w-1/2 rounded-md`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg">Login</h1>
        <p className="text-gray-500 -mt-1 text-sm">Please enter your details</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center w-full"
      >
        <div className="flex flex-col gap-4 w-full">
          <Input
            ref={inputRef1}
            type="text"
            name="email"
            value={userDetails.email}
            handleChange={handleChange}
            placeholder={"Email"}
          />
          <div className="relative w-full">
            <Input
              type={show ? "text" : "password"}
              name={"password"}
              ref={inputRef2}
              value={userDetails.password}
              handleChange={handleChange}
              placeholder={"Password"}
            />
            <span
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-2 top-3 font-bold underline cursor-pointer"
            >
              {show ? "Hide" : "show"}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs w-full">
            <div className="flex gap-2 items-center">
              <Input
                check
                type={"checkbox"}
                name={"rememberMe"}
                checked={rememberMe}
                handleChange={handleChecked}
              />
              <p className="font-medium">Remember me</p>
            </div>
            <Link href={"/forgotPassword"}>
              <span className="font-bold underline transition-all cursor-pointer hover:opacity-80">
                Forgot password?
              </span>
            </Link>
          </div>
        </div>

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
            : "Login"}
        </button>
      </form>

      <p className="flex text-sm items-center justify-center gap-1 mt-1.5 mb-1.5">
        <span className="text-gray-500">Don&apos;t have an account?</span>
        <Link href={"/signup"}>
          <span className="text-blue-700 hover:text-blue-500 font-bold transition-all active:text-blue-700 cursor-pointer">
            Sign up
          </span>
        </Link>
      </p>
    </section>
  );
}

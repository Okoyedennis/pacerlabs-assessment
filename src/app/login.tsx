"use client";

import React, { useEffect, useState } from "react";
import { IoMail } from "react-icons/io5";
import { userLogIn } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const [requireCredential, setRequireCredential] = useState({
    requireEmail: false,
    requirePassword: false,
  });

  const { email, password } = loginCredential;
  const { requireEmail, requirePassword } = requireCredential;

  const [loadingBtn, setLoadingBtn] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleRequiredField = (stateName: string) => {
    setRequireCredential((prevRequiredFlag) => ({
      ...prevRequiredFlag,
      [stateName]: true,
    }));

    // return toast.error(`${name}`);
  };

  const handleChange = (field: string, value: string) => {
    setLoginCredential((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const logIn = () => {
    if (!email) {
      return handleRequiredField("requireEmail");
    }

    if (!password) {
      return handleRequiredField("requirePassword");
    }

    setLoadingBtn(true);

    const timeoutId = setTimeout(() => {
      setLoadingBtn(false);
      dispatch(userLogIn(email));
      router.push("/landingPage");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRequireCredential({
        requireEmail: false,
        requirePassword: false,
      });
    }, 4000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [requireCredential]);

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw] bg-gray-50">
      <div className="bg-white h-auto shadow-shadow1 w-[350px] py-[1rem] px-[1.5rem] rounded-md">
        <h1 className="text-center text-[1.5rem] font-medium text-red-400 mt-[1.5rem] font-poppins">
          Please Sign-in
        </h1>
        <div className="mt-[4rem]">
          <div
            className={`flex  justify-between  items-center bg-gray-50 w-full rounded-md h-[45px] ${
              requireEmail ? "border-red-500" : "border-border_color"
            } border-[2px] outline-none px-[.3rem]`}>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("email", e.target.value)
              }
              className="w-full outline-none bg-transparent font-poppins"
              placeholder="Enter your email or username"
              required={requireEmail}
            />
            <IoMail className="cursor-pointer text-label_color ml-[.5rem] text-lg text-black" />
          </div>
          <div
            className={`flex  justify-between  items-center bg-gray-50 w-full rounded-md h-[45px] ${
              requirePassword ? "border-red-500" : "border-border_color"
            } border-[2px] outline-none px-[.3rem] mt-[1rem]`}>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("password", e.target.value)
              }
              className="w-full outline-none bg-transparent font-poppins"
              placeholder="Enter your password"
              required={requirePassword}
            />
            <RiLockPasswordFill className="cursor-pointer text-label_color ml-[.5rem] text-lg text-black" />
          </div>
        </div>
        {loadingBtn ? (
          <button
            type="submit"
            className="w-full rounded-md h-[45px] bg-red-400 mt-[2rem] text-white font-medium font-poppins "
            disabled>
            <div className="flex items-center justify-center w-full">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          </button>
        ) : (
          <button
            type="submit"
            className="w-full rounded-md h-[45px] bg-red-400 mt-[2rem] text-white font-medium font-poppins "
            onClick={logIn}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;

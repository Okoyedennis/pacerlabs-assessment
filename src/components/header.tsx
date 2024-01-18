"use client";

import { userLogOut } from "@/redux/features/authSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = window.localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const logOut = () => {
    setLoadingBtn(true);

    const timeoutId = setTimeout(() => {
      setLoadingBtn(false);
      dispatch(userLogOut());

      router.push("/");
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  };

  return (
    <div className="">
      <div className="container flex justify-between mx-auto items-center sticky top-0 bg-white z-[999] ">
        <h2 className="text-[20px] font-normal">
          Welcome <span className="font-semibold">{username}</span>
        </h2>
        {loadingBtn ? (
          <button
            type="submit"
            className="w-[100px] rounded-md py-2 bg-red-400 text-white font-medium font-poppins px-3"
            disabled>
            <div className="flex items-center justify-center w-full">
              <svg
                className="animate-spin h-5 w-5 text-white"
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
            className="w-[100px] rounded-md py-2 bg-red-400 text-white font-medium font-poppins px-3"
            onClick={logOut}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

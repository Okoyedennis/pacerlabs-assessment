"use client";

import React from "react";
import Image from "next/image";
import Header from "../../components/header";
import { TRENDING_NFTS } from "@/components/data";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@/components/useAuth";

const page = () => {
//   useAuth();
  const truncate = (text, n) => {
    return text.length > n ? text.substring(0, n) + "..." : text;
  };
  return (
    <div className="app_container">
      <Header />
      <div className="grid grid-cols-3 gap-[1rem] mt-[2rem]">
        {TRENDING_NFTS.map((item) => (
          <div
            className="rounded-[18px] px-[1rem] border py-[2rem]"
            key={item.id}>
            <Image
              src={item.banner}
              alt={item.user_name}
              className="h-[300px] rounded-md object-contain w-full"
              width={500}
              height={300}
            />
            <div className="flex items-end justify-between w-full my-[16px]">
              <Image
                src={item.user_photo}
                alt={item.user_name}
                className="h-[60px] rounded-[8px] object-contain"
                width={100}
                height={300}
              />
              <div>
                <div className="text-base font-medium">
                  {truncate(item.user_name, 15)}
                </div>
                <div className="text-sm font-medium">
                  Owned by:{" "}
                  <span className="text-sm opacity-[.7]">
                    {item.userhandle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;

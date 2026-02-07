"use client";
import { useUser } from "@/app/provider";
import React from "react";
import Image from "next/image";

function WelcomeContainar() {
  const { user } = useUser();
  return (
    <div className="bg-white p-5 rounded-xl shadow-md m-10 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold">Welcome Back, {user?.name}</h2>
        <h2 className="text-gray-500">AI Driven Interviews</h2>
      </div>
      {user && (
        <Image
          src={user?.picture}
          alt="useravatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
}

export default WelcomeContainar;

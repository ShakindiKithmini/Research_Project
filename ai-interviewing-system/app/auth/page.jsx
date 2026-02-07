"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/superbaseClient";

function login() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log("Error: ", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} />
        <div className=" flex flex-col items-center space-y-4 p-8 border rounded-lg shadow-lg">
          <Image
            src="/Login.png"
            alt="Login"
            width={600}
            height={400}
            className="w-[500px] h-[250px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center ">
            Welcome to the AI Interviewing System
          </h2>
          <p className="text-gray-500 text-center">
            Sign In With Google Authentication
          </p>
          <Button className="mt-4 w-full" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default login;

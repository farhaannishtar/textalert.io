"use client";

import { validatePhoneNumber } from "@/utils/utils";
// import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // const supabase = createClient();

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // if (error) {
    //   return redirect("/login?message=Could not authenticate user");
    // }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    // const origin = headers().get("origin");
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    // const supabase = createClient();

    // const { error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     emailRedirectTo: `${origin}/auth/callback`,
    //   },
    // });

    // if (error) {
    //   return redirect("/login?message=Could not authenticate user");
    // }

    return redirect("/login?message=Check email to continue sign in process");
  };

  const [phoneInput, setPhoneInput] = useState("");
  const [errors, setErrors] = useState([]);

  const phoneInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setErrors([]);
    if (validatePhoneNumber(input)) {
      setPhoneInput(input);
    } else {
      setErrors(["Invalid phone number"]);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 ">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground "
        action={signIn}
      >
        <p className="text-3xl  text-black text-center">Sign in or Sign up</p>
        <div className="relative p-4">
          <input
            type="text"
            value={phoneInput}
            onChange={phoneInputChangeHandler}
            className="text-sky-900 border-b-slate-800 border-solid border-b-2 p-4 text-2xl pr-4 tracking-widest text-bold "
          />
          <FaChevronCircleRight className="absolute top-8 right-4 text-3xl" />
        </div>
        {errors.length !== 0 &&
          errors.map((error) => (
            <p className="text-red-500 text-center">{error}</p>
          ))}
        {/* <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In
        </button> */}

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}

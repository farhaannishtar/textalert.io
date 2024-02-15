"use client";
import { validatePhoneNumber } from "@/utils/string-utils";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!);

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    const phone = formData.get("phone");
    try {
      const response = await fetch('/api/twilio', { // Replace '/api/path-to-your-endpoint' with the actual path to your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }), // Assuming your endpoint expects a 'phone' field
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Verification started:', data);
      // Handle success here, e.g., show a message to the user or redirect
    } catch (error) {
      console.error('Failed to start verification:', error);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  const [phoneInput, setPhoneInput] = useState("");
  const [errors, setErrors] = useState<String[]>([]);

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
    <div className="flex flex-col w-full px-8 mt-10 sm:max-w-md gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <p className="text-3xl text-white text-center">Sign in or Sign up</p>
        <div className="relative p-4">
          <input
            type="text"
            value={phoneInput}
            name="phone"
            onChange={phoneInputChangeHandler}
            className="text-sky-900 border-solid border-b-2 w-64 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-3/4 p-4 text-lg placeholder-gray-400 text-white pr-4 tracking-widest text-bold"
            placeholder="Enter Mobile Number"
          />
          <FaChevronCircleRight className="absolute top-8 right-4 text-3xl" />
        </div>
        {errors.length !== 0 &&
          errors.map((error) => (
            <p key={1} className="text-red-500 text-center">{error}</p>
          ))}
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In
        </button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}

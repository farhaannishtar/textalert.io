import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./login/page";
import Nav from "@/components/Nav";

export default async function Index() {
  return (
    <>
      <div className="flex justify-start w-full pl-8 pt-8">
        <h1 className="text-4xl">Text Alert</h1>
      </div>
      <Login searchParams={{ message: "" }} />
    </>
  );
}

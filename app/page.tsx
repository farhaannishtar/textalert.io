import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Login from "./login/page";

export default async function Index() {

  return (
    <Login searchParams={{ message: "" }} />
  );
}

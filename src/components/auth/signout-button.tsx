"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <Button onClick={() => signOut()} className="">
      <LogOut />
      Sign Out
    </Button>
  );
}

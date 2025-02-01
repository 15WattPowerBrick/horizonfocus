"use client";

import { useSession, signIn } from "next-auth/react";
import { Button } from "../ui/button";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <Button className="w-full sm:w-auto" onClick={() => signIn()}>
      Go to Dashboard
    </Button>
  ) : (
    <Button className="w-full sm:w-auto" onClick={() => signIn()}>
      Get Started
    </Button>
  );
}

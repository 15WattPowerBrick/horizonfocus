"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function SignInButton() {
  const { data: session } = useSession();
  const router = useRouter();

  return session ? (
    <Button className="w-full sm:w-auto" onClick={() => router.push("/crm")}>
      Go to Dashboard
    </Button>
  ) : (
    <Button className="w-full sm:w-auto" onClick={() => signIn()}>
      Get Started
    </Button>
  );
}

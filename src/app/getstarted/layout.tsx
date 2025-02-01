"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  if (!session?.user) {
    redirect("/auth/signin");
    return null;
  }

  return <>{children}</>;
}

"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  if (!session?.user) return null;

  return (
    <div>
      <p>Signed in as {session.user.email}</p>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ExtendedSession } from "../../../types/next-auth";

export default async function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as ExtendedSession;
  if (!session?.user) {
    redirect("/auth/signin");
    return null;
  }

  if (session.user.memberships.length > 0) {
    redirect("/org");
  }

  return <>{children}</>;
}

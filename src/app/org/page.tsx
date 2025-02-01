// /src/app/org/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ExtendedSession } from "@/lib/types/next-auth";

export default async function OrgPage() {
  const session = (await auth()) as ExtendedSession;

  // Redirect to /getstarted if the user has no organization memberships
  if (session.user.memberships.length === 0) {
    redirect("/getstarted");
    return null;
  }

  // Redirect to /org/[orgid] if the user is in /org and has memberships
  console.log("session from /org page.tsx", session);
  const firstOrgId = session.user.memberships[0].organisation.id;
  redirect(`/org/${firstOrgId}`);
}

// /src/app/org/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ExtendedSession } from "@/lib/types/next-auth";

export default async function OrgPage() {
  const session = (await auth()) as ExtendedSession;

  // Redirect to /org/[orgid] if the user is in /org and has memberships
  const firstOrgId = session.user.memberships[0].organisation.id;
  redirect(`/org/${firstOrgId}`);
}

// /src/app/org/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ExtendedSession } from "../../lib/types/next-auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as ExtendedSession;

  if (!session?.user) {
    redirect("/auth/signin");
    return null;
  }

  // Redirect to /getstarted if the user has no organization memberships
  if (session.user.memberships.length === 0) {
    redirect("/getstarted");
  }

  // Redirect to /org/[orgid] if the user is in /org and has memberships
  const firstOrgId = session.user.memberships[0].organisation.id;
  redirect(`/org/${firstOrgId}`);

  return (
    <>
      <SidebarProvider>
        <AppSidebar session={session as ExtendedSession} />
        {children}
      </SidebarProvider>
    </>
  );
}

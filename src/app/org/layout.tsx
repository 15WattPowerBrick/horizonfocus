// /src/app/org/layout.tsx
import { auth } from "@/lib/auth";
import { OrgProvider } from "@/context/OrgContext";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Breadcrumb from "@/components/Breadcrumb";
import { ExtendedSession } from "../../lib/types/next-auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as ExtendedSession;

  // If the user is not authenticated or has no memberships, render nothing.
  // The redirection logic will be handled in the page component.
  if (!session?.user || session.user.memberships.length === 0) {
    return null;
  }

  return (
    <OrgProvider>
      <SidebarProvider>
        <AppSidebar session={session as ExtendedSession} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </OrgProvider>
  );
}

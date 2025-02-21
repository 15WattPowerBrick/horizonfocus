// /src/components/app-sidebar.tsx

"use client";

import * as React from "react";
import { Frame, GalleryVerticalEnd, Map, PieChart } from "lucide-react";

import { NavCrm } from "@/components/nav-crm";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ExtendedSession } from "../lib/types/next-auth";

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: ExtendedSession | null }) {
  if (!session?.user) return null; // Ensure session is available before rendering

  const user = {
    name: session.user.firstName || "User",
    email: session.user.email,
    avatar: session.user.image || "/avatars/default.jpg",
  };

  // Map organisations from session memberships
  const teams = session.user.memberships.map((membership) => ({
    id: membership.organisation.id, // Include the `id`
    name: membership.organisation.name,
    logo: GalleryVerticalEnd, // Use a placeholder or dynamic logo
    plan: membership.role.name, // Show role in the organisation
  }));

  // Define sidebar tabs (replace these with dynamic data if needed)
  const tabs = [
    {
      name: "Clients",
      url: "/clients",
      icon: Frame,
    },
    {
      name: "Projects",
      url: "/projects",
      icon: PieChart,
    },
    {
      name: "Invoices",
      url: "/invoices",
      icon: Map,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavCrm projects={tabs} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

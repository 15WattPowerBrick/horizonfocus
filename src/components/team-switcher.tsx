// /src/components/team-switcher.tsx
"use client";
import * as React from "react";
import { useOrg } from "@/context/OrgContext";
import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname
import { useEffect } from "react";

type Team = {
  id: string;
  name: string;
  logo: React.ElementType;
  plan: string;
};

export function TeamSwitcher({ teams }: { teams: Team[] }) {
  const { selectedOrg, setSelectedOrg } = useOrg();
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  // Sync the selectedOrg state with the URL
  useEffect(() => {
    const orgId = pathname.split("/")[2]; // Extract orgId from the URL
    if (orgId) {
      const selectedTeam = teams.find((team) => team.id === orgId);
      if (selectedTeam) {
        setSelectedOrg({
          id: selectedTeam.id,
          name: selectedTeam.name,
          role: selectedTeam.plan,
        });
      }
    } else {
      // If no orgId is present, redirect to /getstarted or set a default organization
      if (teams.length > 0) {
        router.push(`/org/${teams[0].id}`); // Redirect to the first organization
      } else {
        router.push("/getstarted"); // Redirect to /getstarted if no organizations exist
      }
    }
  }, [pathname, teams, setSelectedOrg, router]);

  const handleOrgChange = (team: Team) => {
    // Update the selected organization in the context
    setSelectedOrg({
      id: team.id,
      name: team.name,
      role: team.plan,
    });

    // Update the URL to reflect the new organization
    router.push(`/org/${team.id}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {selectedOrg ? (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {selectedOrg.name}
                    </span>
                    <span className="truncate text-xs">{selectedOrg.role}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Plus className="size-4" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Select a team
                  </span>
                </div>
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => handleOrgChange(team)} // Use handleOrgChange
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push("/getstarted")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

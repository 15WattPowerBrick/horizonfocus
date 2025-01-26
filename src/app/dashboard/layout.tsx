import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="bg-accent/5 min-h-screen">
        <div className="container pu-6">{children}</div>
      </div>
    </SidebarProvider>
  );
}

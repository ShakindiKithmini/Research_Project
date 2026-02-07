import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomeContainar from "./dashboard/_components/WelcomeContainar";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full ">
        {/*<SidebarTrigger />*/}
        <WelcomeContainar />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;

"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SideBarOptions } from "@/services/Constants";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  console.log(path);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-4">
        <Image src={"/logo.png"} alt="logo" width={100} height={50}></Image>
        <Button className="w-full">
          <Plus />
          Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={`p-5 ${path === option.path && "bg-blue-100 rounded-md"}`}
                  >
                    <Link
                      href={option.path}
                      className="flex items-center gap-2"
                    >
                      <option.icon
                        className={`text-[16px] ${path === option.path && "text-primary"}`}
                      />
                      <span
                        className={`text-[16px] font-medium ${path === option.path && "text-primary"}`}
                      >
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

"use client";

import { SidebarProvider } from "@/components/Admin/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}

//How to switch between themes?? component for that?

"use client";

import { SidebarProvider } from "@/components/Admin/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <AuthProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

//How to switch between themes?? component for that?

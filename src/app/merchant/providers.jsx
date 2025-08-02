"use client";

import { SidebarProvider } from "@/components/Admin/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

export function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <AuthProvider>
        <CartProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

//How to switch between themes?? component for that?

import Signin from "@/components/Auth/Signin";
import React from "react";
import { AuthProvider } from "@/app/context/AuthContext";
export const metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <AuthProvider>
        <Signin />
      </AuthProvider>
    </main>
  );
};

export default SigninPage;

import Signup from "@/components/Auth/Signup";
import React from "react";
import { AuthProvider } from "@/app/context/AuthContext";
export const metadata = {
  title: "Signup Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signup Page for NextCommerce Template",
  // other metadata
};

const SignupPage = () => {
  return (
    <main>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </main>
  );
};

export default SignupPage;

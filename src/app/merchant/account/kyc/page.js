import React from "react";
import KYCVerification from "@/components/Admin/Account/KYCForm";

export const metadata = {
  title: "KYC Page | NextCommerce Nextjs E-commerce template",
  description: "This is a KYC Page for NextCommerce Template",
  // other metadata
};

const KYCVerificationPage = () => {
  return (
    <main>
      <KYCVerification />
    </main>
  );
};

export default KYCVerificationPage;

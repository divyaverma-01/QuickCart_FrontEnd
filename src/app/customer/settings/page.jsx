import React from "react";
import AccountSettings from "@/components/AccountSettings";

export const metadata = {
  title: "Account Settings | NextCommerce",
  description:
    "Manage your account preferences, security, and personal information",
  // other metadata
};

const AccountSettingsPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <AccountSettings />
    </main>
  );
};

export default AccountSettingsPage;

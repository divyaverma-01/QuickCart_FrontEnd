import React from "react";
import Payment from "@/components/Payment";

export const metadata = {
  title: "Payment | NextCommerce Nextjs E-commerce template",
  description: "Secure payment processing for your order",
  // other metadata
};

const PaymentPage = () => {
  return (
    <main>
      <Payment />
    </main>
  );
};

export default PaymentPage;

//in checkout after choosing payment method , redirect to this page??

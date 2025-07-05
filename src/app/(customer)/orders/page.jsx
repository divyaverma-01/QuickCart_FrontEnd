import React from "react";
import Orders from "../../../components/Orders";

export const metadata = {
  title: "My Orders | NextCommerce Nextjs E-commerce template",
  description: "View your order history and track current orders",
  // other metadata
};

const OrdersPage = () => {
  return (
    <main>
      <Orders />
    </main>
  );
};

export default OrdersPage;

// Functionality:
// Fetch and display a list of all orders.
// Include filters (status, date, customer name).
// Use OrderList and OrderCard components.
// Calls backend: GET /api/orders

"use client";
import { useEffect, useState } from "react";
import OrderList from "../../../components/OrdersAdmin/OrderList";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Orders-Admin Page</h1>
      <OrderList orders={orders} />
    </div>
  );
}

// Functionality:
// Fetch and show details of a specific order by id.
// Allow status updates (dropdown/button).
// Uses OrderDetails component.
// Calls backend: GET /api/orders/:id, PUT /api/orders/:id/status

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OrderDetails from "@/components/OrdersAdmin/OrderDetails";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      setOrder(data);
    }
    if (id) fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <OrderDetails order={order} />
    </div>
  );
}

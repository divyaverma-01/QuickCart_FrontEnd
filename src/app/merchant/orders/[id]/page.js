// Functionality:
// Fetch and show details of a specific order by id.
// Allow status updates (dropdown/button).
// Uses OrderDetails component.
// Calls backend: GET /api/orders/:id, PUT /api/orders/:id/status

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OrderDetails from "@/components/OrdersAdmin/OrderDetails";
import { getOrderById } from "@/app/lib/API/orderApi";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(id);
        setOrder(data);
        console.log("✅ Order Details fetched");
      } catch (err) {
        console.error("❌ Error loading order:", err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchOrder();
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-black-600 animate-pulse">
        Loading order details...
      </div>
    );

  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-6">
      <OrderDetails order={order} />
    </div>
  );
}

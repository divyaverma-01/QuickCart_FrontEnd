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

  //get token dynamically
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(id, token);
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
      <OrderDetails order={order} token={token} />
    </div>
  );
}

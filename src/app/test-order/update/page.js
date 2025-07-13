"use client";
import { useEffect } from "react";
import { updateOrderStatus } from "@/app/lib/API/orderApi";

export default function UpdateOrderPage() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUxOTU3NzYyLCJleHAiOjE3NTIwNDQxNjJ9.KSBeATvtdpswciGm7GkEOmtL34lNQgMzdCQ280tZ4Bg";
    const orderId = "686b89cb49b8680b1ba34b4f"; // Order _id to update
    const newStatus = "shipped"; // pending | paid | shipped | delivered

    const update = async () => {
      try {
        const res = await updateOrderStatus(orderId, newStatus, token);
        console.log("✅ Order Status Updated:", res);
      } catch (err) {
        console.error("❌ Failed to update status:", err.message);
      }
    };

    update();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl">✏️ Test: Update Order Status</h1>
    </div>
  );
}

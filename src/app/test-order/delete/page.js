"use client";
import { useEffect } from "react";
import { deleteOrder } from "@/app/lib/API/orderApi";

export default function () {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUxOTU3NzYyLCJleHAiOjE3NTIwNDQxNjJ9.KSBeATvtdpswciGm7GkEOmtL34lNQgMzdCQ280tZ4Bg";
    const orderId = "686cb8ab3c3fef64198c3076";

    const deleteTest = async () => {
      try {
        const res = await deleteOrder(orderId, token);
        console.log("✅ Order Deleted:", res);
      } catch (error) {
        console.error("❌ Failed to delete order:", error.message);
      }
    };

    deleteTest();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl">🗑️ Test: Delete Order</h1>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { getAllOrders } from "@/app/lib/API/orderApi";

export default function getAllOrdersPage() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUxOTU3NzYyLCJleHAiOjE3NTIwNDQxNjJ9.KSBeATvtdpswciGm7GkEOmtL34lNQgMzdCQ280tZ4Bg";

    const fetchAll = async () => {
      try {
        const res = await getAllOrders(token);
        console.log("✅ All Orders (Admin):", res);
      } catch (error) {
        console.error("❌ Failed to fetch all orders:", err.message);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl">🛒 Test: Get All Orders (Admin)</h1>
    </div>
  );
}

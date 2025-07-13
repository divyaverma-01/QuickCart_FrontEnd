"use client";
import { useEffect } from "react";
import { getUserOrders } from "@/app/lib/API/orderApi";

export default function GetUserOrdersPage() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRjMDVmY2Q3N2IyMTk0NmVmYmQ2NDgiLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTE4NzcyNTEsImV4cCI6MTc1MTk2MzY1MX0.31OjP3jzaPw7Iyzd_QJplLSFNmP5-JPm3X_89KhGT-Q";

    const fetchOrders = async () => {
      try {
        const res = await getUserOrders(token);
        console.log("✅ User Orders:", res);
      } catch (err) {
        console.error("❌ Failed to fetch user orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl">📦 Test: Get User Orders</h1>
    </div>
  );
}

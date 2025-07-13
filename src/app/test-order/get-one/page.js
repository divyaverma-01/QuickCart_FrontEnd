"use client";
import { useEffect } from "react";
import { getOrderById } from "@/app/lib/API/orderApi";

export default function GetOrderByIdPage() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRjMDVmY2Q3N2IyMTk0NmVmYmQ2NDgiLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTE4NzcyNTEsImV4cCI6MTc1MTk2MzY1MX0.31OjP3jzaPw7Iyzd_QJplLSFNmP5-JPm3X_89KhGT-Q";
    const orderId = "686b89cb49b8680b1ba34b4f"; // Replace with actual order _id

    const fetchOne = async () => {
      try {
        const res = await getOrderById(orderId, token);
        console.log("✅ Order Details:", res);
      } catch (err) {
        console.error("❌ Failed to get order:", err.message);
      }
    };

    fetchOne();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl">🔍 Test: Get One Order by ID</h1>
    </div>
  );
}

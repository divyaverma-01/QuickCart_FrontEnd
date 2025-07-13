"use client";
import { useEffect } from "react";
import { createTransaction } from "@/app/lib/API/transactionApi";

export default function TestCreateTransaction() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";

    const transactionData = {
      orderId: "507f1f77bcf86cd799439011", // Replace with real order ID
      userId: "686b8eb849b8680b1ba34b53", // Replace with real user ID
      amount: 1999.99,
      currency: "INR",
      paymentMethod: "credit_card",
      status: "pending",
    };

    async function run() {
      try {
        const res = await createTransaction(transactionData, token);
        console.log("✅ Transaction created:", res);
      } catch (err) {
        console.error("❌ Failed to create transaction:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Create Transaction Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

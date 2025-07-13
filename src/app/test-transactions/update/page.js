"use client";
import { useEffect } from "react";
import { updateTransaction } from "@/app/lib/API/transactionApi";

export default function TestUpdateTransaction() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";

    const transactionId = "686e380816788de61317f3b1";

    const updateData = {
      status: "success", // Example: Update status to "success"
      // Other fields that can be updated:
      // paymentMethod: "upi",
      // amount: 1999,
    };

    async function run() {
      try {
        const updatedTx = await updateTransaction(
          transactionId,
          updateData,
          token
        );
        console.log("✅ Transaction updated:", updatedTx);
      } catch (err) {
        console.error("❌ Failed to update transaction:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Update Transaction Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

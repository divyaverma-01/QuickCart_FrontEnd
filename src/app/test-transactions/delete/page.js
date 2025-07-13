"use client";
import { useEffect } from "react";
import { deleteTransaction } from "@/app/lib/API/transactionApi";

export default function TestDeleteTransaction() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";
    const transactionId = "686e380816788de61317f3b1";

    async function run() {
      try {
        const result = await deleteTransaction(transactionId, token);
        console.log("✅ Transaction deleted:", result);
      } catch (err) {
        console.error("❌ Failed to delete transaction:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Delete Transaction Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

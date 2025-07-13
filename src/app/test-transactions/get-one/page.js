"use client";
import { useEffect } from "react";
import { getTransactionById } from "@/app/lib/API/transactionApi";

export default function TestGetTransactionById() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";

    // Replace with a real transaction ID from your database
    const transactionId = "686e380816788de61317f3b1";

    async function run() {
      try {
        const transaction = await getTransactionById(transactionId, token);
        console.log("✅ Transaction details:", transaction);
      } catch (err) {
        console.error("❌ Failed to fetch transaction:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Get Transaction By ID Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

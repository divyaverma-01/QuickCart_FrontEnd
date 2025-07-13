"use client";
import { useEffect } from "react";
import { deleteProduct } from "@/app/lib/API/productApi";

export default function TestDeleteProduct() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";

    const productId = "686e2d3b7aae72bc3beb52d3";

    async function run() {
      try {
        const res = await deleteProduct(productId, token);
        console.log("✅ Product deleted:", res);
      } catch (err) {
        console.error("❌ Failed to delete product:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Delete Product Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

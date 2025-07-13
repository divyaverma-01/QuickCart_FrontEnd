"use client";
import { useEffect } from "react";
import { updateProduct } from "@/app/lib/API/productApi";

export default function TestUpdateProduct() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";

    const productId = "686e2cbc7aae72bc3beb52c1";
    const updatedData = {
      name: "Updated Product",
      basePrice: 249.99,
    };

    async function run() {
      try {
        const res = await updateProduct(productId, updatedData, token);
        console.log("✅ Product updated:", res);
      } catch (err) {
        console.error("❌ Failed to update product:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Update Product Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

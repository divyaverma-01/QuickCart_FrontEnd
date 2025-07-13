"use client";
import { useEffect } from "react";
import { getProductById } from "@/app/lib/API/productApi";

export default function TestGetProductById() {
  useEffect(() => {
    // Replace with a real product ID from your database
    const productId = "686e2cbc7aae72bc3beb52c1";

    async function run() {
      try {
        const product = await getProductById(productId);
        console.log("✅ Product details:", product);
      } catch (err) {
        console.error("❌ Failed to fetch product:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Get Product By ID Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

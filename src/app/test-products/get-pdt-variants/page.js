"use client";
import { useEffect } from "react";
import { getProductVariants } from "@/app/lib/API/productApi";

export default function TestGetProductVariants() {
  useEffect(() => {
    // Replace with a real product ID from your database
    const productId = "686e2cbc7aae72bc3beb52c1";

    async function run() {
      try {
        const variants = await getProductVariants(productId);
        console.log("✅ Product variants:", variants);
      } catch (err) {
        console.error("❌ Failed to fetch variants:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Get Product Variants Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

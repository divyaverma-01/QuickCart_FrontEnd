"use client";
import { useEffect } from "react";
import { getAllProducts } from "@/app/lib/API/productApi";

export default function TestGetAllProducts() {
  useEffect(() => {
    async function run() {
      try {
        const products = await getAllProducts();
        console.log("✅ All products:", products);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Get All Products </h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

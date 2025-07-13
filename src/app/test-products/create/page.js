"use client";
import { useEffect } from "react";
import { createProduct } from "@/app/lib/API/productApi";

export default function TestCreateProduct() {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODZiOGViODQ5Yjg2ODBiMWJhMzRiNTMiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUyMDQ4MjAzLCJleHAiOjE3NTIxMzQ2MDN9.J0EuLAbhWTaDp_vdxPXy-rFSi6PeyMfJt_WsGVJ0iNo";

    const productData = {
      name: "Test Product",
      merchant: "684c05fcd77b21946efbd648", // ✅ Replace with real admin/merchant ObjectId
      basePrice: 199.99,
      category: "Electronics",
      description: "Test product description",
      images: ["https://via.placeholder.com/150"],
      variants: [
        {
          name: "Size",
          options: [
            { value: "S", priceModifier: 0, stock: 10 },
            { value: "M", priceModifier: 20, stock: 5 },
          ],
        },
        {
          name: "Color",
          options: [
            { value: "Red", priceModifier: 10, stock: 7 },
            { value: "Blue", priceModifier: 0, stock: 8 },
          ],
        },
      ],
      isActive: true,
    };

    async function run() {
      try {
        const res = await createProduct(productData, token);
        console.log("✅ Product created:", res);
      } catch (err) {
        console.error("❌ Failed to create product:", err.message);
      }
    }
    run();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Create Product Test</h1>
      <p className="mt-4">Check the console for result.</p>
    </div>
  );
}

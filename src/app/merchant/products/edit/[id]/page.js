"use client";

import { useParams } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id;

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
        <h1 className="text-3xl font-bold mb-6 text-pink-700">
          ✏️ Edit Product
        </h1>
        <ProductForm mode="edit" productId={productId} />
      </div>
    </div>
  );
}

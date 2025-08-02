"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById, deleteProduct } from "@/app/lib/API/productApi";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(params.id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(params.id);
        router.push("/merchant/products");
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pink-50 px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link
              href="/merchant/products"
              className="text-blue-600 hover:underline"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-pink-50 px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">
              Product Not Found
            </h1>
            <Link
              href="/merchant/products"
              className="text-blue-600 hover:underline"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-pink-700">
            📦 {product.name}
          </h1>
          <div className="flex gap-2">
            <Link
              href={`/merchant/products/edit/${product._id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Back Link */}
        <Link
          href="/merchant/products"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Products
        </Link>

        {/* Product Images */}
        {product.images && product.images.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Images</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.src = "/images/products/placeholder.png";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Basic Information
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <p className="text-gray-900">{product.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Base Price:</span>
                <p className="text-gray-900">₹{product.basePrice}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <p className="text-gray-900">
                  {product.category || "Not specified"}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Description:</span>
                <p className="text-gray-900">
                  {product.description || "No description"}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Stock Summary
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Total Stock:</span>
                <p className="text-gray-900">{product.totalStock || 0} units</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Product ID:</span>
                <p className="text-gray-900 text-sm font-mono">{product._id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created:</span>
                <p className="text-gray-900">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Last Updated:</span>
                <p className="text-gray-900">
                  {product.updatedAt
                    ? new Date(product.updatedAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Product Variants
            </h2>
            <div className="space-y-4">
              {product.variants.map((variant, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {variant.name}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {variant.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="bg-white p-3 rounded border"
                      >
                        <div className="font-medium text-gray-700">
                          {option.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          Price: ₹
                          {Number(product.basePrice) +
                            Number(option.priceModifier)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Stock: {option.stock} units
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Variants Message */}
        {(!product.variants || product.variants.length === 0) && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Product Variants
            </h2>
            <p className="text-gray-600 italic">
              No variants configured for this product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

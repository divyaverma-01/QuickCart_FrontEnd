"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/app/lib/API/productApi";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg mb-6 w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded-lg mb-8 w-48"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🛍️ Product Management
          </h1>
          <p className="text-gray-600 mb-6">
            Manage your product catalog, inventory, and pricing
          </p>
          <Link
            href="products/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-xl">+</span>
            Add New Product
          </Link>
        </div>

        {/* Stats Header */}
        <div className="mb-8">
          {products.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">
                    {products.length}
                  </div>
                  <div className="text-gray-600">Total Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    ₹
                    {products
                      .reduce((sum, p) => sum + Number(p.basePrice), 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Base Value</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {products
                      .reduce((sum, p) => sum + (p.totalStock || 0), 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-gray-600">Total Stock</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Products Yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start building your product catalog by adding your first product
            </p>
            <Link
              href="products/create"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="text-xl">+</span>
              Create Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center relative overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-300">
                    📦
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-pink-600">
                        ₹{product.basePrice}
                      </span>
                      <span className="text-sm text-gray-500">base price</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Stock:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.totalStock > 10
                            ? "bg-green-100 text-green-700"
                            : product.totalStock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.totalStock} units
                      </span>
                    </div>

                    {product.category && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Category:</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/merchant/products/${product._id}`}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      👁️ Details
                    </Link>
                    <Link
                      href={`products/edit/${product._id}`}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      ✏️ Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

//add image also
//add show details button??

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <Link href="/products/create" className="text-blue-600 underline">
        + Add New Product
      </Link>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product._id} className="border p-2 mb-2">
            <div className="font-semibold">{product.name}</div>
            <div>Base Price: ₹{product.basePrice}</div>
            <div>Total Stock: {product.totalStock}</div>
            <Link
              href={`/products/edit/${product._id}`}
              className="text-blue-500 text-sm"
            >
              🔗Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

//add image also

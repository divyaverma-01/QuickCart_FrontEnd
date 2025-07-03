"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ mode = "add", productId = null }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    basePrice: "",
    category: "",
    description: "",
    images: [],
    variants: [
      { name: "", options: [{ value: "", priceModifier: 0, stock: 0 }] },
    ],
  });

  useEffect(() => {
    if (mode === "edit" && productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [mode, productId]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleVariantChange = (index, key, value) => {
    const variants = [...form.variants];
    variants[index][key] = value;
    setForm({ ...form, variants });
  };

  const handleOptionChange = (vIdx, oIdx, field, value) => {
    const variants = [...form.variants];
    variants[vIdx].options[oIdx][field] =
      field === "stock" || field === "priceModifier" ? Number(value) : value;
    setForm({ ...form, variants });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        { name: "", options: [{ value: "", priceModifier: 0, stock: 0 }] },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = mode === "edit" ? "PUT" : "POST";
    const url =
      mode === "edit" ? `/api/products/${productId}` : "/api/products";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Product Name</span>
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Base Price (₹)</span>
          <input
            placeholder="Base Price"
            type="number"
            value={form.basePrice}
            onChange={(e) => handleChange("basePrice", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Category</span>
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </label>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Images</h2>
        {form.images.map((url, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-2">
            <input
              type="text"
              placeholder="Image URL"
              value={url}
              onChange={(e) => {
                const newImages = [...form.images];
                newImages[idx] = e.target.value;
                setForm({ ...form, images: newImages });
              }}
              className="w-full border p-2 rounded-md shadow-sm"
            />
            {url && <img src={url} alt="preview" className="h-16 rounded-md" />}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setForm({ ...form, images: [...form.images, ""] })}
          className="text-blue-600 hover:underline text-sm"
        >
          + Add Image
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Variants</h2>
        {form.variants.map((variant, idx) => (
          <div
            key={idx}
            className="border rounded-md p-4 bg-gray-100 space-y-3 mb-4"
          >
            <input
              placeholder="Variant Name (e.g., Size)"
              value={variant.name}
              onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
              className="w-full border p-2 rounded-md shadow-sm"
            />
            {variant.options.map((opt, optIdx) => (
              <div key={optIdx} className="grid grid-cols-3 gap-3">
                <input
                  placeholder="Option"
                  value={opt.value}
                  onChange={(e) =>
                    handleOptionChange(idx, optIdx, "value", e.target.value)
                  }
                  className="border p-2 rounded-md shadow-sm"
                />
                <input
                  placeholder="Price Modifier"
                  type="number"
                  value={opt.priceModifier}
                  onChange={(e) =>
                    handleOptionChange(
                      idx,
                      optIdx,
                      "priceModifier",
                      e.target.value
                    )
                  }
                  className="border p-2 rounded-md shadow-sm"
                />
                <input
                  placeholder="Stock"
                  type="number"
                  value={opt.stock}
                  onChange={(e) =>
                    handleOptionChange(idx, optIdx, "stock", e.target.value)
                  }
                  className="border p-2 rounded-md shadow-sm"
                />
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="text-blue-600 hover:underline text-sm"
        >
          + Add Variant
        </button>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
        >
          {mode === "edit" ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

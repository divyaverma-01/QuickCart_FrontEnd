import { getCookie } from "cookies-next/client";

const BASE_URL = process.env.NEXT_PUBLIC_PRODUCTS_BASE_URL;

// Get all products
export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch products");
  }
  return res.json();
};

// Get single product by ID
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch product");
  }
  return res.json();
};

// Get variants for a product
export const getProductVariants = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/variants`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch variants");
  }
  return res.json();
};

// Create new product (admin only)
export const createProduct = async (productData) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create product");
  }
  return data;
};

// Update product (admin only)
export const updateProduct = async (id, updatedData) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(updatedData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update product");
  }
  return data;
};

// Delete product (admin only)
export const deleteProduct = async (id) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete product");
  }
  return data;
};

// // Get all products
// export const getAllProducts = async () => {
//   const token = getCookie("authToken");
//   const res = await fetch(`${BASE_URL}`, {
//     headers: {
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });
//   if (!res.ok) {
//     const data = await res.json();
//     throw new Error(data.message || "Failed to fetch products");
//   }
//   return res.json();
// };

// // Get single product by ID
// export const getProductById = async (id) => {
//   const token = getCookie("authToken");
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     headers: {
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });
//   if (!res.ok) {
//     const data = await res.json();
//     throw new Error(data.message || "Failed to fetch product");
//   }
//   return res.json();
// };

// // Get variants for a product
// export const getProductVariants = async (id) => {
//   const token = getCookie("authToken");
//   const res = await fetch(`${BASE_URL}/${id}/variants`, {
//     headers: {
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//   });
//   if (!res.ok) {
//     const data = await res.json();
//     throw new Error(data.message || "Failed to fetch variants");
//   }
//   return res.json();
// };

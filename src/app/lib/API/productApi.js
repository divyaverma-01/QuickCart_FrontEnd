//functions - backend api implementation
//get pdts with pagenation, get pdt by id , create pdt, update,delete
//authorization lagana h

//same for orders,transactions
//customers list to merchant

const BASE_URL = process.env.NEXT_PUBLIC_PRODUCTS_BASE_URL;

// ✅ Get all products
export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch products");
  }
  return res.json();
};

// ✅ Get single product by ID
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch product");
  }
  return res.json();
};

// ✅ Get variants for a product
export const getProductVariants = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/variants`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch variants");
  }
  return res.json();
};

// ✅ Create new product (admin only)
export const createProduct = async (productData, token) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Pass token for auth
    },
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to create product");
  }
  return data;
};

// ✅ Update product (admin only)
export const updateProduct = async (id, updatedData, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to update product");
  }
  return data;
};

// ✅ Delete product (admin only)
export const deleteProduct = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to delete product");
  }
  return data;
};

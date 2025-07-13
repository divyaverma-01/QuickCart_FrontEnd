const BASE_URL = process.env.NEXT_PUBLIC_ORDERS_BASE_URL;

// ✅ 1. Create Order (Customer)
export const createOrder = async (orderData, token) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // authMiddleware
    },
    body: JSON.stringify(orderData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create order");
  return data;
};

// ✅ 2. Get All Orders of Logged-In User (Customer)
export const getUserOrders = async (token) => {
  const res = await fetch(`${BASE_URL}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch your orders");
  return data;
};

// ✅ 3. Get Single Order by ID (Customer/Admin)
export const getOrderById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch order");
  return data;
};

// ✅ 4. Get All Orders (Admin only)
export const getAllOrders = async (token) => {
  const res = await fetch(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch all orders");
  return data;
};

// ✅ 5. Update Order Status (Admin only)
export const updateOrderStatus = async (id, newStatus, token) => {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update order status");
  return data;
};

// ✅ 6. Delete Order (Admin only)
export const deleteOrder = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete order");
  return data;
};

// const BASE_URL = process.env.NEXT_PUBLIC_ORDERS_BASE_URL;

// async function apiRequest(url, options = {}) {
//   try {
//     const res = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//         ...(options.headers || {}),
//       },
//       credentials: "include",
//       ...options,
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "API Error");
//     return data;
//   } catch (err) {
//     console.error("API Request failed:", err.message);
//     throw err;
//   }
// }

// // Admin
// export async function getAllOrders() {
//   return apiRequest(`${BASE_URL}`);
// }

// export async function updateOrderStatus(id, newStatus) {
//   return apiRequest(`${BASE_URL}/${id}/status`, {
//     method: "PUT",
//     body: JSON.stringify({ status: newStatus }),
//   });
// }

// export async function deleteOrder(id) {
//   return apiRequest(`${BASE_URL}/${id}`, {
//     method: "DELETE",
//   });
// }

// // User
// export async function getUserOrders() {
//   return apiRequest(`${BASE_URL}/my-orders`);
// }

// export async function getOrderById(id) {
//   return apiRequest(`${BASE_URL}/${id}`);
// }

// export async function createOrder(orderData) {
//   return apiRequest(`${BASE_URL}`, {
//     method: "POST",
//     body: JSON.stringify(orderData),
//   });
// }

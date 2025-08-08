import { getCookie } from "cookies-next/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/orders";

// 1. Create Order (Customer)
export const createOrder = async (orderData) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create order");
  return data;
};

// 2. Get All Orders of Logged-In User (Customer)
export const getUserOrders = async () => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/my-orders`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch your orders");
  return data;
};

// 3. Get Single Order by ID (Customer/Admin)
export const getOrderById = async (id) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch order");
  return data;
};

// 4. Get All Orders (Admin only)
export const getAllOrders = async () => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch all orders");
  return data;
};

// 5. Update Order Status (Admin only)
export const updateOrderStatus = async (id, newStatus) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ status: newStatus }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update order status");
  return data;
};

// 6. Delete Order (Admin only)
export const deleteOrder = async (id) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete order");
  return data;
};

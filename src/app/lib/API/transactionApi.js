import { getCookie } from "cookies-next/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/transactions";

// 1. Create a new transaction (requires user token)
export const createTransaction = async (transactionData) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(transactionData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create transaction");
  return data;
};

// 2. Get all transactions (admin only)
export const getAllTransactions = async () => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch transactions");
  return data;
};

// 3. Get single transaction by ID (user or admin)
export const getTransactionById = async (id) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch transaction");
  return data;
};

// 4. Delete transaction by ID (admin only)
export const deleteTransaction = async (id) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete transaction");
  return data;
};

// 5. Update transaction status (admin only)
export const updateTransaction = async (id, updateData) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update transaction");
  return data;
};

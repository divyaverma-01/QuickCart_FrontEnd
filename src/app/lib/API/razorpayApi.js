import { getCookie } from "cookies-next/client";

const BASE_URL = process.env.NEXT_PUBLIC_RAZORPAY_BASE_URL;

// 1. Create Razorpay Payment Order
export const createPaymentOrder = async (options) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(options),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to create Razorpay order");
  return data;
};

// 2. Verify Razorpay Payment (Frontend verification)
export const verifyRazorpayPayment = async (paymentResponse) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      razorpay_order_id: paymentResponse.razorpay_order_id,
      razorpay_payment_id: paymentResponse.razorpay_payment_id,
      razorpay_signature: paymentResponse.razorpay_signature,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Payment verification failed");
  }
  return data;
};

// 3. Create Linked Account (Partner onboarding)
export const createLinkedAccount = async (accountData) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/linked-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(accountData),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to create linked account");
  return data;
};

// 4. Submit KYC Documents
export const submitKyc = async (id, kycData) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/linked-account/${id}/kyc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(kycData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to submit KYC");
  return data;
};

// 5. Get Linked Account Status
export const getLinkedAccountStatus = async (id) => {
  const token = getCookie("authToken");
  const res = await fetch(`${BASE_URL}/linked-account/${id}/status`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(data.message || "Failed to fetch account status");
  return data;
};

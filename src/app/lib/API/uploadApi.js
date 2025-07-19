import { getCookie } from "cookies-next/client";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export const uploadProductImage = async (file) => {
  const token = getCookie("authToken");
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/upload/product-image`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to upload product image");
  return data.url;
};

export const uploadProfileImage = async (file) => {
  const token = getCookie("authToken");
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/upload/profile-image`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to upload profile image");
  return data.url;
};

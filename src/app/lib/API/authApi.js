//login api
//sign up api func
//log out

// Use your backend API base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const loginApi = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data; // Should contain token
  } catch (error) {
    throw new Error(error.message);
  }
};

const signupApi = async (firstName, lastName, email, password, role) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// If your backend needs to invalidate tokens, keep this. Otherwise, you can remove it.
const logoutApi = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Logout failed");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { loginApi, signupApi, logoutApi };

// Why Not Set Cookies in authApi.js?
// You cannot set HTTP-only cookies from the client-side JavaScript.
// Only the server (API routes, SSR, etc.) can set HTTP-only cookies via the Set-Cookie header in the HTTP response.
// If you set cookies in authApi.js using document.cookie, they will be accessible to JavaScript (not secure) and cannot be httpOnly.

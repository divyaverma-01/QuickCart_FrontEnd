//login api
//sign up api func
//log out

const loginApi = async (email, password) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const signupApi = async (firstName, lastName, email, password, role) => {
  try {
    const res = await fetch("http://localhost:3001/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password, role }),
    });
    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const logoutApi = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(data.message || "Logout failed");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export { loginApi, signupApi, logoutApi };

// Why Not Set Cookies in authApi.js?
// You cannot set HTTP-only cookies from the client-side JavaScript.
// Only the server (API routes, SSR, etc.) can set HTTP-only cookies via the Set-Cookie header in the HTTP response.
// If you set cookies in authApi.js using document.cookie, they will be accessible to JavaScript (not secure) and cannot be httpOnly.

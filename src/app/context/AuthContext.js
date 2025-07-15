"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { loginApi, signupApi, logoutApi } from "@/app/lib/API/authApi";
import { setCookie, getCookie, deleteCookie } from "cookies-next/client";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  // On mount, check for token in cookie and fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      setAuthLoading(true);
      const token = getCookie("authToken");
      if (!token) {
        setUser(null);
        setAuthLoading(false);
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const data = await loginApi(email, password);
      if (data.token) {
        setCookie("authToken", data.token, {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/", //(cookie is valid for the whole site)
        });
        setUser(data.user || null); // If backend returns user info
        return { success: true };
      } else {
        throw new Error("No token received");
      }
    } catch (err) {
      setUser(null);
      return { success: false, message: err.message };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    const token = getCookie("authToken");
    try {
      await logoutApi(token); // Optionally notify backend
    } catch (error) {
      // console.error("Logout error:", error);
    }
    deleteCookie("authToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

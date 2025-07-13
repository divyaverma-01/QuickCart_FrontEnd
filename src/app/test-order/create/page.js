"use client";
import { useEffect } from "react";
import { createOrder } from "@/app/lib/API/orderApi"; // ✅ adjust path if needed

export default function TestOrderPage() {
  useEffect(() => {
    const testCreateOrder = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRjMDVmY2Q3N2IyMTk0NmVmYmQ2NDgiLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTE4NzcyNTEsImV4cCI6MTc1MTk2MzY1MX0.31OjP3jzaPw7Iyzd_QJplLSFNmP5-JPm3X_89KhGT-Q";
      //const token = localStorage.getItem("token"); // 👈 Make sure user is logged in!

      if (!token) {
        console.warn("❌ No token found. Please login first.");
        return;
      }

      const orderData = {
        products: [
          {
            product: "68486b9ca7c6a857b758ed14", // ✅ Use a real product ID from your DB
            quantity: 2,
          },
        ],
        total: 199.98,
        shippingAddress: {
          street: "123 Test St",
          city: "Agra",
          state: "UP",
          country: "India",
          pincode: "282001",
        },
      };

      try {
        const response = await createOrder(orderData, token);
        console.log("✅ Order created successfully:", response);
      } catch (err) {
        console.error("❌ Order creation failed:", err.message);
      }
    };

    testCreateOrder();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-semibold">🧪 Order Test Page</h1>
      <p className="mt-4">Check the browser console to see the test result.</p>
    </div>
  );
}

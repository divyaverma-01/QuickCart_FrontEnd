"use client";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import OrderList from "../../../components/OrdersAdmin/OrderList";
import { getAllOrders } from "@/app/lib/API/orderApi";
import { AuthContext } from "@/app/context/AuthContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    fetchOrders();
  }, [authLoading]);

  async function fetchOrders() {
    try {
      setLoading(true);
      setError("");

      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }

  //if getAllOrders API fails
  function handleApiError(error) {
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      console.log("401 :", error);
      setError("Session expired. Please login again.");
    } else {
      console.log("error :", error);
      setError("Failed to load orders. Please try again later.");
    }
  }

  //Visual feedback to user
  if (authLoading) {
    return <div className="p-6">Checking authentication...</div>;
  }

  if (error) {
    return (
      <div className="bg-white p-6">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders Dashboard</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
}

//have to add
//getting token dynamically
// | Feature                           | Why                                            |
// | --------------------------------- | ---------------------------------------------- |
// | 🔍 **Search bar / filters**       | To filter by order status, date, customer name |
// | 📅 **Date range picker**          | Useful for tracking order trends               |
// | 🧾 **Order summary at top**       | Show total orders, pending orders, revenue     |
// | 📥 **Pagination or Lazy Loading** | For better performance with many orders        |
// | 🔄 **Refresh button**             | Admins often want manual reloads               |

// sequenceDiagram
//     participant Browser
//     participant OrdersPage
//     participant AuthContext
//     participant API

//     Browser->>OrdersPage: Navigate to /merchant/orders
//     OrdersPage->>AuthContext: Check auth state
//     alt Token not loaded
//         AuthContext->>OrdersPage: authLoading=true
//         OrdersPage->>Browser: Show "Checking auth..."
//     else No token or expired
//         AuthContext->>OrdersPage: Trigger logout
//         OrdersPage->>Browser: Redirect to /login
//     else Valid token
//         OrdersPage->>API: Fetch orders (with token)
//         alt API success
//             API->>OrdersPage: Return orders
//             OrdersPage->>Browser: Display orders
//         else API error
//             API->>OrdersPage: Return error
//             OrdersPage->>Browser: Show error message
//         end
//     end

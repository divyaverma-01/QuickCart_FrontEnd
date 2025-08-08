"use client";

import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../lib/API/dashboardApi";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    orders: { total: 0 },
    products: { totalProducts: 0 },
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const { totalSales, orders, products, recentOrders } = dashboardData;

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-sm text-gray-500">Total Sales</h2>
          <p className="text-xl font-semibold text-green-600">₹{totalSales}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-sm text-gray-500">Orders</h2>
          <p className="text-xl font-semibold text-blue-600">{orders.total}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-sm text-gray-500">Products</h2>
          <p className="text-xl font-semibold text-purple-600">
            {products.totalProducts}
          </p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">Order ID</th>
                  <th className="px-4 py-2 border-b">Customer</th>
                  <th className="px-4 py-2 border-b">Amount</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{order._id}</td>
                    <td className="px-4 py-2 border-b">{order.user._id}</td>
                    <td className="px-4 py-2 border-b">₹{order.total}</td>
                    <td className="px-4 py-2 border-b capitalize text-blue-600">
                      {order.status}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Placeholder for Future Chart */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md text-gray-600 text-center">
        📊 Analytics charts coming soon!
      </div>
    </div>
  );
}

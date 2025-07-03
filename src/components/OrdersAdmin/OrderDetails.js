// OrderDetails.js → Full Order Detail Viewer
// Props: order object

// Functionality:

// Displays:
// Customer info (name, address, email)
// Product list (name, qty, price)
// Payment & delivery status
// Order status update controls (dropdown or buttons)

// Can send PUT request to update status

import { useState } from "react";

export default function OrderDetails({ order }) {
  const [status, setStatus] = useState(order.status);

  async function updateStatus(newStatus) {
    const res = await fetch(`/api/orders/${order._id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (res.ok) setStatus(data.status);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order Details</h2>
      <div className="border p-4 rounded-md">
        <p>
          <strong>Customer:</strong> {order.customerName}
        </p>
        <p>
          <strong>Email:</strong> {order.customerEmail}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value)}
          className="mt-2 border rounded p-1"
        >
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div>
        <h3 className="font-semibold">Products:</h3>
        <ul className="list-disc list-inside">
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.name} x{item.quantity} — ₹{item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

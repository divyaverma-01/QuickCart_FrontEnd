// OrderCard.js → Single Order Summary Box
// Props: order object

// Functionality:
// Display order ID, user name, total price, status, and date.
// Includes "View Details" button linking to /orders/[id].
// Uses Tailwind for styling cards.

import Link from "next/link";

export default function OrderCard({ order }) {
  return (
    <div className="border rounded-xl p-4 shadow-md hover:shadow-lg transition">
      <div className="flex justify-between">
        <div>
          <p className="font-medium">Order ID: {order._id}</p>
          <p>Customer: {order.customerName}</p>
          <p>Total: ₹{order.totalAmount}</p>
        </div>
        <div className="text-right">
          <p>
            Status: <span className="font-semibold">{order.status}</span>
          </p>
          <Link
            href={`/orders/${order._id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

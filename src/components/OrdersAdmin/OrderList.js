// Props: Array of orders
// Functionality:
// Orders List Renderer
// Maps over orders and renders multiple OrderCard components.
// Can implement pagination or infinite scroll.
// Accepts optional filters/search inputs.

import OrderCard from "./OrderCard";

export default function OrderList({ orders }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}

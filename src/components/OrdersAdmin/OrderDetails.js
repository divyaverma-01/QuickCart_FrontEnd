"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { updateOrderStatus, deleteOrder } from "@/app/lib/API/orderApi";

export default function OrderDetails({ order}) {
  const [status, setStatus] = useState(order.status);
  const router = useRouter(); // ← Import router
  const [updating, setUpdating] = useState(false);

  async function handleStatusChange(newStatus) {
    setUpdating(true);
    try {
      const updatedOrder = await updateOrderStatus(order._id, newStatus);
      setStatus(updatedOrder.status);
      toast.success("Order status updated to " + updatedOrder.status);
    } catch (error) {
      toast.error("Failed to update status:");
      console.error("Failed to update status:", error.message);
    } finally {
      setUpdating(false);
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(order._id);
        toast.success("Order deleted!");
        router.push("/merchant/orders"); // ← Redirect after successful deletion
      } catch (err) {
        toast.error("Failed to delete order.");
        console.error(err);
      }
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Order Details</h2>

      {/* Customer Info */}
      <div className="border p-4 rounded-md space-y-1">
        <p>
          <strong>Customer:</strong> {order.user?.firstName}{" "}
          {order.user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {order.user?.email}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Shipping Address:</strong>
        </p>
        <div className="ml-4 text-sm text-gray-700">
          <p>{order.shippingAddress?.street}</p>
          <p>
            {order.shippingAddress?.city}, {order.shippingAddress?.state} -{" "}
            {order.shippingAddress?.pincode}
          </p>
          <p>{order.shippingAddress?.country}</p>
        </div>

        <select
          value={status}
          disabled={updating}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="mt-2 border rounded p-1"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Product List */}
      <div>
        <h3 className="font-semibold mb-2">Products:</h3>
        <ul className="space-y-4">
          {order.products.map((item, idx) => {
            const product = item.product;

            if (!product) {
              return (
                <li
                  key={idx}
                  className="p-4 bg-red-50 rounded border text-red-600"
                >
                  Product information is no longer available.
                </li>
              );
            }

            const variant = item.selectedVariants?.[0];
            const price =
              (product?.basePrice || 0) + (variant?.priceModifier || 0);
            const total = price * item.quantity;

            return (
              <li key={idx} className="flex items-center gap-4">
                {product?.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-600">
                    No Image
                  </div>
                )}
                <div>
                  <p className="font-medium">
                    {product?.name}{" "}
                    {variant?.value
                      ? `(${variant.name}: ${variant.value})`
                      : ""}
                  </p>
                  <p>
                    Quantity: {item.quantity} — ₹{price} each — ₹{total} total
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete Order
      </button>
    </div>
  );
}

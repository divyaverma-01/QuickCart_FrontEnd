"use client";
import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";
import { getUserOrders } from "../../app/lib/API/orderApi"; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="py-9.5 px-4 sm:px-7.5 xl:px-10">Loading orders...</div>
    );
  }

  if (error) {
    return (
      <div className="py-9.5 px-4 sm:px-7.5 xl:px-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[770px]">
        {/* Header row - visible on desktop */}
        {orders.length > 0 && (
          <div className="items-center justify-between py-4.5 px-7.5 hidden md:flex">
            <div className="min-w-[111px]">
              <p className="text-custom-sm text-dark">Order</p>
            </div>
            <div className="min-w-[175px]">
              <p className="text-custom-sm text-dark">Date</p>
            </div>
            <div className="min-w-[128px]">
              <p className="text-custom-sm text-dark">Status</p>
            </div>
            <div className="min-w-[213px]">
              <p className="text-custom-sm text-dark">Title</p>
            </div>
            <div className="min-w-[113px]">
              <p className="text-custom-sm text-dark">Total</p>
            </div>
            <div className="min-w-[113px]">
              <p className="text-custom-sm text-dark">Action</p>
            </div>
          </div>
        )}

        {/* Orders list */}
        {orders.length > 0 ? (
          <>
            {/* Desktop view */}
            {orders.map((orderItem) => (
              <SingleOrder
                key={orderItem.id}
                orderItem={orderItem}
                smallView={false}
              />
            ))}

            {/* Mobile view */}
            {orders.map((orderItem) => (
              <SingleOrder
                key={`mobile-${orderItem.id}`}
                orderItem={orderItem}
                smallView={true}
              />
            ))}
          </>
        ) : (
          <p className="py-9.5 px-4 sm:px-7.5 xl:px-10">
            You don't have any orders!
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;

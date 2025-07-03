"use client";

import { useEffect, useState } from "react";

export default function TransactionDetail({ transactionId }) {
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetch(`/api/transactions/${transactionId}`)
      .then((res) => res.json())
      .then(setTransaction);
  }, [transactionId]);

  if (!transaction) return <p>Loading...</p>;

  return (
    <div className="border p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
      <p>
        <strong>ID:</strong> {transaction._id}
      </p>
      <p>
        <strong>User:</strong> {transaction.userId?.email}
      </p>
      <p>
        <strong>Order ID:</strong> {transaction.orderId?._id}
      </p>
      <p>
        <strong>Amount:</strong> ₹{transaction.amount}
      </p>
      <p>
        <strong>Status:</strong> {transaction.status}
      </p>
      <p>
        <strong>Method:</strong> {transaction.paymentMethod}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(transaction.timestamp).toLocaleString()}
      </p>
    </div>
  );
}

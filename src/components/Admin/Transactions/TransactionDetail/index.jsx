"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTransactionById } from "@/app/lib/API/transactionApi";

export default function TransactionDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!id) return;

      try {
        const data = await getTransactionById(id);
        setTransaction(data);
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="p-6">
        <div className="text-center py-8 text-gray-500">
          Transaction not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>

      <div className="bg-white rounded-lg shadow border p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Transaction ID:</span>
          <span className="text-gray-900">{transaction._id}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Amount:</span>
          <span className="text-lg font-semibold text-green-600">
            ₹{transaction.amount}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              transaction.status === "success"
                ? "bg-green-100 text-green-800"
                : transaction.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {transaction.status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Payment Method:</span>
          <span className="text-gray-900">{transaction.paymentMethod}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Date:</span>
          <span className="text-gray-900">
            {new Date(transaction.timestamp).toLocaleString()}
          </span>
        </div>

        {transaction.orderId && (
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Order ID:</span>
            <span className="text-gray-900">{transaction.orderId}</span>
          </div>
        )}

        {transaction.userId && (
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">User ID:</span>
            <span className="text-gray-900">{transaction.userId}</span>
          </div>
        )}
      </div>
    </div>
  );
}

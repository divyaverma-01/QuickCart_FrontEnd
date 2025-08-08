"use client";

import { useEffect, useState } from "react";
import { getAllTransactions } from "@/app/lib/API/transactionApi";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No transactions found
        </div>
      ) : (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white p-4 rounded-lg shadow border"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">₹{transaction.amount}</p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  transaction.status === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

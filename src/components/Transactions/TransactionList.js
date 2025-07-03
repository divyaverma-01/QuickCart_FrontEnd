"use client";

import { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions") // proxy to backend
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div className="grid gap-4">
      {transactions.map((tx) => (
        <TransactionCard key={tx._id} transaction={tx} />
      ))}
    </div>
  );
}

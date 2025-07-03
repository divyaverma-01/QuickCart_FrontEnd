import Link from "next/link";

export default function TransactionCard({ transaction }) {
  return (
    <div className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <p>
        <strong>ID:</strong> {transaction._id}
      </p>
      <p>
        <strong>User:</strong> {transaction.userId?.email}
      </p>
      <p>
        <strong>Amount:</strong> ₹{transaction.amount}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="capitalize">{transaction.status}</span>
      </p>
      <p>
        <strong>Method:</strong> {transaction.paymentMethod}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {new Date(transaction.timestamp).toLocaleString()}
      </p>
      <Link
        href={`/transactions/${transaction._id}`}
        className="text-blue-600 mt-2 inline-block"
      >
        View Details →
      </Link>
    </div>
  );
}

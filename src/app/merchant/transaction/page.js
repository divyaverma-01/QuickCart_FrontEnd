import TransactionList from "@/components/Transactions/TransactionList";

export default function TransactionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
      <TransactionList />
    </div>
  );
}

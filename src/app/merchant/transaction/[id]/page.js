import TransactionDetail from "@/components/Admin/Transactions/TransactionDetail";

export default function TransactionDetailPage({ params }) {
  return (
    <div className="p-6">
      <TransactionDetail transactionId={params.id} />
    </div>
  );
}

import TransactionDetail from "@/components/Transactions/TransactionDetail";

export default function TransactionDetailPage({ params }) {
  return (
    <div className="p-6">
      <TransactionDetail transactionId={params.id} />
    </div>
  );
}

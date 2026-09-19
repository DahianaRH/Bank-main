import { createFileRoute } from "@tanstack/react-router";
import { TransactionHistory } from "@/components/TransactionHistory";
import { useCustomers } from "@/hooks/useCustomers";

export const Route = createFileRoute("/historial")({
  head: () => ({
    meta: [
      { title: "Historial — Banco Universitario" },
      {
        name: "description",
        content: "Consulta el historial de transacciones de una cuenta bancaria.",
      },
      { property: "og:title", content: "Historial — Banco Universitario" },
      {
        property: "og:description",
        content: "Consulta el historial de transacciones de una cuenta bancaria.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const { customers } = useCustomers();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Historial de transacciones</h1>
        <p className="page-subtitle">Busca las transacciones asociadas a una cuenta.</p>
      </header>

      <TransactionHistory customers={customers} />
    </div>
  );
}

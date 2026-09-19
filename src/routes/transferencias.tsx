import { createFileRoute } from "@tanstack/react-router";
import { TransferForm } from "@/components/TransferForm";
import { CustomerList } from "@/components/CustomerList";
import { useCustomers } from "@/hooks/useCustomers";

export const Route = createFileRoute("/transferencias")({
  head: () => ({
    meta: [
      { title: "Transferencias — Banco Universitario" },
      {
        name: "description",
        content: "Realiza transferencias entre cuentas de clientes registrados.",
      },
      { property: "og:title", content: "Transferencias — Banco Universitario" },
      {
        property: "og:description",
        content: "Realiza transferencias entre cuentas de clientes registrados.",
      },
    ],
  }),
  component: TransferPage,
});

function TransferPage() {
  const { customers, loading, error, reload } = useCustomers();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Transferencias</h1>
        <p className="page-subtitle">Envía dinero entre cuentas registradas.</p>
      </header>

      <TransferForm
        customers={customers}
        loadingCustomers={loading}
        customersError={error}
        onTransferred={reload}
      />
      <CustomerList customers={customers} loading={loading} error={error} onReload={reload} />
    </div>
  );
}

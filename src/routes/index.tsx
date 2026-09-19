import { createFileRoute } from "@tanstack/react-router";
import { CustomerForm } from "@/components/CustomerForm";
import { CustomerList } from "@/components/CustomerList";
import { useCustomers } from "@/hooks/useCustomers";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clientes — Banco Universitario" },
      {
        name: "description",
        content: "Consulta y registra clientes del sistema bancario universitario.",
      },
      { property: "og:title", content: "Clientes — Banco Universitario" },
      {
        property: "og:description",
        content: "Consulta y registra clientes del sistema bancario universitario.",
      },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const { customers, loading, error, reload } = useCustomers();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Clientes</h1>
        <p className="page-subtitle">Consulta los clientes registrados y crea nuevos.</p>
      </header>

      <CustomerForm onCreated={reload} />
      <CustomerList customers={customers} loading={loading} error={error} onReload={reload} />
    </div>
  );
}

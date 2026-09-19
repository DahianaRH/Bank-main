import type { Customer } from "@/types";
import { ErrorAlert, Loading } from "./Alerts";
import { formatMoney } from "@/lib/format";

interface Props {
  customers: Customer[];
  loading: boolean;
  error: string;
  onReload: () => void;
}

export function CustomerList({ customers, loading, error, onReload }: Props) {
  return (
    <section className="card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="section-title">Clientes registrados</h2>
        <button type="button" className="btn btn-outline" onClick={onReload} disabled={loading}>
          Actualizar
        </button>
      </div>

      {loading && <Loading label="Cargando clientes..." />}
      {!loading && error && <ErrorAlert message={error} />}

      {!loading && !error && customers.length === 0 && (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No hay clientes registrados.
        </p>
      )}

      {!loading && !error && customers.length > 0 && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Número de cuenta</th>
                <th className="text-right">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td className="font-mono">{c.accountNumber}</td>
                  <td className="text-right">{formatMoney(c.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

import { useState } from "react";
import { api, ApiError } from "@/services/api";
import type { Customer, Transaction } from "@/types";
import { ErrorAlert, Loading } from "./Alerts";
import { formatDate, formatMoney } from "@/lib/format";

export function TransactionHistory({ customers }: { customers: Customer[] }) {
  const [account, setAccount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!account.trim()) {
      setError("Debes indicar un número de cuenta.");
      return;
    }

    setLoading(true);
    setTransactions(null);
    try {
      const data = await api.getTransactions(account.trim());
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="card space-y-4">
        <h2 className="section-title">Consultar historial</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="field">
            <label htmlFor="account">Número de cuenta</label>
            <input
              id="account"
              className="input"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="123456"
              list="cuentas"
            />
            <datalist id="cuentas">
              {customers.map((c) => (
                <option key={c.id} value={c.accountNumber}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
            </datalist>
          </div>
        </div>

        {error && <ErrorAlert message={error} />}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Consultando..." : "Consultar"}
        </button>
      </form>

      {loading && <Loading label="Consultando transacciones..." />}

      {!loading && transactions !== null && (
        <section className="card space-y-4">
          <h2 className="section-title">Transacciones</h2>
          {transactions.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No hay transacciones para esta cuenta.
            </p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cuenta origen</th>
                    <th>Cuenta destino</th>
                    <th className="text-right">Monto</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td className="font-mono">{t.senderAccountNumber}</td>
                      <td className="font-mono">{t.receiverAccountNumber}</td>
                      <td className="text-right">{formatMoney(t.amount)}</td>
                      <td>{formatDate(t.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

import { useState } from "react";
import { api, ApiError } from "@/services/api";
import type { Customer } from "@/types";
import { ErrorAlert, SuccessAlert } from "./Alerts";
import { formatMoney } from "@/lib/format";

interface Props {
  customers: Customer[];
  loadingCustomers: boolean;
  customersError: string;
  onTransferred: () => void;
}

export function TransferForm({
  customers,
  loadingCustomers,
  customersError,
  onTransferred,
}: Props) {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!sender || !receiver || amount === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (sender === receiver) {
      setError("La cuenta origen y la cuenta destino no pueden ser iguales.");
      return;
    }
    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("El monto debe ser un número mayor que cero.");
      return;
    }

    setSending(true);
    try {
      await api.transfer({
        senderAccountNumber: sender,
        receiverAccountNumber: receiver,
        amount: parsedAmount,
      });
      setSuccess("Transferencia realizada correctamente.");
      setSender("");
      setReceiver("");
      setAmount("");
      onTransferred();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="section-title">Nueva transferencia</h2>

      {customersError && <ErrorAlert message={customersError} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="sender">Cuenta origen</label>
          <select
            id="sender"
            className="input"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            disabled={loadingCustomers}
          >
            <option value="">Selecciona una cuenta</option>
            {customers.map((c) => (
              <option key={c.id} value={c.accountNumber}>
                {c.accountNumber} — {c.firstName} {c.lastName} ({formatMoney(c.balance)})
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="receiver">Cuenta destino</label>
          <select
            id="receiver"
            className="input"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            disabled={loadingCustomers}
          >
            <option value="">Selecciona una cuenta</option>
            {customers.map((c) => (
              <option key={c.id} value={c.accountNumber}>
                {c.accountNumber} — {c.firstName} {c.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="field sm:col-span-2">
          <label htmlFor="amount">Monto</label>
          <input
            id="amount"
            className="input"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50000"
          />
        </div>
      </div>

      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}

      <button type="submit" className="btn" disabled={sending}>
        {sending ? "Procesando..." : "Realizar transferencia"}
      </button>
    </form>
  );
}

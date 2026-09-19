import { useState } from "react";
import { api, ApiError } from "@/services/api";
import { ErrorAlert, SuccessAlert } from "./Alerts";

export function CustomerForm({ onCreated }: { onCreated: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!firstName.trim() || !lastName.trim() || !accountNumber.trim() || balance === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }
    const parsedBalance = Number(balance);
    if (Number.isNaN(parsedBalance) || parsedBalance < 0) {
      setError("El saldo debe ser un número mayor o igual a cero.");
      return;
    }

    setSaving(true);
    try {
      await api.createCustomer({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        accountNumber: accountNumber.trim(),
        balance: parsedBalance,
      });
      setSuccess("Cliente creado correctamente.");
      setFirstName("");
      setLastName("");
      setAccountNumber("");
      setBalance("");
      onCreated();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Ocurrió un error inesperado.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="section-title">Nuevo cliente</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="firstName">Nombre</label>
          <input
            id="firstName"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Juan"
          />
        </div>
        <div className="field">
          <label htmlFor="lastName">Apellido</label>
          <input
            id="lastName"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Pérez"
          />
        </div>
        <div className="field">
          <label htmlFor="accountNumber">Número de cuenta</label>
          <input
            id="accountNumber"
            className="input"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="123456"
          />
        </div>
        <div className="field">
          <label htmlFor="balance">Saldo inicial</label>
          <input
            id="balance"
            className="input"
            type="number"
            min="0"
            step="0.01"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="100000"
          />
        </div>
      </div>

      {error && <ErrorAlert message={error} />}
      {success && <SuccessAlert message={success} />}

      <button type="submit" className="btn" disabled={saving}>
        {saving ? "Guardando..." : "Crear cliente"}
      </button>
    </form>
  );
}

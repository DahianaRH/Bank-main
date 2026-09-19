import type { Customer, NewCustomer, Transaction, TransferRequest } from "@/types";

// Todas las llamadas usan rutas relativas (/api/...).
// Vite hace el proxy hacia http://localhost:8080 en desarrollo.

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new ApiError(
      "No se pudo conectar con el backend. Verifica que Spring Boot esté ejecutándose en http://localhost:8080.",
      0,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();

  if (text && !contentType.includes("application/json")) {
    throw new ApiError(
      "La respuesta no proviene del backend Spring Boot. Verifica que esté ejecutándose en http://localhost:8080 y que el proxy de Vite esté activo.",
      response.status,
    );
  }

  let body: unknown = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    let backendMessage = "";
    if (typeof body === "string") {
      backendMessage = body;
    } else if (body && typeof body === "object") {
      const obj = body as Record<string, unknown>;
      backendMessage = String(obj["message"] ?? obj["error"] ?? "");
    }

    let fallback: string;
    switch (response.status) {
      case 400:
        fallback = "Solicitud inválida (400). Revisa los datos enviados.";
        break;
      case 404:
        fallback = "Recurso no encontrado (404).";
        break;
      case 500:
        fallback = "Error interno del servidor (500).";
        break;
      default:
        fallback = `Error del servidor (${response.status}).`;
    }

    throw new ApiError(backendMessage || fallback, response.status);
  }

  if (body === null || body === "") {
    return null as T;
  }

  return body as T;
}

export const api = {
  getCustomers: () => request<Customer[]>("/api/customers"),
  getCustomer: (id: number | string) => request<Customer>(`/api/customers/${id}`),
  createCustomer: (customer: NewCustomer) =>
    request<Customer>("/api/customers", {
      method: "POST",
      body: JSON.stringify(customer),
    }),
  transfer: (transfer: TransferRequest) =>
    request<unknown>("/api/transactions", {
      method: "POST",
      body: JSON.stringify(transfer),
    }),
  getTransactions: (accountNumber: string) =>
    request<Transaction[]>(`/api/transactions/${encodeURIComponent(accountNumber)}`),
};

export function ErrorAlert({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      {message}
    </div>
  );
}

export function SuccessAlert({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="rounded-md border border-success/40 bg-success/10 px-4 py-3 text-sm text-success"
    >
      {message}
    </div>
  );
}

export function Loading({ label = "Cargando..." }: { label?: string }) {
  return <p className="py-6 text-center text-sm text-muted-foreground">{label}</p>;
}

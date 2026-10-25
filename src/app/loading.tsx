import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="page-loading" role="status" aria-label="Carregando página">
      <Spinner className="page-loading-spinner" aria-hidden="true" />
      <span className="sr-only">Carregando página…</span>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="grid-paper grid-paper-fade absolute inset-0 -z-10" aria-hidden="true" />
      <div className="text-center">
        <p className="font-mono text-label uppercase text-accent">Erro 404</p>
        <h1 className="mt-4 font-display text-display-lg font-semibold">
          Essa página não existe.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-ink-2">
          O endereço que você abriu não corresponde a nenhuma seção do site.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}

import type { ReactNode } from "react";

export function WorkPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <main id="content" className="mx-auto w-full max-w-[75rem] px-4 py-16 sm:px-6">
      {eyebrow ? <p className="text-sm font-semibold text-primary">{eyebrow}</p> : null}
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
      {lead ? <p className="mt-4 max-w-2xl text-muted-foreground">{lead}</p> : null}
      <div className="mt-10">{children}</div>
    </main>
  );
}

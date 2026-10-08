import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function PageIntro({
  title,
  body,
  backLabel,
}: {
  title: string;
  body: string;
  backLabel: string;
}) {
  return (
    <main id="content" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{body}</p>
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
        {backLabel}
      </Link>
    </main>
  );
}

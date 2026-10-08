import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default async function NotFound() {
  const t = await getTranslations("Status");
  const back = await getTranslations("Placeholder");

  return (
    <main id="content" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{t("notFoundTitle")}</h1>
      <p className="mt-4 text-muted-foreground">{t("notFoundBody")}</p>
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-8")}>
        {back("back")}
      </Link>
    </main>
  );
}

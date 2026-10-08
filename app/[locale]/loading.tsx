import { getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  const t = await getTranslations("Status");

  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
      role="status"
      aria-live="polite"
      aria-label={t("loading")}
    >
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-6 h-12 w-2/3" />
      <Skeleton className="mt-4 h-24 w-full" />
    </div>
  );
}

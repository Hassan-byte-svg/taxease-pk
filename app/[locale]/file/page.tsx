import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/page-intro";
import { routing } from "@/i18n/routing";

export default async function FilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Placeholder");

  return <PageIntro title={t("fileTitle")} body={t("fileBody")} backLabel={t("back")} />;
}

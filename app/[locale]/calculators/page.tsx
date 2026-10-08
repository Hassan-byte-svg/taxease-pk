import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CalcBoard } from "@/components/site/calc-board";
import { WorkPage } from "@/components/site/work-page";
import { routing } from "@/i18n/routing";
import { copy, say } from "@/lib/catalog";

export default async function CalculatorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <WorkPage title={say(copy.calcTitle, locale)} lead={say(copy.calcLead, locale)}>
      <CalcBoard />
    </WorkPage>
  );
}

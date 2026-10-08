import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AssistantPanel } from "@/components/site/assistant-panel";
import { WorkPage } from "@/components/site/work-page";
import { routing } from "@/i18n/routing";
import { copy, say } from "@/lib/catalog";

export default async function AssistantPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <WorkPage title={say(copy.aiTitle, locale)} lead={say(copy.aiLead, locale)}>
      <AssistantPanel />
    </WorkPage>
  );
}

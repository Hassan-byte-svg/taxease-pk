import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/site/contact-form";
import { WorkPage } from "@/components/site/work-page";
import { routing } from "@/i18n/routing";
import { copy, say } from "@/lib/catalog";

export default async function FilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const { service } = await searchParams;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <WorkPage title={say(copy.contactTitle, locale)} lead={say(copy.contactLead, locale)}>
      <ContactForm service={service} />
    </WorkPage>
  );
}

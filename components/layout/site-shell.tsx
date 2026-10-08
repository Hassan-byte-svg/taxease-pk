import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { BackToTop } from "@/components/layout/back-to-top";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappButton } from "@/components/layout/whatsapp-button";

export async function SiteShell({ children }: { children: ReactNode }) {
  const t = await getTranslations("Skip");

  return (
    <>
      <a className="skip-link" href="#content">
        {t("toContent")}
      </a>
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <WhatsappButton />
      <BackToTop />
      <CookieBanner />
    </>
  );
}

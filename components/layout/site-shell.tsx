import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

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
    </>
  );
}

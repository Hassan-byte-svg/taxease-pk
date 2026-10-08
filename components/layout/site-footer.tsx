import { Mail, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Link } from "@/i18n/navigation";
import { TAX_DISCLAIMER, brand } from "@/lib/brand";

function SocialMark({ id }: { id: (typeof brand.social)[number]["id"] }) {
  if (id === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
        <path d="M6.5 9H4V20h2.5V9zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20z" />
      </svg>
    );
  }
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-1.2c0-.5.3-.8 1-.8z" />
    </svg>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();

  return (
    <footer className="mt-auto bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-[75rem] gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">{brand.name}</p>
          <p className="mt-3 text-sm text-footer-muted">{t("tagline")}</p>
          <NewsletterForm />
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("support")}</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                dir="ltr"
                href={`tel:${brand.supportPhone.replace(/\s/g, "")}`}
                className="flex min-h-11 items-center gap-3 rounded-2xl border border-white/10 px-3 py-2 hover:bg-white/5"
              >
                <Phone aria-hidden="true" size={18} />
                <span>{brand.supportPhone}</span>
              </a>
            </li>
            <li>
              <a
                dir="ltr"
                href={`mailto:${brand.supportEmail}`}
                className="flex min-h-11 items-center gap-3 rounded-2xl border border-white/10 px-3 py-2 hover:bg-white/5"
              >
                <Mail aria-hidden="true" size={18} />
                <span className="truncate">{brand.supportEmail}</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("policies")}</h2>
          <ul className="mt-4 space-y-2 text-sm text-footer-muted">
            <li>
              <Link className="inline-flex min-h-11 items-center hover:text-footer-foreground" href="/privacy">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center hover:text-footer-foreground" href="/terms">
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center hover:text-footer-foreground" href="/about">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center hover:text-footer-foreground" href="/contact">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t("social")}</h2>
          <ul className="mt-4 flex gap-2">
            {brand.social.map((item) => (
              <li key={item.id}>
                <span
                  role="img"
                  className="grid size-11 place-items-center rounded-xl border border-white/10 text-footer-muted"
                  aria-label={item.label}
                  title={item.label}
                >
                  <SocialMark id={item.id} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[75rem] space-y-3 px-4 py-6 text-sm text-footer-muted sm:px-6">
          {locale === "ur" ? <p>{t("disclaimerUr")}</p> : null}
          <p lang="en">{TAX_DISCLAIMER}</p>
          <p>{t("rights", { year: brand.copyrightYear, brand: brand.name })}</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const t = useTranslations("Footer");
  const [note, setNote] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!email.includes("@")) {
      setNote(t("newsletterInvalid"));
      return;
    }
    setNote(t("newsletterClosed"));
  }

  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <label htmlFor="newsletter-email" className="text-sm font-medium text-footer-foreground">
        {t("newsletter")}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
          className="h-11 min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-footer-foreground outline-none placeholder:text-footer-muted"
        />
        <Button type="submit" variant="accent">
          {t("join")}
        </Button>
      </div>
      <p className="mt-2 text-sm text-footer-muted" role="status">
        {note || t("newsletterHint")}
      </p>
    </form>
  );
}

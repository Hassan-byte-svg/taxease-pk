"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { brand, whatsappHref } from "@/lib/brand";

export function WhatsappButton() {
  const t = useTranslations("Chrome");

  return (
    <a
      href={whatsappHref(brand.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card"
      aria-label={t("whatsapp")}
    >
      <MessageCircle aria-hidden="true" size={26} />
    </a>
  );
}

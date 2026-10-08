"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { brand, whatsappHref } from "@/lib/brand";
import { copy, say, services } from "@/lib/catalog";

const field = "mt-2 w-full rounded-xl border border-border bg-background px-3 py-3 text-base font-normal";

export function ContactForm({ service }: { service?: string }) {
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [detail, setDetail] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="max-w-xl rounded-2xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-2xl font-semibold">{say(copy.sentTitle, locale)}</h2>
        <p className="mt-3 text-muted-foreground">{say(copy.sentBody, locale)}</p>
        <p className="mt-4 font-semibold" dir="ltr">
          {name} · {phone}
        </p>
        <p className="mt-2">{detail}</p>
        <p className="mt-4" dir="ltr">
          <a className="font-semibold text-primary" href={`tel:${brand.supportPhone.replace(/\s/g, "")}`}>{brand.supportPhone}</a>
          {" · "}
          <a className="font-semibold text-primary" href={whatsappHref(brand.whatsapp)}>WhatsApp</a>
        </p>
      </div>
    );
  }

  return (
    <form className="grid max-w-xl gap-4" onSubmit={submit}>
      <label className="text-sm font-semibold">
        {say(copy.name, locale)}
        <input required className={field} value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label className="text-sm font-semibold">
        {say(copy.phone, locale)}
        <input required className={field} value={phone} onChange={(event) => setPhone(event.target.value)} dir="ltr" />
      </label>
      <label className="text-sm font-semibold">
        {say(copy.email, locale)}
        <input type="email" className={field} name="email" />
      </label>
      <label className="text-sm font-semibold">
        {say(copy.interest, locale)}
        <select className={field} name="service" defaultValue={service || ""}>
          <option value="">{say(copy.interest, locale)}</option>
          {services.map((item) => (
            <option key={item.slug} value={item.slug}>{say(item.name, locale)}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold">
        {say(copy.message, locale)}
        <textarea required className={field} rows={4} value={detail} onChange={(event) => setDetail(event.target.value)} />
      </label>
      <label className="text-sm font-semibold">
        {say(copy.method, locale)}
        <select className={field} name="method" defaultValue="phone">
          <option value="phone">{say(copy.phone, locale)}</option>
          <option value="email">{say(copy.email, locale)}</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </label>
      <label className="text-sm font-semibold">
        {say(copy.time, locale)}
        <input className={field} name="time" placeholder={say(copy.timeHint, locale)} />
      </label>
      <Button type="submit">{say(copy.send, locale)}</Button>
    </form>
  );
}

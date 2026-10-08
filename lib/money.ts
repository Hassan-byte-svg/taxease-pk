export function formatPkr(value: number, locale: string) {
  const amount = new Intl.NumberFormat(locale === "ur" ? "ur-PK" : "en-PK", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
  return locale === "ur" ? `${amount} روپے` : `Rs. ${amount}`;
}

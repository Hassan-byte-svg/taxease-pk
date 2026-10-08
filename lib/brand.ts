/**
 * Change the product name here. Colors live in tailwind.config.ts and
 * app/globals.css so light and dark mode can both read them.
 */
export const brand = {
  name: "TaxEase PK",
  supportPhone: "+92 21 0000 0000",
  supportEmail: "hello@taxease.pk",
  copyrightYear: 2026,
  social: [
    { id: "linkedin", label: "LinkedIn" },
    { id: "instagram", label: "Instagram" },
    { id: "facebook", label: "Facebook" },
  ],
} as const;

export const TAX_DISCLAIMER =
  "Estimates are for guidance only and do not constitute tax advice. Verify against current FBR rules.";

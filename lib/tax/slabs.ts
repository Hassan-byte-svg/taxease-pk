/** Salaried individuals, Tax Year 2027, Finance Act 2026. */
export type Slab = {
  label: string;
  min: number;
  max: number | null;
  taxAtFloor: number;
  rate: number;
};

// TODO: Verify these slabs against the current FBR salary rules before relying on them.
export const SALARY_RULESET = "Tax Year 2027 · salaried slabs · Finance Act 2026";

export const salarySlabs: Slab[] = [
  { label: "Up to 600,000", min: 0, max: 600_000, taxAtFloor: 0, rate: 0 },
  { label: "600,001 – 1,200,000", min: 600_000, max: 1_200_000, taxAtFloor: 0, rate: 0.01 },
  { label: "1,200,001 – 2,200,000", min: 1_200_000, max: 2_200_000, taxAtFloor: 6_000, rate: 0.11 },
  { label: "2,200,001 – 3,200,000", min: 2_200_000, max: 3_200_000, taxAtFloor: 116_000, rate: 0.2 },
  { label: "3,200,001 – 4,100,000", min: 3_200_000, max: 4_100_000, taxAtFloor: 316_000, rate: 0.25 },
  { label: "4,100,001 – 5,600,000", min: 4_100_000, max: 5_600_000, taxAtFloor: 541_000, rate: 0.29 },
  { label: "5,600,001 – 7,000,000", min: 5_600_000, max: 7_000_000, taxAtFloor: 976_000, rate: 0.32 },
  { label: "Above 7,000,000", min: 7_000_000, max: null, taxAtFloor: 1_424_000, rate: 0.35 },
];

export function salaryTax(annual: number) {
  const income = Math.max(0, Math.round(annual));
  const slab = salarySlabs.find((item) => income <= (item.max ?? Infinity)) ?? salarySlabs[salarySlabs.length - 1];
  const tax = Math.round(slab.taxAtFloor + Math.max(0, income - slab.min) * slab.rate);
  return {
    annual: income,
    tax,
    monthlyTax: Math.round(tax / 12),
    takeHome: Math.max(0, income - tax),
    effective: income > 0 ? tax / income : 0,
  };
}
